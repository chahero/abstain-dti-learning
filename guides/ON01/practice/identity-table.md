# 실제 공개 메타데이터 비교

기준 타겟: UniProt P00519, Homo sapiens, TaxID 9606. 구조의 이름만으로 연결하지 않는다.

| 구조 | 원래 생물종 | UniProt 연결 | 작성자 사슬 | 검사 결과 |
|---|---|---|---|---|
| 1IEP | Mus musculus | P00520 | A, B | identity-mismatch |
| 2HYY | Homo sapiens | P00519 | A, B, C, D | identity-fields-match; range/mutations/ligand review remains |

1IEP의 실패 플래그는 사람 타겟에 같은 단백질의 구조로 연결하려는 현재 기준에서의 불일치다. 생쥐 구조가 다른 목적에서도 쓸모없다는 뜻은 아니다.
2HYY의 두 필드 일치는 전체 서열·아이소폼·변이·잔기 범위·리간드 적합성이 모두 검증됐다는 뜻이 아니다.
실험 방법과 제목은 원본 JSON에 남긴다. 이 실습은 실제 결합 예측이나 공식 큐레이션 규약이 아니다.

관찰: 직접 본 값과 원인을 추정한 해석을 observations.md에 따로 적는다.
