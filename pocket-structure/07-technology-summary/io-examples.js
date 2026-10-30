(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const guides = {
    fpocket: '입력은 원자 2,860개의 위치입니다. 첫 원자는 LYS1의 N이며 xyz = (−12.621, 27.691, 51.154) Å입니다. 출력 후보 21개 중 1위는 가상 구 104개로 표현됩니다. 중심 (9.531, 15.935, 39.679) Å는 그 구 중심들의 평균이며, 661.736 Å³는 도구가 추정한 부피입니다.',
    p2rank: '같은 단백질을 넣었지만 출력 단위는 표면점입니다. 1위 후보의 중심은 (9.593, 16.427, 39.122) Å, 소속 표면점은 135개입니다. 두 도구가 비슷한 자리를 가리키는지 3D로 확인하세요.',
    vina: '탐색 상자의 중심·크기도 입력입니다. 출력 mode 1의 점수는 −13.234 kcal/mol입니다. 각 mode에는 리간드 중원자 37개의 새 xyz 좌표가 들어갑니다. 점수가 위치 좌표를 대신하는 것은 아닙니다.',
    deeppocket: '입력의 세 좌표는 실제 fpocket 후보 중심의 발췌입니다. DeepPocket은 이를 다시 평가한 점수와, 포켓 영역을 나타내는 3D 마스크를 출력합니다.',
    grasp: '원자마다 원소와 xyz 좌표가 있고, 이웃 관계를 그래프로 만듭니다. 출력은 원자별 점수와 이를 묶은 포켓 후보입니다. 아래 네 원자는 전체 입력의 일부입니다.',
    pocketminer: '단백질 구조 한 개를 넣고 잔기마다 점수를 받습니다. 예를 들어 370잔기를 읽으면 그 잔기들에 대응하는 점수 목록을 보게 됩니다. 열린 구조의 새 좌표가 나오는 것은 아닙니다.',
    md: '300 K는 온도, 2 fs는 한 번에 전진하는 시간 간격의 설명용 예시입니다. 출력은 시간마다 달라지는 원자 xyz 좌표와 속도의 목록입니다.',
    diffdock: '단백질 3D 구조와 리간드 분자 정보를 넣습니다. 출력에는 리간드 원자마다의 새 xyz 좌표와 자세 confidence가 있습니다. 원본 DiffDock에서는 단백질 좌표를 갱신하지 않습니다.',
    dynamicbind: '시작 단백질 구조와 리간드 정보를 넣습니다. 출력은 리간드 좌표뿐 아니라 갱신된 단백질 좌표도 포함합니다. 구조 품질과 친화도 예측은 별도 값입니다.',
    af3: '여기서는 단백질 293개 아미노산의 서열과 이마티닙 SMILES가 실제 입력 예시입니다. 출력은 구성 요소들을 함께 배치한 원자 좌표와 구조 신뢰도입니다. MSA·템플릿 등 추가 입력 준비는 별도입니다.',
    boltz2: '서열·분자 정보에서 복합체 좌표를 생성하고, 요청하면 결합 분류와 친화도도 따로 예측합니다. 구조 confidence, 결합 분류 확률, log10(IC50/μM) 값은 서로 다릅니다.',
    chai1: '서열과 분자 정보가 기본 입력입니다. 선택적 MSA·템플릿·접촉 정보도 활용할 수 있습니다. 출력은 공동 생성된 복합체 원자 좌표와 구조 신뢰도입니다.',
    openfold3: 'OF3p2 범위의 입력·출력 개념입니다. 구성 요소의 서열·분자 정보와 보조 정보를 입력하고 복합체 좌표·구조 신뢰도를 얻습니다. 구현 버전별 실제 실행 스키마는 공식 문서로 확인합니다.'
  };
  let examples;
  function show(id) {
    if (!examples) return;
    const e = examples.examples.find(x => x.id === id);
    if (!e) return;
    $('io-case').textContent = e.case;
    $('io-status').textContent = e.status;
    $('io-status').dataset.measured = String(Boolean(e.scene));
    $('io-input').textContent = JSON.stringify(e.input, null, 2);
    $('io-output').textContent = JSON.stringify(e.output, null, 2);
    $('io-note').textContent = e.note;
    $('io-guide').textContent = guides[id];
    $('io-shape-note').textContent = examples.explanation + ' ' + (e.scene ? '' : examples.nullMeaning);
    $('io-scene').hidden = !e.scene;
    if (e.scene) $('io-scene').href = '../08-3d-lab/?scene=' + e.scene;
  }
  window.addEventListener('methodchange', e => show(e.detail.id));
  fetch('io-examples.json').then(r => { if (!r.ok) throw Error('입력·출력 파일을 읽을 수 없습니다.'); return r.json(); })
    .then(value => { examples = value; show($('method-select').value); })
    .catch(() => { $('io-note').textContent = '예시를 불러오지 못했습니다. 아래 JSON 원본이나 전체 텍스트 요약을 확인하세요.'; });
})();
