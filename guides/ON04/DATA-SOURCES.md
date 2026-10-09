# 데이터·도구 출처와 계산 범위

canonical P00519 / AF-P00519-F1(v6) 1130잔기를 선택했다. live API의 isoform2 1149잔기와 합치지 않았다. AF PDB의 CA B-factor를 confidenceScore JSON과 atol0.02로 대조했다. PAE 원본1130×1130, 행=aligned residue/열=error residue convention. 영상32×32 bin 평균이며 원본·bin 경계를 보존한다.

P2Rank 2.5.1 공식 release / MIT, 프로젝트 내 portable Adoptium Java17 사용. 시스템 Java 변경 없음. alphafold profile에 bfactor feature 제외. top pocket25잔기, score18.04/site probability0.742, 평균 pLDDT86.704, 최소60.09, <70비율4/25=0.16. 원본 pocket25×25 PAE 대각선 포함 평균3.6144Å. 전체 CA 평균63.3661327434이며 API 표시값63.38과 집계 소수점/표시 범위를 구분한다. 이 값들을 특정 약물 결합 확률로 해석하지 않는다.

1IEP chainA/STI heavy atoms와 각 잔기 heavy atoms 최단거리≤5Å를 주변 부위 기준으로 사용했다. 관찰 CA274개, local sequence mapping270개 중 exact269, unmapped4/mismatch1. 대표 서열 대응229–498. 주변 매핑28개, top pocket교집합18, 주변 평균pLDDT90.1967857143. 이 거리 정의는 친화도나 탐지 정확도 실험이 아니다. 잔기 번호를 직접 복사하지 않고 정렬 정책·불일치를 보존했다.

AF 구조 DB는 CC-BY4.0 출처를 표시한다. RCSB PDB accession과 ligand/chain 정의를 연결한다. 한 대표 타겟만 계산했으며 wild-type 값을 DAVIS 변이 서열에 복사하지 않았다. 전체 DAVIS 구조 ablation은 정확한 서열 매핑·결측 정책을 준비한 뒤 수행한다. 실험 구조 존재 feature의 관측 편향도 남긴다.

다운로드 원본 URL·해시: data/cache/next-two/2026-10-08/sources.json. 프로젝트 전용 .venv 사용. 원본 구조·가중치·표현·원시 예측·raw ASR을 보존한다.

- [AlphaFold DB / P00519](https://alphafold.ebi.ac.uk/entry/P00519)
- [AlphaFold FAQ](https://alphafold.ebi.ac.uk/faq)
- [EBI pLDDT](https://www.ebi.ac.uk/training/online/courses/analysing-evaluating-macromolecular-models/global-quality-assessment/key-global-validation-metrics/metrics-based-on-experimental-data-fit/key-things-alphafold/)
- [EBI PAE](https://www.ebi.ac.uk/training/online/courses/alphafold/inputs-and-outputs/evaluating-alphafolds-predicted-structures-using-confidence-scores/pae-a-measure-of-global-confidence-in-alphafold-predictions/)
- [RCSB 1IEP](https://www.rcsb.org/structure/1IEP)
- [P2Rank 2.5.1](https://github.com/rdk/p2rank/releases/tag/2.5.1)
- [P2Rank source](https://github.com/rdk/p2rank)


종 출처: RCSB 1IEP는 Mus musculus / P00520이며 mutation 없음. 예측은 Homo sapiens / P00519. 270개 대응의 접촉 전이는 상동 서열로의 좌표 주변 목록 전달 예제이며 동일한 사람 실험 구조 정답이 아니다. feature의 1은 selected_homologous_structure_available로 명명하며 사람 단백질의 전체 실험 구조 존재 판정으로 확대하지 않는다. 실험 B-factor를 pLDDT 색으로 쓰지 않고 실제 1IEP CA와 STI 원자를 별도 표시한다.
