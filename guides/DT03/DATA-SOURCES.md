# 데이터·도구 출처와 계산 범위

실제 계산은個人条件부 분류 실습이다. 기존 DT02 배정 TSV의 해시를 유지했다. supplied Kd=10,000 nM 18,343행은 제외·원본 보존하고, 7,429행에서 supplied Kd≤100 nM을 수치 정답으로 정의했다. biological label 승인이나 전체 DAVIS 성능은 아니다. protocol.json은 학습 전 고정됐다.

Morgan radius2 / 2048 bits / chirality. Frozen facebook/esm2_t6_8M_UR50D, revision c731040fcd8d73dceaa04b0a8e6329b345b0f5df, MIT, safetensors 파일 SHA-256 확인. EsmModel 본체 파라미터 7,409,081개이며 8M은 모델 제품명/명목 규모다. 6층·320차원. CLS/EOS/padding 제외, 길이≤1022 잔기 비중첩 chunk의 잔기 수 가중 평균. 모든 잔기를 포함하지만 chunk 사이 attention은 사라진다. 추가 미세 조정 없음. 캐시로 사용하는 모든 서열은 평가 정답 없이 고정 모델로 변환했다. 사전 학습 데이터 겹침은 인증하지 않았다.

LogReg C1/liblinear/max_iter1000, train-only StandardScaler. XGBoost 80trees/depth4/learning_rate0.05, hist/seed42/n_jobs4, search/early stopping/threshold tuning 없음. threshold0.5, 단일 seed. 4splits×5조건=20회. ROC AUC, sklearn average_precision(비사다리꼴), balanced accuracy, log loss와 raw predictions/model hashes 보존. cold-both valid44행/+6, test436행/+127. 분모·유병률·선택 편향을 함께 표시한다. 추가 입력이 모든 split에서 개선됐다고 주장하지 않는다. calibration/conformal/구조 성능 ablation 미실행.

다운로드 원본 URL·해시: data/cache/next-two/2026-10-08/sources.json. 프로젝트 전용 .venv 사용. 원본 구조·가중치·표현·원시 예측·raw ASR을 보존한다.

- [DAVIS / TDC](https://tdcommons.ai/multi_pred_tasks/dti/)
- [RDKit Morgan](https://www.rdkit.org/docs/GettingStartedInPython.html)
- [ESM-2 official model](https://huggingface.co/facebook/esm2_t6_8M_UR50D)
- [FAIR ESM](https://github.com/facebookresearch/esm)
- [sklearn average precision](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.average_precision_score.html)
- [sklearn leakage](https://scikit-learn.org/stable/common_pitfalls.html)
- [XGBoost parameters](https://xgboost.readthedocs.io/en/stable/parameter.html)
