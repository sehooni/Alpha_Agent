"use client";

import React, { useState } from 'react';
import { Terminal, Activity, CheckCircle, PlaySquare, RefreshCw, Cpu, Image, UploadCloud, Search } from 'lucide-react';
import evidenceCard from '@/data/evidence_card.json';
import schema from '@/data/schema.json';
import PdbViewer from '@/components/PdbViewer';

export default function Dashboard() {
  const [pdbId, setPdbId] = useState('6EQE');
  const [searchInput, setSearchInput] = useState('6EQE');
  const [pdbData, setPdbData] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [showCorrection, setShowCorrection] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setPdbId(searchInput.trim().toUpperCase());
      setPdbData(null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target?.result) {
          setPdbData(evt.target.result as string);
          setPdbId(file.name.split('.')[0]);
          setSearchInput(file.name.split('.')[0]);
        }
      };
      reader.readAsText(file);
    }
  };

  const simulateFailure = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setShowCorrection(true);
    }, 2000);
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
              <p className="text-xs text-neutral-400">Antigravity x Gemini 3.1 Pro</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Agent Online
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

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-1">
            <div className="rounded-lg bg-[#0a0a0a] aspect-video relative overflow-hidden flex flex-col group border border-neutral-800/50">
              <div className="absolute top-4 left-4 z-20">
                <div className="px-3 py-1.5 rounded-md bg-black/60 backdrop-blur-sm border border-neutral-800 text-sm font-mono text-neutral-300">
                  Target: <span className="text-indigo-400 font-bold">{pdbId}</span>
                </div>
              </div>

              {/* Dynamic 3D Viewer */}
              <div className="flex-1 w-full h-full cursor-grab active:cursor-grabbing">
                <PdbViewer pdbId={pdbId} pdbData={pdbData} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Multimodal Input Card */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-5 p-px group hover:bg-neutral-800/60 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <Image className="w-4 h-4" />
                </div>
                <h3 className="font-medium text-neutral-200">Multimodal Input (In-vivo)</h3>
              </div>
              <div className="rounded-lg border border-neutral-800 border-dashed p-6 text-center bg-black/20">
                <p className="text-sm text-neutral-500 mb-3">Upload SDS-PAGE or Assay Image</p>
                <button
                  onClick={simulateFailure}
                  disabled={isSimulating}
                  className="px-4 py-2 rounded-md bg-neutral-800 hover:bg-neutral-700 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto"
                >
                  {isSimulating ? <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" /> : <UploadCloud className="w-4 h-4 text-neutral-400" />}
                  {isSimulating ? 'Analyzing...' : 'Simulate Failure'}
                </button>
              </div>
            </div>

            {/* Function Calling Schema */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Terminal className="w-4 h-4" />
                </div>
                <h3 className="font-medium text-neutral-200">Agent Toolset</h3>
              </div>
              <div className="space-y-3">
                {schema.tools.map((tool, idx) => (
                  <div key={idx} className="p-3 rounded-lg border border-neutral-800 bg-black/40">
                    <code className="text-xs text-blue-400">{tool.function.name}()</code>
                    <p className="text-xs text-neutral-500 mt-1 line-clamp-2">{tool.function.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Reasoning Trace */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 flex flex-col h-[calc(100vh-8rem)] overflow-hidden">

            <div className="p-4 border-b border-neutral-800 flex justify-between items-center bg-neutral-900/80">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-400" />
                <h2 className="font-medium text-sm text-white">Reasoning Trace (Antigravity)</h2>
              </div>
              <RefreshCw className="w-4 h-4 text-neutral-600 cursor-pointer hover:text-neutral-300" onClick={() => setShowCorrection(false)} />
            </div>

            <div className="p-5 flex-1 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">

              {/* Log Item 1 */}
              <div className="relative pl-6 border-l border-neutral-800">
                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-neutral-600 ring-4 ring-neutral-900/40"></div>
                <div className="text-xs text-neutral-500 mb-1">System [10:01:42]</div>
                <div className="text-sm text-neutral-300 bg-black/40 p-3 rounded-lg border border-neutral-800/80 shadow-sm">
                  Target structure <code className="text-indigo-300">{pdbId}.pdb</code> loaded into context.
                </div>
              </div>

              {/* Log Item 2 */}
              <div className="relative pl-6 border-l border-neutral-800 border-dashed">
                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-blue-500 ring-4 ring-neutral-900/40"></div>
                <div className="text-xs text-neutral-500 mb-1">Agent Action [10:05:11]</div>
                <div className="text-sm text-neutral-300 bg-blue-500/5 p-3 rounded-lg border border-blue-500/20 shadow-sm">
                  Calling <code className="text-blue-400">analyze_b_factors()</code> to find instability.
                  <div className="mt-2 text-xs text-neutral-400 border-t border-blue-500/10 pt-2">
                    Result: Highest B-factor A_GLU_292 (47.50)
                  </div>
                </div>
              </div>

              {/* Log Item 3 */}
              <div className={`relative pl-6 ${showCorrection ? 'border-l border-neutral-800' : 'border-l-transparent'}`}>
                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-neutral-900/40"></div>
                <div className="text-xs text-emerald-500/70 font-medium mb-1">Agent Conclusion [10:08:52]</div>

                {/* Visual Evidence Card Mockup */}
                <div className="bg-gradient-to-br from-neutral-900 to-black p-[1px] rounded-xl overflow-hidden mt-2 shadow-lg">
                  <div className="bg-black/80 rounded-xl p-4 h-full backdrop-blur-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <h4 className="text-sm font-medium text-emerald-400">Initial Mutation Proposed</h4>
                    </div>
                    <p className="text-lg font-semibold text-white mb-2">{evidenceCard.proposed_mutation}</p>
                    <div className="space-y-2 mt-4">
                      {evidenceCard.reasoning.map((reason, idx) => (
                        <div key={idx} className="flex gap-2 text-sm text-neutral-400 leading-relaxed">
                          <span className="text-neutral-600 mt-1">•</span>
                          <span>{reason}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <p className="text-xs text-emerald-300/80 text-center font-mono">
                        {evidenceCard.evidence_card}
                      </p>
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
          </div>

        </div>

      </main>

    </div>
  );
}
