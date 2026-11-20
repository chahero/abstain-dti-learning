'use strict';
(() => {
  const data = window.CA_COMPARISON;
  if (!data || data.cases?.length !== 12 || data.rankings?.length !== 12) throw new Error('12쌍 순위 자료 로드 실패');
  const byId = new Map(data.cases.map(row => [row.case_id, row]));
  const rankById = new Map(data.rankings.map(row => [row.case_id, row]));
  const state = {target:'CA1', caseId:'C01'};
  const $ = selector => document.querySelector(selector);
  const fmt = value => Number(value).toLocaleString('ko-KR', {maximumFractionDigits:3});
  function showFigure() {
    const key = state.target.toLowerCase();
    $('#result-figure').src = `assets/ranks-${key}.svg?v=20261120-prediction-focus`;
    $('#figure-download').href = `assets/ranks-${key}.png?v=20261120-prediction-focus`;
    $('#result-figure').alt = `${state.target} 실험 정답·DeepDTA·Boltz-2의 강도 순위 비교 · 각 열의 상단: 강한 화합물 · 실제 출력 수치 포함`;
    $('#figure-caption').textContent = `${state.target} · 각 열: 강한 순서 1–6위 · 수치와 실험 순위 함께 표시`;
    $('#score-figure').src = `assets/scores-${key}.svg?v=20261120-prediction-focus`;
    $('#score-figure').alt = `${state.target} 화합물별 실험 pKd·DeepDTA pKd·Boltz 표시 점수`;
    $('#score-download').href = `assets/scores-${key}.png?v=20261120-prediction-focus`;
    $('#score-caption').textContent = `${state.target} · 동일 행: 동일 화합물 · 서로 다른 측정량`;
    document.querySelectorAll('[data-target]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.target === state.target)));
  }
  function showCase(id, followTarget = true) {
    const row = byId.get(id), rank = rankById.get(id);
    if (!row || !rank) return;
    state.caseId = id;
    if (followTarget) {state.target = row.target; showFigure();}
    $('#case-picker').value = id;
    $('#case-title').textContent = `${row.target} · ${row.ligand} · ${id}`;
    $('#case-molecule').src = `assets/${row.ligand}.svg`;
    $('#case-molecule').alt = `${row.ligand}의 실제 2차원 화학 구조`;
    $('#case-kd').textContent = `${fmt(row.reference_Kd_nM)} nM`;
    $('#case-reference').textContent = `${rank.reference_rank}위 · 실험 pKd ${row.reference_pKd.toFixed(3)}`;
    $('#case-deep').textContent = row.deepdta_pKd.toFixed(3);
    $('#case-deep-kd').textContent = `${rank.deepdta_rank}위 · 예측 Kd 약 ${Math.round(row.deepdta_Kd_nM).toLocaleString('ko-KR')} nM`;
    $('#case-boltz').textContent = row.boltz_score.toFixed(3);
    $('#case-native').textContent = `${rank.boltz_rank}위 · 원출력 ${row.boltz_native_log_micromolar.toFixed(3)}`;
    const notes = [
      `실험 pKd ${row.reference_pKd.toFixed(3)} 대비 DeepDTA 예측 pKd ${row.deepdta_pKd.toFixed(3)} · 절대 pKd 오차 ${Math.abs(row.deepdta_pKd-row.reference_pKd).toFixed(3)}`,
      `Boltz 표시 점수 ${row.boltz_score.toFixed(3)} · 실험 pKd와의 수치 근접성 관찰`,
      'Boltz 점수는 보정된 pKd가 아님 · 수치 차이를 실제 Kd 예측 오차로 해석하지 않음'
    ];
    $('#case-reading').replaceChildren(...notes.map(text => {const li=document.createElement('li');li.textContent=text;return li;}));
    document.querySelectorAll('[data-case-row],[data-rank-row]').forEach(tr => tr.classList.toggle('selected', (tr.dataset.caseRow || tr.dataset.rankRow) === id));
  }
  document.querySelectorAll('[data-target]').forEach(button => button.addEventListener('click', () => {
    state.target=button.dataset.target;
    const ligand=byId.get(state.caseId).ligand;
    showCase(data.cases.find(row => row.target === state.target && row.ligand === ligand).case_id, false);
    showFigure();
  }));
  $('#case-picker').addEventListener('change', event => showCase(event.target.value));
  document.querySelectorAll('[data-case]').forEach(button => button.addEventListener('click', () => {
    showCase(button.dataset.case);
    $('.case-reader').scrollIntoView({block:'center', behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  }));
  $('#print').addEventListener('click', () => window.print());
  if ('IntersectionObserver' in window) {
    const links=[...document.querySelectorAll('.nav-inner a')];
    const observer=new IntersectionObserver(entries => {for(const entry of entries) if(entry.isIntersecting) links.forEach(a=>a.classList.toggle('active',a.hash===`#${entry.target.id}`));}, {rootMargin:'-15% 0px -65% 0px'});
    document.querySelectorAll('main>section[id]').forEach(section=>observer.observe(section));
  }
  showFigure();showCase(state.caseId,false);
})();
