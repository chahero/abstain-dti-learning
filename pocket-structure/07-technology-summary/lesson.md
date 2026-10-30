# 개요 · 어떤 질문에 어떤 기술을 쓸까?

[조작 가능한 그림과 함께 보기](https://chahero.github.io/abstain-dti-learning/pocket-structure/07-technology-summary/)

전체 기술 지도를 먼저 보고 1–6장의 상세 학습으로 이어가는 개요입니다. 16개 기술·접근법과 별도의 평가·분석 자료 3편을 요약하며 그림은 설명용입니다. 차례는 발표 연도순이나 성능 순위가 아닙니다.

## 1. 질문으로 보는 전체 기술 지도

아래 네 영역은 **서로 다른 질문**입니다. 모든 기술을 순서대로 실행하는 파이프라인은 아니며, 필요에 따라 함께 쓰거나 대안으로 비교합니다.

좁은 화면에서는 그림을 좌우로 밀어 전체 지도를 볼 수 있습니다.

자리를 찾는 일, 자세를 찾는 일, 움직임을 계산하는 일은 다릅니다.

이 기술들을 발전 순서로 보면 될까요?

**큰 흐름에서는 발전으로 볼 수 있지만, 이 목차는 발표 연도순이 아니라 이해하기 쉬운 학습 순서입니다.** 같은 문제를 푸는 방법이 정교해지기도 하고, 다루는 입력과 질문의 범위가 넓어지기도 합니다.

- **포켓 탐지 방법의 다양화:** fpocket은 기하학, P2Rank는 학습된 표면점 평가, DeepPocket·GrASP는 신경망 표현을 활용합니다. HOTPocket/hotpocketNN은 후보를 선별하고, Seq2Pocket은 잔기 예측을 공간화하며, ProMoSite는 특정 리간드 조건을 더합니다. 같은 자리 찾기 질문에 서로 다른 접근을 합니다.

- **움직임과 유연성의 고려:** 한 구조의 공간을 읽는 것에서 숨은 포켓과 구조 변화도 살펴봅니다. MD는 오래된 물리 기반 접근이고, PocketMiner는 열릴 법한 영역을 예측합니다. 둘의 순서가 최신성이나 우열을 뜻하지 않습니다.

- **좌표 예측 범위의 확장:** 고정 구조에 대한 리간드 자세, 시작 수용체의 갱신, 서열·분자 정보로부터 복합체 공동 생성은 입력과 예측 대상이 다릅니다. 도킹과 공동 예측의 기능은 일부 겹칩니다.

**새 기술이 모든 기존 방법을 대체한 것은 아닙니다.** 예를 들어 복합체 좌표 생성만으로 물리적 시간 궤적이 얻어지는 것은 아닙니다. 가진 입력과 원하는 출력에 맞춰 방법을 고릅니다.

[P2Rank 공식 설명](https://github.com/rdk/p2rank) · [DeepPocket 공식 설명](https://github.com/devalab/DeepPocket) · [AlphaFold 3 원 논문](https://www.nature.com/articles/s41586-024-07487-w) · [MD와 PocketMiner 상세](../04-cryptic-pockets/)

세 분야의 **접근·기능 확장**과, 실제로 출력을 이어 쓰는 **처리 연결**을 나눠 봅니다. 점선은 직계 후속 모델이나 성능 우열을 뜻하지 않습니다.

실선: 데이터·처리 연결 점선: 접근 확장·선택 연결 보라 실선: 재구현

좁은 화면에서는 그림을 좌우로 밀어 볼 수 있습니다.

연도: 대표 논문·모델 공개 기준 · DeepPocket 온라인 2021 / 권호 2022 · DiffDock 프리프린트 2022 / ICLR 2023. 상세 기준과 출처는 아래에서 확인할 수 있습니다.

밑줄 친 기술 상자를 누르면 논문의 핵심 해설을 읽을 수 있습니다. [논문 10편 모아 보기 →](../papers/)

### 기술은 세 방향으로 넓어졌습니다

연도 기준과 출처 · 16개 기술

연도는 대표 논문의 정식 서지 연도를 기본으로 합니다. 기술 보고서·모델 공개만 있는 경우에는 해당 공개 연도를 씁니다. 먼저 공개된 온라인 논문·프리프린트 연도는 아래에 별도로 표시합니다. 연도 표시는 분야의 탄생이나 필수 실행 순서를 뜻하지 않습니다.

MD는 단일 모델이 아닙니다. 1977은 접힌 단백질 BPTI를 시뮬레이션한 초기 대표 연구의 연도이며, MD 전체가 시작된 연도는 아닙니다.

기술별 연도와 표시 기준 · 확인일 2026-10-30

| 기술 | 그림의 연도 | 무슨 연도인가? | 원 출처 |
| --- | --- | --- | --- |
| fpocket포켓 탐지 | **2009** | BMC Bioinformatics 논문, 2009-06-02
원래 fpocket 방법의 논문 연도입니다. 현재 설치 버전의 배포 연도와 구분합니다. | [fpocket 원 논문](https://doi.org/10.1186/1471-2105-10-168) |
| P2Rank포켓 탐지 | **2018** | Journal of Cheminformatics 논문, 2018-08-14
현재 P2Rank 패키지의 최신 버전 연도와 구분합니다. | [P2Rank 원 논문](https://link.springer.com/article/10.1186/s13321-018-0285-8) |
| DeepPocket포켓 탐지 | **2022** | JCIM 권호 게재 2022; 온라인 공개 2021-08-10
먼저 온라인으로 나온 때는 2021년이고 정식 서지의 권호 연도는 2022년입니다. | [DeepPocket 논문·게재 이력](https://pubs.acs.org/doi/10.1021/acs.jcim.1c00799) |
| GrASP포켓 탐지 | **2024** | JCIM 온라인 공개 2024-03-07; 권호 게재 2024-04-08
여기서는 Smith 등의 Graph Attention Site Prediction을 뜻합니다. | [GrASP 논문·게재 이력](https://pubs.acs.org/doi/10.1021/acs.jcim.3c01698) |
| 분자동역학 (MD)움직임·숨은 포켓 | **1977 사례** | Dynamics of folded proteins, Nature, 1977-06-16
BPTI 단백질 MD의 초기 대표 사례입니다. MD 자체의 탄생이나 특정 프로그램의 출시 연도가 아닙니다. | [단백질 MD의 초기 대표 연구](https://www.nature.com/articles/267585a0) |
| PocketMiner움직임·숨은 포켓 | **2023** | Nature Communications 논문, 2023-03-01
숨은 포켓의 위치를 단일 구조에서 예측하는 논문 기준입니다. | [PocketMiner 원 논문](https://www.nature.com/articles/s41467-023-36699-3) |
| AutoDock Vina도킹 | **2010** | J. Computational Chemistry 권호 2010; 온라인 공개 2009-06-04
일반적으로 인용하는 원 논문은 2010년입니다. 도킹 분야 전체의 시작 연도가 아닙니다. | [Vina 논문·게재 이력](https://onlinelibrary.wiley.com/doi/10.1002/jcc.21334) |
| DiffDock · 원본도킹 | **2023** | ICLR 2023; arXiv 최초 공개 2022-10-04
이 자료는 원본 DiffDock 기준입니다. 후속 DiffDock-L의 연도와 구분합니다. | [DiffDock 프리프린트·ICLR 서지](https://arxiv.org/abs/2210.01776) |
| DynamicBind도킹 | **2024** | Nature Communications 논문, 2024-02-05
이 자료에서는 정식 저널 논문의 연도를 표시합니다. | [DynamicBind 원 논문](https://www.nature.com/articles/s41467-024-45461-2) |
| AlphaFold 3co-folding | **2024** | Nature 논문 온라인 공개, 2024-05-08
논문 발표 연도입니다. 추론 코드 공개 시점이나 AlphaFold 2의 연도와 구분합니다. | [AlphaFold 3 원 논문](https://www.nature.com/articles/s41586-024-07487-w) |
| Chai-1co-folding | **2024** | 공식 모델 발표, 2024-09-09
회사 공식 공개 발표 기준이며 정식 저널 게재 연도를 뜻하지 않습니다. | [Chai-1 공식 공개 발표](https://www.chaidiscovery.com/news/introducing-chai-1) |
| Boltz-2co-folding | **2025** | 2025년 bioRxiv 기술 보고서; 공식 저장소 서지
Boltz-1의 2024년 논문과 구분합니다. | [Boltz-2 공식 논문 서지](https://github.com/jwohlwend/boltz#cite) · [Boltz-2 기술 보고서](https://doi.org/10.1101/2025.06.14.659707) |
| OpenFold3-preview2co-folding | **2026** | preview2 / v0.4.0 공식 공개, 2026-03-13
현재 자료의 OF3p2 버전 기준입니다. 최초 OpenFold3-preview나 이후 OpenBind-0의 공개 연도가 아닙니다. | [OpenFold3 Preview2 공식 릴리스](https://github.com/aqlaboratory/openfold-3/releases/tag/0.4.0) · [공식 릴리스 실행 날짜](https://github.com/aqlaboratory/openfold-3/actions/runs/23049391144) |
| HOTPocket / hotpocketNN포켓 탐지 | **2025** | 정식 저널 공개 2025-12-24
HOTPocket은 지도·파이프라인, hotpocketNN은 후보 선별 모델입니다. | [원 논문·저자 공개 자료](https://link.springer.com/article/10.1186/s13321-025-01125-x) |
| Seq2Pocket포켓 탐지 | **2026** | Bioinformatics 온라인 공개 2026-10-16
언어모델 점수를 공간적 포켓으로 연결하며 후처리에 구조가 필요합니다. | [원 논문·저자 공개 자료](https://github.com/skrhakv/seq2pocket) |
| ProMoNet / ProMoSite포켓 탐지 | **2026** | 정식 저널 공개 2026-05-20
ProMoNet 프레임워크의 ProMoSite 부위 예측 모듈을 표시합니다. | [원 논문·저자 공개 자료](https://link.springer.com/article/10.1186/s13321-026-01227-0) |

전체 발전 흐름을 글로 모아 보기

#### 기술은 세 방향으로 넓어졌습니다

**공간을 읽는 표현, 자세를 생성하는 방식, 함께 예측하는 대상과 출력이 확장됐습니다.**

그림의 가로 방향은 발전의 관점을 요약한 것입니다. 모든 화살표가 직접적인 후속 모델이나 반드시 거쳐야 하는 실행 순서를 뜻하지는 않습니다.

- 포켓 탐지: 구조 표현뿐 아니라 후보 통합·공간적 보정·리간드 조건으로 질문과 처리 범위를 넓힙니다.

- 도킹: 점수 기반 탐색과 학습 기반 생성, 수용체 유연성이라는 축을 나눠 봅니다.

- co-folding: 구성 요소의 공동 좌표 생성에 입력 힌트·결합 특성·재현 기반을 더합니다.

최신 모델이 모든 기존 기술을 대체한 것은 아닙니다. MD의 시간 궤적, 포켓 후보, 자세, 복합체 좌표는 서로 다른 출력입니다.

[P2Rank 공식 원리](https://github.com/rdk/p2rank) · [DeepPocket 공식 처리 흐름](https://github.com/devalab/DeepPocket) · [DynamicBind 원 논문](https://www.nature.com/articles/s41467-024-45461-2) · [AlphaFold 3 공식 구현](https://github.com/google-deepmind/alphafold3) · [HOTPocket / hotpocketNN](https://link.springer.com/article/10.1186/s13321-025-01125-x) · [Seq2Pocket 공식 구현](https://github.com/skrhakv/seq2pocket) · [ProMoNet 원 논문](https://link.springer.com/article/10.1186/s13321-026-01227-0)

#### 포켓 탐지: 구조 표현에서 통합·공간·리간드 조건으로

**기하학과 학습 표현에 더해, 후보의 통합 선별·잔기 예측의 공간적 연결·특정 리간드 조건을 다룹니다.**

fpocket의 후보를 DeepPocket이 재사용하는 관계는 실제 처리 연결입니다. P2Rank·GrASP는 다른 구조 기반 접근입니다. HOTPocket/hotpocketNN은 여러 도구의 후보를 선별하고, Seq2Pocket은 잔기별 예측을 구조 위의 포켓으로 묶습니다. ProMoNet의 ProMoSite는 단백질 서열과 특정 리간드로 잔기 점수를 예측합니다.

- HOTPocket/hotpocketNN (2025): 여러 탐지기의 후보를 공통 점수로 선별합니다.

- Seq2Pocket (2026): 잔기 예측에 이웃 정보와 SAS 군집화를 더해 공간적 범위를 정합니다.

- ProMoNet/ProMoSite (2026): 단백질 서열과 리간드 정보로 특정 화합물의 부위 점수를 예측합니다.

세 확장은 서로 다른 보완 방향이며 모든 도구의 필수 후속 단계가 아닙니다. ProMoSite는 단백질 3D 없이 추론할 수 있지만, Seq2Pocket의 공간 후처리와 3D 포켓 평가는 구조 정보가 필요합니다.

[fpocket 공식 구현](https://github.com/Discngine/fpocket) · [P2Rank 알고리즘](https://github.com/rdk/p2rank#algorithm) · [DeepPocket 예측 절차](https://github.com/devalab/DeepPocket#predicting-binding-site) · [GrASP 공식 구현](https://github.com/tiwarylab/GrASP) · [HOTPocket 원 논문](https://link.springer.com/article/10.1186/s13321-025-01125-x) · [Seq2Pocket 공식 구현](https://github.com/skrhakv/seq2pocket) · [ProMoNet 원 논문](https://link.springer.com/article/10.1186/s13321-026-01227-0)

#### 도킹: 탐색 방식과 수용체 유연성의 확장

**어떻게 자세를 찾는지와, 단백질의 어느 부분을 바꿀 수 있는지는 서로 다른 축입니다.**

Vina는 근사 점수 기반으로 탐색합니다. 원본 DiffDock은 고정한 단백질을 참고해 리간드 이동·회전·비틀림을 학습된 확산 방식으로 생성합니다. DynamicBind는 시작 단백질 구조를 받아 리간드와 수용체 잔기·곁사슬 배치를 함께 갱신합니다.

- Vina와 원본 DiffDock은 자세 탐색·생성 방식이 다릅니다.

- 원본 DiffDock은 AI 도킹이어도 수용체를 고정합니다.

- Vina의 선택 곁사슬 유연성과 DynamicBind의 잔기 배치 갱신을 구분합니다.

점선은 비교하는 기능의 확장입니다. 세 방법을 전부 순서대로 실행하라는 뜻이 아니며, 생성 단계는 실제 결합 시간 궤적과 다릅니다.

[Vina 기본 도킹](https://autodock-vina.readthedocs.io/en/latest/docking_basic.html) · [Vina 유연한 곁사슬](https://autodock-vina.readthedocs.io/en/latest/docking_flexible.html) · [원본 DiffDock](https://arxiv.org/abs/2210.01776) · [DynamicBind 공식 구현](https://github.com/luwei0917/DynamicBind)

#### co-folding: 공동 좌표 생성에서 기능·재현 기반 확장

**여러 구성 요소를 함께 예측하고, 추가 입력·결합 특성 출력·공개 재구현을 서로 다른 방향으로 발전시킵니다.**

AlphaFold 3는 단백질·핵산·리간드 등 여러 구성 요소의 좌표를 공동으로 예측합니다. Chai-1의 임베딩과 선택적 제약, Boltz-2의 별도 결합 분류·친화도, OpenFold3-preview2의 공개 재구현과 학습 재현 자료는 각각 강조점이 다릅니다.

- Chai-1: 단백질 언어모델 특징과 선택적 MSA·템플릿·접촉 정보를 활용합니다.

- Boltz-2: 구조 confidence와 별도의 결합 분류·친화도 예측을 제공합니다.

- OpenFold3-preview2: AF3 계열의 공개 재구현과 코드·가중치·학습 자료를 연결합니다.

Chai-1과 Boltz-2는 AF3와 같은 가중치를 쓰는 모델이나 서로의 후속 버전이 아닙니다. OF3p2도 Google의 AF3 가중치 자체가 아니며, 이 자료는 OF3p2 범위를 유지합니다.

[AlphaFold 3 공식 구현](https://github.com/google-deepmind/alphafold3) · [Chai-1 입력과 추론](https://github.com/chaidiscovery/chai-lab) · [Boltz-2 출력 정의](https://github.com/jwohlwend/boltz/blob/main/docs/prediction.md) · [OpenFold3-preview2 보고서](https://portal.openfold.omsf.io/reports/of3p2_technical_report.pdf)

#### 실제 분석에서는 필요한 부분을 연결합니다

**기술 계보와 분석 흐름은 다릅니다. 연결하려면 출력이 다음 입력에 맞는지 확인합니다.**

MD에서 얻은 프레임을 포켓 검출기로 분석하거나, 포켓 후보 위치를 정해 도킹 범위를 잡을 수 있습니다. 공동 예측으로 만든 구조를 다시 분석하는 것도 선택지입니다. 반대로 blind docking이나 공동 예측에서 포켓 탐지기를 항상 먼저 실행해야 하는 것은 아닙니다. 여러 검출기의 후보를 hotpocketNN으로 선별하거나, 서열 예측을 Seq2Pocket으로 공간화하는 연결도 가능합니다. ProMoSite의 리간드별 잔기 점수는 별도 구조에 매핑해 3D로 평가할 수 있습니다.

- 열릴 법한 영역의 예측 → 필요에 따라 MD 탐색 → 프레임별 포켓 분석이라는 조합을 생각할 수 있습니다.

- 포켓 후보 → 탐색 범위 설정 → 도킹은 가능한 활용 예입니다. 도구 간 좌표와 번호 체계를 확인해야 합니다.

- co-folding 결과 → 구조·인터페이스 검증이 기본이며, 추가 포켓 분석이나 도킹은 새 질문이 있을 때 선택합니다.

- 후보 선별(HOTPocket), 공간적 포켓화(Seq2Pocket), 리간드 조건부 잔기 점수(ProMoSite)는 필요한 입력과 출력이 다릅니다.

PocketMiner 점수가 열린 좌표를 생성하지는 않습니다. co-folding으로 얻은 복합체를 반드시 다시 도킹할 필요도 없습니다. 어떤 경로도 실험 검증을 자동으로 대체하지 않습니다.

[MD와 PocketMiner 상세 설명](../04-cryptic-pockets/) · [Vina 탐색 범위](https://autodock-vina.readthedocs.io/en/latest/docking_basic.html) · [공동 예측과 검증 조건](../06-cofolding/) · [HOTPocket 원 논문](https://link.springer.com/article/10.1186/s13321-025-01125-x) · [Seq2Pocket 공식 처리](https://github.com/skrhakv/seq2pocket) · [ProMoNet 원 논문](https://link.springer.com/article/10.1186/s13321-026-01227-0)



포켓 탐지에 집중하기 · 문헌 확인 2026-10-30

### 무엇이 아직 어렵고, 연구는 어디로 갈까?

단백질의 움직임, 후보의 순위, 포켓의 공간적 범위, 데이터와 리간드 조건을 나눠 봅니다.






다섯 가지 한계와 연구 방향 · 전체 텍스트

#### 입력 구조에서 안 보이는 자리도 있을까?

단백질은 한 장의 고정된 모양이 아닙니다.

**한계:** 곁사슬·루프·도메인의 배치에 따라 공간이 가려지거나 열립니다. 현재 구조의 오목한 공간만 읽으면 아직 드러나지 않은 자리를 놓칠 수 있습니다.

**예시:** 우리 MBP 포켓 탐지 예제는 맥아당이 결합한 1ANF에서 리간드를 가린 입력입니다. 단백질의 holo 유래 모양은 남아 있습니다. 실제 apo 구조의 숨은 자리를 찾는 성능까지 확인한 예제는 아닙니다.

**연구 방향:** 실제 apo–holo 구조 쌍을 이용한 평가, 한 구조에서의 숨은 자리 추정, 여러 구조 상태에서의 탐지를 함께 살펴봅니다.

**해석:** 숨은 부위의 잔기 점수, 열린 구조 좌표, 시간 순서의 MD 궤적은 서로 다른 출력입니다.

[CryptoBench (2025)](https://doi.org/10.1093/bioinformatics/btae745) · [검출과 순위 분리 분석 (2026)](https://www.biorxiv.org/content/10.64898/2026.08.11.743381v1)

#### 찾았는데 상위 목록에 못 올렸다면?

좋은 후보를 만드는 능력과 좋은 순서를 매기는 능력을 구분합니다.

**한계:** 실제 결합 자리에 해당하는 후보가 있어도 순위가 낮으면 검토 목록에서 빠집니다. 같은 자리를 중복해서 많이 제안하면 한정된 상위 목록을 채워 다른 자리가 밀릴 수도 있습니다.

**예시:** 아래 예시는 후보 20개 중 정답 후보가 15위에 있는 가상의 상황입니다. 순위만 2위로 개선하거나 검토 개수를 늘렸을 때 무엇이 바뀌는지 비교하세요.

**연구 방향:** 후보 생성, 중복 제거, 재점수화, 여러 검출기의 결합을 나눠 평가합니다. 전체 후보 중 정답이 있는 비율과 상위 k개 안에서 회수한 비율도 구분합니다.

**해석:** 정답 후보가 애초에 없으면 순위만 바꿔도 회수할 수 없습니다. 도구들을 합칠 때도 상위 후보를 얼마나 검토할지 함께 정해야 합니다.

[LIGYSIS 비교 연구 (2024)](https://link.springer.com/article/10.1186/s13321-024-00923-z) · [검출과 순위 분리 분석 (2026)](https://www.biorxiv.org/content/10.64898/2026.08.11.743381v1) · [HOTPocket / hotpocketNN (2025)](https://link.springer.com/article/10.1186/s13321-025-01125-x)

#### 잔기 점수에서 하나의 3D 포켓으로

잔기별 예측을 공간에서 사용할 수 있는 영역으로 묶어야 합니다.

**한계:** 결합 가능성이 높은 잔기들을 골라도 공간상 여기저기 흩어져 있을 수 있습니다. 포켓 몇 개인지, 어느 잔기들을 한 포켓으로 묶을지, 경계를 어디까지 잡을지는 추가 문제입니다.

**예시:** 서열에서 멀리 떨어진 잔기들도 접힌 구조에서는 이웃일 수 있습니다. 반대로 서열상 가깝다고 같은 포켓의 벽이라는 뜻은 아닙니다.

**연구 방향:** 단백질 언어모델의 잔기별 지식에 3D 이웃 관계와 표면점 군집화를 결합합니다. Seq2Pocket은 예측의 빈 부분을 보정하고 구조 기반 후처리로 포켓을 묶습니다.

**해석:** Seq2Pocket의 최종 3D 포켓 구성에는 구조 정보가 쓰입니다. 서열 점수만으로 공간 좌표가 새로 생성됐다고 해석하지 않습니다.

[Seq2Pocket (2026)](https://doi.org/10.1093/bioinformatics/btag778)

#### 정답 목록에 없는 자리는 모두 오답일까?

관찰된 결합 부위의 목록과 가능한 모든 결합 부위는 같지 않습니다.

**한계:** 크고 잘 알려진 주 결합 부위에 데이터가 치우치면 작거나 덜 알려진 자리를 놓치기 쉽습니다. 한 구조에서 관찰된 리간드만 정답으로 삼으면 다른 상태나 다른 실험에서 관찰된 자리도 평가에서 빠질 수 있습니다.

**예시:** 큰 주 결합 자리 A만 라벨에 있고 작은 자리 B가 빠진 학습 자료를 생각해 보세요. B에 대한 예측을 판단하려면 추가 구조·실험 근거를 확인해야 하며, 그 자리의 결합 가능성을 단정할 수 없습니다.

**연구 방향:** 동일 단백질의 여러 구조에서 관찰된 부위를 모으고, 빠진 작은 분자·이온 결합 부위를 보강합니다. 실제 apo 입력과 단백질 유사도를 고려한 분할 조건도 함께 확인합니다.

**해석:** 작은 분자나 이온이 관찰된 결합 자리와 약물로 공략하기 좋은 포켓은 같은 판정이 아닙니다. 중심 거리, 잔기 겹침, 부피 등 평가 단위도 맞춰 비교해야 합니다.

[LIGYSIS 비교 연구 (2024)](https://link.springer.com/article/10.1186/s13321-024-00923-z) · [CryptoBench (2025)](https://doi.org/10.1093/bioinformatics/btae745) · [Seq2Pocket (2026)](https://doi.org/10.1093/bioinformatics/btag778)

#### 특정 화합물이 정해지면 질문도 구체화됩니다

자리 후보를 넓게 찾는 일과 이 화합물의 자리를 찾는 일을 나눕니다.

**한계:** 리간드 정보를 받지 않는 탐지는 어디를 먼저 살펴볼지 알려줍니다. 특정 분자와 맞는 모양·전하·상호작용을 갖는지는 추가 판단이 필요하며 포켓 점수만으로 친화도가 확정되지는 않습니다.

**예시:** 같은 단백질의 자리 A에는 분자 X가, 다른 자리 B에는 분자 Y가 대응할 수 있습니다. 분자를 입력하는 방법은 어떤 분자가 주어졌는지에 따라 결합 부위 예측을 달리할 수 있습니다.

**연구 방향:** ProMoNet의 ProMoSite는 단백질 서열과 리간드 SMILES를 함께 읽어 그 리간드에 대응하는 잔기별 결합 부위 점수를 예측합니다. 리간드 없이 넓게 탐색하는 방법도 후보 발굴에 계속 쓰입니다.

**해석:** ProMoSite는 단백질 3D 좌표 없이 추론할 수 있지만 리간드 특징 계산에는 RDKit으로 만든 conformer가 사용됩니다. 잔기 점수, 복합체 좌표 생성, 친화도 예측을 구분하며 입력 정보가 다른 방법의 점수를 그대로 우열 비교하지 않습니다.

[ProMoNet / ProMoSite (2026)](https://link.springer.com/article/10.1186/s13321-026-01227-0) · [HOTPocket / hotpocketNN (2025)](https://link.springer.com/article/10.1186/s13321-025-01125-x)

**순위 조작 예시:** 설명용 가상 예시입니다. 실제 모델을 실행한 결과나 논문의 성능 수치가 아닙니다. 처음 두 설정은 같은 후보 20개에서 순위만 바꾸며, 마지막 설정은 정답 후보 자체가 없는 경우입니다. 정답이 15위이면 상위 5개에서 빠지고, 같은 후보의 순위가 2위로 올라가면 포함됩니다. 정답 후보가 없으면 20개 모두 검토해도 회수할 수 없습니다.



### 최근 논문은 어떤 문제를 다루나요?

기준일 2026-10-30 · 서로 다른 입력·정답·지표를 사용하므로 아래 목록은 성능 순위표가 아닙니다. 원 논문과 저자 공개 자료를 연결했습니다.

#### 예측 기술·파이프라인 3편

16개 기술 비교표에 포함한 세 확장입니다.

저널 게재 2025-12-24 · Journal of Cheminformatics

#### HOTPocket / hotpocketNN

The Human Omnibus of Targetable Pockets

여러 기하학·학습 기반 탐지기의 후보를 모으고 hotpocketNN으로 선별하여 인간 단백질 전반의 예측 포켓 지도를 구성합니다.

**입력**: 실험·AlphaFold2 구조에서 얻은 7개 탐지 방법의 후보

**출력**: 재평가한 후보와 인간 proteome의 예측 포켓 데이터셋

**읽을 관점:** 기존 검출기를 활용하는 후보 통합과 학습 기반 선별

예측 지도는 모든 포켓을 실험으로 검증한 목록이 아닙니다. 여러 도구의 단순 합집합·교집합이 항상 성능을 높이는 것도 아닙니다.

[쉽게 읽는 핵심 →](../papers/hotpocket/) [원 논문 →](https://link.springer.com/article/10.1186/s13321-025-01125-x)

저널 게재 2026-05-20 · Journal of Cheminformatics

#### ProMoNet / ProMoSite

Sequence-based drug-target binding site pre-training enables cryptic pocket detection and improves binding affinity and kinetics prediction

단백질·분자 사전학습 표현을 상호작용 수준에서 연결합니다. ProMoSite의 결합 부위 지식을 별도 모듈 ProMoBind의 친화도·동역학 예측에 전달합니다.

**입력**: 단백질 서열과 리간드 SMILES; 단백질의 실측 3D 좌표는 추론 필수 입력이 아님

**출력**: ProMoSite의 리간드별 잔기 점수; 후속 ProMoBind의 별도 특성 예측

**읽을 관점:** 특정 화합물을 조건으로 부위를 예측하는 방향

3D 포켓 평가는 잔기 예측을 별도 구조에 매핑해 수행합니다. 시간 궤적이나 복합체 좌표를 생성하는 모델로 해석하지 않습니다.

[쉽게 읽는 핵심 →](../papers/promonet/) [원 논문 →](https://link.springer.com/article/10.1186/s13321-026-01227-0)

저널 게재 2026-10-16 · Bioinformatics

#### Seq2Pocket

Seq2Pocket: augmenting protein language models for spatially consistent binding site prediction

학습 데이터 보강, 단백질 언어모델의 잔기별 예측, 공간적 보정과 표면점 군집화를 결합합니다.

**입력**: 단백질 언어모델의 잔기별 표현·점수와 후처리에 사용할 3D 구조

**출력**: 공간적으로 연결된 3D 포켓 영역

**읽을 관점:** 잔기 분류에서 사용 가능한 포켓으로 연결하는 방법

단백질 언어모델만으로 새 3D 좌표를 생성하는 방식이 아닙니다. 작은 분자·이온 부위 보강과 후처리도 결과에 기여합니다.

[쉽게 읽는 핵심 →](../papers/seq2pocket/) [원 논문 →](https://doi.org/10.1093/bioinformatics/btag778) [저자 공개 코드 →](https://github.com/skrhakv/seq2pocket)

#### 평가·분석 자료 3편

비교 연구·벤치마크이며 16개 예측 기술 수에는 포함하지 않습니다.

저널 게재 2024-11-11 · Journal of Cheminformatics

#### LIGYSIS 비교 연구

Comparative evaluation of methods for the prediction of protein–ligand binding sites

여러 포켓 탐지기와 변형을 공통 평가 틀에서 비교하고, 후보 중복과 재점수화가 평가 결과에 미치는 영향을 분석합니다.

**입력**: 여러 탐지기의 예측과 여러 구조의 관찰 부위를 모은 기준 데이터

**출력**: 잔기·포켓 단위 평가와 순위·중복에 대한 분석

**읽을 관점:** 새 모델 이름보다 평가와 후보 순위의 중요성부터 이해하기

정해진 데이터와 지표에서의 비교입니다. 모든 단백질·평가 조건에 공통인 우열 순위로 일반화하지 않습니다.

[쉽게 읽는 핵심 →](../papers/ligysis/) [원 논문 →](https://link.springer.com/article/10.1186/s13321-024-00923-z)

저널 게재 2025-01 · Bioinformatics 41(1)

#### CryptoBench

CryptoBench: cryptic protein–ligand binding sites dataset and benchmark

실제 apo–holo 구조 쌍과 단백질 유사도를 고려한 분할로 숨은 결합 부위를 평가하는 데이터셋입니다.

**입력**: 같은 단백질의 비결합·결합 상태 구조와 관찰된 결합 부위

**출력**: 숨은 부위 라벨과 미리 정의한 평가 분할

**읽을 관점:** holo에서 리간드를 가리는 평가와 실제 apo 입력의 차이

2025년 저널 권·호 기준으로 표시합니다. 벤치마크의 정답은 데이터 수집·선별 기준에 따른 관찰 부위입니다.

[쉽게 읽는 핵심 →](../papers/cryptobench/) [원 논문 →](https://doi.org/10.1093/bioinformatics/btae745) [저자 공개 코드 →](https://github.com/skrhakv/CryptoBench)

프리프린트 · 동료심사 전 2026-08-17 · bioRxiv v1

#### 검출과 순위 분리 분석

Cryptic binding sites are detected but not ranked: coverage, conversion, and detector consensus

CryptoBench의 특정 시험 분할에서 전체 후보의 회수와 상위 후보의 회수를 분리하여, 순위와 검토 예산의 영향을 분석합니다.

**입력**: 여러 탐지기의 후보별 겹침·순위와 선택한 평가 분할

**출력**: 후보 포함 여부, 상위 k개 회수, 결합 방식·후보 예산의 분석

**읽을 관점:** 후보를 찾는 일과 그 후보를 보여 주는 일을 구분하기

2026-08-17 공개 v1을 근거로 한 연구 방향 소개입니다. 확정된 분야 전체의 결론으로 취급하지 않으며, 이 자료에는 타 논문과 혼합한 성능 순위표를 싣지 않습니다.

[쉽게 읽는 핵심 →](../papers/ranking/) [원 논문 →](https://www.biorxiv.org/content/10.64898/2026.08.11.743381v1)



### 처음 읽는다면 이 순서로

- **1. [LIGYSIS 비교 연구](https://link.springer.com/article/10.1186/s13321-024-00923-z)**방법들의 비교에서 무엇을 평가해야 하는지 먼저 봅니다.

- **2. [CryptoBench](https://doi.org/10.1093/bioinformatics/btae745)**실제 apo 입력과 숨은 부위에서 왜 평가가 어려워지는지 봅니다.

- **3. [Seq2Pocket](https://doi.org/10.1093/bioinformatics/btag778)**최근 방법이 데이터와 공간적 후처리로 어떻게 보완하는지 봅니다.

개인 학습 순서의 제안입니다. 실험 실행이나 사용자 학습 완료를 뜻하지 않습니다.



어디를 찾았는지, 어떤 순위인지, 어떤 입력과 평가에서 얻은 결과인지 함께 읽습니다.

## 2. 16개 기술의 입력·출력·역할·사용 상황

전체 16개 기술을 표시합니다. 기술 이름을 누르면 입력→출력 그림을 볼 수 있습니다.

대표 사용 방식의 비교 · 모델 버전과 실행 조건은 각 장에서 확인합니다.

| 기술 | 입력 | 출력 | 역할 | 어떤 상황에서? |
| --- | --- | --- | --- | --- |
| **fpocket**포켓 탐지 [논문 핵심 →](../papers/fpocket/) | 단백질 3D 구조 | 포켓 후보·중심·점수 | 기하학적 포켓 탐지 | 구조에서 결합 공간 후보를 먼저 찾을 때 |
| **P2Rank**포켓 탐지 [논문 핵심 →](../papers/p2rank/) | 단백질 3D 구조 | 포켓 후보·관련 잔기·순위 | 학습 기반 포켓 탐지 | 표면의 화학 환경을 반영해 자리를 찾을 때 |
| **DeepPocket**포켓 탐지 [논문 핵심 →](../papers/deeppocket/) | 단백질 구조 + fpocket 후보 | 후보 순위 + 포켓 마스크 | 후보 재평가·영역 분할 | 후보를 CNN으로 재평가하고 범위를 정할 때 |
| **GrASP**포켓 탐지 [논문 핵심 →](../papers/grasp/) | 단백질 표면·이웃 원자의 3D 정보 | 원자 점수 + 포켓 후보 | 원자 그래프 기반 탐지 | 원자와 이웃 관계를 신경망으로 읽을 때 |
| **HOTPocket / hotpocketNN**포켓 탐지 [논문 핵심 →](../papers/hotpocket/) | 단백질 3D 구조 + 여러 탐지기의 후보 | 후보별 점수·선별 포켓·통합 지도 | 후보 통합·학습 기반 선별 | 여러 탐지기의 후보를 공통 기준으로 선별할 때 |
| **Seq2Pocket**포켓 탐지 [논문 핵심 →](../papers/seq2pocket/) | 단백질 서열·잔기 점수 + 후처리용 3D 구조 | 보정한 잔기 점수 + 3D 포켓 영역 | 잔기 예측의 공간적 보정·포켓화 | 흩어진 잔기 예측을 공간적으로 이어진 포켓으로 묶을 때 |
| **ProMoNet / ProMoSite**포켓 탐지 [논문 핵심 →](../papers/promonet/) | 단백질 서열 + 리간드 SMILES | 해당 리간드에 대한 잔기별 부위 점수 | 리간드 조건부 결합 부위 예측 | 특정 화합물이 어느 잔기들과 결합할지 예측할 때 |
| **PocketMiner**숨은 포켓·움직임 | 한 개 단백질 3D 구조 | 잔기별 숨은 포켓 점수 | 숨은 포켓 가능 영역 예측 | 어디가 열릴 법한지 후보를 좁힐 때 |
| **분자동역학 (MD)**숨은 포켓·움직임 | 초기 구조·환경·힘장·조건 | 시간 순서의 좌표·속도 궤적 | 힘과 운동으로 움직임 계산 | 구조 변화와 포켓의 열림을 탐색할 때 |
| **Vina**도킹 | 준비한 단백질·리간드·탐색 범위 | 리간드 자세 + 도킹 점수 | 근사 점수 기반 자세 탐색 | 정한 범위에서 화합물의 자세를 탐색할 때 |
| **DiffDock (원본)**도킹 | 고정 단백질 구조 + 리간드 정보 | 리간드 자세 + 자세 confidence | 학습 기반 리간드 자세 생성 | 고정 구조에서 학습 기반 자세 후보를 만들 때 |
| **DynamicBind**도킹 | 시작 단백질 구조 + 리간드 정보 | 갱신 복합체·품질·친화도 예측 | 리간드·수용체 배치 갱신 | 시작 구조를 리간드와 함께 조정할 때 |
| **AlphaFold 3**공동 구조 예측 | 서열·분자 정보, MSA·템플릿 등 | 복합체 원자 좌표 + 신뢰도 | 다양한 생체분자의 공동 구조 예측 | 서열과 구성 요소에서 복합체를 만들 때 |
| **Boltz-2**공동 구조 예측 | 서열·분자·보조 정보·선택 요청 | 복합체·신뢰도·결합 분류·친화도 | 공동 구조 + 별도 결합 특성 예측 | 구조와 작은 분자 결합 특성을 나눠 볼 때 |
| **Chai-1**공동 구조 예측 | 서열·분자, 임베딩·선택적 제약 | 복합체 원자 좌표 + 신뢰도 | 보조 정보를 활용한 공동 구조 예측 | MSA·접촉 등 주어진 힌트를 함께 쓸 때 |
| **OpenFold3-preview2**공동 구조 예측 | 서열·분자, MSA·템플릿 등 | 복합체 원자 좌표 + 신뢰도 | 공동 구조 예측·학습 재현 기반 | 공개 구현·자료로 재현과 개선을 검토할 때 |

단백질 3D 구조는 실험·예측 구조일 수 있으나 입력 품질을 점검해야 합니다. 이 표는 해당 기술의 대표 기능을 요약하며 모든 선택 설정을 나열하지 않습니다.

기술 16개와 별도로 읽는 자료

### 평가·분석 자료 3편

아래는 새 포켓을 예측하는 도구 목록이 아닙니다. 예측을 어떻게 검증하고 실패 원인을 나눌지 알려주는 비교 연구·벤치마크입니다.

자료의 역할과 평가 질문 · 예측 기술 수에 포함하지 않습니다.

| 자료·발표 시점 | 자료 종류 | 평가하는 질문 | 언제 참고하나? |
| --- | --- | --- | --- |
| [LIGYSIS 비교 연구 · 핵심 읽기 →](../papers/ligysis/)2024-11-11 · 저널 게재 [원문 ↗](https://link.springer.com/article/10.1186/s13321-024-00923-z) | 비교·평가 연구 | 탐지기·점수·후보 순위에 따라 평가가 어떻게 달라질까? | 여러 도구를 같은 평가 단위와 후보 예산으로 비교할 때 |
| [CryptoBench · 핵심 읽기 →](../papers/cryptobench/)2025-01 · 저널 게재 [원문 ↗](https://doi.org/10.1093/bioinformatics/btae745) | 데이터셋·벤치마크 | 실제 apo 구조에서 숨은 결합 부위를 찾는가? | apo–holo 쌍과 단백질 유사도 분할로 숨은 부위를 평가할 때 |
| [검출과 순위 분리 분석 · 핵심 읽기 →](../papers/ranking/)2026-08-17 · 프리프린트 · 동료심사 전 [원문 ↗](https://www.biorxiv.org/content/10.64898/2026.08.11.743381v1) | 검출·순위 분석 · 프리프린트 | 정답 후보가 없는가, 있어도 상위 목록에 못 드는가? | 후보 생성·중복·순위·검토 개수의 실패 원인을 나눌 때 |

[논문별 입력·출력과 해석 조건 자세히 보기 →](?view=frontiers#step-1)

## 3. 기술별 입력→처리→출력 그림

### fpocket

기하학적 포켓 탐지

단백질 원자 사이의 알파 구를 선별하고 묶어 포켓 후보를 만듭니다.

#### 이럴 때 사용합니다

구조에서 결합 공간 후보를 먼저 찾을 때

#### 출력을 읽을 때

현재 입력 구조의 공간을 읽습니다. 단백질을 열거나 특정 리간드의 결합 자세를 생성하지 않습니다.

얻는 것은: 포켓 후보·중심·점수

[원리 자세히 보기 →](../02-pocket-detection/) · [논문·공식 자료](https://github.com/Discngine/fpocket)

16개 기술의 입력·출력 텍스트 전체

##### fpocket

실제 개인 실행 출력 · MBP · 리간드를 제거한 1ANF

입력

```json
{
  "protein_file": "1ANF_protein.pdb",
  "chain": "A",
  "atoms": 2860,
  "residues": 370,
  "ligand_in_input": false,
  "coordinate_unit": "Å",
  "first_atom": {
    "serial": 1,
    "name": "N",
    "residue": 1,
    "resname": "LYS",
    "chain": "A",
    "element": "N",
    "xyz": [
      -12.621,
      27.691,
      51.154
    ]
  }
}
```

출력

```json
{
  "pockets": 21,
  "top_rank": 1,
  "score": 0.241,
  "center_A": [
    9.530865384615387,
    15.935336538461538,
    39.67928846153845
  ],
  "alpha_spheres": 104,
  "volume_A3": 661.736,
  "one_sphere": {
    "xyz": [
      10.804,
      16.206,
      40.144
    ],
    "radius": 4.32
  }
}
```

가상 구의 xyz와 radius는 Å입니다. score와 druggability는 결합 친화도가 아닙니다.

##### P2Rank

실제 개인 실행 출력 · MBP · fpocket과 동일한 입력

입력

```json
{
  "protein_file": "1ANF_protein.pdb",
  "chain": "A",
  "atoms": 2860,
  "residues": 370,
  "ligand_in_input": false,
  "coordinate_unit": "Å",
  "first_atom": {
    "serial": 1,
    "name": "N",
    "residue": 1,
    "resname": "LYS",
    "chain": "A",
    "element": "N",
    "xyz": [
      -12.621,
      27.691,
      51.154
    ]
  }
}
```

출력

```json
{
  "pockets": 5,
  "top_rank": 1,
  "score": 37.43,
  "probability": 0.958,
  "center_A": [
    9.5925,
    16.4268,
    39.122
  ],
  "surface_points": 135,
  "one_point": {
    "xyz": [
      3.656,
      13.826,
      39.731
    ],
    "rank": 1,
    "score": 0.358
  }
}
```

probability=0.958은 포켓 후보에 대한 도구 출력이며 특정 약물과의 결합 확률이 아닙니다. fpocket score와 직접 비교하지 않습니다.

##### DeepPocket

미실행 · 입력과 출력 형식 · MBP 입력으로 형식 설명

입력

```json
{
  "protein_file": "1ANF_protein.pdb",
  "chain": "A",
  "atoms": 2860,
  "residues": 370,
  "ligand_in_input": false,
  "coordinate_unit": "Å",
  "first_atom": {
    "serial": 1,
    "name": "N",
    "residue": 1,
    "resname": "LYS",
    "chain": "A",
    "element": "N",
    "xyz": [
      -12.621,
      27.691,
      51.154
    ]
  },
  "fpocket_candidate_centers_A": [
    [
      9.530865384615387,
      15.935336538461538,
      39.67928846153845
    ],
    [
      24.77179166666667,
      9.652,
      47.69858333333334
    ],
    [
      10.869800000000003,
      -0.6442999999999998,
      46.690380000000005
    ]
  ]
}
```

출력

```json
{
  "cnn_candidate_scores": null,
  "pocket_segmentation_mask": null
}
```

null은 미실행으로 값이 없다는 뜻입니다. 후보 재평가 점수와 3D 격자 영역을 내며, 아래 수치는 DeepPocket의 예측이 아닙니다.

##### GrASP

미실행 · 입력과 출력 형식 · MBP 원자 좌표 예시

입력

```json
{
  "protein_file": "1ANF_protein.pdb",
  "atom_coordinate_excerpt": [
    {
      "atom_id": 471,
      "element": "C",
      "xyz_A": [
        6.79,
        17.735,
        40.576
      ]
    },
    {
      "atom_id": 1213,
      "element": "C",
      "xyz_A": [
        14.044,
        13.567,
        39.058
      ]
    },
    {
      "atom_id": 1212,
      "element": "C",
      "xyz_A": [
        14.683,
        14.891,
        38.778
      ]
    },
    {
      "atom_id": 1214,
      "element": "C",
      "xyz_A": [
        13.805,
        13.113,
        40.408
      ]
    }
  ]
}
```

출력

```json
{
  "surface_atom_scores": null,
  "pocket_clusters": null
}
```

실행 전 단백질을 그래프로 변환합니다. 여기의 네 원자는 좌표를 읽는 발췌 예이며 전체 GrASP 입력 그래프가 아닙니다.

##### PocketMiner

미실행 · 입력과 출력 형식 · 실험 apo MBP · 1OMP

입력

```json
{
  "protein_file": "1OMP.pdb",
  "chain": "A",
  "residues": 370
}
```

출력

```json
{
  "residue_opening_scores": null
}
```

잔기별로 숨은 포켓 형성 가능 영역을 점수화합니다. 열린 3D 좌표를 생성하는 출력은 아닙니다.

##### 분자동역학 (MD)

미실행 · 조건과 출력 형식 · 시뮬레이션 조건의 설명용 설정

입력

```json
{
  "initial_structure": "1OMP.pdb",
  "example_temperature_K": 300,
  "example_timestep_fs": 2,
  "force_field": "별도 선택 필요",
  "solvent": "별도 구성 필요"
}
```

출력

```json
{
  "time_ps": null,
  "coordinates_A_per_frame": null,
  "velocities_per_frame": null
}
```

300 K와 2 fs는 조건을 이해하기 위한 예시이며 실행된 MD가 아닙니다. 출력은 시간에 따른 좌표·속도 프레임입니다.

##### Vina

공식 예제의 참고 출력 · ABL · 이마티닙 / 1IEP

입력

```json
{
  "receptor": "1iep_receptor.pdbqt",
  "ligand": "1iep_ligand.pdbqt",
  "search_box": "center_x = 15.190\ncenter_y = 53.903\ncenter_z = 16.917\nsize_x = 20.000\nsize_y = 20.000\nsize_z = 20.000"
}
```

출력

```json
{
  "modes": [
    {
      "rank": 1,
      "score_kcal_mol": -13.234,
      "rmsd_from_best_lower_A": 0.0,
      "rmsd_from_best_upper_A": 0.0,
      "first_heavy_atom_xyz_A": [
        11.825,
        62.28,
        12.841
      ]
    },
    {
      "rank": 2,
      "score_kcal_mol": -11.293,
      "rmsd_from_best_lower_A": 0.986,
      "rmsd_from_best_upper_A": 1.681,
      "first_heavy_atom_xyz_A": [
        13.299,
        62.692,
        12.742
      ]
    },
    {
      "rank": 3,
      "score_kcal_mol": -11.281,
      "rmsd_from_best_lower_A": 3.044,
      "rmsd_from_best_upper_A": 12.414,
      "first_heavy_atom_xyz_A": [
        24.226,
        50.745,
        17.55
      ]
    },
    {
      "rank": 4,
      "score_kcal_mol": -11.146,
      "rmsd_from_best_lower_A": 3.813,
      "rmsd_from_best_upper_A": 12.238,
      "first_heavy_atom_xyz_A": [
        25.038,
        51.703,
        16.669
      ]
    }
  ]
}
```

공식 배포 예제의 저장된 출력입니다. -13.234 kcal/mol은 Vina 점수이며 실험 Kd가 아닙니다. RMSD 열은 최상위 mode와의 거리 경계이며 실험 구조에 대한 오차가 아닙니다.

##### DiffDock (원본)

미실행 · 입력과 출력 형식 · ABL · 이마티닙 입력 예시

입력

```json
{
  "protein_structure": "1iep_receptor.pdbqt → 도구에 맞는 구조 준비",
  "ligand_smiles": "Cc1ccc(NC(=O)c2ccc(CN3CC[NH+](C)CC3)cc2)cc1Nc1nccc(-c2cccnc2)n1"
}
```

출력

```json
{
  "ligand_pose_xyz_A": null,
  "pose_confidence": null
}
```

원본 DiffDock의 수용체는 고정입니다. 자세 confidence는 친화도와 다릅니다. PDBQT를 변환 없이 그대로 입력하라는 뜻이 아닙니다.

##### DynamicBind

미실행 · 입력과 출력 형식 · ABL · 이마티닙 입력 예시

입력

```json
{
  "starting_protein_structure": "준비한 ABL PDB",
  "ligand_smiles": "Cc1ccc(NC(=O)c2ccc(CN3CC[NH+](C)CC3)cc2)cc1Nc1nccc(-c2cccnc2)n1"
}
```

출력

```json
{
  "updated_protein_xyz_A": null,
  "ligand_xyz_A": null,
  "confidence": null,
  "affinity_prediction": null
}
```

시작 구조를 받아 단백질·리간드 배치를 갱신합니다. 이 출력은 시간 순서의 MD 궤적이 아닙니다.

##### AlphaFold 3

미실행 · 실제 입력과 출력 형식 · ABL 구성체 293잔기 · 이마티닙 중원자 37개

입력

```json
{
  "protein": "1IEP ABL construct",
  "protein_sequence": "GAMDPSSPNYDKWEMERTDITMKHKLGGGQYGEVYEGVWKKYSLTVAVKTLKEDTMEVEEFLKEAAVMKEIKHPNLVQLLGVCTREPPFYIITEFMTYGNLLDYLRECNRQEVSAVVLLYMATQISSAMEYLEKKNFIHRDLAARNCLVGENHLVKVADFGLSRLMTGDTYTAHAGAKFPIKWTAPESLAYNKFSIKSDVWAFGVLLWEIATYGMSPYPGIDLSQVYELLEKDYRMERPEGCPEKVYELMRACWQWNPSDRPSFAEIHQAFETMFQESSISDEVEKELGKRGT",
  "ligand_smiles": "Cc1ccc(NC(=O)c2ccc(CN3CC[NH+](C)CC3)cc2)cc1Nc1nccc(-c2cccnc2)n1",
  "ligand_heavy_atoms": 37
}
```

출력

```json
{
  "complex_atom_xyz_A": null,
  "structure_confidence": null
}
```

현재 값은 입력 예시이며 공동 예측을 실행하지 않았습니다. 실제 출력 좌표·신뢰도 수치는 없습니다.

##### Boltz-2

미실행 · 실제 입력과 출력 형식 · ABL 구성체 293잔기 · 이마티닙 중원자 37개

입력

```json
{
  "protein": "1IEP ABL construct",
  "protein_sequence": "GAMDPSSPNYDKWEMERTDITMKHKLGGGQYGEVYEGVWKKYSLTVAVKTLKEDTMEVEEFLKEAAVMKEIKHPNLVQLLGVCTREPPFYIITEFMTYGNLLDYLRECNRQEVSAVVLLYMATQISSAMEYLEKKNFIHRDLAARNCLVGENHLVKVADFGLSRLMTGDTYTAHAGAKFPIKWTAPESLAYNKFSIKSDVWAFGVLLWEIATYGMSPYPGIDLSQVYELLEKDYRMERPEGCPEKVYELMRACWQWNPSDRPSFAEIHQAFETMFQESSISDEVEKELGKRGT",
  "ligand_smiles": "Cc1ccc(NC(=O)c2ccc(CN3CC[NH+](C)CC3)cc2)cc1Nc1nccc(-c2cccnc2)n1",
  "ligand_heavy_atoms": 37
}
```

출력

```json
{
  "complex_atom_xyz_A": null,
  "structure_confidence": null,
  "affinity_probability_binary": null,
  "affinity_pred_value": null
}
```

현재 값은 입력 예시이며 공동 예측을 실행하지 않았습니다. 실제 출력 좌표·신뢰도 수치는 없습니다. affinity_pred_value의 단위는 log10(IC50/μM)이며 낮을수록 강한 방향입니다.

##### Chai-1

미실행 · 실제 입력과 출력 형식 · ABL 구성체 293잔기 · 이마티닙 중원자 37개

입력

```json
{
  "protein": "1IEP ABL construct",
  "protein_sequence": "GAMDPSSPNYDKWEMERTDITMKHKLGGGQYGEVYEGVWKKYSLTVAVKTLKEDTMEVEEFLKEAAVMKEIKHPNLVQLLGVCTREPPFYIITEFMTYGNLLDYLRECNRQEVSAVVLLYMATQISSAMEYLEKKNFIHRDLAARNCLVGENHLVKVADFGLSRLMTGDTYTAHAGAKFPIKWTAPESLAYNKFSIKSDVWAFGVLLWEIATYGMSPYPGIDLSQVYELLEKDYRMERPEGCPEKVYELMRACWQWNPSDRPSFAEIHQAFETMFQESSISDEVEKELGKRGT",
  "ligand_smiles": "Cc1ccc(NC(=O)c2ccc(CN3CC[NH+](C)CC3)cc2)cc1Nc1nccc(-c2cccnc2)n1",
  "ligand_heavy_atoms": 37
}
```

출력

```json
{
  "complex_atom_xyz_A": null,
  "structure_confidence": null
}
```

현재 값은 입력 예시이며 공동 예측을 실행하지 않았습니다. 실제 출력 좌표·신뢰도 수치는 없습니다.

##### OpenFold3-preview2

미실행 · 실제 입력과 출력 형식 · ABL 구성체 293잔기 · 이마티닙 중원자 37개

입력

```json
{
  "protein": "1IEP ABL construct",
  "protein_sequence": "GAMDPSSPNYDKWEMERTDITMKHKLGGGQYGEVYEGVWKKYSLTVAVKTLKEDTMEVEEFLKEAAVMKEIKHPNLVQLLGVCTREPPFYIITEFMTYGNLLDYLRECNRQEVSAVVLLYMATQISSAMEYLEKKNFIHRDLAARNCLVGENHLVKVADFGLSRLMTGDTYTAHAGAKFPIKWTAPESLAYNKFSIKSDVWAFGVLLWEIATYGMSPYPGIDLSQVYELLEKDYRMERPEGCPEKVYELMRACWQWNPSDRPSFAEIHQAFETMFQESSISDEVEKELGKRGT",
  "ligand_smiles": "Cc1ccc(NC(=O)c2ccc(CN3CC[NH+](C)CC3)cc2)cc1Nc1nccc(-c2cccnc2)n1",
  "ligand_heavy_atoms": 37
}
```

출력

```json
{
  "complex_atom_xyz_A": null,
  "structure_confidence": null
}
```

현재 값은 입력 예시이며 공동 예측을 실행하지 않았습니다. 실제 출력 좌표·신뢰도 수치는 없습니다. 이 자료는 OpenFold3-preview2 범위입니다.

##### HOTPocket / hotpocketNN

미실행 · 입력과 출력 형식 · 복수 탐지기 후보를 선별하는 개념 예시

입력

```json
{
  "protein_structure": "준비한 단백질 PDB",
  "candidate_pockets": "원 논문의 7개 탐지기 등에서 얻은 후보 목록",
  "residue_features": "후보 잔기의 ESM-2 임베딩"
}
```

출력

```json
{
  "candidate_scores": null,
  "accepted_pockets": null,
  "clustered_pockets": null
}
```

HOTPocket 지도와 hotpocketNN 후보 선별 모델을 구분합니다. 값이 없는 것은 미실행을 뜻하며, 원 논문의 성능을 재현했다는 의미가 아닙니다.

##### Seq2Pocket

미실행 · 입력과 출력 형식 · 잔기별 예측에서 공간적 포켓으로 이어지는 예시

입력

```json
{
  "protein_sequence": "대상 단백질의 아미노산 서열",
  "protein_structure": "동일 단백질의 준비한 3D 구조",
  "residue_predictions": "미세조정 pLM의 잔기 점수·임베딩",
  "surface_points": "구조에서 계산한 SAS 점"
}
```

출력

```json
{
  "smoothed_residue_scores": null,
  "pocket_regions_3d": null
}
```

점수·구조·표면점은 파이프라인의 서로 다른 단계에서 쓰입니다. 후처리에 구조가 필요하며 새 단백질 좌표를 생성하는 출력이 아닙니다.

##### ProMoNet / ProMoSite

미실행 · 입력과 출력 형식 · 단백질·화합물 쌍에 조건을 건 부위 예측

입력

```json
{
  "protein_sequence": "대상 단백질의 아미노산 서열",
  "ligand_smiles": "CC(=O)Oc1ccccc1C(=O)O",
  "ligand_feature_preparation": "RDKit conformer → 거리·원자 특징",
  "protein_feature_preparation": "ESM-2 → 잔기·접촉 특징"
}
```

출력

```json
{
  "ligand_conditioned_residue_scores": null
}
```

SMILES는 아스피린의 입력 형식 예시일 뿐, 특정 단백질과의 결합을 확인한 결과가 아닙니다. ProMoSite를 실행하지 않았고 실제 예측 점수는 없습니다.

전체 기술 카드의 텍스트 요약

#### fpocket · 포켓 탐지

**입력:** 단백질 3D 구조
**출력:** 포켓 후보·중심·점수
**역할:** 기하학적 포켓 탐지
**사용 상황:** 구조에서 결합 공간 후보를 먼저 찾을 때

단백질 원자 사이의 알파 구를 선별하고 묶어 포켓 후보를 만듭니다.

**해석:** 현재 입력 구조의 공간을 읽습니다. 단백질을 열거나 특정 리간드의 결합 자세를 생성하지 않습니다.

[원리 장](../02-pocket-detection/) · [논문·공식 자료](https://github.com/Discngine/fpocket)

#### P2Rank · 포켓 탐지

**입력:** 단백질 3D 구조
**출력:** 포켓 후보·관련 잔기·순위
**역할:** 학습 기반 포켓 탐지
**사용 상황:** 표면의 화학 환경을 반영해 자리를 찾을 때

표면점 주변의 기하·물리화학 특징을 학습 모델로 평가한 뒤 유망한 점들을 포켓으로 묶습니다.

**해석:** 포켓의 probability는 특정 화합물–단백질 쌍의 결합 확률이나 친화도가 아닙니다.

[원리 장](../02-pocket-detection/) · [논문·공식 자료](https://github.com/rdk/p2rank)

#### DeepPocket · 포켓 탐지

**입력:** 단백질 구조 + fpocket 후보
**출력:** 후보 순위 + 포켓 마스크
**역할:** 후보 재평가·영역 분할
**사용 상황:** 후보를 CNN으로 재평가하고 범위를 정할 때

fpocket 후보 주변을 3D 복셀로 바꿔 CNN으로 순위를 매기고, 별도 분할 모델로 포켓 영역을 예측합니다.

**해석:** 처음 후보를 만드는 단계에 의존합니다. 포켓 마스크가 특정 리간드의 자세나 친화도를 뜻하지 않습니다.

[원리 장](../03-learning-pockets/) · [논문·공식 자료](https://github.com/devalab/DeepPocket)

#### GrASP · 포켓 탐지

**입력:** 단백질 표면·이웃 원자의 3D 정보
**출력:** 원자 점수 + 포켓 후보
**역할:** 원자 그래프 기반 탐지
**사용 상황:** 원자와 이웃 관계를 신경망으로 읽을 때

표면 원자와 주변 내부 원자를 그래프로 표현하고, 어텐션 기반 정보 전달로 표면 원자 점수를 얻어 후보를 군집화합니다.

**해석:** 이 장의 GrASP는 Graph Attention Site Prediction입니다. 단백질 모양의 시간 변화를 생성하는 모델은 아닙니다.

[원리 장](../03-learning-pockets/) · [논문·공식 자료](https://github.com/tiwarylab/GrASP)

#### HOTPocket / hotpocketNN · 포켓 탐지

**입력:** 단백질 3D 구조 + 여러 탐지기의 후보
**출력:** 후보별 점수·선별 포켓·통합 지도
**역할:** 후보 통합·학습 기반 선별
**사용 상황:** 여러 탐지기의 후보를 공통 기준으로 선별할 때

여러 탐지기에서 후보를 모은 뒤, 후보 잔기의 ESM-2 특징을 읽는 hotpocketNN으로 점수를 매깁니다. 선별한 후보를 묶어 HOTPocket 예측 지도를 구성합니다.

**해석:** HOTPocket은 데이터셋·파이프라인이고 hotpocketNN은 후보를 평가하는 모델입니다. 후보 결합이 항상 더 좋지는 않으며, 예측 지도는 실험 검증된 약물 표적 목록이 아닙니다.

[최근 연구 설명 →](../07-technology-summary/?view=frontiers&topic=ranking#step-1) · [논문·공식 자료](https://link.springer.com/article/10.1186/s13321-025-01125-x)

#### Seq2Pocket · 포켓 탐지

**입력:** 단백질 서열·잔기 점수 + 후처리용 3D 구조
**출력:** 보정한 잔기 점수 + 3D 포켓 영역
**역할:** 잔기 예측의 공간적 보정·포켓화
**사용 상황:** 흩어진 잔기 예측을 공간적으로 이어진 포켓으로 묶을 때

미세조정한 단백질 언어모델의 잔기별 예측에 이웃 잔기 임베딩을 활용한 보정을 적용합니다. 구조의 용매 접근 가능 표면(SAS) 점들을 군집화해 최종 3D 포켓을 만듭니다.

**해석:** 서열만으로 새로운 원자 좌표를 만드는 모델이 아닙니다. 공간적 보정·군집화에는 3D 구조가 필요하며, 최종 포켓 품질은 입력 구조와 학습·평가 조건의 영향을 받습니다.

[최근 연구 설명 →](../07-technology-summary/?view=frontiers&topic=geometry#step-1) · [논문·공식 자료](https://github.com/skrhakv/seq2pocket)

#### ProMoNet / ProMoSite · 포켓 탐지

**입력:** 단백질 서열 + 리간드 SMILES
**출력:** 해당 리간드에 대한 잔기별 부위 점수
**역할:** 리간드 조건부 결합 부위 예측
**사용 상황:** 특정 화합물이 어느 잔기들과 결합할지 예측할 때

ProMoNet의 부위 예측 모듈 ProMoSite는 단백질 잔기와 리간드 원자의 상호작용 표현을 학습합니다. ESM-2의 서열·접촉 특징과 RDKit conformer를 이용한 분자 특징을 결합해 잔기별 점수를 냅니다.

**해석:** 리간드 없이 포켓을 넓게 찾는 방법과 입력 조건이 다릅니다. RDKit 리간드 conformer를 사용하며, 3D 포켓 평가는 별도 구조 매핑을 거칩니다. ProMoBind의 친화도·동역학 예측은 별도 모듈입니다.

[최근 연구 설명 →](../07-technology-summary/?view=frontiers&topic=ligand#step-1) · [논문·공식 자료](https://link.springer.com/article/10.1186/s13321-026-01227-0)

#### PocketMiner · 숨은 포켓·움직임

**입력:** 한 개 단백질 3D 구조
**출력:** 잔기별 숨은 포켓 점수
**역할:** 숨은 포켓 가능 영역 예측
**사용 상황:** 어디가 열릴 법한지 후보를 좁힐 때

잔기와 공간상 이웃을 그래프로 읽어, 구조 변화로 포켓이 드러날 법한 영역에 점수를 매깁니다.

**해석:** 잔기별 점수는 열린 구조 좌표나 열리는 시간의 예측과 다릅니다. 실제 움직임 궤적을 출력하지 않습니다.

[원리 장](../04-cryptic-pockets/) · [논문·공식 자료](https://www.nature.com/articles/s41467-023-36699-3)

#### 분자동역학 (MD) · 숨은 포켓·움직임

**입력:** 초기 구조·환경·힘장·조건
**출력:** 시간 순서의 좌표·속도 궤적
**역할:** 힘과 운동으로 움직임 계산
**사용 상황:** 구조 변화와 포켓의 열림을 탐색할 때

원자 상호작용에서 힘을 계산하고, 운동 방정식을 짧은 시간 간격으로 수치 적분합니다. 궤적의 각 구조에서 포켓을 따로 분석할 수 있습니다.

**해석:** 샘플링과 힘장·환경 조건의 영향을 받습니다. 제한된 계산에서 안 열렸다고 숨은 포켓이 없다고 단정하지 않습니다.

[원리 장](../04-cryptic-pockets/) · [논문·공식 자료](https://docs.openmm.org/latest/userguide/theory/04_integrators.html)

#### Vina · 도킹

**입력:** 준비한 단백질·리간드·탐색 범위
**출력:** 리간드 자세 + 도킹 점수
**역할:** 근사 점수 기반 자세 탐색
**사용 상황:** 정한 범위에서 화합물의 자세를 탐색할 때

여러 시작 자세와 국소 개선을 조합해 탐색하고 근사 점수로 후보를 정리합니다. 선택한 곁사슬을 유연하게 설정할 수도 있습니다.

**해석:** 더 낮은 도킹 점수가 실측 친화도를 보장하지 않습니다. 선택 곁사슬 유연성과 수용체 백본 전체 갱신은 다릅니다.

[원리 장](../05-docking/) · [논문·공식 자료](https://autodock-vina.readthedocs.io/en/latest/docking_basic.html)

#### DiffDock (원본) · 도킹

**입력:** 고정 단백질 구조 + 리간드 정보
**출력:** 리간드 자세 + 자세 confidence
**역할:** 학습 기반 리간드 자세 생성
**사용 상황:** 고정 구조에서 학습 기반 자세 후보를 만들 때

고정한 단백질을 조건으로 리간드의 이동·회전·비틀림을 확산 방식으로 갱신하고, 별도의 confidence로 후보를 평가합니다.

**해석:** 원본 ICLR 2023/v1.0 범위입니다. 단백질은 고정이며 confidence는 친화도가 아닙니다. 후속 DiffDock-L과 구분합니다.

[원리 장](../05-docking/) · [논문·공식 자료](https://arxiv.org/abs/2210.01776)

#### DynamicBind · 도킹

**입력:** 시작 단백질 구조 + 리간드 정보
**출력:** 갱신 복합체·품질·친화도 예측
**역할:** 리간드·수용체 배치 갱신
**사용 상황:** 시작 구조를 리간드와 함께 조정할 때

리간드와 단백질 잔기의 이동·회전, 곁사슬 각도를 함께 갱신하고 복합체를 생성합니다. 구조 품질과 친화도는 별도로 예측합니다.

**해석:** 단백질이 움직여도 이 생성 단계는 MD 시간 궤적이 아닙니다. 입력 수용체 구조를 받는다는 점을 공동 구조 예측과 비교합니다.

[원리 장](../05-docking/) · [논문·공식 자료](https://www.nature.com/articles/s41467-024-45461-2)

#### AlphaFold 3 · 공동 구조 예측

**입력:** 서열·분자 정보, MSA·템플릿 등
**출력:** 복합체 원자 좌표 + 신뢰도
**역할:** 다양한 생체분자의 공동 구조 예측
**사용 상황:** 서열과 구성 요소에서 복합체를 만들 때

입력과 토큰 간 관계를 Pairformer로 처리하고, 확산 모듈로 복합체 원자 좌표를 공동 생성한 뒤 구조 confidence를 평가합니다.

**해석:** 표준 구조 신뢰도는 실험 단위 친화도나 결합 여부의 증명이 아닙니다. 템플릿 등 추가 정보를 썼는지도 기록합니다.

[원리 장](../06-cofolding/) · [논문·공식 자료](https://www.nature.com/articles/s41586-024-07487-w)

#### Boltz-2 · 공동 구조 예측

**입력:** 서열·분자·보조 정보·선택 요청
**출력:** 복합체·신뢰도·결합 분류·친화도
**역할:** 공동 구조 + 별도 결합 특성 예측
**사용 상황:** 구조와 작은 분자 결합 특성을 나눠 볼 때

토큰·쌍 관계와 확산 생성으로 구조를 예측합니다. 별도의 결합 분류·친화도 모듈을 사용할 수 있으며 서로 다른 출력입니다.

**해석:** affinity_pred_value는 log10(IC50/μM), 낮을수록 강한 방향입니다. 결합 분류·친화도 값·구조 confidence를 혼동하지 않습니다.

[원리 장](../06-cofolding/) · [논문·공식 자료](https://github.com/jwohlwend/boltz/blob/main/docs/prediction.md)

#### Chai-1 · 공동 구조 예측

**입력:** 서열·분자, 임베딩·선택적 제약
**출력:** 복합체 원자 좌표 + 신뢰도
**역할:** 보조 정보를 활용한 공동 구조 예측
**사용 상황:** MSA·접촉 등 주어진 힌트를 함께 쓸 때

단백질 언어모델 특징과 선택적 MSA·템플릿·접촉 정보를 처리해, trunk와 확산 모듈로 복합체를 생성하고 품질을 평가합니다.

**해석:** MSA 없이 실행할 수 있다는 것과 같은 정확도라는 것은 다릅니다. 제공한 접촉 정보를 독립적으로 알아낸 사실로 해석하지 않습니다.

[원리 장](../06-cofolding/) · [논문·공식 자료](https://github.com/chaidiscovery/chai-lab)

#### OpenFold3-preview2 · 공동 구조 예측

**입력:** 서열·분자, MSA·템플릿 등
**출력:** 복합체 원자 좌표 + 신뢰도
**역할:** 공동 구조 예측·학습 재현 기반
**사용 상황:** 공개 구현·자료로 재현과 개선을 검토할 때

AF3 계열의 관계 처리와 원자 확산을 공개 재구현합니다. 코드·가중치·학습 및 평가 자료가 연구 재현의 기반이 됩니다.

**해석:** 이 자료는 OF3p2 범위입니다. 6장에서 확인한 현재 기본 OpenBind-0와 구분하고, 패키지·가중치·자료 버전을 함께 고정합니다.

[원리 장](../06-cofolding/) · [논문·공식 자료](https://portal.openfold.omsf.io/reports/of3p2_technical_report.pdf)

## 4. 가진 입력과 풀려는 질문에서 출발합니다

### 단백질 구조는 있는데, 어디가 포켓일까?

상황별 선택을 글로 모아 보기

- **구조에서 포켓 찾기:** 기존 fpocket·P2Rank·DeepPocket·GrASP에 HOTPocket/hotpocketNN의 후보 선별과 Seq2Pocket의 공간적 포켓화를 함께 비교합니다. 특정 화합물의 자세가 필요할 때 도킹 질문으로 이어갑니다.

- **숨은 포켓 탐색:** PocketMiner의 잔기별 예측과 MD의 시간 궤적을 구분합니다. 필요에 따라 MD 프레임에 포켓 검출기를 적용할 수 있습니다.

- **특정 화합물의 자세:** Vina·원본 DiffDock·DynamicBind를 입력 구조와 수용체 유연성, 출력 점수의 정의에 맞춰 비교합니다.

- **서열과 분자에서 부위·복합체 예측:** ProMoSite의 리간드별 잔기 점수와 공동 예측 모델의 복합체 좌표를 구분합니다.  AlphaFold 3·Boltz-2·Chai-1·OF3p2의 구성 요소 입력과 MSA·템플릿·제약 조건, 모델 버전을 확인합니다.

- **친화도 확인:** Boltz-2·DynamicBind의 별도 친화도 출력은 구조 confidence와 다릅니다. 단위와 적용 범위를 확인하고 실험과 대조합니다.

## 5. 같은 점수처럼 보여도 질문이 다릅니다

### 이 공간이 결합 부위처럼 보일까?

포켓 가능성 ≠ 자세 품질 ≠ 친화도 ≠ 약효

출력 점수의 차이를 글로 모아 보기

- **포켓 점수:** 공간·표면점·잔기의 결합 부위 관련성을 평가합니다. 특정 화합물의 결합 확률이나 친화도와 구분합니다.

- **도킹 점수:** 자세를 근사 함수로 평가한 값입니다. 같은 함수와 조건에서 해석하며 실측 결합 자유에너지로 등치하지 않습니다.

- **구조 신뢰도:** 생성한 자세·국소 구조·상대 배치의 예상 품질입니다. PAE와 pLDDT처럼 증가 방향도 다를 수 있습니다.

- **결합 분류·친화도:** 별도 예측입니다. Boltz-2의 log10(IC50/μM)는 낮을수록 강한 방향이며, y=0은 1 μM, y=−3은 1 nM에 해당합니다. 이 산술 예제는 특정 약물의 예측 결과가 아닙니다.

## 6. 핵심 정리와 관찰 메모

- 01 **먼저, 내가 가진 입력을 확인합니다.**

서열인지, 준비된 3D 구조인지, 어떤 리간드·보조 정보가 있는지 봅니다.

- 02 **찾는 출력이 무엇인지 정합니다.**

포켓 영역, 잔기 점수, 리간드 자세, 궤적, 복합체 좌표는 서로 다릅니다.

- 03 **기술은 대안이 되기도 하고 연결되기도 합니다.**

PocketMiner의 후보를 MD로 탐색하거나, 포켓을 찾은 뒤 도킹할 수 있지만 전부 실행할 필요는 없습니다.

- 04 **점수의 질문과 한계를 함께 읽습니다.**

구조 상태·샘플링·입력 힌트·모델 버전과 검증 조건을 기록합니다.

기술 이름을 외우기보다, 입력 → 질문 → 출력을 연결합니다.

[1장 · 포켓 기초부터 읽기 →](../01-pocket-basics/)
[전체 목차 보기 →](../)

## 출처와 자료 범위

출처·버전·요약 범위

상세 2–6장에서 확인한 원 논문·공식 문서와 고정 구현을 바탕으로 12개 도구·모델과 분자동역학(MD)을 요약했습니다. 이 장에서 새 모델 추론이나 MD·도킹을 실행하지 않았습니다. 그림은 설명용이며 성능 순위를 만들지 않습니다.

각 기술의 입력·출력은 대표 설정입니다. DiffDock은 원본 ICLR 2023/v1.0, OpenFold3는 preview2 범위로 읽습니다. Vina의 선택 곁사슬 유연성, DynamicBind의 시작 구조 갱신, 공동 구조 예측의 템플릿 사용 가능성을 구분합니다. GrASP는 Smith 등의 Graph Attention Site Prediction입니다.

‘이럴 때 사용’은 기능과 입력 조건을 연결한 학습용 예시입니다. 특정 데이터에서 다른 방법보다 우수하다고 검증한 결론이나 공식 프로젝트의 실험 지침이 아닙니다.

- [fpocket · 논문·공식 자료](https://github.com/Discngine/fpocket) · [상세 장의 설명](../02-pocket-detection/)

- [P2Rank · 논문·공식 자료](https://github.com/rdk/p2rank) · [상세 장의 설명](../02-pocket-detection/)

- [DeepPocket · 논문·공식 자료](https://github.com/devalab/DeepPocket) · [상세 장의 설명](../03-learning-pockets/)

- [GrASP · 논문·공식 자료](https://github.com/tiwarylab/GrASP) · [상세 장의 설명](../03-learning-pockets/)

- [HOTPocket / hotpocketNN · 논문·공식 자료](https://link.springer.com/article/10.1186/s13321-025-01125-x) · [상세 장의 설명](../07-technology-summary/?view=frontiers&topic=ranking#step-1)

- [Seq2Pocket · 논문·공식 자료](https://github.com/skrhakv/seq2pocket) · [상세 장의 설명](../07-technology-summary/?view=frontiers&topic=geometry#step-1)

- [ProMoNet / ProMoSite · 논문·공식 자료](https://link.springer.com/article/10.1186/s13321-026-01227-0) · [상세 장의 설명](../07-technology-summary/?view=frontiers&topic=ligand#step-1)

- [PocketMiner · 논문·공식 자료](https://www.nature.com/articles/s41467-023-36699-3) · [상세 장의 설명](../04-cryptic-pockets/)

- [분자동역학 (MD) · 논문·공식 자료](https://docs.openmm.org/latest/userguide/theory/04_integrators.html) · [상세 장의 설명](../04-cryptic-pockets/)

- [Vina · 논문·공식 자료](https://autodock-vina.readthedocs.io/en/latest/docking_basic.html) · [상세 장의 설명](../05-docking/)

- [DiffDock (원본) · 논문·공식 자료](https://arxiv.org/abs/2210.01776) · [상세 장의 설명](../05-docking/)

- [DynamicBind · 논문·공식 자료](https://www.nature.com/articles/s41467-024-45461-2) · [상세 장의 설명](../05-docking/)

- [AlphaFold 3 · 논문·공식 자료](https://www.nature.com/articles/s41586-024-07487-w) · [상세 장의 설명](../06-cofolding/)

- [Boltz-2 · 논문·공식 자료](https://github.com/jwohlwend/boltz/blob/main/docs/prediction.md) · [상세 장의 설명](../06-cofolding/)

- [Chai-1 · 논문·공식 자료](https://github.com/chaidiscovery/chai-lab) · [상세 장의 설명](../06-cofolding/)

- [OpenFold3-preview2 · 논문·공식 자료](https://portal.openfold.omsf.io/reports/of3p2_technical_report.pdf) · [상세 장의 설명](../06-cofolding/)

자세한 원리는 [2장](../02-pocket-detection/) · [3장](../03-learning-pockets/) · [4장](../04-cryptic-pockets/) · [5장](../05-docking/) · [6장](../06-cofolding/)에서 이어 볼 수 있습니다. 원래 출처 목록의 해시를 보존해 이 요약이 참조한 버전을 추적할 수 있게 했습니다.

[전체 요약 원고](lesson.md) · [16개 기술 비교 데이터](methods.json) · [참조 자료·해시](source-manifest.json)
