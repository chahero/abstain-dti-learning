# Abstain-DTI Learning

[학습 사이트 열기](https://chahero.github.io/abstain-dti-learning/)

Abstain-DTI 러너의 개인 사전 학습 자료입니다. 기존 흰 배경 학습 페이지의 20편 목차, 썸네일, 챕터, 읽기 가이드와 작은 실습 결과를 정적 사이트로 제공합니다.

영상은 아직 YouTube에 업로드하지 않아 **업로드 준비 중**으로 표시됩니다. 읽기 가이드와 자막은 지금 이용할 수 있습니다.

## 학습 순서

| 순서 | 코드 | 주제 | 길이 |
|---|---|---|---|
| 01 | OV01 | DTI와 기권 · 전체 흐름 | 12:49 |
| 02 | ON01 | 단백질과 타겟 · 구조 레코드 | 10:02 |
| 03 | ON03 | 분자 표현 · SMILES와 동일성 | 14:27 |
| 04 | ON02 | 결합 친화도 · 단위와 라벨 | 12:07 |
| 05 | DT01 | 실제 DTI 레코드 · 정제와 검토 | 10:34 |
| 06 | DT02 | 데이터 분할 · 누출과 일반화 | 14:24 |
| 07 | DT03 | 분자·단백질 표현 · baseline | 14:16 |
| 08 | ON04 | 단백질 구조 · confidence와 feature | 14:24 |
| 09 | ST01 | Rosetta · 구조 탐색과 점수 | 11:09 |
| 10 | ST02 | AlphaFold 2 · MSA와 Evoformer | 12:32 |
| 11 | ST03 | AlphaFold 3 · 복합체와 확산 | 12:11 |
| 12 | ON05 | 도킹·co-folding · 출력의 해석 | 12:58 |
| 13 | CAL01 | Calibration·ECE · 확률 보정 | 10:46 |
| 14 | CP01 | Conformal prediction · 예측 집합 | 11:41 |
| 15 | RC01 | 기권 · risk–coverage와 AURC | 11:38 |
| 16 | AG01 | Agent · MCP와 실행 로그 | 12:08 |
| 17 | CU01 | Curation · 쿼리와 난이도 좌표 | 12:21 |
| 18 | AG02 | 교란 하네스 · 단위와 동일성 | 12:18 |
| 19 | EV01 | 반복 평가 · flip과 실패 분석 | 12:46 |
| 20 | R01 | 단백질 설계 Agent · BioDesignBench | 10:37 |

## YouTube 영상 연결

`data/youtube-videos.json`에서 해당 자료 코드의 `null`을 **11자리 YouTube 영상 ID**로 바꿉니다. 전체 주소를 넣지 않습니다.

예를 들어 업로드한 주소가 `https://www.youtube.com/watch?v=abcdefghijk`라면 다음처럼 입력합니다. 아래 ID는 형식 설명용 예시이며 실제 영상 ID로 사용하지 않습니다.

```json
{
  "OV01": "abcdefghijk",
  "ON01": null
}
```

실제 파일의 다른 18개 항목도 유지합니다. 변경 사항을 `main`에 푸시하면 Pages가 다시 배포합니다. 연결된 영상에는 YouTube 플레이어, 챕터 이동, YouTube에서 보기 링크가 나타납니다. 공개 또는 일부 공개 영상이며 외부 삽입이 허용되어야 합니다.

## GitHub Pages 설정

저장소 **Settings → Pages → Deploy from a branch → main → /(root)**를 사용합니다. 루트의 `index.html`과 `.nojekyll`을 그대로 유지합니다. 별도 Node/Python 서버나 빌드 명령은 필요하지 않습니다.

자료 주소는 `?episode=ST02`처럼 자료 코드로 공유할 수 있습니다. 영상이 연결되면 `&t=120`으로 특정 시간부터 볼 수도 있습니다.

## 자료 범위

MP4, 원음, 모델 가중치, 제작·음성 검수 로그와 로컬 환경은 이 저장소에 포함하지 않습니다. 각 읽기 가이드에는 원전과 실제 계산 범위가 있습니다. 합성 예제, 실제 데이터 일부에 대한 계산, 모델 추론 실행 여부를 구분해 읽어 주세요. 실습 결과를 읽는 것과 사용자의 이해·학습 완료는 별개입니다.

[Pseudo-Lab/abstain-dti](https://github.com/Pseudo-Lab/abstain-dti)를 참고한 **개인 학습 자료**이며, 공식 프로젝트 결과나 공식 평가 규약을 뜻하지 않습니다.

폰트는 Pretendard를 사용하며 라이선스는 `assets/Pretendard-LICENSE.txt`에 보존했습니다. 인용 논문·데이터·외부 도구의 권리는 각 원전에 따릅니다.
