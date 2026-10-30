(() => {
  'use strict';
  const $=id=>document.getElementById(id);
  const titles=['분자는 어떤 자세로 붙고, 단백질은 어떻게 바뀔까?','위치·회전·비틀림은 어떻게 다를까?','도킹 전에 무엇을 준비해야 할까?','Vina는 자세를 어떻게 찾고 고를까?','ABL–이마티닙 공식 예제를 읽어 봅시다','고전 도킹에서는 단백질이 항상 굳어 있을까?','확산 모델은 도킹에서 무엇을 배울까?','DiffDock은 무엇을 움직이고 무엇을 고정할까?','DynamicBind는 단백질을 어떻게 함께 바꿀까?','어떤 원자와 구조가 움직일 수 있을까?','그럴듯한 자세를 어떻게 평가해야 할까?','도킹의 질문과 세 기술을 연결합니다'];
  const intros=['붙을 자리를 찾았다면, 이번에는 주어진 분자를 그 안에 어떻게 배치할지 묻습니다.','같은 분자의 통째 이동·회전과, 결합 축 주위의 내부 회전을 구분합니다.','구조와 화학 상태를 준비하고, 어느 범위를 탐색할지 정합니다.','근사 점수를 기준으로 여러 시작·주변 개선·반복 탐색을 조합합니다.','공식 예제의 입력과 공개 참고 출력 좌표를 같은 시점에서 살펴봅니다.','리간드 유연성, 선택 곁사슬 유연성, 여러 입력 구조의 활용을 구분합니다.','교란된 자세의 복원을 학습하고, 새 후보를 만드는 원리를 배웁니다.','고정한 단백질을 참고해 리간드 자세를 생성하고 별도의 신뢰도로 평가합니다.','리간드 자세와 단백질 잔기·곁사슬의 배치를 함께 갱신합니다.','고전·AI 접근과 단백질 유연성을 서로 다른 축으로 비교합니다.','정답과의 거리, 물리·화학적 타당성, 출력 점수의 뜻을 함께 읽습니다.','기본 개념·작동 원리·유연성·평가를 네 문장으로 정리합니다.'];
  let current=0,example=null;
  function navigate(n,focus=false){
    current=Math.max(0,Math.min(11,n));document.querySelectorAll('article[data-step]').forEach((a,i)=>a.hidden=i!==current);
    document.querySelectorAll('[data-go]').forEach(b=>{if(+b.dataset.go===current)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});
    $('lesson-title').textContent=titles[current];$('lesson-intro').textContent=intros[current];$('page-count').textContent=`${current+1} / 12`;
    $('previous').disabled=current===0;$('next').disabled=current===11;document.title=`${titles[current]} · 포켓 구조 학습 5장`;history.replaceState(null,'',`#step-${current+1}`);
    if(focus){$('lesson-title').focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});}
  }
  function readHash(){const m=location.hash.match(/^#step-(1[0-2]|[1-9])$/);navigate(m?+m[1]-1:0);}
  document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>navigate(+b.dataset.go,true)));
  $('previous').addEventListener('click',()=>navigate(current-1,true));$('next').addEventListener('click',()=>navigate(current+1,true));window.addEventListener('hashchange',readHash);
  document.addEventListener('keydown',e=>{if(e.ctrlKey||e.altKey||e.metaKey||e.target.closest('input,textarea,button,select,summary,a,[role="region"]'))return;if(e.key==='ArrowRight'){e.preventDefault();navigate(current+1,true);}if(e.key==='ArrowLeft'){e.preventDefault();navigate(current-1,true);}});
  $('print').addEventListener('click',()=>window.print());
  const ink='#10233c',teal='#087f8c',blue='#3976be',coral='#e87950',muted='#9aabba';
  const label=(x,y,t,kind='label',anchor='middle')=>`<text x="${x}" y="${y}" class="${kind}" text-anchor="${anchor}">${t}</text>`;
  const line=(x,y,a,b,color=muted,width=2,dash='')=>`<path d="M${x} ${y}L${a} ${b}" fill="none" stroke="${color}" stroke-width="${width}" ${dash?`stroke-dasharray="${dash}"`:''}/>`;
  const arrow=(x,y,a,b,color=muted)=>{const theta=Math.atan2(b-y,a-x),p=[a-10*Math.cos(theta-.5),b-10*Math.sin(theta-.5)],q=[a-10*Math.cos(theta+.5),b-10*Math.sin(theta+.5)];return line(x,y,a,b,color)+`<path d="M${p}L${a},${b}L${q}" fill="none" stroke="${color}" stroke-width="2"/>`;};
  const box=(x,y,w,h,t,sub='',active=false)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" fill="${active?'#e6f4f4':'#f5f9fa'}" stroke="${active?teal:'#cfdbe4'}"/>${label(x+w/2,y+(sub?h/2-4:h/2+7),t)}${sub?label(x+w/2,y+h/2+25,sub,'small-label'):''}`;
  function pressed(selector,key,value){document.querySelectorAll(selector).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset[key]===String(value))));}
  function surface(openness=1){const r=285+135*openness,m=(255+r)/2;return `<path class="surface" d="M110 310C60 280 63 188 111 175C90 114 129 79 175 92C212 66 259 101 255 155C245 195 273 250 ${m} 254C${r-20} 256 ${r+12} 201 ${r} 158C${r-10} 118 ${r+19} 75 ${r+67} 91C${r+117} 66 ${r+159} 118 ${r+140} 165C${r+196} 174 ${r+201} 271 ${r+150} 313C${r+56} 386 200 389 110 310Z"/>`;}
  // A four-point teaching fragment. Torsion rotates D about the B-C axis in 3D.
  function toyPoints(yaw=0,torsion=0){
    const t=torsion*Math.PI/180,a=yaw*Math.PI/180;
    const points=[[-1.2,1.2,.1],[0,0,0],[1.6,0,0],[2.55,1.25*Math.cos(t)-.75*Math.sin(t),1.25*Math.sin(t)+.75*Math.cos(t)]];
    const center=[0,1,2].map(i=>points.reduce((s,p)=>s+p[i],0)/4);
    return points.map(p=>{const x=p[0]-center[0],y=p[1]-center[1],z=p[2]-center[2];return [x*Math.cos(a)+z*Math.sin(a),y,-x*Math.sin(a)+z*Math.cos(a)];});
  }
  const projectToy=(p,x,y,s)=>[x+s*(p[0]+.3*p[2]),y-s*(p[1]-.16*p[2])];
  function ligand(x,y,yaw=0,torsion=0,s=35,color=coral,opacity=1,names=false){
    const points=toyPoints(yaw,torsion),xy=points.map(p=>projectToy(p,x,y,s));let m='';
    for(let i=1;i<4;i++)m+=line(...xy[i-1],...xy[i],color,4);
    m+=points.map((p,i)=>({p,i,q:xy[i]})).sort((a,b)=>a.p[2]-b.p[2]).map(({i,q})=>`<circle cx="${q[0]}" cy="${q[1]}" r="${names?14:8}" fill="${color}" stroke="#fff" stroke-width="1.7"/>${names?label(q[0],q[1]-24,['A','B','C','D'][i],'small-label'):''}`).join('');
    return `<g opacity="${opacity}">${m}</g>`;
  }
  function task(mode){$('task-figure').innerHTML=surface()+ (mode==='pocket'?`<ellipse cx="337" cy="183" rx="65" ry="47" fill="${teal}" fill-opacity=".13" stroke="${teal}" stroke-dasharray="5 5"/>${label(337,168,'자리의 후보','small-label')}`:ligand(335,184,20,25,34))+label(360,429,mode==='pocket'?'어디가 결합할 만한 공간일까?':'주어진 화합물이 어떤 배치로 놓일까?','small-label');$('task-caption').textContent=mode==='pocket'?'공간의 위치와 영역을 찾는 질문입니다. 아직 특정 화합물의 자세를 정한 것은 아닙니다.':'같은 공간 안에서도 리간드의 위치·방향·내부 모양을 정해야 합니다.';pressed('[data-task]','task',mode);}
  document.querySelectorAll('[data-task]').forEach(b=>b.addEventListener('click',()=>task(b.dataset.task)));task('pocket');

  function pose(){
    const shift=+$('translation').value,yaw=+$('rotation').value,tor=+$('torsion').value,points=toyPoints(yaw,tor),xy=points.map(p=>projectToy(p,360+shift,213,70));
    let s=ligand(360+shift,213,yaw,tor,70,coral,1,true);
    const a=xy[1],b=xy[2],dx=b[0]-a[0],dy=b[1]-a[1],norm=Math.hypot(dx,dy);
    s=line(a[0]-dx/norm*45,a[1]-dy/norm*45,b[0]+dx/norm*45,b[1]+dy/norm*45,blue,1.7,'5 6')+s+label(360,350,'회전축: B–C 결합','small-label')+arrow(65,390,126,390)+arrow(65,390,65,336)+arrow(65,390,100,363)+label(140,397,'x','tiny-label')+label(65,323,'y','tiny-label')+label(112,354,'z','tiny-label');
    $('pose-figure').innerHTML=s;$('pose-figure').dataset.bondLengths=JSON.stringify(points.slice(1).map((p,i)=>Math.hypot(...p.map((v,j)=>v-points[i][j]))));
    $('pose-caption').textContent=`이동 ${shift} · 통째 회전 ${yaw}° · B–C 축 비틀림 ${tor}°. 원자 연결과 3D 결합 길이는 유지됩니다.`;
  }
  ['translation','rotation','torsion'].forEach(id=>$(id).addEventListener('input',pose));$('reset-pose').addEventListener('click',()=>{['translation','rotation','torsion'].forEach(id=>$(id).value='0');pose();});pose();

  function searchBox(mode){const rects={target:[232,96,217,200],small:[312,157,55,56],elsewhere:[90,225,155,135]},[x,y,w,h]=rects[mode];$('box-figure').innerHTML=surface()+ligand(335,184,20,25,34)+`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${blue}" fill-opacity=".05" stroke="${blue}" stroke-width="2.2" stroke-dasharray="7 6"/>`+label(360,430,'원하는 자세가 탐색 범위 안에 들어와야 합니다','small-label');$('box-caption').textContent=mode==='target'?'이 모식도에서는 관심 공간과 리간드 자세를 포함하는 범위를 잡았습니다.':mode==='small'?'너무 좁은 상자는 가능한 자세의 일부를 탐색 범위에서 제외할 수 있습니다.':'다른 곳을 탐색하면 원하는 자리의 좋은 자세를 놓칠 수 있습니다.';pressed('[data-box]','box',mode);}
  document.querySelectorAll('[data-box]').forEach(b=>b.addEventListener('click',()=>searchBox(b.dataset.box)));searchBox('target');

  const vinaCaptions=['여러 시작 자세에서 탐색합니다. 위치·방향·비틀림이 달라질 수 있습니다.','각 시작점 근처에서 점수가 좋아지는 자세를 찾는 국소 최적화를 합니다.','확률적인 탐색과 국소 개선을 반복해 다른 영역도 살펴봅니다.','얻은 후보를 점수와 구조 차이 등을 고려해 정리합니다.'];
  function vina(stage){let s=arrow(60,360,60,83)+arrow(60,360,678,360)+label(85,53,'근사 도킹 점수의 지형 (개념)','small-label','start')+`<path d="M85 148C125 120 135 284 200 284S280 120 340 155S430 315 490 315S570 135 650 240" fill="none" stroke="${teal}" stroke-width="3.5"/>`+label(360,407,'수많은 자세를 한 축으로 줄여 그린 모식도','small-label');
    const starts=[[110,130],[335,151],[630,220]],ends=[[200,284],[490,315],[650,240]];
    if(stage===0)s+=starts.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="10" fill="${coral}" stroke="#fff" stroke-width="1.5"/>`).join('');
    if(stage>=1)s+=ends.map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="10" fill="${i===1&&stage===3?coral:teal}" stroke="#fff" stroke-width="1.5"/>`).join('');
    if(stage===1)s+=starts.map((p,i)=>arrow(...p,ends[i][0]-8,ends[i][1]-18,coral)).join('');
    if(stage===2)s+=`<path d="M200 270Q300 50 475 295" fill="none" stroke="${coral}" stroke-width="2.3" stroke-dasharray="7 6"/>`+label(370,128,'다른 시작·영역도 탐색','small-label');
    if(stage===3)s+=label(490,285,'유망 후보','small-label')+label(200,258,'다른 후보','small-label');
    $('vina-figure').innerHTML=s;$('vina-caption').textContent=vinaCaptions[stage];pressed('[data-vina]','vina',stage);
  }
  document.querySelectorAll('[data-vina]').forEach(b=>b.addEventListener('click',()=>vina(+b.dataset.vina)));vina(0);

  function sidechain(turned=false){const angle=turned?-.95:0,origin=[405,190],p=[[0,0],[-35,3],[-62,25]].map(([x,y])=>[origin[0]+x*Math.cos(angle)-y*Math.sin(angle),origin[1]+x*Math.sin(angle)+y*Math.cos(angle)]);return line(...p[0],...p[1],ink,5)+line(...p[1],...p[2],ink,5)+p.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="6.5" fill="${ink}" stroke="#fff" stroke-width="1"/>`).join('');}
  function flex(mode){let s='';if(mode==='ensemble')s=[.25,.65,1].map((v,i)=>`<g transform="translate(${i*230-10} 75) scale(.35)">${surface(v)}</g>`+label(112+i*230,288,`입력 구조 ${['A','B','C'][i]}`,'small-label')+arrow(112+i*230,307,112+i*230,340)+label(112+i*230,377,'각각 도킹','small-label')).join('');else s=surface()+sidechain(mode==='sidechain')+ligand(335,191,18,25,30)+label(350,430,mode==='rigid'?'단백질과 곁사슬은 고정':'선택한 곁사슬의 각도는 탐색 · 백본은 고정','small-label');$('flex-figure').innerHTML=s;$('flex-caption').textContent=mode==='rigid'?'단백질을 고정해도 리간드 자체의 자세와 내부 회전은 탐색할 수 있습니다.':mode==='sidechain'?'선택한 곁사슬을 움직일 수 있게 합니다. 단백질 백본 전체가 함께 바뀌는 것은 아닙니다.':'서로 다른 단백질 구조를 미리 준비하고 각각 도킹합니다. 한 계산 안에서 함께 움직이는 것과 구분합니다.';pressed('[data-flex]','flex',mode);}
  document.querySelectorAll('[data-flex]').forEach(b=>b.addEventListener('click',()=>flex(b.dataset.flex)));flex('rigid');

  function diffusion(mode){const train=mode==='train';$('diffusion-figure').innerHTML=box(15,35,210,83,train?'알려진 결합 자세':'무작위 시작 자세')+arrow(235,76,258,76)+box(270,35,210,83,train?'자세 교란':'반복 수정',train?'위치 · 회전 · 비틀림':'학습된 기준',true)+arrow(490,76,513,76)+box(525,35,180,83,train?'복원 학습':'포즈 후보')+ligand(120,269,train?0:110,train?0:140,32)+ligand(375,245,train?100:55,train?120:65,32)+ligand(615,269,0,0,32)+label(360,375,'각 단계는 단백질의 주변 환경을 참고합니다','small-label')+label(360,427,'생성 단계 ≠ 실제 결합 시간','small-label');$('diffusion-caption').textContent=train?'정답을 교란하고 복원할 방향을 학습합니다. 단순히 흐릿한 2D 분자 그림을 선명하게 만드는 작업은 아닙니다.':'새 입력에서는 학습한 기준으로 시작 자세를 여러 번 바꿔 후보를 얻습니다. 실제 MD 시간 경로는 아닙니다.';pressed('[data-diffusion]','diffusion',mode);}
  document.querySelectorAll('[data-diffusion]').forEach(b=>b.addEventListener('click',()=>diffusion(b.dataset.diffusion)));diffusion('train');

  const diffdockCaptions=['단백질은 고정하고 리간드의 시작 자세를 무작위화합니다.','학습된 모델이 리간드의 이동·회전·비틀림 수정을 반복합니다.','다른 시작과 샘플링으로 여러 포즈 후보를 얻습니다.','별도의 자세 신뢰도 모델이 후보의 품질을 평가하고 정렬합니다.'];
  function diffdock(stage){let s=`<g id="diffdock-protein">${surface()}</g>`;
    if(stage===0)s+=ligand(170,63,110,140,30);
    if(stage===1)s+=ligand(285,126,65,75,31)+arrow(242,86,302,157,coral);
    if(stage>=2)s+=ligand(335,186,0,0,31,coral,1)+ligand(330,188,100,110,31,blue,.4)+ligand(341,180,-70,-110,31,teal,.35);
    s+=label(355,424,stage===3?'여러 후보 → 자세 품질 평가 → 순위':'수용체 구조는 고정되어 있습니다','small-label');
    $('diffdock-figure').innerHTML=s;$('diffdock-caption').textContent=diffdockCaptions[stage];pressed('[data-diffdock]','diffdock',stage);
  }
  document.querySelectorAll('[data-diffdock]').forEach(b=>b.addEventListener('click',()=>diffdock(+b.dataset.diffdock)));diffdock(0);

  const dynamicCaptions=['시작 단백질 구조와 리간드를 함께 입력합니다.','원 논문 예시의 초기 단계에서는 먼저 리간드 자세를 바꿉니다.','리간드와 단백질 잔기의 이동·회전, 곁사슬 각도를 함께 갱신합니다.','리간드에 맞게 조정한 복합체와 별도의 품질·친화도 예측을 얻습니다.'];
  function dynamic(stage){const openness=[.08,.08,.6,1][stage];let s=surface(openness)+ligand(stage===0?475:stage===1?330:stage===2?335:337,stage===0?60:stage===1?120:185,stage===0?110:stage===1?50:0,stage===0?120:stage===1?60:0,31);
    if(stage===2)s+=arrow(365,155,408,148,blue)+arrow(410,241,435,223,blue)+label(475,312,'잔기 배치도 갱신','small-label');
    if(stage===3)s+=box(20,385,200,60,'복합체 좌표')+box(252,385,200,60,'품질 예측')+box(484,385,200,60,'친화도 예측');
    else s+=label(355,429,stage===0?'3D 단백질 + 화합물 정보':'생성 과정의 중간 단계 · 물리적 시간 아님','small-label');
    $('dynamic-figure').innerHTML=s;$('dynamic-caption').textContent=dynamicCaptions[stage];pressed('[data-dynamic]','dynamic',stage);
  }
  document.querySelectorAll('[data-dynamic]').forEach(b=>b.addEventListener('click',()=>dynamic(+b.dataset.dynamic)));dynamic(0);

  function compare(method){const active=[true,method===1||method===3,method===3];const names=['리간드의 위치·회전·비틀림','수용체 곁사슬','수용체 백본 배치'];$('comparison-figure').innerHTML=names.map((name,i)=>`<circle cx="70" cy="${60+i*105}" r="17" fill="${active[i]?teal:'#d5dfe5'}"/>`+label(110,68+i*105,name,'label','start')+label(602,68+i*105,i===1&&method===1?'선택한 것만':active[i]?'갱신':'고정','small-label')).join('');$('comparison-caption').textContent=['Vina 고정 수용체 예: 리간드 자세만 탐색합니다.','Vina 유연한 곁사슬 예: 선택한 곁사슬을 추가로 탐색합니다. 백본은 고정입니다.','원본 DiffDock: 학습된 방식으로 리간드 자세를 생성하지만 단백질은 고정합니다.','DynamicBind: 리간드와 수용체 잔기 배치를 함께 조정합니다.'][method];document.querySelectorAll('[data-method]').forEach(el=>el.classList.toggle('is-active',+el.dataset.method===method));pressed('[data-compare]','compare',method);}
  document.querySelectorAll('[data-compare]').forEach(b=>b.addEventListener('click',()=>compare(+b.dataset.compare)));compare(0);

  $('evaluation-figure').innerHTML=box(40,25,640,75,'기준 자세와 얼마나 가까운가?','단백질을 맞춘 공통 좌표계의 리간드 비교')+ligand(210,185,10,10,25,teal,.7)+ligand(225,190,10,35,25,coral,.8)+`<circle cx="526" cy="180" r="43" fill="#d9e7ec" stroke="#9aabba" stroke-width="2"/><circle cx="496" cy="184" r="17" fill="${coral}" stroke="#bd5836" stroke-width="2"/>`+label(535,248,'원자 겹침도 확인','small-label')+box(40,290,300,100,'자세·구조 품질','RMSD · 충돌 · 입체화학',true)+box(380,290,300,100,'숫자의 의미','근사 점수 · 품질 · 친화도');

  function renderExample(){
    if(!example)return;const pose=example.poses.find(p=>p.rank===+$('example-pose').value),angle=+$('example-rotation').value*Math.PI/180;
    const project=p=>[360+12*(p[0]*Math.cos(angle)+p[2]*Math.sin(angle)),214-12*p[1]];
    let proteinPath='',previous=null;
    for(const a of example.protein){if(Math.hypot(...a.xyz)>18){previous=null;continue;}const q=project(a.xyz),connected=previous&&a.chain===previous.chain&&Math.hypot(...a.xyz.map((v,i)=>v-previous.xyz[i]))<4.5;proteinPath+=(connected?'L':'M')+q.join(' ');previous=a;}
    let s=`<path d="${proteinPath}" fill="none" stroke="#bac6cf" stroke-width="1.5" stroke-linejoin="round"/>`;
    const draw=(points,color,opacity)=>`<g opacity="${opacity}">${example.bonds.map(([i,j])=>line(...project(points[i]),...project(points[j]),color,2.8)).join('')}${points.map(p=>project(p)).map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3.1" fill="${color}" stroke="#fff" stroke-width=".5"/>`).join('')}</g>`;
    if($('show-input').checked)s+=draw(example.reference.map(a=>a.xyz),teal,.7);s+=draw(pose.points,coral,.94);
    $('example-figure').innerHTML=s;$('example-status').textContent=`공식 참고 출력 ${pose.rank}위 · Vina 점수 ${pose.score.toFixed(3)} kcal/mol · 리간드 중원자 37개`;
    $('example-table').querySelectorAll('tr[data-rank]').forEach(row=>row.classList.toggle('is-selected',+row.dataset.rank===pose.rank));
  }
  ['example-pose','show-input'].forEach(id=>$(id).addEventListener('change',renderExample));$('example-rotation').addEventListener('input',renderExample);
  fetch('assets/vina-example.json').then(r=>{if(!r.ok)throw Error('Official example unavailable');return r.json();}).then(value=>{
    if(value.poses.length!==4||value.reference.length!==37)throw Error('Invalid example data');example=value;
    for(const p of example.poses){const o=document.createElement('option');o.value=String(p.rank);o.textContent=`${p.rank}위 · ${p.score.toFixed(3)}`;$('example-pose').append(o);}
    $('example-pose').disabled=false;$('example-table').querySelector('tbody').innerHTML=example.poses.map(p=>`<tr data-rank="${p.rank}"><td>${p.rank}</td><td>${p.score.toFixed(3)}</td></tr>`).join('');renderExample();
  }).catch(e=>{$('example-status').textContent='공식 예제 자료를 불러오지 못했습니다. 새로고침하거나 원본 출력 파일을 확인해 주세요.';console.error(e);});
  const noteKey='pocket-docking-observation-v1';try{$('observation').value=localStorage.getItem(noteKey)||'';}catch{}
  $('observation').addEventListener('input',()=>{try{localStorage.setItem(noteKey,$('observation').value);$('note-status').textContent='이 브라우저에 저장됨';}catch{$('note-status').textContent='자동 저장을 사용할 수 없습니다.';}});
  $('save-note').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob(['포켓 구조 학습 5장 · 내 관찰 메모\n\n'+$('observation').value],{type:'text/plain;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='docking-notes.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
  readHash();
})();
