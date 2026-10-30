# Abstain-DTI Learning

[학습 사이트 열기](https://chahero.github.io/abstain-dti-learning/)

신약 발굴 AI를 공부하기 위한 한국어 개인 학습 자료입니다. 메인 화면에서 **그림으로 읽는 포켓 교재**와 **음성을 들으며 보는 논문 웹 발표**를 선택할 수 있습니다.

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

## AI Agents That Matter · 웹 발표

[음성과 함께 발표 보기](https://chahero.github.io/abstain-dti-learning/papers/ai-agents-that-matter/) · [장표·대본 PDF](https://chahero.github.io/abstain-dti-learning/papers/ai-agents-that-matter/downloads/slides-and-script.pdf)

장표 11장과 미리 제작한 Dustin 1.2배속 한국어 음성을 동기화한 7분 48초 발표입니다. 정확도·비용·실제 사용·일반화·평가 신뢰성을 살펴봅니다. 장표 이동, 구간 탐색, 전체화면, 발화에 맞춘 강조 모션을 지원합니다. 발표 PPTX와 장표·대본 PDF는 발표 페이지에서 내려받을 수 있습니다.

## 사이트 운영

GitHub Pages는 **Settings → Pages → Deploy from a branch → main → /(root)**로 배포합니다. `main`에 푸시하면 Pages가 갱신됩니다. 루트의 `index.html`과 `.nojekyll`을 유지합니다.

메인은 `index.html`과 `assets/home.css`로 구성한 정적 페이지입니다. 교재는 `pocket-structure/`, 웹 발표는 `papers/ai-agents-that-matter/`에 있습니다. 별도 Node/Python 서버, 모델 추론, TTS API나 YouTube 연결 없이 열람할 수 있습니다.

기존 읽기 가이드·실습 자료·자막 원본은 `guides/`, `data/`, `assets/subtitles/`에 보존되어 있습니다. 종료한 YouTube 영상의 플레이어와 영상 목록은 메인에서 제공하지 않습니다.

포켓 교재의 고정폭 구조 원본과 출처 파일 해시를 유지하기 위해 `.gitattributes`에서 해당 폴더의 줄바꿈 자동 변환을 막습니다.

## 자료 범위와 출처

[Pseudo-Lab/abstain-dti](https://github.com/Pseudo-Lab/abstain-dti)를 참고한 러너의 개인 학습 자료이며, 공식 프로젝트 결과나 공식 평가 규약을 뜻하지 않습니다. 원 논문·데이터·도구의 출처와 권리는 각 자료의 출처 및 `source-manifest.json`에서 확인하세요.

합성 예제, 실제 데이터 계산, 공식 참고 출력, 새로 실행하지 않은 원리 그림을 구분합니다. 자료 작성·실행 성공과 사용자의 학습 완료는 별개입니다.

Pretendard 글꼴의 라이선스는 [assets/Pretendard-LICENSE.txt](assets/Pretendard-LICENSE.txt)에 보존했습니다. MP4, 모델 가중치, 로컬 환경, 제작·음성 검수 로그는 배포에 포함하지 않습니다.
