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

## 3. 핵심 입증 소구 포인트: AlphaFold와의 3가지 결정적 차이
심사위원의 "정확도가 높은 AlphaFold를 쓰면 되는 것 아닌가?"라는 질문에 대비한 핵심 소구점입니다.
*"AlphaFold가 단백질의 **'지형도'**를 그려준다면, Alpha-Agent는 그 지형도를 보고 **'목적지까지 가는 최단 경로를 스스로 개척하고 장애물을 우회하는 탐험가'**입니다."*

- **"보고 듣고 느끼는" 멀티모달리티 (Beyond Text):** AlphaFold는 텍스트(서열)만 이해합니다. Alpha-Agent는 Gemini 3의 시각 지능으로 단백질 동역학 현상(Wobble 영상 등)을 직관적으로 보고 분석합니다.
- **"실패를 학습하는" 자기 교정 (Self-Correction):** AlphaFold는 단방향 예측 도구입니다. 실험이 실패하면 대안이 없습니다. Alpha-Agent는 실험 실패(응집된 밴드 등) 데이터를 피드백 받아 실패 원인을 분석하고 즉각적으로 재설계를 수행합니다.
- **"도구를 사용하는" 물리적 근거 (Grounded Agency):** AlphaFold의 결과는 확률적입니다. Alpha-Agent는 Sandbox 내에서 파이썬 코드를 즉흥적으로 짜서 원자 간 거리가 정확히 $3.2\mathring{A}$인지 직접 물리적으로 연산하고 검증하여 환각없는 설계를 제안합니다.

*서명: Alpha-Agent (자율형 구조 생물학 연구 에이전트)*
