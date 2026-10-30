# 6장 · 단백질과 리간드를 함께 예측하면 무엇이 달라질까?

[조작 가능한 그림과 함께 보기](https://chahero.github.io/abstain-dti-learning/pocket-structure/06-cofolding/)

SVG는 원리 설명용이며 11단계는 실제 ABL–이마티닙 입력 자료입니다. 네 모델의 새 예측 결과가 아니며 추론·친화도 계산·학습을 실행하지 않았습니다.

## 1. co-folding은 무엇일까?

### 서로를 고려한 3차원 복합체

**co-folding(공동 구조 예측)**은 여러 구성 요소를 한 시스템에 넣고, 이들이 함께 있을 때의 **3차원 구조와 상대 배치**를 예측하는 접근입니다. 이번 장은 단백질과 작은 분자 리간드를 중심으로 봅니다.

예를 들어 **단백질 서열 + 이마티닙의 분자 정보**를 넣고, 단백질 원자들과 리간드 원자들이 어디에 놓일지 함께 예측합니다. 미리 완성된 단백질 좌표가 필수 입력인 방식과 출발점이 다릅니다.

이름에 folding이 들어가도, 작은 분자가 단백질처럼 새 사슬로 접힌다는 뜻은 아닙니다. 리간드의 연결은 주어진 채, 내부 형태와 상대 위치 등을 예측합니다. 서열이나 새로운 약물을 설계하는 작업과도 구분합니다.

질문은 “이 구성 요소들이 함께 있으면 어떤 구조일까?”입니다.

## 2. 서열과 SMILES는 어떻게 모델에 들어갈까?

### 문자 입력과 3D 좌표는 다릅니다

단백질에는 **아미노산 서열**, 리간드에는 **SMILES나 CCD 식별자** 등을 줍니다. SMILES는 원자의 연결·결합·전하 등의 정보를 담으며, 결합한 복합체의 정답 좌표를 알려주는 문자열은 아닙니다.

**토큰(token)**은 모델이 정보를 묶어 다루는 단위입니다. AlphaFold 3의 일반적인 단백질 잔기는 잔기 단위로, 작은 분자 리간드는 원자 단위로 표현합니다. 비표준 잔기 등에는 예외가 있습니다.

관계를 계산하는 요약 단위와 최종 좌표의 단위는 같지 않습니다. 잔기 하나를 한 토큰으로 다루더라도, 구조 생성에서는 그 안의 여러 원자를 배치할 수 있습니다.

입력은 구성 요소의 정보이고, 출력은 원자들의 좌표입니다.

## 3. MSA와 템플릿은 어떤 힌트일까?

### 추가 단서를 주되 정답과 구분합니다

**MSA**는 Multiple Sequence Alignment, 즉 **여러 관련 서열을 대응시킨 정렬**입니다. 어떤 위치가 잘 보존되고 어떤 위치들이 함께 달라지는지 등의 단서를 제공합니다. 리간드의 정답 위치를 직접 주는 것은 아닙니다.

**템플릿(template)**은 참고할 기존 3D 구조입니다. 모양의 단서가 될 수 있지만, 새 리간드가 붙었을 때도 그 구조가 정답이라는 보장은 없습니다.

보조 정보 사용법은 기술과 설정마다 다릅니다. 예컨대 Chai-1은 MSA 없는 모드도 지원하지만, 공식 구현은 더 나은 성능을 위해 MSA 사용을 권장합니다. “실행 가능”과 “같은 정확도”는 구분해야 합니다.

같은 서열도 어떤 힌트를 주었는지에 따라 예측 조건이 달라집니다.

## 4. 관계를 배우고 좌표를 만드는 과정

### 관계 표현 → 좌표 생성 → 품질 평가

**임베딩**은 원자·잔기·보조 정보를 숫자 특징으로 바꾼 것입니다. **pair representation**은 토큰 i와 j의 관계를 담는 내부 특징입니다. 단백질 내부와 단백질–리간드 사이의 관계도 이 표현에서 다룰 수 있습니다.

이 정보를 처리하는 중심 신경망을 흔히 **trunk**라고 부릅니다. AlphaFold 3의 **Pairformer**는 토큰과 토큰 쌍 표현을 갱신하는 중심 모듈입니다. 관계 표현 자체가 최종 구조나 친화도 점수는 아닙니다.

다음으로 **확산 기반 생성 모듈**이 학습한 구조의 패턴을 바탕으로 원자 좌표 후보를 만듭니다. 별도의 **confidence 모듈**은 생성한 구조가 얼마나 믿을 만한지 평가합니다.

구조를 만드는 부분과, 그 구조를 평가하는 부분을 나눠 봅니다.

## 5. AlphaFold 3는 어떻게 복합체를 만들까?

### 다른 종류의 분자를 한 시스템에서

**AlphaFold 3**는 단백질뿐 아니라 DNA·RNA·작은 분자·이온 등으로 이뤄진 복합체의 구조를 다룹니다. 입력 특징과 MSA·템플릿 정보를 처리하고, Pairformer를 통해 구성 요소 간 관계를 갱신합니다.

구조 생성에서는 **전 원자 좌표에 확산 모델**을 적용합니다. 단백질을 완성한 뒤 리간드만 옮기는 것으로 제한하지 않고, 여러 구성 요소의 좌표를 같은 복합체 안에서 예측합니다.

여러 seed·sample로 후보를 만들고, **pLDDT·PAE·ipTM 등**으로 품질을 평가합니다. AF3의 구조 신뢰도는 리간드가 얼마나 강하게 결합하는지를 실험 단위로 알려주는 친화도 출력이 아닙니다.

AF3의 핵심은 다양한 구성 요소의 공동 좌표 생성입니다.

[Abramson et al., Nature (2024)](https://www.nature.com/articles/s41586-024-07487-w) · [공식 출력 설명](https://github.com/google-deepmind/alphafold3/blob/main/docs/output.md)

## 6. Boltz-2는 구조 예측에 무엇을 더할까?

### 구조와 별도의 결합 특성 출력

**Boltz-2**도 토큰·쌍 특징을 처리하고 확산 기반으로 복합체 원자 좌표를 생성합니다. 단백질 서열과 작은 분자 정보에 MSA, 템플릿, 포켓·접촉 조건 등을 조합할 수 있습니다.

생성 구조의 품질을 평가하는 출력 외에, 작은 분자–단백질에 대한 **결합 가능성 분류**와 **친화도 값 예측**을 제공합니다. 이 둘은 주로 서로 다른 데이터와 감독 신호로 학습되므로 역할을 구분해야 합니다.

공식 구현에는 생성 중 물리적 타당성을 개선하기 위한 선택적 **potentials(유도 항)**도 있습니다. 좌표 후보를 여러 개 만든다고 해서 실제 평형 상태의 비율이나 물리적 시간 궤적이 자동으로 얻어지는 것은 아닙니다.

구조의 confidence와 친화도 예측은 서로 다른 출력입니다.

[Passaro et al., Boltz-2 (2025)](https://doi.org/10.1101/2025.06.14.659707) · [공식 예측 문서](https://github.com/jwohlwend/boltz/blob/main/docs/prediction.md)

## 7. Boltz-2의 친화도 숫자는 어떻게 읽을까?

### 이 출력은 pAffinity와 방향이 다릅니다

공식 문서에서 affinity_pred_value는 **y = log₁₀(IC₅₀ / μM)**로 정의합니다. 예를 들어 y = 0이면 1 μM, y = −3이면 0.001 μM = 1 nM에 해당합니다. **더 낮은 값이 더 강한 결합 예측 방향**입니다.

앞서 배운 −log 형태와 헷갈리지 마세요. 같은 IC₅₀ 값을 기준으로 환산하면 **pIC₅₀ = 6 − y**입니다. 이 식은 단위 환산이며, kcal/mol의 에너지 점수로 바꾸는 식이 아닙니다.

affinity_probability_binary는 별도의 결합자 분류 출력입니다. 친화도 수치와 같지 않으며, 구조 ipTM과도 다릅니다. 문서는 친화도 값 비교를 주로 **활성 분자들 사이의 최적화**에 쓰도록 안내합니다.

IC₅₀는 실험 조건의 영향을 받는 억제 농도입니다. 모델의 예측값을 실측 Kd나 검증된 실험 결합 확률과 동일하게 해석하지 않습니다.

단위와 증가 방향을 먼저 확인합니다.

## 8. Chai-1은 추가 힌트를 어떻게 사용할까?

### 서열 특징과 실험 단서를 함께

**Chai-1**은 여러 종류의 생체분자를 함께 다루는 구조 예측 모델입니다. 공식 추론 코드는 입력 특징·토큰 쌍을 처리하는 trunk, 확산 모듈, confidence 모듈로 이어집니다.

단백질 언어모델의 **서열 임베딩**을 활용할 수 있고, MSA·템플릿도 넣을 수 있습니다. 기본 CLI는 MSA·템플릿 없이 임베딩을 쓰지만, 연구 조건 비교에서는 어떤 모드를 썼는지 밝혀야 합니다.

**restraint(제약·유도 정보)**는 “이 두 잔기는 가까워야 한다”, “이 사슬이 이 잔기 부근에 접촉한다” 같은 추가 단서입니다. 구조 예측을 유도하는 입력이지, 모델이 그 사실을 독립적으로 알아냈다는 증거가 아닙니다.

예측 성능을 읽을 때, 모델에 준 힌트도 함께 봅니다.

[Chai-1 기술 보고서](https://doi.org/10.1101/2024.10.10.615955) · [공식 제약 입력 예제](https://github.com/chaidiscovery/chai-lab/tree/main/examples/restraints)

## 9. OpenFold3는 무엇을 재현하려는 걸까?

### AF3 계열을 재현 가능한 기반으로

**OpenFold3**는 OpenFold 컨소시엄과 AlQuraishi 연구실이 개발하는 생체분자 구조 예측 프로젝트입니다. 이 장은 **preview2** 보고서를 기준으로 AF3 계열 입력 특징·관계 처리·원자 좌표 생성을 이해합니다.

예측만 아니라 **학습 코드·가중치·학습 및 평가 자료**를 함께 공개해, 학습 재현과 개선의 기반을 제공하는 것이 중요한 특징입니다. AF3에서 착안한 공개 재구현이지, Google의 학습된 AF3 가중치 그 자체가 아닙니다.

2026년 10월 29일 공식 문서를 확인했을 때 **OpenFold3 패키지 ≥0.5의 기본 가중치는 OpenBind-0**입니다. OF3p2는 이전 호환 버전이 필요합니다. 같은 패키지 이름으로 실행했다고 같은 모델 실험이 되는 것은 아닙니다.

패키지·체크포인트·데이터 버전을 묶어서 읽습니다.

[OF3p2 기술 보고서](https://portal.openfold.omsf.io/reports/of3p2_technical_report.pdf) · [현재 공식 저장소](https://github.com/aqlaboratory/openfold-3) · [공개 학습 데이터](https://registry.opendata.aws/openfold3/)

## 10. 도킹과 co-folding의 차이는 어디에 있을까?

### AI 여부보다, 주어진 구조와 움직이는 대상을

**고정 수용체 도킹**에서는 준비된 단백질 좌표가 출발점이고, 그에 대한 리간드 자세를 찾습니다. Vina는 선택 곁사슬을 유연하게 설정할 수도 있으며, 원본 DiffDock은 AI 모델이지만 수용체는 고정합니다.

**DynamicBind**는 시작 단백질 구조를 받아 리간드와 수용체 잔기 배치를 함께 조정합니다. 따라서 “단백질이 움직이면 모두 co-folding”이라고 나누면 앞 장과 충돌합니다.

이번 장의 AF3 계열은 **단백질 서열과 구성 요소 정보를 기본으로 복합체 좌표를 생성**할 수 있습니다. 선택적으로 템플릿 등을 쓸 수 있으므로 “구조 정보를 전혀 사용하지 않는다”는 뜻도 아닙니다.

입력, 갱신하는 좌표, 보조 조건을 기준으로 비교합니다.

## 11. 같은 ABL–이마티닙을 넣는다면?

### 실제 분자 정보와 단백질 서열

앞 장과 같은 **c-Abl kinase domain–imatinib**입니다. 왼쪽은 이마티닙의 원자 연결이며, 오른쪽은 RCSB 1IEP의 단백질 구성체 서열과 분자 표현입니다.

**단백질 서열 · 293잔기**: GAMDPSSPNYDKWEMERTDITMKHKLGGGQYGEVYEGVWKKYSLTVAVKTLKEDTMEVEEFLKEAAVMKEIKHPNLVQLLGVCTREPPFYIITEFMTYGNLLDYLRECNRQEVSAVVLLYMATQISSAMEYLEKKNFIHRDLAARNCLVGENHLVKVADFGLSRLMTGDTYTAHAGAKFPIKWTAPESLAYNKFSIKSDVWAFGVLLWEIATYGMSPYPGIDLSQVYELLEKDYRMERPEGCPEKVYELMRACWQWNPSDRPSFAEIHQAFETMFQESSISDEVEKELGKRGT

**SMILES · 중원자 37개 · 전하 +1**: `Cc1ccc(NC(=O)c2ccc(CN3CC[NH+](C)CC3)cc2)cc1Nc1nccc(-c2cccnc2)n1`

**도킹:** 준비된 단백질 3D 좌표 + 리간드를 줍니다.
**공동 예측:** 서열 + 리간드 정보에서 복합체를 생성하도록 요청할 수 있습니다. MSA와 템플릿 등의 조건은 별도로 기록합니다.

표시 서열은 1IEP 실험 구성체의 polymer sequence이며, 사람 ABL1 전체 서열이나 관측 Cα만 이어 붙인 서열이 아닙니다. SDF의 양성자화 상태를 유지해 SMILES의 [NH+]와 총 전하 +1을 보존했습니다.

같은 대상을 보더라도, 입력 조건은 다를 수 있습니다.

[RCSB 1IEP](https://www.rcsb.org/structure/1IEP) · [서열·분자 표시 데이터](assets/abl-imatinib-input.json) · [5장 공식 도킹 예제](../05-docking/#step-5)

## 12. 신뢰도는 구조의 어느 부분을 말할까?

### 국소 모양과 상대 배치를 나눠 보기

**pLDDT**는 국소 구조 품질에 대한 예측입니다. AF3에서는 원자별로 제공하며, 리간드의 경우 주변 polymer와의 거리 품질을 평가하는 수정된 정의를 사용합니다. 단백질 부위의 높은 pLDDT만으로 리간드 자세가 옳다고 확정하지 않습니다.

**PAE**는 한 토큰을 기준으로 맞췄을 때 다른 토큰의 위치에 예상되는 오차입니다. 단위는 Å이며 **낮을수록 상대 배치에 자신 있다**는 방향입니다.

**ipTM**은 구성 요소 사이 상대 배치 품질에 대한 신뢰도입니다. 단백질–리간드를 볼 때는 해당 사슬 쌍이나 인터페이스에 맞는 출력을 확인합니다. 전 복합체의 평균 하나로 원하는 접촉을 대신 평가하지 않습니다.

어느 위치·관계에 대한 confidence인지 먼저 묻습니다.

## 13. 네 기술을 같은 기준으로 비교합니다

공통점은 **여러 구성 요소를 조건으로 복합체 좌표를 생성**한다는 것입니다. 차이는 대표적인 학습·입력 구성, 추가 출력, 공개 범위와 버전에 있습니다. 아래 표는 정확도 순위가 아닙니다.

논문·공식 문서 기준의 기능 비교 · 2026-10-29 확인

| 비교 질문 | AlphaFold 3 | Boltz-2 | Chai-1 | OpenFold3-preview2 |
| --- | --- | --- | --- | --- |
| 좌표는 어떻게? | Pairformer 관계 처리 + 전 원자 확산 | 토큰·쌍 표현 + 공동 좌표 확산 | trunk 처리 + 공동 좌표 확산 | AF3 계열 공개 재구현 + 공동 좌표 확산 |
| 대표 입력·힌트 | 서열·분자, MSA·템플릿 | 서열·분자, MSA·템플릿·조건 | 서열·분자, PLM 임베딩, 선택적 MSA·템플릿·제약 | 서열·분자, AF3 계열 MSA·템플릿 |
| 작은 분자 친화도? | 표준 구조 출력에 실험 단위 친화도 없음 | 별도 분류·친화도 예측 모듈 | 본 장의 표준 구조 출력과 구분 | 본 장의 OF3p2 표준 구조 출력과 구분 |
| 읽을 때 중점 | 공동 생성과 구조 신뢰도 | 구조 품질·결합 분류·친화도의 분리 | 어떤 임베딩·힌트를 줬는지 | 학습 재현 기반·체크포인트 |
| 버전 경계 | AF2·AF-Multimer와 구분 | Boltz-1·후속 서비스 버전과 구분 | Chai-2의 분자 설계와 구분 | 현재 기본 OpenBind-0와 구분 |

PLM: Protein Language Model, 단백질 언어모델. 표의 예측 기능은 본 장의 모델 범위에 대한 것이며, 후속 모델이나 별도 파이프라인 전체를 부정하는 표가 아닙니다.

## 14. 함께 예측했으니 정답이라고 믿어도 될까?

### 구조, 조건, 실험을 함께 확인합니다

화려한 그림이라도 원자 충돌·입체화학·비현실적 결합을 확인해야 합니다. 정답 구조가 있다면 **공통 단백질 정렬과 원자 대응 조건**을 정해 리간드 RMSD 등을 비교합니다.

seed와 sample을 바꿔 후보를 여럿 얻을 수 있습니다. **여러 후보가 비슷하다**는 것은 반복의 일관성에 대한 단서지만 정답의 증명은 아닙니다. 샘플의 빈도를 곧바로 실제 결합 확률·평형 점유율로 읽지 않습니다.

이미 알려진 리간드가 있는 구조, 처음 보는 골격·타겟, 사용 가능한 템플릿 조건은 서로 다른 평가입니다. 정답에서 포켓·접촉 힌트를 만들었다면 그 조건도 공개해야 공정하게 비교할 수 있습니다.

공동 구조 예측은 유용한 가설을 만듭니다. 검증을 대체하지는 않습니다.

## 15. 핵심 정리와 관찰 메모

- 01 **co-folding은 구성 요소를 함께 고려한 구조 예측입니다.**

서열·분자 정보에서 복합체 좌표를 만들 수 있지만 실제 접힘 시간 경로는 아닙니다.

- 02 **관계 표현, 좌표 생성, 품질 평가를 나눠 봅니다.**

네 기술은 공통 기반을 공유하면서 입력 힌트·학습·추가 출력이 다릅니다.

- 03 **도킹과는 입력과 갱신하는 좌표로 비교합니다.**

유연 도킹·공동 구조 예측은 일부 겹치며, AI 여부로 단순히 나누지 않습니다.

- 04 **구조 신뢰도, 결합 분류, 친화도는 다른 질문입니다.**

높은 confidence도 실험 결합·약효·보정된 확률을 자동으로 보장하지 않습니다.

무엇을 입력했고, 어떤 좌표와 점수를 예측했는지 확인합니다.

[전체 목차로 돌아가기 →](../) · [5장 도킹과 다시 비교하기 →](../05-docking/)

## 출처와 자료 범위

출처·용어·자료의 범위

모든 SVG 원리 그림은 직접 만든 설명용 도식입니다. 좌표 생성의 중간 단계는 MD 시간이나 실제 접힘·결합 경로가 아닙니다. 네 모델의 새 추론·친화도 계산·학습을 실행하지 않았고, 가중치나 대형 학습 데이터를 받지 않았습니다.

11단계만 실제 입력 자료를 사용합니다. RCSB 1IEP 구성체 서열과 5장 공식 Vina 예제 SDF를 재사용했으며, RDKit은 분자 파싱·SMILES 및 2D 그림 생성에만 사용했습니다. 이 장의 그림을 AF3·Boltz-2·Chai-1·OF3p2의 계산 결과로 해석하지 않습니다.

범위: AlphaFold 3 (2024), Boltz-2 (2025), Chai-1 (2024), OpenFold3-preview2 기술 보고서. 공식 구현은 2026-10-29 확인한 커밋을 보존했습니다. 현재 OpenFold3의 기본 OpenBind-0와 OF3p2를 구분합니다. Chai-1의 원리는 공식 추론 코드·문서와 대조했으며, 기술 보고서 본문 접근이 제한된 부분을 추측해 세부 층 수나 학습 성능을 추가하지 않았습니다.

**co-folding**: 여러 구성 요소의 복합체 좌표를 공동으로 예측하는 접근

**MSA**: Multiple Sequence Alignment · 관련 서열들의 정렬

**토큰**: 모델의 요약 처리 단위. 최종 원자 좌표와 구분

**trunk**: 입력과 관계 표현을 처리하는 중심 신경망

**확산 생성**: 교란된 좌표 복원을 학습해 구조 후보를 생성하는 접근

**restraint**: 접촉·거리 등 예측에 주는 추가 단서

**checkpoint**: 학습된 특정 시점의 모델 가중치

- [Abramson et al., Accurate structure prediction of biomolecular interactions with AlphaFold 3, Nature (2024)](https://www.nature.com/articles/s41586-024-07487-w) · [공식 코드](https://github.com/google-deepmind/alphafold3) · [입력](https://github.com/google-deepmind/alphafold3/blob/main/docs/input.md) · [출력](https://github.com/google-deepmind/alphafold3/blob/main/docs/output.md)

- [Passaro et al., Boltz-2: Towards Accurate and Efficient Binding Affinity Prediction (2025)](https://doi.org/10.1101/2025.06.14.659707) · [공식 구현](https://github.com/jwohlwend/boltz) · [출력과 단위](https://github.com/jwohlwend/boltz/blob/main/docs/prediction.md). pIC₅₀ = 6 − y는 로그와 μM→M 단위 변환으로 직접 도출했으며 에너지 단위로 바꾸지 않았습니다.

- [Chai Discovery, Chai-1: Decoding the molecular interactions of life (2024)](https://doi.org/10.1101/2024.10.10.615955) · [공식 구현](https://github.com/chaidiscovery/chai-lab) · [추론 처리](https://github.com/chaidiscovery/chai-lab/blob/main/chai_lab/chai1.py) · [추가 조건](https://github.com/chaidiscovery/chai-lab/tree/main/examples/restraints)

- [OpenFold3-preview2 Technical Report](https://portal.openfold.omsf.io/reports/of3p2_technical_report.pdf) · [현재 공식 저장소](https://github.com/aqlaboratory/openfold-3) · [가중치 버전](https://github.com/aqlaboratory/openfold-3/blob/main/docs/source/parameters_reference.md) · [학습 자료](https://registry.opendata.aws/openfold3/)

- [RCSB 1IEP](https://www.rcsb.org/structure/1IEP) · [서열 원본](https://www.rcsb.org/fasta/entry/1IEP/display) · [5장 공식 Vina 예제 라이선스](../05-docking/assets/official-vina/LICENSE)

본 장의 기능 비교는 공식 성능 비교나 새 벤치마크 결과가 아닙니다. 코드·논문·문서의 버전과 출처는 아래에 기록했습니다.

[전체 학습 원고](lesson.md) · [출처·버전·해시](source-manifest.json) · [실제 입력 표시 데이터](assets/abl-imatinib-input.json)
