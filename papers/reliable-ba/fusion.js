(() => {
  'use strict';
  const root = document.getElementById('method');
  const rows = [...root.querySelectorAll('[data-fusion-expert]')];
  if (!rows.length) return;
  const math = window.ReviewMath;
  const byId = id => document.getElementById(id);
  const text = (id, value) => { byId(id).textContent = value; };
  let preset = 'default';
  let lastValid;

  function readExperts() {
    let valid = true;
    const experts = rows.map(row => {
      const values = { mean: Number(row.dataset.fusionMean), alpha: 3, beta: 2 };
      row.querySelectorAll('[data-fusion-param]').forEach(input => {
        const number = input.valueAsNumber;
        const okay = Number.isFinite(number) && input.validity.valid
          && number >= Number(input.min) && number <= Number(input.max);
        input.setAttribute('aria-invalid', String(!okay));
        if (!okay) valid = false;
        values[input.dataset.fusionParam] = number;
        if (okay) input.nextElementSibling.textContent = number.toFixed(2);
      });
      return values;
    });
    return valid ? experts : null;
  }

  function inspectExpert(experts) {
    const index = rows.findIndex(row => row.dataset.fusionExpert === byId('fusion-inspect').value);
    const e = experts[index];
    const scaled = math.fuse([e]).scaled[0];
    const beforeData = e.beta / (e.alpha - 1);
    const beforeEpi = beforeData / e.nu;
    const afterData = scaled.beta / (scaled.alpha - 1);
    const afterEpi = afterData / scaled.nu;
    text('fusion-before-mean', e.mean.toFixed(1));
    text('fusion-after-mean', e.mean.toFixed(1));
    text('fusion-before-nu', e.nu.toFixed(2));
    text('fusion-after-nu', scaled.nu.toFixed(2));
    text('fusion-before-data', beforeData.toFixed(3));
    text('fusion-after-data', afterData.toFixed(3));
    text('fusion-before-epi', beforeEpi.toFixed(3));
    text('fusion-after-epi', afterEpi.toFixed(3));
    byId('fusion-epi-before-bar').style.width = `${100 * beforeEpi / afterEpi}%`;
    text('fusion-uncertainty-reading', `${rows[index].dataset.fusionName}의 r = ${e.r.toFixed(2)}에서는 평균 ${e.mean.toFixed(1)}을 유지하고, 인식적 분산은 ${beforeEpi.toFixed(3)}에서 ${afterEpi.toFixed(3)}으로 ${(afterEpi / beforeEpi).toFixed(2)}배가 됩니다. 데이터 분산은 ${afterData.toFixed(3)}으로 유지됩니다.`);
  }

  function updateFour() {
    const experts = readExperts();
    if (!experts) {
      text('fusion-input-status', 'r은 0.05–1 범위의 0.05 간격, ν는 0.5–20 범위의 0.5 간격으로 입력하세요. 아래에는 마지막 유효한 계산을 유지합니다.');
      return;
    }
    lastValid = experts;
    const result = math.fuse(experts);
    rows.forEach((row, index) => {
      row.querySelector('[data-fusion-effective]').textContent = result.scaled[index].nu.toFixed(2);
      row.querySelector('[data-fusion-weight]').textContent = `${(100 * result.weights[index]).toFixed(1)}%`;
      row.querySelector('[data-fusion-bar]').style.width = `${100 * result.weights[index]}%`;
    });
    const maxIndex = result.weights.indexOf(Math.max(...result.weights));
    text('fusion-mean-four', result.mean.toFixed(3));
    text('fusion-largest-four', `${rows[maxIndex].dataset.fusionName} · ${(100 * result.weights[maxIndex]).toFixed(1)}%`);
    text('fusion-four-data', result.aleatoric.toFixed(3));
    text('fusion-four-epi', result.epistemic.toFixed(3));
    text('fusion-four-total', (result.aleatoric + result.epistemic).toFixed(3));
    text('fusion-weight-equation', `(${experts.map((e, i) => `${e.mean.toFixed(1)} × ${result.scaled[i].nu.toFixed(2)}`).join(' + ')}) ÷ ${result.nu.toFixed(2)} = ${result.mean.toFixed(3)}`);
    text('fusion-input-status', preset === 'default'
      ? '기본 가정: ν가 모두 같아 최종 비중은 r의 상대 크기를 따릅니다.'
      : preset === 'evidence'
        ? '증거량 예시: GNINA의 r은 더 높지만, FlowDock의 r × ν가 더 큽니다.'
        : '수동 가정: 바꾼 r과 ν로 논문 수식만 다시 계산했습니다. 모델 추론이나 재학습은 하지 않았습니다.');
    text('fusion-preset-explanation', preset === 'evidence'
      ? 'GNINA: 0.9 × 1 = 0.9, FlowDock: 0.4 × 10 = 4.0입니다. r만 비교하면 놓치는 차이를 보여줍니다.'
      : `현재 가장 큰 기여는 ${rows[maxIndex].dataset.fusionName} 경로입니다. 그 평균을 그대로 선택하는 대신, 네 경로를 모두 위 비중으로 합칩니다.`);
    inspectExpert(experts);
  }

  rows.forEach(row => row.querySelectorAll('input').forEach(input => input.addEventListener('input', () => {
    preset = 'manual';
    updateFour();
  })));
  byId('fusion-reset').addEventListener('click', () => {
    rows.forEach(row => {
      row.querySelector('[data-fusion-param="r"]').value = row.dataset.defaultR;
      row.querySelector('[data-fusion-param="nu"]').value = row.dataset.defaultNu;
    });
    preset = 'default';
    updateFour();
  });
  byId('fusion-evidence-preset').addEventListener('click', () => {
    const values = [[0.9, 1], [0.3, 5], [0.4, 10], [0.1, 5]];
    rows.forEach((row, index) => {
      row.querySelector('[data-fusion-param="r"]').value = values[index][0];
      row.querySelector('[data-fusion-param="nu"]').value = values[index][1];
    });
    preset = 'evidence';
    updateFour();
  });
  byId('fusion-inspect').addEventListener('change', () => { if (lastValid) inspectExpert(lastValid); });

  function showDisagreement(kind) {
    root.querySelectorAll('[data-fusion-disagreement]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.fusionDisagreement === kind));
    });
    const means = kind === 'close' ? [7.9, 8.1] : [6, 10];
    const result = math.fuse(means.map(mean => ({ mean, nu: 5, alpha: 3, beta: 2, r: 1 })));
    const x = value => 400 + (value - 8) * 60;
    const grid = [6, 7, 8, 9, 10].map(value => `<line x1="${x(value)}" x2="${x(value)}" y1="38" y2="150" stroke="#dce6ea"/><text x="${x(value)}" y="173" text-anchor="middle" font-size="13" fill="#526b7a">${value}</text>`).join('');
    const points = means.map((value, index) => {
      const y = 72 + 55 * index;
      const color = index ? '#7253ad' : '#087f8c';
      return `<text x="20" y="${y + 5}" font-size="15" fill="#102f43">전문가 ${index ? 'B' : 'A'} · ${value.toFixed(1)}</text><line x1="${x(value)}" x2="${x(result.mean)}" y1="${y}" y2="${y}" stroke="${color}" stroke-width="4"/><circle cx="${x(value)}" cy="${y}" r="7" fill="${color}"/>`;
    }).join('');
    byId('fusion-disagreement-plot').querySelector('svg').innerHTML = `<title id="fusion-disagreement-plot-title">가상 전문가 ${means.join('와 ')}의 평균은 8.0 · 정답 표시가 아님</title>${grid}<line x1="${x(result.mean)}" x2="${x(result.mean)}" y1="35" y2="150" stroke="#102f43" stroke-width="2" stroke-dasharray="5 4"/><text x="${x(result.mean)}" y="23" text-anchor="middle" font-size="14" fill="#102f43">통합 평균 8.0</text>${points}<text x="400" y="200" text-anchor="middle" font-size="12" fill="#526b7a">${kind === 'close' ? '점 사이가 가까워 불일치 항이 작음' : '점 사이가 멀어 불일치 항이 커짐'}</text>`;
    text('fusion-disagreement-mean', result.mean.toFixed(3));
    text('fusion-disagreement-term', result.disagreement.toFixed(3));
    text('fusion-disagreement-variance', (result.aleatoric + result.epistemic).toFixed(3));
    text('fusion-disagreement-reading', `가상 답 ${means.map(value => value.toFixed(1)).join(' / ')}의 통합 평균은 ${result.mean.toFixed(1)}입니다. 불일치 항은 ${result.disagreement.toFixed(3)}, 전체 예측분산은 ${(result.aleatoric + result.epistemic).toFixed(3)}입니다. 두 경우는 평균 이외의 초기 조건이 같습니다.`);
  }
  root.querySelectorAll('[data-fusion-disagreement]').forEach(button => button.addEventListener('click', () => showDisagreement(button.dataset.fusionDisagreement)));
  updateFour();
  showDisagreement('close');
})();
