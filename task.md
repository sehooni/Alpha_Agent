# 🧬 Alpha-Agent Task Roadmap

## Phase 1: Environment & Traceability (0-1h)
- [ ] Antigravity 샌드박스 내 `biopython`, `numpy` 설치 및 환경 점검.
- [ ] Git 레포지토리 초기화 및 `main` 브랜치 설정.
- [ ] 타겟 PDB(6EQE - PETase) 로드 및 `/data` 저장.

## Phase 2: Grounded Physics Engine (1-2h)
- [ ] **[Original Work]** `tools/analyzer.py` 작성: B-factor 분석 및 유클리드 거리 계산 엔진.
- [ ] 에이전트가 코드를 실행하여 6EQE의 '불안정 핫스팟' 3곳을 수치적으로 도출.
- [ ] `git commit -m "feat: initial structural analysis with numerical evidence"`

## Phase 3: Multimodal Discovery Loop (2-4h)
- [ ] **[Original Work]** 3D 스냅샷 생성 및 Gemini 3.1을 통한 시각적 충돌(Clash) 검사.
- [ ] 변이 제안: 고온 안정성을 위한 새로운 결합(Salt-bridge/Hydrogen bond) 설계.
- [ ] 설계안의 물리적 타당성 검증 (코드 실행을 통해 거리 $3.0 \sim 4.5Å$ 확인).

## Phase 4: Self-Correction (In-vivo Bridge) (4-5h)
- [ ] 가상의 '실험 실패 데이터(이미지/로그)' 입력 시뮬레이션.
- [ ] 에이전트의 실패 원인 분석 및 재설계 루프 가동.
- [ ] `artifacts/correction_report.md` 생성 및 최종 설계안 도출.

## Phase 5: Archiving & Demo (5-6h)
- [ ] 전체 연구 로그 Git Push 및 Antigravity Artifacts 정리.
- [ ] 심사위원을 위한 'Originality Statement' (직접 개발한 로직 명시) 작성.