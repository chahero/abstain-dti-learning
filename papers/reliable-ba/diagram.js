/* Reading controls only: no engine calls, learned mapping or new math implementation. */
(() => {
  'use strict';
  const root = document.getElementById('figure-reader');
  if (!root) return;
  const tabs = [...root.querySelectorAll('[data-figure-step]')];
  const panels = [...root.querySelectorAll('.diagram-panel')];
  const svg = root.querySelector('#architecture-reader');
  const dimmer = root.querySelector('#diagram-dimmer');
  const emphasis = [...root.querySelectorAll('[data-map-emphasis]')];
  const zoomButton = root.querySelector('#diagram-zoom');
  const originalFigure = root.querySelector('#plain-original-figure');
  const previous = root.querySelector('#diagram-previous');
  const next = root.querySelector('#diagram-next');
  const names = tabs.map(tab=>tab.dataset.figureTitle);
  const views = tabs.map(tab=>tab.dataset.figureView);
  const positions = ['위쪽 점수 경로와 아래쪽 신뢰성 경로','왼쪽 모델들과 파란 점수 상자','보라색 NIG Head 네 개','아래쪽 특징 표현과 빨간 신뢰성 망','신뢰성 화살표가 연결되는 Parameter Scaling','오른쪽 MoNIG와 초록 출력 상자'];
  let current = 0;
  let zoomed = false;
  function draw() {
    svg.setAttribute('viewBox', zoomed && current ? views[current] : views[0]);
    dimmer.toggleAttribute('hidden', current === 0);
    if (current) dimmer.setAttribute('mask', `url(#figure-mask-${current})`);
    emphasis.forEach(g => { g.toggleAttribute('hidden', Number(g.dataset.mapEmphasis) !== current); });
    zoomButton.disabled = current === 0;
    zoomButton.setAttribute('aria-pressed', String(zoomed && current !== 0));
    zoomButton.textContent = zoomed && current ? '전체 그림으로 보기' : '선택 부분 확대';
    const zoomNote = zoomed && [1,2,4].includes(current) ? ' · GNINA 경로 확대' : '';
    root.querySelector('#diagram-current').textContent = `${current ? current+'/5 · ' : ''}${names[current]} · ${positions[current]}${zoomNote}`;
    root.querySelector('#architecture-reader-desc').textContent = current
      ? `${current}단계 ${names[current]}. ${positions[current]}를 강조한 원문 구조도. 아래에 입력, 하는 일, 출력과 가상 예시를 설명합니다.`
      : '전체 구조도. 위쪽 엔진 점수와 아래쪽 신뢰성 특징 경로가 증거 조절에서 합류해 최종 예측을 만듭니다.';
  }
  function select(step, {focus=false, updateUrl=true, scroll=false}={}) {
    if (!Number.isInteger(step) || step < 0 || step > 5) step = 0;
    current = step;
    if (!step) zoomed = false;
    tabs.forEach((tab,i) => {
      tab.setAttribute('aria-selected', String(i === step));
      tab.tabIndex = i === step ? 0 : -1;
    });
    panels.forEach((panel,i) => { panel.hidden = i !== step; });
    if(originalFigure){
      const detail=panels[step].querySelector(':scope > #plain-step-'+step+'-details');
      if(detail)detail.before(originalFigure);
      else panels[step].append(originalFigure);
      if(step===0)originalFigure.open=true;
    }
    previous.disabled = step === 0;
    next.disabled = step === 5;
    root.querySelector('#diagram-progress').textContent = step ? `${step} / 5` : '전체 그림';
    if (updateUrl) history.replaceState(null, '', `#walkthrough/figure-step-${step}`);
    if (focus) tabs[step].focus({preventScroll:true});
    draw();
    if (scroll) root.scrollIntoView({block:'start',behavior:'instant'});
  }
  tabs.forEach((tab,i) => {
    tab.addEventListener('click', () => select(i));
    tab.addEventListener('keydown', event => {
      let target;
      if (event.key === 'ArrowRight') target = (i+1)%tabs.length;
      else if (event.key === 'ArrowLeft') target = (i+tabs.length-1)%tabs.length;
      else if (event.key === 'Home') target = 0;
      else if (event.key === 'End') target = 5;
      else return;
      event.preventDefault(); select(target,{focus:true});
    });
  });
  previous.addEventListener('click', () => select(current-1,{scroll:true}));
  next.addEventListener('click', () => select(current+1,{scroll:true}));
  zoomButton.addEventListener('click', () => {
    zoomed = !zoomed; draw();
    root.querySelector('.diagram-figure').scrollIntoView({block:'start',behavior:'instant'});
  });
  function fromHash() {
    const match = location.hash.match(/^#(?:walkthrough|overview)\/figure-step-([0-5])$/);
    if (match) select(Number(match[1]),{updateUrl:false});
    else {
      const target=document.getElementById(location.hash.slice(1).split('/')[1]||'');
      const panel=target?.closest('.diagram-panel');
      if(panel)select(Number(panel.id.replace('figure-step-','')),{updateUrl:false});
      else if(location.hash==='#walkthrough'||!location.hash)select(1,{updateUrl:false});
    }
  }
  addEventListener('hashchange',fromHash);
  fromHash();
  // The export includes every explanation; printing restores the current screen afterwards.
  addEventListener('beforeprint', () => {
    svg.setAttribute('viewBox',views[0]); dimmer.toggleAttribute('hidden',true);
    emphasis.forEach(g=>{g.toggleAttribute('hidden',true);});
  });
  addEventListener('afterprint',draw);
})();
