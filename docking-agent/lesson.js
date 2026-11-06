(() => {
  'use strict';
  const articles = [...document.querySelectorAll('article[data-step]')];
  const select = document.querySelector('#step-select');
  const navigation = document.querySelector('#lesson-nav');
  const title = document.querySelector('#lesson-title');
  let current = 1;
  const navButtons = articles.map(article => {
    const step = Number(article.dataset.step), name = article.dataset.title;
    const option = document.createElement('option'); option.value = String(step); option.textContent = `${step}. ${name}`; select.append(option);
    const button = document.createElement('button'); button.type = 'button';
    const number = document.createElement('span'); number.textContent = String(step);
    button.append(number, document.createTextNode(name)); button.setAttribute('aria-label', `${step}. ${name}`);
    button.addEventListener('click', () => showStep(step, true)); navigation.append(button); return button;
  });
  function showStep(step, focus = false) {
    current = Math.min(articles.length, Math.max(1, Number(step) || 1));
    for (const article of articles) article.hidden = Number(article.dataset.step) !== current;
    const article = articles[current - 1]; title.textContent = article.dataset.title;
    document.querySelector('#lesson-intro').textContent = article.dataset.intro;
    document.querySelector('#step-count').textContent = `${current} / ${articles.length}`;
    document.querySelector('#page-counter').textContent = `${current} / ${articles.length}`;
    document.querySelector('#prev').disabled = current === 1; document.querySelector('#next').disabled = current === articles.length;
    select.value = String(current); navButtons.forEach((button,index) => index === current-1 ? button.setAttribute('aria-current','step') : button.removeAttribute('aria-current'));
    document.title = `${current}. ${article.dataset.title} · Docking Agent 실습`;
    if (location.hash !== `#step-${current}`) history.replaceState(null,'',`#step-${current}`);
    if (focus) { title.focus({preventScroll:true}); document.querySelector('.course-line').scrollIntoView({block:'start'}); }
  }
  select.addEventListener('change', () => showStep(select.value, true));
  document.querySelector('#prev').addEventListener('click', () => showStep(current-1, true));
  document.querySelector('#next').addEventListener('click', () => showStep(current+1, true));
  addEventListener('hashchange', () => { const match=location.hash.match(/^#step-(\d+)$/); if(match)showStep(Number(match[1])); });
  addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.target.closest('select,input,textarea,[contenteditable]')) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); showStep(current+(event.key==='ArrowRight'?1:-1),true); }
  });
  document.querySelector('#print').addEventListener('click', () => print());
  let opened = false;
  addEventListener('beforeprint', () => { const sources=document.querySelector('.sources'); opened=sources.open; sources.open=true; });
  addEventListener('afterprint', () => { document.querySelector('.sources').open=opened; });
  showStep(Number(location.hash.match(/^#step-(\d+)$/)?.[1] || 1));
  function selectChoice(attribute,value) { document.querySelectorAll(`[${attribute}]`).forEach(button => button.setAttribute('aria-pressed',String(button.getAttribute(attribute)===value))); }
  const roles={llm:['LLM은 다음 행동을 판단합니다','Codex가 요청을 해석하고 어떤 도구를 실행할지 판단합니다. 분자의 좌표를 직접 계산하는 엔진과 역할이 다릅니다.'],harness:['하네스는 실행 조건과 기록을 관리합니다','입력·제한 시간·도구 실행·산출물 보존을 관리합니다. 단순한 종료 코드뿐 아니라 남겨진 파일과 경고도 확인할 수 있게 합니다.'],engine:['엔진은 분자의 결합 자세를 계산합니다','Vina 계열은 주어진 영역의 자세를 탐색합니다. DiffDock-L은 학습한 모델로 위치·방향·비틀림을 예측하고 후보를 평가합니다.']};
  document.querySelectorAll('[data-role]').forEach(button => button.addEventListener('click',() => { const role=button.dataset.role; selectChoice('data-role',role); document.querySelectorAll('[data-layer]').forEach(box=>box.classList.toggle('selected',box.dataset.layer===role)); document.querySelector('#role-title').textContent=roles[role][0];document.querySelector('#role-description').textContent=roles[role][1]; }));
  document.querySelectorAll('[data-search]').forEach(button => button.addEventListener('click',() => { const blind=button.dataset.search==='blind';selectChoice('data-search',button.dataset.search);document.querySelector('#known-box').toggleAttribute('hidden',blind);document.querySelector('#whole-search').toggleAttribute('hidden',!blind);document.querySelector('#search-title').textContent=blind?'전체 단백질에서 위치와 자세 찾기':'주어진 포켓 안에서 자세를 찾기';document.querySelector('#search-description').textContent=blind?'DiffDock-L에는 알려진 포켓 박스를 주지 않았습니다. 준비된 단백질 PDB와 리간드를 받아 전체 단백질에서 결합 위치와 자세를 예측합니다.':'Vina와 Vina-GPU에는 알려진 포켓을 중심으로 한 20 Å 정육면체 박스를 주었습니다. 이 안에서 화합물의 배치를 탐색합니다.'; }));
  function showAudit(geometry) { const grid=document.querySelector('#sample-grid');grid.replaceChildren();for(let i=1;i<=10;i++){const node=document.createElement('div');node.className=`sample${geometry&&i===10?' failed':''}`;const number=document.createElement('b');number.textContent=String(i);const state=document.createElement('span');state.textContent=geometry?(i===10?'좌표 발산':'기본범위 내'):'파일 확인';node.append(number,state);grid.append(node);}document.querySelector('#audit-caption').textContent=geometry?'기본 결합 길이 검사 · 이 유기 리간드에서 0.5–3 Å 범위':'SDF 10개 · 유한한 좌표 · 원자·결합 목록 확인';document.querySelector('#audit-result').textContent=geometry?'9개 기본범위 내 · 1개 실패 — 통과한 9개도 정답을 보장하지 않습니다.':'이 확인만으로 10개 모두를 믿을 수 있을까요?'; }
  document.querySelectorAll('[data-audit]').forEach(button=>button.addEventListener('click',()=>{selectChoice('data-audit',button.dataset.audit);showAudit(button.dataset.audit==='geometry');}));showAudit(false);
  let data=null, metric='time';
  function showMetric(){if(!data)return;const rmsd=metric==='rmsd',field=rmsd?'top1_rmsd_angstrom':'elapsed_seconds',limit=rmsd?18:110;document.querySelector('#metric-title').textContent=rmsd?'최고 순위 자세의 참조 RMSD · Å':'전체 실행 시간 · 초';const bars=document.querySelector('#metric-bars');bars.replaceChildren();data.runs.forEach((row,index)=>{const item=document.createElement('div');item.className='metric-row';item.style.setProperty('--bar',['#087f8c','#369ba1','#7051bc'][index]);const name=document.createElement('span');name.textContent=row.label;const track=document.createElement('div');track.className='metric-track';const fill=document.createElement('div');fill.className='metric-fill';fill.style.setProperty('--percent',`${row[field]/limit*100}%`);track.append(fill);const value=document.createElement('span');value.className='metric-value';value.textContent=`${row[field].toFixed(rmsd?3:2)} ${rmsd?'Å':'초'}`;item.append(name,track,value);bars.append(item);});document.querySelector('#metric-caption').textContent=rmsd?'작을수록 준비된 참조 자세에 가깝습니다. 리간드 정렬·대칭 보정은 적용하지 않았습니다.':'가중치 다운로드·C++ 빌드·최초 테이블 생성을 제외한 기록입니다. DiffDock-L은 캐시 재사용 시 전체 97.654초입니다.';}
  document.querySelectorAll('[data-metric]').forEach(button=>button.addEventListener('click',()=>{metric=button.dataset.metric;selectChoice('data-metric',metric);showMetric();}));
  fetch('assets/case-summary.json').then(response=>{if(!response.ok)throw new Error(`HTTP ${response.status}`);return response.json();}).then(value=>{data=value;showMetric();}).catch(error=>{document.querySelector('#metric-bars').textContent='실측 그림 데이터를 불러오지 못했습니다. 오른쪽 표와 학습 원고에서 확인할 수 있습니다.';console.error('Lecture metrics failed to load',error);});
})();
