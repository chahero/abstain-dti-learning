(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const titles = ['포켓은 단단한 구멍일까?', '포켓의 벽은 무엇으로 만들어질까?', '같은 단백질인데 왜 모양이 바뀔까?', 'apo와 holo는 열림·닫힘을 뜻할까?', '변화가 먼저일까, 만남이 먼저일까?', '실제로 당을 잡는 단백질을 볼까요?', '한 장으로 정리해 볼까요?'];
  const intros = ['리간드가 들어갈 수 있는 단백질의 작은 공간을 살펴봅니다.', '사슬의 한 단위인 잔기와 옆으로 뻗은 곁사슬을 연결해 봅니다.', '작은 가지의 회전부터 단백질 덩어리의 움직임까지 비교합니다.', '결합 여부와 입체 모양은 서로 다른 정보입니다.', '리간드 결합과 구조 변화가 일어나는 순서를 구분해 봅니다.', '맥아당 결합 단백질의 공개 실험 구조 두 개를 비교합니다.', '포켓, 움직임, 결합 상태를 네 문장으로 연결합니다.'];
  const articles = [...document.querySelectorAll('article[data-step]')];
  let current = 0, motion = 'sidechain', mechanism = 'selection', view = 'paired', mbp = null;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const text = (x, y, value, small = false, extra = '') => `<text x="${x}" y="${y}" class="${small ? 'small-label' : 'label'}" ${extra}>${value}</text>`;
  const ligand = (x, y, scale = 1) => `<g transform="translate(${x} ${y}) scale(${scale})"><path class="ligand" d="m-33-10 22-25 35 5 15 30-22 25-35-5Z"/><circle cx="-10" cy="-35" r="7" class="ligand"/><circle cx="39" cy="0" r="7" class="ligand"/></g>`;

  function navigate(next, focus = false) {
    current = Math.max(0, Math.min(6, next));
    articles.forEach((a, i) => { a.hidden = i !== current; });
    document.querySelectorAll('[data-go]').forEach(b => { if (Number(b.dataset.go) === current) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current'); });
    $('lesson-title').textContent = titles[current]; $('lesson-intro').textContent = intros[current];
    $('page-count').textContent = `${current + 1} / 7`; $('previous').disabled = current === 0; $('next').disabled = current === 6;
    document.title = `${titles[current]} · 단백질 포켓 입문`;
    history.replaceState(null, '', `#step-${current + 1}`);
    if (focus) { $('lesson-title').focus({ preventScroll: true }); window.scrollTo({ top: 0, behavior: 'instant' }); }
  }
  document.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => navigate(Number(b.dataset.go), true)));
  $('previous').addEventListener('click', () => navigate(current - 1, true)); $('next').addEventListener('click', () => navigate(current + 1, true));
  document.addEventListener('keydown', e => {
    if (e.ctrlKey || e.altKey || e.metaKey || e.target.closest('input,textarea,button,summary,a')) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); navigate(current + 1, true); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); navigate(current - 1, true); }
  });
  function readHash() { const match = location.hash.match(/^#step-([1-7])$/); navigate(match ? Number(match[1]) - 1 : 0); }
  window.addEventListener('hashchange', readHash);
  $('print').addEventListener('click', () => window.print());

  const chain = [[100, 370], [135, 255], [185, 160], [275, 145], [290, 245], [340, 355], [450, 390], [555, 355], [590, 250], [570, 145]];
  $('residue-figure').innerHTML = `<path d="M${chain.map(p => p.join(',')).join(' L')}" class="protein-line"/>
    ${chain.map(([x,y], i) => `<circle class="residue-dot" cx="${x}" cy="${y}" r="15"/>${text(x,y+6,String(i+1),true,'text-anchor="middle"')}`).join('')}
    <path class="branch" d="m185 160 45 65 40 30M340 355l-5-65 37-35M555 355l-40-67-50-43"/>
    <circle cx="270" cy="255" r="11" class="branch-dot"/><circle cx="372" cy="255" r="11" class="branch-dot"/>
    <g id="sidechain-movable"><path class="branch" d="m465 245-26-41-33-8"/><circle cx="406" cy="196" r="13" class="branch-dot"/></g>
    <path d="M225 265Q340 190 455 260Q420 335 350 335Q285 330 225 265Z" fill="var(--teal)" opacity=".09"/>
    ${text(330,115,'접힌 하나의 사슬',false,'text-anchor="middle"')}${text(320,300,'포켓',false,'text-anchor="middle"')}
    <path class="guide" d="M110 110 130 235M570 450l-45-84M620 210l-195-13"/>
    ${text(70,92,'잔기 한 단위')}${text(490,478,'주사슬')}${text(560,190,'곁사슬')}
    ${text(350,42,'서열에서 멀던 잔기도 접히면 이웃이 됩니다',true,'text-anchor="middle"')}`;
  $('rotate-sidechain').addEventListener('click', () => {
    const turned = $('residue-figure').classList.toggle('turned');
    $('rotate-sidechain').textContent = turned ? '곁사슬 위치 되돌리기' : '곁사슬 위치 바꿔 보기';
  });

  // All following schematic coordinates are original teaching drawings.
  // They are not an atomistic trajectory, a predicted structure, or measured data.
  const leftLobe = '<path class="surface" d="M350 345C317 383 210 383 146 334C91 292 112 217 144 192C114 145 146 91 201 101C234 66 281 92 292 126C311 155 282 194 287 229C292 268 333 278 350 345Z"/>';
  const rightLobe = '<path class="surface" d="M350 345C383 383 490 383 554 334C609 292 588 217 556 192C586 145 554 91 499 101C466 66 419 92 408 126C389 155 418 194 413 229C408 268 367 278 350 345Z"/>';
  $('motion-figure').innerHTML = `<g transform="translate(10 5)">${leftLobe}<g id="motion-moving-domain">${rightLobe}
    <g id="motion-moving-sidechain"><path class="branch" d="M477 240l-40 12-26-34"/><circle cx="411" cy="218" r="12" class="branch-dot"/></g></g>
    <path class="branch" d="M247 231l40 8 21 35"/><circle class="branch-dot" cx="308" cy="274" r="11"/>
    <path id="motion-moving-loop" d="M286 151Q346 77 414 151" fill="none" stroke="var(--teal)" stroke-width="10" stroke-linecap="round"/>
    ${text(350,405,'사슬은 연결된 채로, 일부의 배치가 달라집니다',true,'text-anchor="middle"')}</g>`;
  const motionDetails = { sidechain: '곁사슬 일부가 회전하며 공간의 모양이 바뀝니다.', loop: '사슬의 한 구간인 루프가 입구 쪽에서 움직입니다.', domain: '비교적 큰 구조 덩어리인 도메인 사이의 배치가 바뀝니다.' };
  document.querySelectorAll('[data-motion]').forEach(b => b.addEventListener('click', () => {
    motion = b.dataset.motion;
    document.querySelectorAll('[data-motion]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    $('motion-description').textContent = motionDetails[motion]; $('motion-figure').setAttribute('class', '');
  }));
  $('show-motion').addEventListener('click', () => {
    const figure = $('motion-figure'); figure.setAttribute('class', '');
    // Restart a single finite animation; do not run a distracting endless loop.
    void figure.getBoundingClientRect(); figure.setAttribute('class', `${reducedMotion ? 'reduced' : 'animate'}-${motion}`);
  });

  function pocketGraphic(state, x = 0, y = 0, scale = 1) {
    const narrow = state === 'narrow', bound = ['bound','contact','adjusting'].includes(state);
    const degrees = narrow ? -13 : state === 'bound' ? 0 : state === 'adjusting' ? 4 : 8;
    return `<g transform="translate(${x} ${y}) scale(${scale})"><g transform="rotate(${-degrees} 285 345)">${leftLobe}</g><g transform="rotate(${degrees} 415 345)">${rightLobe}</g>
      ${bound ? ligand(350, state === 'contact' ? 155 : state === 'adjusting' ? 190 : 220, .95) : '<circle class="water" cx="335" cy="244" r="11"/><circle class="water" cx="375" cy="275" r="9"/><circle class="water" cx="365" cy="201" r="10"/>'}
      </g>`;
  }
  function showState(state) {
    $('state-figure').innerHTML = pocketGraphic(state, 10, 5) + text(360,412,state === 'bound' ? 'holo · 리간드 결합' : 'apo · 리간드 없음',false,'text-anchor="middle"');
    $('state-description').textContent = { narrow: '리간드는 없고, 입구는 좁은 상태입니다.', open: '리간드는 없고, 입구는 열린 상태입니다.', bound: '리간드가 결합하고, 주변이 이를 감싼 상태입니다.' }[state];
    document.querySelectorAll('[data-state]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.state === state)));
  }
  document.querySelectorAll('[data-state]').forEach(b => b.addEventListener('click', () => showState(b.dataset.state)));
  showState('open');

  function drawMechanism() {
    const selection = mechanism === 'selection';
    const labels = selection ? ['원래 여러 형태', '맞는 형태가 나타남', '리간드 결합'] : ['먼저 결합', '붙은 채로 조정', '더 잘 맞는 상태'];
    const states = selection ? ['narrow', 'open', 'bound'] : ['contact', 'adjusting', 'bound'];
    $('mechanism-figure').innerHTML = `<defs><marker id="process-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 10 5 0 10" fill="var(--muted)"/></marker></defs>
      ${states.map((s,i) => `<g>${pocketGraphic(s, i*240-4,100,.34)}${selection && i<2 ? ligand(i*240+140,115,.33) : ''}${text(i*240+118,305,labels[i],true,'text-anchor="middle"')}${text(i*240+118,73,String(i+1),false,'text-anchor="middle"')}</g>`).join('')}
      <path d="M224 202h27M464 202h27" class="guide" marker-end="url(#process-arrow)"/>
      ${text(360,370,selection ? '구조 변화 → 결합' : '결합 → 추가 구조 변화',false,'text-anchor="middle"')}`;
    $('mechanism-description').textContent = selection ? '여러 형태 중 결합에 맞는 형태가 먼저 나타나고, 리간드가 결합해 그 상태를 안정화합니다.' : '리간드가 먼저 결합한 뒤, 붙은 상태에서 주변 구조가 더 잘 맞도록 조정됩니다.';
  }
  document.querySelectorAll('[data-mechanism]').forEach(b => b.addEventListener('click', () => {
    mechanism = b.dataset.mechanism; document.querySelectorAll('[data-mechanism]').forEach(x => x.setAttribute('aria-pressed', String(x === b))); drawMechanism();
  }));
  drawMechanism();

  function projection(point, angle) {
    // An orthographic projection of the actual coordinates, with one shared view.
    const [x,y,z] = point, c = Math.cos(angle), s = Math.sin(angle);
    const a = x*c + z*s, b = -x*s + z*c;
    return [a, -(y*.88 + b*.475), b*.88-y*.475];
  }
  function pathFor(points, angle, scale, cx, cy) {
    return points.map((p,i) => { const [x,y] = projection(p, angle); return `${i ? 'L' : 'M'}${(x*scale+cx).toFixed(2)},${(y*scale+cy).toFixed(2)}`; }).join(' ');
  }
  function drawMbp() {
    if (!mbp) return;
    const angle = Number($('mbp-rotation').value)*Math.PI/180;
    const paired = view === 'paired', scale = paired ? 5.25 : 6.2, apoX = paired ? 178 : 360, holoX = paired ? 540 : 360, cy = 218;
    let html = `<path d="${pathFor(mbp.apo.points,angle,scale,apoX,cy)}" fill="none" stroke="#7b8ea8" stroke-width="${paired ? 2.6 : 2.1}" stroke-linecap="round" stroke-linejoin="round" opacity="${paired ? 1 : .6}"/>
      <path d="${pathFor(mbp.holo.points,angle,scale,holoX,cy)}" fill="none" stroke="#087f8c" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`;
    const atoms = mbp.holo.ligand.map(a => { const [x,y,z] = projection(a.xyz,angle); return {x:x*scale+holoX,y:y*scale+cy,z}; });
    html += mbp.holo.bonds.map(([i,j])=>`<line x1="${atoms[i].x}" y1="${atoms[i].y}" x2="${atoms[j].x}" y2="${atoms[j].y}" stroke="#cf6941" stroke-width="3"/>`).join('');
    html += [...atoms].sort((a,b)=>a.z-b.z).map(a=>`<circle cx="${a.x}" cy="${a.y}" r="3.5" fill="#e87950"/>`).join('');
    if (paired) html += text(178,390,'1OMP · apo',false,'text-anchor="middle"') + text(540,390,'1ANF · holo',false,'text-anchor="middle"');
    else html += text(360,390,'회색: 1OMP · apo　청록: 1ANF · holo',true,'text-anchor="middle"');
    $('mbp-figure').innerHTML = html;
    $('mbp-status').textContent = paired ? '벌어진 구조와 맥아당을 감싼 구조를 같은 방향에서 봅니다.' : '공통 부분을 맞추면 다른 부분의 위치 차이가 드러납니다.';
  }
  document.querySelectorAll('[data-view]').forEach(b => b.addEventListener('click', () => {
    view=b.dataset.view; document.querySelectorAll('[data-view]').forEach(x => x.setAttribute('aria-pressed', String(x === b))); drawMbp();
  }));
  $('mbp-rotation').addEventListener('input', drawMbp);
  fetch('assets/mbp.json').then(r => { if (!r.ok) throw Error('Structure data unavailable'); return r.json(); }).then(data => {
    if (data.apo.points.length !== 370 || data.holo.points.length !== 370 || data.holo.ligand.length !== 23) throw Error('Unexpected structure data');
    mbp=data; drawMbp();
  }).catch(error => { $('mbp-status').textContent='실험 구조를 불러오지 못했습니다. 아래 RCSB 링크에서 원본을 볼 수 있습니다.'; console.error(error); });

  const noteKey = 'pocket-basics-observation-v1';
  try { $('observation').value = localStorage.getItem(noteKey) || ''; } catch { $('note-status').textContent='자동 저장을 사용할 수 없습니다. 내려받기를 이용하세요.'; }
  $('observation').addEventListener('input', () => {
    try { localStorage.setItem(noteKey, $('observation').value); $('note-status').textContent='이 브라우저에 저장됨'; }
    catch { $('note-status').textContent='자동 저장을 사용할 수 없습니다.'; }
  });
  $('save-note').addEventListener('click', () => {
    const blob = new Blob(['포켓 입문 · 내 관찰 메모\n\n'+$('observation').value],{type:'text/plain;charset=utf-8'}), url=URL.createObjectURL(blob), a=document.createElement('a');
    a.href=url; a.download='pocket-basics-notes.txt'; a.click(); setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
  readHash();
})();
