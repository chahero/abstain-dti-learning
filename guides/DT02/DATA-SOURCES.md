# DT02 데이터 출처·변경 기록

개인 DTI 분할 학습에 필요한 공개 데이터를 2026-10-08에 고정했다.

- 원 연구: Davis, M. I. et al. (2011), [Comprehensive analysis of kinase inhibitor selectivity](https://doi.org/10.1038/nbt.1990), Nature Biotechnology 29, 1046–1051.
- 전처리 배포: [TDC DTI/DAVIS 문서](https://tdcommons.ai/multi_pred_tasks/dti/)와 [TDC metadata](https://github.com/mims-harvard/TDC/blob/main/tdc/metadata.py).
- 내려받은 파일: [Harvard Dataverse file 5219748](https://dataverse.harvard.edu/api/access/datafile/5219748).
- 원본 `davis.tab`: 21,376,712 bytes, SHA-256 `6d4c6809dcb7c5da2b91a32d594d6935b75484940bde4d18055eb5e1059262f4`.
- 원본·TDC 문서·metadata 응답·조회 주소·해시는 `data/cache/dti-splits/2026-10-08/snapshot.json`에 보관했다.

공식 TDC 데이터 페이지는 DAVIS 조건에 `Not Specified. CC BY 4.0.`을 표기한다. 이 조회 표기를 기록하며 TDC의 MIT 코드 라이선스를 원본 실험 데이터의 라이선스로 대체하지 않는다. 원 논문과 TDC를 함께 표시하고 전처리 파일·자체 파생 배정을 구분한다. 외부 업로드는 수행하지 않았다.

원본의 ID1/X1/ID2/X2/Y를 그대로 보관한다. 자체 실습은 row_id, canonical isomeric 분자 키, 정확한 대문자 서열 SHA-256, 설명용 pKd, 집합 배정·excluded 표시를 추가했다. 분자와 서열 기준을 정한 후 자체 정렬·무작위 알고리즘으로 배정하며 공식 TDC benchmark와 같은 배정이라고 주장하지 않는다.

원본의 25,772쌍은 68개 분자와 379개 서열의 모든 조합이다. 원 논문의 72개 저해제·442개 kinase assay 패널과 구분한다. 원문 Supplementary Table 4의 약한 결합/검출되지 않은 조합 설명을, 개별 전처리 행의 상세 실험 조건으로 자동 복원하지 않았다. Kd=10,000 nM 행의 빈도만 검사하며 이진 라벨을 만들지 않는다.

화면 모션은 자체 행렬·도식과 직접 실행한 RDKit 구조로 만들었다. 6×6 축약 행렬, 복사 행 주입, V/I 짧은 서열 시연은 교육용임을 명시한다. 원 논문의 도표·그림을 복사하지 않는다. 실제 서열 정렬·모델 학습·유료 API·ElevenLabs는 사용하지 않았다.
