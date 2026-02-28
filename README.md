# 🧬 Alpha-Agent: Autonomous Multimodal Protein Design Loop

[🇬🇧 English](#english) | [🇰🇷 한국어](#korean)

---

## <a name="english"></a> 🇬🇧 English

### 1. Project Overview
**Alpha-Agent** is an autonomous AI agent prototype designed to bridge the gap between *In-silico* simulations and *In-vivo* experimental results in protein engineering (specifically focusing on PETase optimization). It utilizes the Google Gemini 3.1 Pro multimodal reasoning engine combined with an Antigravity sandbox environment for physics-grounded validation.

Traditional computational tools often fail because they lack biological context, leading to protein aggregation when expressed in a real lab. Alpha-Agent solves this by autonomously analyzing 3D structures, proposing mutations, and most importantly, correcting its own designs by ingesting experimental failure data (like SDS-PAGE images).

### 2. Core Features
*   **Grounded Physics Engine (`tools/analyzer.py`):** Calculates B-factors and Euclidean distances using `Bio.PDB` to identify structural instability hotspots rather than relying on LLM hallucinations.
*   **Multimodal Discovery Loop:** Generates and analyzes 3D snapshots, detecting spatial clashes and proposing novel salt-bridge/hydrogen-bond mutations (e.g., `HIS293Arg` for `6EQE`).
*   **Self-Correction (In-vivo Bridge):** Can ingest visual lab data indicating a failed experiment (e.g., aggregation at high temperatures) to autonomously pivot its hypothesis and propose a redesigned target (e.g., `SER290ASP`).
*   **Interactive 3D Dashboard:** A Next.js-based UI featuring live PDB uploading, interactive 3Dmol.js rendering, and a real-time agent reasoning trace.

### 3. Tech Stack
*   **Agent framework:** Antigravity (Google DeepMind Sandbox)
*   **Multimodal Model:** Gemini 3.1 Pro
*   **Bioinformatics Tools:** Biopython, Numpy
*   **Dashboard Frontend:** Next.js (React), TailwindCSS, 3Dmol.js

### 4. How to Run (Dashboard)
```bash
# 1. Navigate to the web directory
cd web

# 2. Install dependencies (if not already installed)
npm install

# 3. Build and Start the production server
npm run build
npm run start
```
Then open `http://localhost:3000` in your browser.

---

## <a name="korean"></a> 🇰🇷 한국어

### 1. 프로젝트 개요
**Alpha-Agent**는 단백질 공학에서 발생하는 *In-silico(컴퓨터 시뮬레이션)* 예측과 *In-vivo(실제 생체 실험)* 결과 사이의 괴리 현상을 좁히기 위해 설계된 **자율형 멀티모달 설계 에이전트**입니다. (본 데모는 플라스틱 분해 효소인 PETase 최적화를 타겟으로 합니다.) Google의 차세대 에이전틱 플랫폼인 Antigravity와 Gemini 3.1 Pro 모델을 결합하여 구축되었습니다.

기존 시뮬레이션상으로는 완벽해 보이는 설계가 실제 실험실 환경에서는 응집(Aggregation)되며 실패하는 경우가 흔합니다. Alpha-Agent는 물리 엔진을 통해 3D 구조를 직접 분석하고 변이를 제안할 뿐만 아니라, **실험 실패 데이터를 이미지(SDS-PAGE 등)로 피드백 받아 스스로 가설을 수정하고 재설계하는 자율 교정(Self-Correction) 능력**을 갖춘 것이 특징입니다.

### 2. 핵심 기능
*   **물리 엔진 그라운딩 (`tools/analyzer.py`):** AI의 단순 환각(Hallucination)에 의존하지 않고, 물리적 계산 라이브러리인 `Bio.PDB`를 구동하여 B-factor가 높고 불안정한 핫스팟 구간을 수치적으로 정확히 타겟팅합니다.
*   **멀티모달 발견 루프:** 3D 구조 스냅샷을 시각적으로 검사하여 아미노산 측쇄(Side-chain)의 충돌 여부를 판단하고, 고온 안정성을 위한 새로운 결합(예: `HIS293Arg`)을 스스로 제안합니다.
*   **자율 교정 (In-vivo Bridge):** 가상의 '실패한 실험 데이터'를 입력하면, 에이전트 다이어그램이 실패 원인(부피가 큰 아르기닌이 소수성 구간을 노출시킴)을 자율 추론하고, 즉각적으로 새로운 최적화 대안(`SER290ASP`)을 재설계합니다.
*   **인터랙티브 3D 대시보드:** 연구자가 PDB 파일을 실시간으로 업로드 및 검색(`1CRN`, `6EQE` 등)하고, 살아있는 3D 모델을 조작하며 Agent의 추론 과정을 시각적으로 확인할 수 있는 Next.js 웹 UI를 제공합니다.

### 3. 기술 스택
*   **에이전트 환경:** Antigravity (Google DeepMind Sandbox)
*   **멀티모달 모델:** Gemini 3.1 Pro
*   **단백질 물리/구조 연산:** Biopython, Numpy
*   **대시보드 프론트엔드:** Next.js (React), TailwindCSS, 3Dmol.js

### 4. 실행 방법 (대시보드)
```bash
# 1. web 디렉토리로 이동
cd web

# 2. 패키지 설치 (최초 1회)
npm install

# 3. 빌드 및 프로덕션 서버 실행
npm run build
npm run start
```
이후 웹 브라우저에서 `http://localhost:3000`에 접속하여 대시보드를 확인합니다.
