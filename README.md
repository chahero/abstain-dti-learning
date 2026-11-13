# Abstain-DTI Learning

[학습 사이트 열기](https://chahero.github.io/abstain-dti-learning/)

신약 발굴 AI를 공부하기 위한 한국어 개인 학습 자료입니다. 메인 화면에서 **포켓 그림 교재**, **Docking Agent 구현·실험 기록**, **논문 음성 웹 발표**, **RELIABLE-BA 논문 핵심 해설**을 선택할 수 있습니다.

## 단백질 포켓과 결합 구조 예측

[교재 전체 목차](https://chahero.github.io/abstain-dti-learning/pocket-structure/) · [전체 기술 지도](https://chahero.github.io/abstain-dti-learning/pocket-structure/07-technology-summary/) · [기술 발전 흐름도](https://chahero.github.io/abstain-dti-learning/pocket-structure/07-technology-summary/?view=evolution#step-1)

개요에서 16개 기술의 입력·출력·역할·사용 상황과 발전 흐름을 먼저 보고, 다음 6장으로 이어 읽습니다.

1. 포켓의 기초와 움직임 — 잔기·곁사슬, apo/holo와 MBP 실제 구조
2. fpocket·P2Rank — 후보 탐지 원리와 같은 단백질의 실제 결과
3. DeepPocket·GrASP — 복셀 CNN과 원자 그래프
4. PocketMiner·분자동역학 — 숨은 포켓과 움직임
5. Vina·DiffDock·DynamicBind — 도킹과 수용체 유연성
6. AlphaFold 3·Boltz-2·Chai-1·OpenFold3-preview2 — 공동 구조 예측

조작 가능한 그림과 실제 구조·입력 예제, 장별 원고 다운로드와 인쇄를 제공합니다. 기술별 연도와 표시 기준·원 출처는 개요에서 확인할 수 있습니다. 관찰 메모는 사용자의 브라우저에만 저장됩니다.

[포켓 논문 핵심 해설 10편](https://chahero.github.io/abstain-dti-learning/pocket-structure/papers/)에서 포켓 탐지 기술 7편과 별도 평가·분석 3편의 문제의식·원리·결과·한계·용어를 읽을 수 있습니다. 발전 흐름도의 기술 상자에서도 연결됩니다.

## Docking Agent · 구현·실험 기록

[개발·실험 기록 보기](https://chahero.github.io/abstain-dti-learning/docking-agent/) · [실제 결과 비교](https://chahero.github.io/abstain-dti-learning/docking-agent/#results)

이번에 만든 것과 실제 실험을 다른 사람에게 설명하기 위한 결과 공유 문서입니다. 구현 요약 → 구현 구조 → 실험 설계 → 실행 결과 → 실패 분석 → 결론과 현재 범위 순서로 한 페이지에 정리했습니다.

Vina·Vina-GPU의 공통 `dock(request)`·CLI와 DiffDock-L 별도 실행 경로, 저장되는 산출물, 준비된 1IEP의 실제 시간·참조 RMSD와 좌표 그림을 제공합니다. 수치 실패 발견과 후속 검사 보완, 팀 시스템과 연결할 위치도 구분했습니다. 공유용 Markdown과 실측 JSON 다운로드, 인쇄를 지원합니다. 밑줄 용어를 누르면 읽는 법·쉬운 뜻·이번 실험의 의미를 볼 수 있고, 검색 가능한 97개 용어 사전과 CPU·GPU·DiffDock-L의 작동 차이 해설도 제공합니다. 이동·회전·비틀림, Vina의 점수 계산, DiffDock의 사전 학습·실제 사용·후보 평가를 구분한 원리 비교 도식을 추가했습니다.

개인 개발·실행 확인이며 탐색 조건과 후보 수가 달랐습니다. 학습 데이터 겹침과 미검증 범위를 표시했으며, 일반적인 성능 순위나 친화도 개선 검증으로 해석하지 않습니다. 브라우저에서 모델 추론이나 유료 API를 호출하지 않습니다.

## AI Agents That Matter · 웹 발표

[음성과 함께 발표 보기](https://chahero.github.io/abstain-dti-learning/papers/ai-agents-that-matter/) · [장표·대본 PDF](https://chahero.github.io/abstain-dti-learning/papers/ai-agents-that-matter/downloads/slides-and-script.pdf)

장표 11장과 미리 제작한 Dustin 1.2배속 한국어 음성을 동기화한 7분 48초 발표입니다. 정확도·비용·실제 사용·일반화·평가 신뢰성을 살펴봅니다. 장표 이동, 구간 탐색, 전체화면, 발화에 맞춘 강조 모션을 지원합니다. 발표 PPTX와 장표·대본 PDF는 발표 페이지에서 내려받을 수 있습니다.

## RELIABLE-BA · 논문 핵심 해설

[새 목차로 읽기](https://chahero.github.io/abstain-dti-learning/papers/reliable-ba/#motivation) · [구조도 다섯 단계](https://chahero.github.io/abstain-dti-learning/papers/reliable-ba/#walkthrough) · [해설 원고](https://chahero.github.io/abstain-dti-learning/papers/reliable-ba/review.md)

Hong et al., *Trustworthy Protein–Ligand Binding Affinity Prediction via Reliability-Aware Multi-Engine Fusion* (arXiv:2607.17601v1)를 한국어로 해설합니다. 원문 구조도를 중심으로 같은 c-Abl·이마티닙 예시를 이어 가며, 각 단계의 **입력 → 하는 일 → 출력**을 설명합니다.

| 본문 | 내용 | 대응 원문 |
| --- | --- | --- |
| [1장 연구의 문제](https://chahero.github.io/abstain-dti-learning/papers/reliable-ba/#motivation) | 왜 서로 다른 모델의 예측을 합치려 할까? | §1 |
| [2장 전체 구조](https://chahero.github.io/abstain-dti-learning/papers/reliable-ba/#overview) | 위쪽 점수 경로와 아래쪽 신뢰성 경로, 합류 지점 | Fig. 2 |
| [3장 다섯 단계](https://chahero.github.io/abstain-dti-learning/papers/reliable-ba/#walkthrough) | 원점수 → NIG Head → 신뢰성 → 증거 조절 → MoNIG 결합 | §3.1–3.4 |
| [4장 학습](https://chahero.github.io/abstain-dti-learning/papers/reliable-ba/#learning) | 학습하는 부분·고정하는 부분, 실험 정답과 학습·추론의 차이 | §3.5 |
| [5장 기존 방식과 비교](https://chahero.github.io/abstain-dti-learning/papers/reliable-ba/#comparison) | 단순 평균·합의·학습 가중치·MoE와 차이 | §2.2–2.3, Appendix C |
| [6장 결과와 한계](https://chahero.github.io/abstain-dti-learning/papers/reliable-ba/#results) | 평균 오차·불확실성·선택적 예측의 실제 보고와 해석 범위 | §4–6 |

구조도의 단계 선택·강조·확대, 이전·다음과 키보드 이동, 단계 주소 공유를 지원합니다. 기본 읽기는 본문 1–6장으로 이어집니다. 가중치 학습·입력별 게이트·불확실성 추정은 기존에도 있었음을 명시하고, 신뢰성으로 증거를 조절하는 분포 결합 설계를 설명합니다.

긴 모델별 내부 원리와 수식은 본문에서 분리해 **첨부 자료**로 옮겼습니다. 첨부 A는 입력·출력과 원자 격자·ESM-2·그래프·구조 생성의 여섯 세부 화면, B는 모델별 오차 예시, C는 상세 분포·수식·계산기, D는 실제 데이터 준비·분할·공개 CSV입니다. 본문 6개·첨부 10개·용어와 출처를 합친 17개 화면이며, 첨부는 필요할 때 펼칩니다. 기존 링크는 옮겨진 실제 위치로 연결합니다.

신뢰성 r과 증거량을 조절하는 계산기는 가상 매개변수에 논문 수식만 적용합니다. 실제 1IEP 입력 형식·ESM-2 8M 표현·공식 CSV의 네 행은 설명용 숫자와 구분합니다. 원문 표 4개·그림 4개·용어 47개, 원고·표·입력·표현 데이터 다운로드와 인쇄를 제공합니다. 원본 그림 자산은 유지하고 구조도 화면에 표시 영역·강조·확대를 별도로 추가했으며, CC BY 4.0에 따라 저자와 출처를 표시합니다.

10%만 남겼을 때의 25.7% 상대 MAE 감소는 90%를 제외한 조건의 보고값입니다. 논문 보고값·공개 기록·가상 예시를 구분하며, 이 사이트에서 친화도 예측이나 학습을 재현했다는 뜻은 아닙니다. 고정 코드 버전과 파일 해시는 출처 및 source-manifest.json에서 확인할 수 있습니다.

## 사이트 운영

GitHub Pages는 **Settings → Pages → Deploy from a branch → main → /(root)**로 배포합니다. `main`에 푸시하면 Pages가 갱신됩니다. 루트의 `index.html`과 `.nojekyll`을 유지합니다.

메인은 `index.html`과 `assets/home.css`로 구성한 정적 페이지입니다. 교재는 `pocket-structure/`, Docking Agent 구현·실험 기록은 `docking-agent/`, 웹 발표는 `papers/ai-agents-that-matter/`, RELIABLE-BA 해설은 `papers/reliable-ba/`에 있습니다. 별도 Node/Python 서버, 모델 추론, TTS API나 YouTube 연결 없이 열람할 수 있습니다.

기존 읽기 가이드·실습 자료·자막 원본은 `guides/`, `data/`, `assets/subtitles/`에 보존되어 있습니다. 종료한 YouTube 영상의 플레이어와 영상 목록은 메인에서 제공하지 않습니다.

포켓 교재의 고정폭 구조 원본과 출처 파일 해시를 유지하기 위해 `.gitattributes`에서 해당 폴더의 줄바꿈 자동 변환을 막습니다.

## 자료 범위와 출처

[Pseudo-Lab/abstain-dti](https://github.com/Pseudo-Lab/abstain-dti)를 참고한 러너의 개인 학습 자료이며, 공식 프로젝트 결과나 공식 평가 규약을 뜻하지 않습니다. 원 논문·데이터·도구의 출처와 권리는 각 자료의 출처 및 `source-manifest.json`에서 확인하세요.

합성 예제, 실제 데이터 계산, 공식 참고 출력, 새로 실행하지 않은 원리 그림을 구분합니다. 자료 작성·실행 성공과 사용자의 학습 완료는 별개입니다.

Pretendard 글꼴의 라이선스는 [assets/Pretendard-LICENSE.txt](assets/Pretendard-LICENSE.txt)에 보존했습니다. MP4, 모델 가중치, 로컬 환경, 제작·음성 검수 로그는 배포에 포함하지 않습니다.
