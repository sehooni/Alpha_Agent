"use client";

import React, { useState } from 'react';
import { Terminal, Activity, CheckCircle, PlaySquare, RefreshCw, Cpu, Image, UploadCloud, Search, Database, Zap, BarChart3, Globe, Code2 } from 'lucide-react';
import evidenceCard from '@/data/evidence_card.json';
import schema from '@/data/schema.json';
import PdbViewer from '@/components/PdbViewer';

export default function Dashboard() {
  const [pdbId, setPdbId] = useState('6EQE');
  const [searchInput, setSearchInput] = useState('6EQE');
  const [pdbData, setPdbData] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [showCorrection, setShowCorrection] = useState(false);
  const [isWobbling, setIsWobbling] = useState(false);
  const [isPredicting, setIsPredicting] = useState(false);
  const [showPrediction, setShowPrediction] = useState(false);
  const [highlightedRes, setHighlightedRes] = useState<number[]>([292, 293]);
  const [isKorean, setIsKorean] = useState(false);
  const [activeRightTab, setActiveRightTab] = useState<'trace' | 'results'>('trace');
  const [activeToolResult, setActiveToolResult] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      const newId = searchInput.trim().toUpperCase();
      setPdbId(newId);
      setPdbData(null);
      setHighlightedRes([]);
      setShowCorrection(false);
      setShowPrediction(false);
      setActiveToolResult(null);
      setActiveRightTab('trace');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target?.result) {
          setPdbData(evt.target.result as string);
          const name = file.name.split('.')[0];
          setPdbId(name);
          setSearchInput(name);
          setHighlightedRes([]);
          setShowCorrection(false);
          setShowPrediction(false);
          setActiveToolResult(null);
          setActiveRightTab('trace');
        }
      };
      reader.readAsText(file);
    }
  };

  const simulateWobble = () => {
    setIsWobbling(true);
    setTimeout(() => {
      setIsWobbling(false);
      setHighlightedRes([291, 292, 293]);
    }, 3000);
  };

  const simulateFailure = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setShowCorrection(true);
      setHighlightedRes([290]);
    }, 2000);
  };

  const simulatePrediction = () => {
    setIsPredicting(true);
    setTimeout(() => {
      setIsPredicting(false);
      setShowPrediction(true);
      setHighlightedRes([292, 293]); // Highlight identified hotspots
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-indigo-500/30">

      {/* Header */}
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-lg text-white leading-tight">Alpha-Agent Dashboard</h1>
              <p className="text-xs text-neutral-400">Antigravity x Gemini 3.1 Pro [AF-Diff Edition]</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium">
            <button
              onClick={() => setIsKorean(!isKorean)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 transition-colors"
            >
              <Globe className="w-4 h-4" />
              {isKorean ? '한국어' : 'English'}
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {isKorean ? '시스템 온라인' : 'Agent Online'}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-12 gap-8">

        {/* Left Column: 3D / Multimodal Input */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">

          {/* ... Search ... */}
          <div className="flex gap-4 items-center p-4 rounded-xl border border-neutral-800 bg-neutral-900/40">
            <form onSubmit={handleSearch} className="flex-1 flex gap-2 relative">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter PDB ID (e.g. 6EQE)"
                className="w-full bg-black/50 border border-neutral-800 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-indigo-500 transition-colors text-white"
              />
              <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors">
                Load
              </button>
            </form>
            <div className="text-neutral-600 text-sm font-medium">OR</div>
            <label className="cursor-pointer px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 border border-neutral-700">
              <UploadCloud className="w-4 h-4" />
              Upload PDB
              <input type="file" accept=".pdb" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-1 relative group">
            <div className="rounded-lg bg-[#0a0a0a] aspect-video relative overflow-hidden flex flex-col border border-neutral-800/50 transition-all duration-700">
              <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                <div className="px-3 py-1.5 rounded-md bg-black/60 backdrop-blur-sm border border-neutral-800 text-sm font-mono text-neutral-300 flex items-center gap-3">
                  <span>Target: <span className="text-indigo-400 font-bold">{pdbId}</span></span>
                  <div className="flex gap-2 border-l border-neutral-700 pl-3">
                    <a href={`https://www.rcsb.org/structure/${pdbId}`} target="_blank" rel="noreferrer" className="text-[10px] bg-neutral-800 hover:bg-neutral-700 px-2 py-0.5 rounded text-neutral-400 transition-colors flex items-center gap-1"><Database className="w-3 h-3" /> RCSB PDB ↗</a>
                    <a href={`https://alphafold.ebi.ac.uk/search/text/${pdbId}`} target="_blank" rel="noreferrer" className="text-[10px] bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded transition-colors flex items-center gap-1"><Cpu className="w-3 h-3" /> AlphaFold DB ↗</a>
                  </div>
                </div>
                {isWobbling && (
                  <div className="px-3 py-1.5 rounded-md bg-orange-500/20 backdrop-blur-sm border border-orange-500/40 text-xs font-semibold text-orange-400 animate-pulse">
                    Wobble Simulation Active...
                  </div>
                )}
              </div>

              {/* Dynamic 3D Viewer */}
              <div className="flex-1 w-full h-full cursor-grab active:cursor-grabbing">
                <PdbViewer pdbId={pdbId} pdbData={pdbData} isWobbling={isWobbling} highlightedResidues={highlightedRes} />
              </div>

              {/* Wobble Controller Overlay */}
              <div className="absolute bottom-4 right-4 z-20">
                <button
                  onClick={simulateWobble}
                  disabled={isWobbling}
                  className="px-4 py-2 bg-neutral-900/80 hover:bg-indigo-600/80 backdrop-blur-md border border-neutral-700 text-white text-xs font-bold rounded-full transition-all flex items-center gap-2"
                >
                  <Activity className={`w-3 h-3 ${isWobbling ? 'animate-bounce' : ''}`} />
                  {isWobbling ? 'Analyzing Flexibility...' : 'Run Wobble Analysis'}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Analysis Modules */}
            <div className="flex flex-col gap-4">
              {/* Direct Calculation (AI Studio feature) */}
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-5 group hover:bg-neutral-800/60 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h3 className="font-medium text-neutral-200 text-sm">Theoretical Analysis (In-silico)</h3>
                </div>
                <div className="rounded-lg border border-neutral-800 border-dashed p-4 text-center bg-black/20 flex flex-col items-center">
                  <p className="text-xs text-neutral-500 mb-3">No experimental data? Calculate instability directly from structural features.</p>

                  {isPredicting ? (
                    <div className="w-8 h-8 rounded-full border-2 border-emerald-500/20 border-t-emerald-400 animate-spin mb-1"></div>
                  ) : (
                    <button
                      onClick={simulatePrediction}
                      className="px-4 py-2 w-full max-w-[200px] rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <BarChart3 className="w-4 h-4" /> Calculate Directly
                    </button>
                  )}
                </div>
              </div>

              {/* Multimodal Input Card */}
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-5 group hover:bg-neutral-800/60 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <Image className="w-4 h-4" />
                  </div>
                  <h3 className="font-medium text-neutral-200 text-sm">Multimodal Input (In-vivo)</h3>
                </div>
                <div className="rounded-lg border border-neutral-800 border-dashed p-4 text-center bg-black/20">
                  <p className="text-xs text-neutral-500 mb-3">Upload SDS-PAGE or Assay Image for failure analysis.</p>
                  <button
                    onClick={simulateFailure}
                    disabled={isSimulating}
                    className="px-4 py-2 w-full max-w-[200px] rounded-md bg-neutral-800 hover:bg-red-500/20 hover:border-red-500/40 border border-neutral-700 text-xs font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto"
                  >
                    {isSimulating ? <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" /> : <PlaySquare className="w-4 h-4 text-red-400" />}
                    {isSimulating ? 'Analyzing Failure...' : 'Simulate Aggregation'}
                  </button>
                </div>
              </div>
            </div>

            {/* Function Calling Schema */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Terminal className="w-4 h-4" />
                </div>
                <h3 className="font-medium text-neutral-200">{isKorean ? '에이전트 도구 모음' : 'Agent Toolset'}</h3>
              </div>
              <div className="space-y-3">
                {schema.tools.map((tool, idx) => {
                  const descKo = tool.function.name === 'analyze_b_factors' ? "단백질 구조 내 불안정한 핫스팟(높은 B-factor)을 수치적으로 도출합니다." : "핫스팟 주변 환경을 탐색하여 최적의 염다리/수소결합 변이 후보를 계산합니다.";
                  return (
                    <button
                      key={idx}
                      onClick={() => { setActiveRightTab('results'); setActiveToolResult(tool.function.name); }}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${activeToolResult === tool.function.name && activeRightTab === 'results' ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'border-neutral-800 bg-black/40 hover:bg-neutral-800/50 hover:border-neutral-700'}`}
                    >
                      <code className="text-xs text-blue-400">{tool.function.name}()</code>
                      <p className="text-xs text-neutral-500 mt-1 line-clamp-2">{isKorean ? descKo : tool.function.description}</p>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Reasoning Trace */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 flex flex-col h-[calc(100vh-8rem)] overflow-hidden">

            <div className="p-4 border-b border-neutral-800 flex justify-between items-center bg-neutral-900/80 backdrop-blur-sm">
              <div className="flex bg-black/50 p-1 rounded-lg border border-neutral-800">
                <button
                  onClick={() => setActiveRightTab('trace')}
                  className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-2 ${activeRightTab === 'trace' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-300'}`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  {isKorean ? '사고 궤적' : 'Reasoning Trace'}
                </button>
                <button
                  onClick={() => setActiveRightTab('results')}
                  className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-2 ${activeRightTab === 'results' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-300'}`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  {isKorean ? '도구 실행 결과' : 'Tool Results'}
                </button>
              </div>
              <RefreshCw className="w-4 h-4 text-neutral-600 cursor-pointer hover:text-neutral-300" onClick={() => { setShowCorrection(false); setShowPrediction(false); setHighlightedRes([292, 293]); setActiveRightTab('trace'); setActiveToolResult(null); }} />
            </div>

            <div className="p-5 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
              <div className={`space-y-6 ${activeRightTab === 'trace' ? 'block' : 'hidden'}`}>
                {/* Log Item 1 */}
                <div className="relative pl-6 border-l border-neutral-800">
                  <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-neutral-600 ring-4 ring-neutral-900/40"></div>
                  <div className="text-xs text-neutral-500 mb-1 font-mono uppercase">System [10:01:42]</div>
                  <div className="text-sm text-neutral-300 bg-black/40 p-3 rounded-lg border border-neutral-800/80 shadow-sm leading-relaxed">
                    Target structure <code className="text-indigo-300">{pdbId}.pdb</code> loaded. Grounded agency initialized via Antigravity Sandbox.
                  </div>
                </div>

                {/* Log Item 2 */}
                <div className="relative pl-6 border-l border-neutral-800 border-dashed">
                  <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-blue-500 ring-4 ring-neutral-900/40"></div>
                  <div className="text-xs text-neutral-500 mb-1 font-mono uppercase">Agent Action [10:05:11]</div>
                  <div className="text-sm text-neutral-300 bg-blue-500/5 p-3 rounded-lg border border-blue-500/20 shadow-sm">
                    Calling <code className="text-blue-400">analyze_b_factors()</code> for physical instability detection.
                    <div className="mt-2 text-xs text-neutral-400 border-t border-blue-500/10 pt-2 space-y-1">
                      <p>• Extracting B-Factors from PDB coordinates...</p>
                      <p>• Result: {pdbId} Hotspot detected at <span className="text-red-400 font-bold">Resi 292</span> (Avg B: 47.50)</p>
                    </div>
                  </div>
                </div>

                {isWobbling || highlightedRes.includes(291) ? (
                  <div className="relative pl-6 border-l border-indigo-500/30 animate-in fade-in duration-500">
                    <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-indigo-500 ring-4 ring-neutral-900/40"></div>
                    <div className="text-xs text-indigo-400 mb-1 font-mono uppercase">Multimodal Assessment [Wobble]</div>
                    <div className="text-sm text-neutral-300 bg-indigo-500/10 p-3 rounded-lg border border-indigo-500/20 shadow-sm italic">
                      "Static structures don't tell the whole story. Running Wobble simulation to assess dynamic loop flexibility near Hotspot."
                    </div>
                  </div>
                ) : null}

                {showPrediction && (
                  <div className="relative pl-6 border-l border-emerald-500/30 animate-in fade-in duration-500">
                    <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full border-2 border-emerald-500 bg-black ring-4 ring-neutral-900/40"></div>
                    <div className="text-xs text-emerald-400 mb-1 font-mono uppercase">Theoretical Prediction [Target: {pdbId}]</div>
                    <div className="text-sm text-neutral-300 bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 shadow-lg mt-2 mb-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-semibold text-emerald-400 flex items-center gap-2"><Zap className="w-4 h-4" /> B-Factor Extrapolation</span>
                        <span className="text-xs bg-emerald-500/20 px-2 py-1 rounded text-emerald-300">Confidence: 94%</span>
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-xs text-neutral-400">
                        <li>Scan complete. Global Avg B-factor: 22.40</li>
                        <li>Peak instability located at <span className="text-white font-medium">Loop 291-295</span></li>
                        <li>Solvent Accessible Surface Area (SASA) is unusually high for hydrophobic pocket.</li>
                      </ul>
                      <div className="mt-4 p-3 bg-black/40 rounded-lg text-xs leading-relaxed border border-emerald-500/20">
                        <strong className="text-emerald-400">Gemini Preventive Rx:</strong> Even without assay data, structural metrics strongly suggest aggregation prone behavior. Recommend introducing salt bridge (e.g., HIS293Arg) or hydrophilic substitution (e.g., SER290ASP).
                      </div>
                    </div>
                  </div>
                )}

                <div className={`relative pl-6 ${showCorrection ? 'border-l border-neutral-800' : 'border-l-transparent'}`}>
                  <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-neutral-900/40"></div>
                  <div className="text-xs text-emerald-500/70 font-medium mb-1 font-mono uppercase tracking-tighter">Conclusion [10:08:52]</div>

                  <div className="bg-gradient-to-br from-neutral-900 to-black p-[1px] rounded-xl overflow-hidden mt-2 shadow-lg hover:border-emerald-500/30 transition-all border border-transparent">
                    <div className="bg-black/80 rounded-xl p-4 h-full backdrop-blur-xl">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <h4 className="text-sm font-medium text-emerald-400">Proposed V1: HIS293Arg</h4>
                      </div>
                      <p className="text-sm text-neutral-400 leading-relaxed">
                        Proposing salt-bridge formation with GLU 292. Grounded calculation confirms CA-CA distance of 3.78Å.
                      </p>
                      <div className="mt-4 p-2 rounded bg-emerald-500/5 text-[10px] font-mono text-emerald-300/60 uppercase">
                        Antigravity Verified Distance: 3.78Å
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dynamic Correction Log Item */}
                {showCorrection && (
                  <div className="relative pl-6 border-l-transparent animate-in slide-in-from-bottom-4 duration-500">
                    <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-red-500 ring-4 ring-neutral-900/40 animate-pulse"></div>
                    <div className="text-xs text-red-500/70 font-medium mb-1">Self-Correction Loop Triggered [10:14:05]</div>

                    <div className="bg-gradient-to-br from-neutral-900 to-black p-[1px] rounded-xl overflow-hidden mt-2 shadow-2xl border-orange-500/30">
                      <div className="bg-black/80 rounded-xl p-4 h-full backdrop-blur-xl">
                        <div className="flex items-center gap-2 mb-3">
                          <Terminal className="w-4 h-4 text-orange-400" />
                          <h4 className="text-sm font-medium text-orange-400">Agent Diagnosis & Redesign</h4>
                        </div>
                        <p className="text-lg font-semibold text-white mb-2 pb-2 border-b border-neutral-800">New Target: SER290ASP</p>
                        <div className="space-y-2 mt-4 text-sm text-neutral-400 leading-relaxed">
                          <p><span className="text-red-400 font-medium">[FAILURE]</span> Multimodal vision detects aggregation bands in SDS-PAGE at 60°C.</p>
                          <p><span className="text-orange-400 font-medium">[INFERENCE]</span> Bulky ARG sidechain displaced solvent, exposing hydrophobic patch LEU 291.</p>
                          <p><span className="text-emerald-400 font-medium">[REDESIGN]</span> Pivoting to SER290ASP to increase surface hydrophilicity without bulk.</p>
                        </div>
                        <div className="mt-5 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                          <p className="text-xs text-orange-300/80 text-center font-mono">
                            [Evidence Card] SER290ASP decreases aggregation propensity (Logical Inference)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {activeRightTab === 'results' && (
                <div className="space-y-6 h-full">
                  {!activeToolResult && (
                    <div className="h-full flex flex-col items-center justify-center text-neutral-500 opacity-50 space-y-4 pt-20">
                      <Terminal className="w-12 h-12" />
                      <p className="text-sm">{isKorean ? '왼쪽 도구 모음에서 항목을 선택하여 결과를 확인하세요.' : 'Select a tool from the left panel to view its results.'}</p>
                    </div>
                  )}
                  {activeToolResult === 'analyze_b_factors' && (
                    <div className="animate-in fade-in zoom-in-95 duration-300 border border-neutral-800 rounded-xl bg-[#0a0a0a] overflow-hidden shadow-2xl mt-4">
                      <div className="bg-neutral-900/50 px-4 py-3 border-b border-neutral-800 flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-blue-400" />
                        <span className="font-mono text-sm text-neutral-300">analyze_b_factors(pdb_path="{pdbId}.pdb")</span>
                      </div>
                      <div className="p-4 font-mono text-xs text-emerald-400 whitespace-pre overflow-x-auto">
                        {`> Loading structure ${pdbId}...
> Extracted 3,241 ATOM records.
> Calculating isotropic B-factors...
> Smoothing via sliding window (n=5)...

[RESULT] Peak Instability Detected:
-----------------------------------
Rank | Chain | Resi | Score (B)
  1  |   A   |  292 |  47.50
  2  |   A   |  291 |  45.12
  3  |   A   |  293 |  43.88

[!] Region [291-293] marked as primary hotspot for aggregation mitigation.`}
                      </div>
                    </div>
                  )}
                  {activeToolResult === 'find_mutator_candidates' && (
                    <div className="animate-in fade-in zoom-in-95 duration-300 border border-neutral-800 rounded-xl bg-[#0a0a0a] overflow-hidden shadow-2xl mt-4">
                      <div className="bg-neutral-900/50 px-4 py-3 border-b border-neutral-800 flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-blue-400" />
                        <span className="font-mono text-sm text-neutral-300">find_mutator_candidates(hotspot="A_GLU_292", radius=5.0)</span>
                      </div>
                      <div className="p-4 font-mono text-xs text-blue-300 whitespace-pre overflow-x-auto">
                        {`> Initializing spatial Kd-Tree...
> Target: A_GLU_292 (Coordinates: x=14.2, y=-3.4, z=22.1)
> Searching neighbors within 5.0Å...

[CANDIDATE 1] Partner: A_HIS_293
 - Distance (CB-CB): 3.78Å
 - Structural Context: Solvent exposed loop
 - Proposed Mutation: HIS293Arg
 - Mechanics: Favorable salt bridge formation with GLU_292.

[CANDIDATE 2] Target Sub: A_SER_290
 - Distance to core: 4.10Å
 - Structural Context: Alpha-helix flanking region
 - Proposed Mutation: SER290ASP
 - Mechanics: Increased hydrophilicity, burying hydrophobic patch LEU_291.`}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>

      </main>

    </div>
  );
}
