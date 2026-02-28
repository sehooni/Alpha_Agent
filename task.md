# 🧬 Alpha-Agent 6-Hour Task Roadmap

## Setup (0~1h)
- [x] Git 초기화, Antigravity 환경 변수(API Key, Git Token) 설정 및 라이브러리 설치.
- [x] 타겟 PDB(6EQE) 데이터 다운로드.

## Core (1~3h)
- [x] **[Original Work]** Gemini 3 전용 Function Calling 스키마 정의 및 파이썬 계산 툴 3종 구축.
- [x] `tools/analyzer.py` 작성 (B-factor 및 거리 계산).
- [x] `tools/mutator.py` 작성 (염다리 후보 탐색).

## Loop (3~4h)
- [x] **[Original Work]** Antigravity 내 자율 루프 테스트 및 멀티모달(이미지) 추론 프롬프트 고도화.
- [x] 6EQE 핫스팟 식별 및 변이 제안 (HIS293Arg 도출).
- [x] 3.78A 염다리 형성 검증 및 `evidence_card.json` 생성.

## Evidence (4~5h)
- [x] **[Original Work]** Self-Correction 시나리오 구현 및 Artifact(연구 로그) 생성 자동화.
- [x] 실험 실패(응집) 데이터 시뮬레이션 및 실패 원인 판단.
- [x] `correction_report_ko.md` 산출 및 SER290ASP 재설계 루프 가동.

## Final (5~6h)
- [x] 개발 과정이 담긴 Git Commit 로그 정리 및 독창적 기여분(Originality)을 강조한 발표 자료 준비.
- [x] `originality_statement_ko.md` 최종 업데이트 (DQ 방지 선언 포함).