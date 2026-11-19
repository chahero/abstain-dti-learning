'use strict';
(() => {
  const data = window.CA_COMPARISON;
  if (!data || data.cases?.length !== 12 || data.rankings?.length !== 12) throw new Error('12쌍 순위 자료 로드 실패');
  const byId = new Map(data.cases.map(row => [row.case_id, row]));
  const rankById = new Map(data.rankings.map(row => [row.case_id, row]));
  const state = {target:'CA1', caseId:'C07'};
  const $ = selector => document.querySelector(selector);
  const fmt = value => Number(value).toLocaleString('ko-KR', {maximumFractionDigits:3});
  function showFigure() {
    const key = state.target.toLowerCase();
    $('#result-figure').src = `assets/ranks-${key}.svg?v=20261119-ranking`;
    $('#figure-download').href = `assets/ranks-${key}.png?v=20261119-ranking`;
    $('#result-figure').alt = `${state.target} 실험 정답·DeepDTA·Boltz-2의 강도 순위 비교 · 각 열의 상단: 강한 화합물`;
    $('#figure-caption').textContent = `${state.target} · 각 열: 강한 순서 1–6위 · 같은 화합물은 같은 색`;
    $('#score-figure').src = `assets/scores-${key}.svg?v=20261119-ranking`;
    $('#score-figure').alt = `${state.target} 보조 수치 분포 · Boltz 표시 점수와 pKd는 다른 측정량`;
    $('#score-download').href = `assets/scores-${key}.png?v=20261119-ranking`;
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
    $('#case-kd').textContent = `${rank.reference_rank}위`;
    $('#case-reference').textContent = `실험 Kd ${fmt(row.reference_Kd_nM)} nM`;
    $('#case-deep').textContent = `${rank.deepdta_rank}위`;
    $('#case-deep-kd').textContent = `예측 pKd ${row.deepdta_pKd.toFixed(3)}`;
    $('#case-boltz').textContent = `${rank.boltz_rank}위`;
    $('#case-native').textContent = `표시 점수 ${row.boltz_score.toFixed(3)} · Kd와 구분`;
    const notes = [
      `${row.target} 안에서의 순위: 실험 ${rank.reference_rank}위 / DeepDTA ${rank.deepdta_rank}위 / Boltz-2 ${rank.boltz_rank}위`,
      `실험 순위와의 차이: DeepDTA ${Math.abs(rank.deepdta_rank-rank.reference_rank)}계단 / Boltz-2 ${Math.abs(rank.boltz_rank-rank.reference_rank)}계단`,
      id === 'C07' ? '이번 사례의 순위는 DeepDTA가 더 가까운 결과 · 전체 지표 우세와 개별 후보 우세는 별개'
        : '타겟별 6개 안에서의 상대 순서 · 원점수의 절대값·Kd 배율 정확도와 구분'
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
