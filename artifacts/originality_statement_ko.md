# 창의성 및 독창성 선언서 (Alpha-Agent Sandbox)

## 1. 프로젝트 목적 및 해결 문제
**Alpha-Agent**는 Google의 차세대 에이전틱 플랫폼 **Antigravity**와 **Gemini 3**를 결합하여, 산업용 효소 설계의 *In-silico* 예측과 *In-vivo* 실험 데이터 사이의 불일치를 실시간으로 교정하는 자율형 연구 워크플로우를 구축합니다. 기존 시뮬레이션 도구의 '생물학적 맥락 부재'와 '실험 데이터 피드백 루프의 단절'을 Gemini 3의 멀티모달 추론으로 해결합니다.

## 2. 기술 스택 및 독창적 기여 (Originality Strategy)

심사위원단에게 **"무엇이 오픈소스이고, 무엇이 본 해커톤 당일 개발한 것인가"**를 명확히 밝히기 위한 구분입니다.

| 구분 | 항목 | 해커톤 중 직접 개발한 독창적 기능 (Original Work) |
| --- | --- | --- |
| **Platform** | **Antigravity** | 에이전트의 **SOP(표준운영절차)** 설계 및 자율적 도구 호출 루프 구현 |
| **Model** | **Gemini 3 (Vertex AI)** | 멀티모달(이미지/수치) 통합 추론 프롬프트 및 **Self-Correction** 로직 |
| **Tooling** | **Python (Sandbox)** | PDB 기하 분석 엔진(`tools/analyzer.py`, `tools/mutator.py`) 및 실험 데이터 합성 로직 |
| **Evidence** | **Artifacts** | 에이전트의 사고 과정이 담긴 **Reasoning Trace** 및 분석 리포트 자동 생성 |

> **⚠️ DQ(실격) 방지 선언:** 
> 본 프로젝트는 `BioPython`, `Numpy` 등 기존 오픈소스 라이브러리를 단순한 '도구'로 활용할 뿐이며, **에이전트의 판단 로직, Antigravity 워크플로우 구성, 멀티모달 피드백 루프 및 파이썬 기반의 기하학 분석 계산식**은 본 해커톤 기간(6시간) 내에 100% 신규로 직접 작성된 코드임을 명시합니다.

## 3. 핵심 입증 소구 포인트 (Pitching Strategy)
- **"Show the Trace":** Antigravity의 실행 로그(Trace)를 직접 기재하여, 에이전트가 어떻게 스스로 판단하고 도구를 사용하는지 증명합니다.
- **"Evidence-Based Reasoning":** Gemini 3가 단순히 말을 잘하는 것이 아니라, 파이썬 엔진에서 나온 **물리적 수치(Å)**를 근거로 대화하고 있음을 강조합니다. (환각 수치 원천 차단)
- **"The Gap Closer":** 모사된 실험 이미지(응집 밴드)를 분석해 단백질 설계를 수정(`SER290ASP`)하는 기능을 통해, 이 워크플로우가 생명공학 현장을 어떻게 가속화하는지 증명합니다.

*서명: Alpha-Agent (자율형 구조 생물학 연구 에이전트)*
