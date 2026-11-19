'use strict';
(() => {
  const data = window.CA_COMPARISON;
  if (!data || !Array.isArray(data.cases) || data.cases.length !== 12) throw new Error('12쌍 결과 로드 실패');
  const byId = new Map(data.cases.map(row => [row.case_id, row]));
  const state = {target: 'CA1', view: 'scores', caseId: 'C07'};
  const $ = selector => document.querySelector(selector);
  const fmt = (v, places = 3) => Number(v).toLocaleString('ko-KR', {maximumFractionDigits: places});
  function showFigure() {
    const stem = `${state.view}-${state.target.toLowerCase()}`;
    $('#result-figure').src = `assets/${stem}.svg?v=20261119-brief`;
    $('#figure-download').href = `assets/${stem}.png?v=20261119-brief`;
    const ranks = state.view === 'ranks';
    $('#result-figure').alt = ranks
      ? `${state.target} 실험 정답·DeepDTA·Boltz-2의 강도 순위 비교 · 각 열의 상단: 강한 화합물`
      : `${state.target} 실험 pKd·DeepDTA pKd·Boltz 점수 비교 · 행 순서: 실험 강도 내림차순`;
    $('#figure-caption').textContent = ranks ? '각 열의 상단: 강한 결합 · 동일 화합물의 색상 일치' : '동일 행: 동일 화합물 · 점 옆 수치: 실제 저장값';
    document.querySelectorAll('[data-target]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.target === state.target)));
    document.querySelectorAll('[data-view]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.view === state.view)));
  }
  function showCase(id, followTarget = true) {
    const row = byId.get(id);
    if (!row) return;
    state.caseId = id;
    if (followTarget) {state.target = row.target; showFigure();}
    $('#case-picker').value = id;
    $('#case-title').textContent = `${row.target} · ${row.ligand} · ${id}`;
    $('#case-molecule').src = `assets/${row.ligand}.svg`;
    $('#case-molecule').alt = `${row.ligand}의 실제 2차원 화학 구조`;
    $('#case-kd').textContent = `${fmt(row.reference_Kd_nM)} nM`;
    $('#case-reference').textContent = `실험 pKd ${row.reference_pKd.toFixed(3)}`;
    $('#case-deep').textContent = row.deepdta_pKd.toFixed(3);
    $('#case-deep-kd').textContent = `예측 Kd 약 ${fmt(row.deepdta_Kd_nM, 0)} nM`;
    $('#case-boltz').textContent = row.boltz_score.toFixed(3);
    $('#case-native').textContent = `원출력 ${row.boltz_native_log_micromolar.toFixed(3)}`;
    const notes = row.case_id === 'C07' ? ['실험상 CA1 최강 화합물: L04', 'DeepDTA: 실험값보다 약한 친화도 예측', 'Boltz-2: 강한 점수이나 1위 선택은 L01']
      : row.ligand === 'L06' ? [`선정한 6개 중 ${row.target}에서 가장 약한 화합물`, 'Boltz-2: 가장 낮은 점수로 구분', 'DeepDTA: 다른 화합물과 유사한 예측값']
      : ['같은 타겟의 다른 화합물과 비교하여 강약 평가', 'DeepDTA pKd와 Boltz 점수의 측정량 차이 유의'];
    $('#case-reading').replaceChildren(...notes.map(text => {const li = document.createElement('li'); li.textContent = text; return li;}));
    document.querySelectorAll('[data-case-row]').forEach(tr => tr.classList.toggle('selected', tr.dataset.caseRow === id));
  }
  document.querySelectorAll('[data-target]').forEach(button => button.addEventListener('click', () => {
    state.target = button.dataset.target;
    const ligand = byId.get(state.caseId).ligand;
    showCase(data.cases.find(row => row.target === state.target && row.ligand === ligand).case_id, false);
    showFigure();
  }));
  document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => {state.view = button.dataset.view; showFigure();}));
  $('#case-picker').addEventListener('change', event => showCase(event.target.value));
  document.querySelectorAll('[data-case]').forEach(button => button.addEventListener('click', () => {showCase(button.dataset.case); $('.case-reader').scrollIntoView({block:'center', behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'}); }));
  $('#print').addEventListener('click', () => window.print());
  if ('IntersectionObserver' in window) {
    const links = [...document.querySelectorAll('.nav-inner a')];
    const observer = new IntersectionObserver(entries => {for (const entry of entries) if (entry.isIntersecting) links.forEach(a => a.classList.toggle('active', a.hash === `#${entry.target.id}`));}, {rootMargin:'-15% 0px -65% 0px'});
    document.querySelectorAll('main>section[id]').forEach(section => observer.observe(section));
  }
  showFigure(); showCase(state.caseId, false);
})();
