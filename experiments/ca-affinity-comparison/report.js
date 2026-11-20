'use strict';
(() => {
  const data = window.CA_COMPARISON;
  if (!data || data.cases?.length !== 12 || data.rankings?.length !== 12) throw new Error('12쌍 순위 자료 로드 실패');
  const byId = new Map(data.cases.map(row => [row.case_id, row]));
  const rankById = new Map(data.rankings.map(row => [row.case_id, row]));
  const $ = selector => document.querySelector(selector);
  const caSection = $('#results');
  let selectedCase = 'C01';
  const fmt = value => Number(value).toLocaleString('ko-KR', {maximumFractionDigits:3});
  function showPlots(section, button) {
    const slug = button.dataset.plotTarget;
    const target = button.textContent.trim();
    const revision = section.dataset.plotRoot;
    section.querySelectorAll('[data-plot-kind]').forEach(figure => {
      const stem = `assets/${figure.dataset.plotKind}-${slug}`;
      const image = figure.querySelector('img');
      image.src = `${stem}.svg?v=${revision}`;
      image.alt = `${target} ${figure.dataset.plotDescription}`;
      figure.querySelector('[data-plot-label]').textContent = `${target} · ${figure.dataset.plotDescription}`;
      figure.querySelector('a[download]').href = `${stem}.png?v=${revision}`;
    });
    section.querySelectorAll('[data-plot-target]').forEach(control => control.setAttribute('aria-pressed', String(control === button)));
  }
  function showCase(id, followTarget = true) {
    const row = byId.get(id), rank = rankById.get(id);
    if (!row || !rank) return;
    selectedCase = id;
    if (followTarget) {
      const button = caSection.querySelector(`[data-plot-target="${row.target.toLowerCase()}"]`);
      showPlots(caSection, button);
    }
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
      `실험 pKd ${row.reference_pKd.toFixed(3)} / DeepDTA pKd ${row.deepdta_pKd.toFixed(3)} / Boltz 점수 ${row.boltz_score.toFixed(3)}`,
      `같은 단백질의 강한 순서: 실험 ${rank.reference_rank}위 / DeepDTA ${rank.deepdta_rank}위 / Boltz-2 ${rank.boltz_rank}위`,
      '비교 범위: 화합물 6개의 상대적 강도 · Boltz 점수를 pKd 자체로 해석하지 않음'
    ];
    $('#case-reading').replaceChildren(...notes.map(text => {const li=document.createElement('li');li.textContent=text;return li;}));
    document.querySelectorAll('[data-case-row],[data-rank-row]').forEach(tr => tr.classList.toggle('selected', (tr.dataset.caseRow || tr.dataset.rankRow) === id));
  }
  document.querySelectorAll('[data-plot-target]').forEach(button => button.addEventListener('click', () => {
    const section = button.closest('[data-plot-root]');
    if (section === caSection) {
      const ligand = byId.get(selectedCase).ligand;
      const target = button.textContent.trim();
      showCase(data.cases.find(row => row.target === target && row.ligand === ligand).case_id, false);
    }
    showPlots(section, button);
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
  showCase(selectedCase, false);
})();
