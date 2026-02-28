# 🧬 Alpha-Agent: Autonomous Multimodal Protein Design Loop

[🇬🇧 English](#english) | [🇰🇷 한국어](#korean)

---

## <a name="english"></a> 🇬🇧 English

### 1. Project Overview & The Problem We Solve
**Alpha-Agent** is a **Physics-Grounded Autonomous Agent** designed to eliminate LLM hallucinations in protein engineering. 

**The Problem: LLM Hallucinations in Biology**
While Large Language Models (LLMs) can generate text about protein design, they lack intrinsic knowledge of physical laws. When asked to stabilize a protein, an LLM might propose a bulky mutation that sounds logical but physically causes massive steric clashes, instantly unfolding the protein in a real lab setting.

**Our Solution: Grounded Verification**
Alpha-Agent transforms the LLM from a text-generator into a tool-using director. Before proposing a mutation, it executes backend Python scripts (like Bio.PDB) to calculate actual 3D distances (e.g., verifying a salt bridge is exactly 3.78Å apart). If a proposed design fails physics-based simulation checks, the Agent autonomously rejects it and triggers a **Self-Correction Loop** to redesign a physically viable alternative.

### 2. Core Features
*   **Grounded Physics Engine (`tools/analyzer.py`):** Calculates B-factors and Euclidean distances using `Bio.PDB` to identify structural instability hotspots rather than relying on LLM hallucinations.
*   **Multimodal Discovery Loop:** Generates and analyzes 3D snapshots, detecting spatial clashes and proposing novel salt-bridge/hydrogen-bond mutations (e.g., `HIS293Arg` for `6EQE`).
*   **Self-Correction (In-vivo Bridge):** Can ingest visual lab data indicating a failed experiment (e.g., aggregation at high temperatures) to autonomously pivot its hypothesis and propose a redesigned target (e.g., `SER290ASP`).
*   **Interactive 3D Dashboard:** A Next.js-based UI featuring live PDB uploading, interactive 3Dmol.js rendering, and a real-time agent reasoning trace.

### 3. 🆚 AlphaFold vs Alpha-Agent: 3 Unfair Advantages
*AlphaFold draws the 'topographical map' of proteins, but Alpha-Agent is the 'explorer' navigating the shortest path to the destination and finding detours when hitting obstacles (experimental failures).*

1.  **Multimodality (Beyond Text):** AlphaFold only reads 1D sequences. Alpha-Agent utilizes Gemini 3's visual intelligence to 'see' Wobble simulation dynamics and assess complex flexibility constraints.
2.  **Self-Correction (Learning from Failure):** If an AlphaFold-designed protein aggregates in the lab, the tool cannot help. Alpha-Agent ingests SDS-PAGE imagery, autonomously identifies why the mutation failed, and redesigns the parameters for Ver 2.0 on the spot.
3.  **Grounded Agency (Tool Use):** AlphaFold's outputs are probabilistic. Alpha-Agent writes and runs Python scripts to compute exact physical distances (e.g., exactly 3.78Å) and sterics (`tools/analyzer.py`), grounding its proposals in verifiable physics rather than hallucination.
4.  **Hybrid Workflow (Theoretical Prediction):** Even without experimental assays, Alpha-Agent integrates with structural databases (RCSB, AlphaFold DB) to natively compute theoretical instability vectors and proposes preventive mutations upfront.

### 4. Tech Stack
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

### 3. 🆚 AlphaFold vs Alpha-Agent: 결정적 차이 3가지
*"AlphaFold가 단백질의 **'지형도'**를 그려준다면, Alpha-Agent는 그 지형도를 보고 **'목적지(안정적인 효소)까지 가는 최단 경로를 스스로 개척하고, 장애물(실험 실패)을 만나면 우회로를 찾는 탐험가'**입니다."*

1.  **"보고 듣고 느끼는" 멀티모달리티 (Beyond Text):** AlphaFold는 텍스트 서열 데이터만 처리합니다. 반면, Alpha-Agent는 Gemini 3의 시각 지능을 활용해 단백질 동역학(Wobble 시뮬레이션 영상 등)을 직관적으로 보고 유연성을 판단하는 고차원적 분석을 수행합니다.
2.  **"실패를 학습하는" 자기 교정 (Self-Correction):** AlphaFold 설계가 실험실에서 응집(Aggregation)되어 실패할 경우 대안이 없습니다. Alpha-Agent는 실험 실패 데이터(SDS-PAGE 이미지 등)를 피드백으로 받아 "염다리가 오히려 용해도를 낮췄다"고 스스로 판단한 뒤 즉각 버전을 재설계합니다.
3.  **"도구를 사용하는" 물리적 근거 (Grounded Agency):** AlphaFold의 결과물은 확률적입니다. Alpha-Agent는 파이썬 샌드박스를 호스팅하여 구조의 원자 간 거리가 정확히 몇 $\mathring{A}$인지 코드(`tools/analyzer.py`)를 통해 직접 계산 후, 물리적으로 불가능한 변이(Steric Clash)를 사전에 차단하는 철저히 검증된 추론을 제시합니다.
4.  **"사전 예측하는" 하이브리드 워크플로우 (Theoretical Prediction):** 실험 영상 데이터가 없는 초기 단계라도, Alpha-Agent는 외부 구조 DB(RCSB PDB, AlphaFold DB)를 연동하고 자체적인 B-Factor 수치 외삽(Calculate Directly)을 수행하여 취약 루프를 먼저 찾아내고 예방적 변이를 선제적으로 제안합니다.

### 4. 기술 스택
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
