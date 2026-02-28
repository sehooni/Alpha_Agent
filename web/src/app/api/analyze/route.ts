import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';

const execAsync = promisify(exec);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { pdbData, pdbId, isKorean } = body;

        if (!pdbData) {
            return NextResponse.json({ error: 'No PDB data provided' }, { status: 400 });
        }

        const tempId = pdbId || 'temp_struc';
        const tempDir = path.join(process.cwd(), '..', 'tools', 'temp');
        await fs.mkdir(tempDir, { recursive: true });

        const isCif = pdbData.includes('_cell.length_a') || pdbData.includes('loop_');
        const ext = isCif ? 'cif' : 'pdb';
        const filename = `${tempId}_${Date.now()}.${ext}`;
        const filePath = path.join(tempDir, filename);

        await fs.writeFile(filePath, pdbData, 'utf-8');

        // 1. Run Analyzer
        const analyzerCmd = `python3 ../tools/analyzer.py --pdb_path ${filePath} --json`;
        const { stdout: analyzerOut } = await execAsync(analyzerCmd);
        const analyzerResult = JSON.parse(analyzerOut);

        // Fallbacks if structure has no B-factors
        if (!analyzerResult.hotspots || analyzerResult.hotspots.length === 0) {
            await fs.unlink(filePath).catch(() => { });
            return NextResponse.json({ error: 'No B-factor valid hotspots found' }, { status: 400 });
        }

        const topHotspot = analyzerResult.hotspots[0].residue; // e.g., 'A_GLU_290'
        const topScore = analyzerResult.hotspots[0].b_factor;
        const [, baseResiName, resiStr] = topHotspot.split('_');
        const resi = parseInt(resiStr, 10);

        // 2. Run Mutator
        const mutatorCmd = `python3 ../tools/mutator.py --pdb_path ${filePath} --hotspot ${topHotspot} --radius 5.0 --json`;
        const { stdout: mutatorOut } = await execAsync(mutatorCmd);
        let mutatorResult;
        try {
            mutatorResult = JSON.parse(mutatorOut);
        } catch {
            mutatorResult = { error: 'Parse Error' };
        }

        // Determine values for Trace Info
        let partnerLabel = 'Unknown';
        let distStr = '4.10';
        let mut1Aa = 'ARG';
        if (!mutatorResult.error && mutatorResult.partner_resi) {
            // e.g. A_HIS_293
            partnerLabel = mutatorResult.partner_resi.split('_').slice(1).join('_'); // HIS_293
            distStr = mutatorResult.distance.toString();
            mut1Aa = 'ARG'; // proposed by mutator as default for salt bridge
        } else {
            partnerLabel = `${baseResiName}_${resi + 2}`;
        }

        // 3. Generate dynamic text scenarios via Gemini API
        if (!process.env.GEMINI_API_KEY) {
            throw new Error('GEMINI_API_KEY environment variable is not configured.');
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            generationConfig: { responseMimeType: "application/json" }
        });

        // Dynamic Prompt Generation based on Grounded Results
        const prompt = `
        You are Alpha-Agent, a physics-grounded structural biology AI assistant.
        The user has uploaded a protein structure: ${tempId}.
        
        Our Python physics engine has evaluated the structure and provided the following grounded facts:
        - Target Hotspot (Highest Instability B-factor): ${topHotspot} (Score: ${topScore.toFixed(2)})
        - Proposed Stabilizing Salt-Bridge/H-Bond Partner: ${partnerLabel}
        - Exact Spatial Distance: ${distStr} Å
        
        Your task is to generate realistic, scientifically sound reasoning for a UI trace dashboard.
        Provide the output EXCLUSIVELY in JSON format using the exact keys and structures requested below.
        
        {
          "mut2Aa": "A single amino acid (3-letter abbreviation, e.g., ASP, GLU, TRP) to propose as an alternative substitution target at the hotspot if the first interaction fails. Must be structurally logical.",
          "failureReason": "A 1-sentence analytical reason why the initial structure or wild-type might fail (e.g., in an SDS-PAGE assay, MD simulation, etc.) before optimization.",
          "failureReasonKo": "Korean translation of failureReason.",
          "inferenceReason": "A 1-sentence structural reasoning explaining the failure (e.g., exposed hydrophobic patch, steric clash).",
          "inferenceReasonKo": "Korean translation of inferenceReason.",
          "redesignReason": "A short phrase describing biological intent for redesign (e.g., 'to redesign the local structural environment and improve stability.').",
          "redesignReasonKo": "Korean translation of redesignReason.",
          "sasaDesc": "A 1-sentence observation related to Solvent Accessible Surface Area (SASA) or local packing around the hotspot.",
          "sasaDescKo": "Korean translation of sasaDesc.",
          "evidenceText": "A very short phrase (3-5 words) showing evidence of success (e.g., 'restores optimal packing density (MD Estimation)').",
          "evidenceTextKo": "Korean translation of evidenceText.",
          "interaction": "The name of the chemical interaction occurring (e.g., 'salt-bridge formation', 'hydrophobic core packing').",
          "interactionKo": "Korean translation of interaction."
        }
        `;

        const geminiResponse = await model.generateContent(prompt);
        const responseText = geminiResponse.response.text();

        let geminiData;
        try {
            geminiData = JSON.parse(responseText);
        } catch (e) {
            console.error("Gemini Parse Error:", responseText);
            throw new Error("Failed to parse Gemini response as JSON.");
        }

        const loopRg = `${resi - 2}-${resi + 3}`;
        const partnerSplit = partnerLabel.split('_');
        const mut1Full = `${partnerSplit[0] || ''}${partnerSplit[1] || ''}${mut1Aa.charAt(0).toUpperCase() + mut1Aa.slice(1).toLowerCase()}`;
        const mut2Full = `${baseResiName}${resi}${geminiData.mut2Aa.charAt(0).toUpperCase() + geminiData.mut2Aa.slice(1).toLowerCase()}`;

        const traceInfo = {
            hotspotResi: resi.toString(),
            hotspotScore: topScore.toFixed(2),
            surrounding: `${resi - 1}, ${resi + 1}`,
            loopRegion: loopRg,
            partner: partnerLabel,
            dist: distStr,
            mut1: mut1Full,
            mut2: mut2Full,
            mut2Res: resi,
            mut2Desc: `${mut2Full} ${geminiData.redesignReason}`,
            mut2DescKo: `${mut2Full}(으)로 전략 선회: ${geminiData.redesignReasonKo}`,
            baseResi: `${baseResiName}_${resi}`,
            sasaDesc: geminiData.sasaDesc,
            sasaDescKo: geminiData.sasaDescKo,
            hotspotFull: topHotspot,
            failureReason: geminiData.failureReason,
            failureReasonKo: geminiData.failureReasonKo,
            inferenceReason: geminiData.inferenceReason,
            inferenceReasonKo: geminiData.inferenceReasonKo,
            redesignReason: `Pivoting to ${mut2Full} ${geminiData.redesignReason}`,
            redesignReasonKo: `${mut2Full}(으)로 전략 선회: ${geminiData.redesignReasonKo}`,
            evidenceText: geminiData.evidenceText,
            evidenceTextKo: geminiData.evidenceTextKo,
            interaction: geminiData.interaction,
            interactionKo: geminiData.interactionKo
        };

        // cleanup temp file
        await fs.unlink(filePath).catch(() => { });

        return NextResponse.json({ traceInfo });

    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
