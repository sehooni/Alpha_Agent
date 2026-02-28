"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Activity, AlertTriangle, Cpu, ArrowRight, Zap, ShieldCheck, Beaker, Terminal, Globe } from 'lucide-react';

export default function LandingPage() {
  const [isKorean, setIsKorean] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed w-full border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
              <Activity className="w-5 h-5 text-indigo-400" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">Alpha-Agent</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-neutral-800/50 p-1 rounded-lg">
              <button
                onClick={() => setIsKorean(false)}
                className={`px-2 py-1 text-[10px] font-bold rounded flex items-center gap-1 transition-all ${!isKorean ? 'bg-indigo-500 text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
              >
                <Globe className="w-3 h-3" /> EN
              </button>
              <button
                onClick={() => setIsKorean(true)}
                className={`px-2 py-1 text-[10px] font-bold rounded flex items-center gap-1 transition-all ${isKorean ? 'bg-indigo-500 text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
              >
                <Globe className="w-3 h-3" /> KO
              </button>
            </div>
            <Link
              href="/analysis"
              className="px-5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-all shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] flex items-center gap-2 hidden sm:flex"
            >
              {isKorean ? "샌드박스 입장" : "Launch Sandbox"} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 flex flex-col items-center justify-center text-center px-4">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-neutral-950 to-neutral-950"></div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8 cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium text-emerald-400">{isKorean ? "그라운디드 추론 엔진 v1.0 작동 중" : "Grounded Reasoning Engine v1.0 Live"}</span>
          </div>

          <h1 className="max-w-4xl text-5xl md:text-7xl font-extrabold tracking-[-0.02em] text-white leading-tight mb-6">
            {isKorean ? (
              <>단백질 설계의 미래, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">물리적 검증</span>에 답이 있습니다.</>
            ) : (
              <>The Future of Protein Engineering is <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Grounded.</span></>
            )}
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-neutral-400 mb-10 leading-relaxed">
            {isKorean
              ? "LLM의 구조적 할루시네이션(환각)을 극복하세요. Alpha-Agent는 웹 환경에서 구조생물학 물리 엔진과 자율 추론 루프를 결합하여 검증 가능하고 타당한 분자 설계를 실시간 연산합니다."
              : "Overcome LLM hallucinations. Alpha-Agent integrates structural biology physics engines with autonomous reasoning loops to deliver verifiable, physically sound molecular designs."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/analysis"
              className="px-8 py-4 rounded-full bg-white text-neutral-950 hover:bg-neutral-200 text-base font-bold transition-all flex items-center justify-center gap-2 group"
            >
              {isKorean ? "분석 시작" : "Start Analysis"}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#problem"
              className="px-8 py-4 rounded-full bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-300 text-base font-bold transition-all flex items-center justify-center gap-2"
            >
              {isKorean ? "더 알아보기" : "Learn More"}
            </a>
          </div>
        </section>

        {/* Problem Section */}
        <section id="problem" className="py-24 bg-neutral-950 border-t border-neutral-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  {isKorean ? "문제점:" : "The Problem:"} <br />
                  <span className="text-red-400 font-normal">{isKorean ? "생물학 도메인에서의 LLM 할루시네이션" : "LLM Hallucinations in Biology"}</span>
                </h2>
                <p className="text-neutral-400 text-lg leading-relaxed mb-6">
                  {isKorean
                    ? "언어적 능력이 뛰어나더라도 기존의 단순한 대형 언어 모델(LLM)은 구조 물리 법칙에 대한 지식이 부족합니다. 때문에 단백질 설계를 요청받을 때 불가능한 변이를 제안하는 경우가 다분합니다."
                    : "Despite their impressive linguistic capabilities, Large Language Models lack an innate understanding of physical laws. When tasked with protein engineering, they often predict structurally impossible mutations."}
                </p>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <AlertTriangle className="w-6 h-6 text-red-500 shrink-0" />
                    <span className="text-neutral-300">{isKorean ? "그럴싸해 보이지만 실제로는 입체적 충돌(Steric Clash)을 유발하는 변이 제안" : "Generates plausible-sounding but structurally impossible variants."}</span>
                  </li>
                  <li className="flex gap-3">
                    <AlertTriangle className="w-6 h-6 text-orange-500 shrink-0" />
                    <span className="text-neutral-300">{isKorean ? "실제 원자 간 거리를 계산하거나 물리적인 구조 스트레스를 평가 불가" : "Cannot calculate actual distances or evaluate physical stress."}</span>
                  </li>
                  <li className="flex gap-3">
                    <AlertTriangle className="w-6 h-6 text-yellow-500 shrink-0" />
                    <span className="text-neutral-300">{isKorean ? "실시간 연산 기반 검증(Verification) 피드백 루프 부재" : "Lacks a closed-loop validation system relying entirely on static precision."}</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-red-500/20 to-orange-500/5 rounded-3xl blur-3xl -z-10"></div>
                <div className="border border-neutral-800 bg-neutral-900/50 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-neutral-800">
                    <Terminal className="w-5 h-5 text-neutral-500" />
                    <span className="font-mono text-sm text-neutral-400">{isKorean ? '일반 언어 모델 출력 로그' : 'Standard LLM Output'}</span>
                  </div>
                  <div className="space-y-3 font-mono text-sm leading-relaxed">
                    <p className="text-neutral-300">USER: {isKorean ? '6EQE의 유연한 루프를 안정화할 수 있는 돌연변이를 제안해 줘.' : 'Propose a stabilizing mutation for the flexible loop in 6EQE.'}</p>
                    <p className="text-red-400">LLM: {isKorean ? '글라이신 290(Gly290)을 큰 부피의 트립토판(Trp)으로 변이할 것을 제안합니다. 표면 소수성을 낮추어 안정화될 것입니다.' : 'I suggest mutating Glycine 290 to Tryptophan. Tryptophan is bulky and will stabilize the loop.'}</p>
                    <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-300 text-xs leading-relaxed">
                      <strong>{isKorean ? '사실 확인(Reality Check)' : 'Reality Check'}:</strong> {isKorean ? 'Gly290은 이미 빽빽하게 채워진 내부 구조입니다. 트립토판의 거대한 링 구조는 주변 원자와 심각한 상충(Steric Clash)을 초래합니다.' : 'Gly290 is buried in a tightly packed region. Tryptophan\'s bulky structure would cause massive steric clashes.'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Solution Section */}
        <section className="py-24 bg-neutral-900/30 border-t border-neutral-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              {isKorean ? "물리법칙 기반 에이전트 파이프라인" : "The Physics-Governed Agent"}
            </h2>
            <p className="max-w-2xl mx-auto text-neutral-400 text-lg">
              {isKorean
                ? "단순한 텍스트 출력을 넘어 파이썬 기반 생물물리학 계산 엔진(Bio.PDB 등)을 직접 연동하여 구동합니다. 에이전트는 어림잡지 않고 직접 거리와 에너지를 도출합니다."
                : "We provide the LLM with true physical tools (Python-based Bio.PDB calculation engines). The Agent doesn't just guess; it calculates and measures."}
            </p>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800 hover:border-indigo-500/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6">
                <Cpu className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{isKorean ? "자율적 도구 결합" : "Tool Utilization"}</h3>
              <p className="text-neutral-400 leading-relaxed">
                {isKorean
                  ? "LLM이 Python 스크립트 모듈을 직접 호출하여 대상 PDB 단백질 좌표 데이터를 분석하도록 권한을 부여합니다."
                  : "Empowers the LLM to write and execute scripts or call pre-built tools to scan raw PDB coordinates dynamically."}
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800 hover:border-emerald-500/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{isKorean ? "수치적 검증 단계" : "Grounded Verification"}</h3>
              <p className="text-neutral-400 leading-relaxed">
                {isKorean
                  ? "염다리 변이 후보를 제안하기 전에 공간 알고리즘을 사용해 대상 원자 간의 거리(예: 3.78Å 이내)를 철저히 확인합니다."
                  : "Before proposing a salt-bridge, the Agent uses spatial Kd-Trees to guarantee atomic distances between interacting sidechains."}
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800 hover:border-orange-500/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-6">
                <Activity className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{isKorean ? "자가 교정 루프 설계" : "Self-Correction Loop"}</h3>
              <p className="text-neutral-400 leading-relaxed">
                {isKorean
                  ? "첫 초기설계가 물리 시뮬레이션의 임계점을 넘지 못하면, 이를 스스로 파악하고 오류 로그를 학습해 새로운 최적화로 궤도를 자동 수정합니다."
                  : "If the initial design fails against calculated metrics, the Agent automatically abandons the path and redesigns with context."}
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-indigo-600"></div>
          <div className="absolute inset-0 -z-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {isKorean ? "진보된 샌드박스 엔진 경험하기" : "Experience the Engine"}
            </h2>
            <p className="text-indigo-100 text-lg mb-10">
              {isKorean
                ? "더 이상 무의미한 텍스트 생성을 기다리지 말고 실제 구조를 설계해 보세요. Alpha-Agent의 연산 과정을 직접 컨트롤할 수 있습니다."
                : "Stop generating text. Start engineering structures. Open the sandbox and watch the Alpha-Agent calculate biomolecular stability in real-time."}
            </p>
            <Link
              href="/analysis"
              className="px-8 py-4 rounded-full bg-white text-indigo-600 hover:bg-neutral-100 shadow-2xl hover:shadow-white/20 text-lg font-bold transition-all flex items-center justify-center gap-2 mx-auto max-w-[250px] group"
            >
              <Beaker className="w-5 h-5" /> {isKorean ? "샌드박스 진입" : "Launch Sandbox"}
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-neutral-950 border-t border-neutral-900 text-center text-neutral-500 text-sm">
        <p>© 2026 Alpha-Agent Team. Built for Grounded Intelligence.</p>
      </footer>
    </div>
  );
}
