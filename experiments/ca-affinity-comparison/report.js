'use strict';
(() => {
  const data = window.CA_COMPARISON;
  if (!data || !Array.isArray(data.cases) || data.cases.length !== 12) throw new Error('12쌍 결과를 읽지 못했습니다.');
  const byId = new Map(data.cases.map(row => [row.case_id, row]));
  const state = {target: 'CA1', view: 'scores', caseId: 'C07'};
  const $ = selector => document.querySelector(selector);
  const fmt = (v, places = 3) => Number(v).toLocaleString('ko-KR', {maximumFractionDigits: places});
  function showFigure() {
    const stem = `${state.view}-${state.target.toLowerCase()}`;
    $('#result-figure').src = `assets/${stem}.svg`;
    $('#figure-download').href = `assets/${stem}.png`;
    const ranks = state.view === 'ranks';
    $('#result-figure').alt = ranks
      ? `${state.target}의 실험 정답, DeepDTA, Boltz-2가 매긴 강한 순서 비교. 각 열의 첫 번째가 가장 강한 화합물입니다.`
      : `${state.target}의 실험 pKd, DeepDTA pKd, Boltz 점수 비교. 행은 실험에서 강한 순서이며 DeepDTA 출력은 좁은 범위에 모였습니다.`;
    $('#figure-caption').textContent = ranks ? '각 열에서 위쪽이 강한 순서입니다. 같은 화합물의 색을 맞춰 따라가세요.' : '같은 행 = 같은 화합물. 각 점 옆에 실제 값을 표시했습니다.';
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
    const note = row.case_id === 'C07' ? '실험에서 CA1에 가장 강한 화합물입니다. DeepDTA는 훨씬 약하게 예측했고, Boltz는 강한 쪽으로 예측했지만 첫 순위로 고르지는 않았습니다.'
      : row.ligand === 'L06' ? `이 여섯 개 중 ${row.target}에서 실험상 가장 약한 화합물입니다. Boltz는 이를 가장 낮은 점수로 구분했지만 DeepDTA는 다른 화합물과 비슷한 값을 냈습니다.`
      : '같은 타겟의 다른 화합물과 함께 비교해 강약 구분을 봅니다. DeepDTA의 pKd와 Boltz의 점수는 출력 척도가 다릅니다.';
    $('#case-reading').textContent = note;
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
