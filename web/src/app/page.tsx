import React from 'react';
import { Terminal, Activity, CheckCircle, AlertTriangle, PlaySquare, RefreshCw, Cpu, Image } from 'lucide-react';
import evidenceCard from '@/data/evidence_card.json';
import schema from '@/data/schema.json';

export default function Dashboard() {
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

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-1">
            <div className="rounded-lg bg-black/50 aspect-video relative overflow-hidden flex items-center justify-center group border border-neutral-800/50">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10"></div>

              {/* Fake 3D Viewer Placeholder */}
              <div className="text-center z-20">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-800/80 flex items-center justify-center border border-neutral-700/50">
                  <PlaySquare className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-lg font-medium text-white">6EQE (PETase) 3D Viewer</h3>
                <p className="text-sm text-neutral-400 mt-2">Target Hotspot: A_GLU_292 highlighted</p>
              </div>

              {/* Decorative gradient orb for premium feel */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none"></div>
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
                <button className="px-4 py-2 rounded-md bg-neutral-800 hover:bg-neutral-700 text-sm font-medium transition-colors">
                  Simulate Failure
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

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 flex flex-col h-full overflow-hidden">

            <div className="p-4 border-b border-neutral-800 flex justify-between items-center bg-neutral-900/80">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-400" />
                <h2 className="font-medium text-sm text-white">Reasoning Trace (Antigravity)</h2>
              </div>
              <RefreshCw className="w-4 h-4 text-neutral-600 cursor-pointer hover:text-neutral-300" />
            </div>

            <div className="p-5 flex-1 overflow-y-auto space-y-6">

              {/* Log Item 1 */}
              <div className="relative pl-6 border-l border-neutral-800">
                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-neutral-600 ring-4 ring-neutral-900/40"></div>
                <div className="text-xs text-neutral-500 mb-1">System [10:01:42]</div>
                <div className="text-sm text-neutral-300 bg-black/40 p-3 rounded-lg border border-neutral-800/80 shadow-sm">
                  Target structure <code className="text-indigo-300">6EQE.pdb</code> loaded into context.
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
              <div className="relative pl-6 border-l-transparent">
                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-neutral-900/40 animate-pulse"></div>
                <div className="text-xs text-emerald-500/70 font-medium mb-1">Agent Conclusion [10:08:52]</div>

                {/* Visual Evidence Card Mockup */}
                <div className="bg-gradient-to-br from-neutral-900 to-black p-[1px] rounded-xl overflow-hidden mt-2 shadow-2xl">
                  <div className="bg-black/80 rounded-xl p-4 h-full backdrop-blur-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <h4 className="text-sm font-medium text-emerald-400">Mutation Proposed</h4>
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

            </div>
          </div>

        </div>

      </main>

    </div>
  );
}
