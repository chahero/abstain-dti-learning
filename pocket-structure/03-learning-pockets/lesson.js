(() => {
  'use strict';
  const $=id=>document.getElementById(id);
  const titles=['딥러닝은 포켓을 어떻게 알아볼까?','모델은 ‘포켓답다’를 어디서 배울까?','원자 좌표를 3차원 이미지로 바꾸려면?','DeepPocket은 fpocket 다음에 무엇을 할까?','‘어디인가’와 ‘어디까지인가’는 다릅니다','원자를 점과 연결선으로 읽는다면?','이웃 원자의 정보를 어떻게 모을까?','GrASP는 원자 점수에서 포켓을 어떻게 만들까?','fpocket·P2Rank와 무엇이 다를까?','두 기술을 네 문장으로 정리합니다'];
  const intros=['같은 3차원 단백질을, 격자와 그래프라는 서로 다른 표현으로 읽습니다.','라벨을 참고해 배우는 과정과, 학습된 모델로 예측하는 과정을 나눕니다.','공간의 칸, 정보의 종류, 주변 패턴을 읽는 연산을 연결합니다.','fpocket 후보를 신경망으로 재평가하고 상위 후보의 영역을 예측합니다.','후보의 점수·순위와 포켓 공간의 범위를 구분합니다.','3차원 거리 관계를 원자 그래프에 담는 방법을 배웁니다.','메시지 패싱과 어텐션을 작은 이웃 관계로 살펴봅니다.','표면 주변 정보를 모아 원자를 평가하고, 원자들을 포켓으로 묶습니다.','후보를 만드는 과정, 평가 단위, 출력의 뜻을 비교합니다.','입력 표현과 원리를 기억하고, 모델 점수의 의미를 구분합니다.'];
  let current=0;
  function navigate(n,focus=false){
    current=Math.max(0,Math.min(titles.length-1,n));
    document.querySelectorAll('article[data-step]').forEach((el,i)=>el.hidden=i!==current);
    document.querySelectorAll('[data-go]').forEach(el=>{if(+el.dataset.go===current)el.setAttribute('aria-current','step');else el.removeAttribute('aria-current');});
    $('lesson-title').textContent=titles[current];$('lesson-intro').textContent=intros[current];$('page-count').textContent=`${current+1} / ${titles.length}`;
    $('previous').disabled=current===0;$('next').disabled=current===titles.length-1;
    document.title=`${titles[current]} · 포켓 구조 학습 3장`;history.replaceState(null,'',`#step-${current+1}`);
    if(focus){$('lesson-title').focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});}
  }
  function readHash(){const m=location.hash.match(/^#step-(10|[1-9])$/);navigate(m?+m[1]-1:0);}
  document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>navigate(+b.dataset.go,true)));
  $('previous').addEventListener('click',()=>navigate(current-1,true));$('next').addEventListener('click',()=>navigate(current+1,true));window.addEventListener('hashchange',readHash);
  document.addEventListener('keydown',e=>{if(e.ctrlKey||e.altKey||e.metaKey||e.target.closest('input,textarea,button,select,summary,a,[role="region"]'))return;if(e.key==='ArrowRight'){e.preventDefault();navigate(current+1,true);}if(e.key==='ArrowLeft'){e.preventDefault();navigate(current-1,true);}});
  $('print').addEventListener('click',()=>window.print());
  const ink='#10233c',teal='#087f8c',blue='#3976be',coral='#e87950',muted='#a8b8c5';
  const label=(x,y,t,kind='label',anchor='middle')=>`<text x="${x}" y="${y}" class="${kind}" text-anchor="${anchor}">${t}</text>`;
  const line=(x,y,a,b,color=muted,width=2,dash='')=>`<path d="M${x} ${y}L${a} ${b}" fill="none" stroke="${color}" stroke-width="${width}" ${dash?`stroke-dasharray="${dash}"`:''}/>`;
  const arrow=(x,y,a,b,color=muted)=>{const angle=Math.atan2(b-y,a-x),p1=[a-10*Math.cos(angle-.5),b-10*Math.sin(angle-.5)],p2=[a-10*Math.cos(angle+.5),b-10*Math.sin(angle+.5)];return line(x,y,a,b,color)+`<path d="M${p1}L${a},${b}L${p2}" fill="none" stroke="${color}" stroke-width="2"/>`;};
  const box=(x,y,w,h,t,sub='',accent=false)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" fill="${accent?'#e6f4f4':'#f5f9fa'}" stroke="${accent?teal:'#d0dce4'}"/>${label(x+w/2,y+(sub?h/2-4:h/2+7),t)}${sub?label(x+w/2,y+h/2+24,sub,'small-label'):''}`;
  const surface='<path class="surface" d="M110 310C60 280 63 188 111 175C90 114 129 79 175 92C212 66 259 101 255 155C245 195 273 250 330 254C390 256 420 201 408 158C398 118 427 75 475 91C525 66 567 118 548 165C604 174 609 271 558 313C464 386 200 389 110 310Z"/>';
  const spheres=[[276,155,23],[295,183,26],[326,212,27],[361,214,27],[387,184,25],[397,151,20],[334,165,28]];
  const alphaSpheres=()=>spheres.map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${teal}" fill-opacity=".13" stroke="${teal}" stroke-opacity=".6"/>`).join('');
  const cross=(x,y)=>`<path d="M${x-9} ${y}h18M${x} ${y-9}v18" stroke="${ink}" stroke-width="3"/>`;
  const ligand=(x,y)=>`<g fill="${coral}" stroke="#fff" stroke-width="1.5">${[[0,0],[15,9],[8,24],[-11,24],[-20,8]].map(([a,b])=>`<circle cx="${x+a}" cy="${y+b}" r="8"/>`).join('')}</g>`;
  function pressed(selector,key,value){document.querySelectorAll(selector).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset[key]===String(value))));}
  let maskId=0;
  const masks=()=>{const id=`mask-cavity-${maskId++}`,cells=Array.from({length:7},(_,j)=>Array.from({length:7},(_,i)=>{const x=258+i*23,y=100+j*23;if(((x-335)/75)**2+((y-174)/77)**2<1)return `<rect x="${x}" y="${y}" width="21" height="21" fill="${teal}" fill-opacity=".43" stroke="#fff" stroke-width="1"/>`;return '';})).flat().join('');return `<defs><clipPath id="${id}"><path d="M255 90V155C245 195 273 250 330 254C390 256 420 201 408 158V90Z"/></clipPath></defs><g clip-path="url(#${id})">${cells}</g>`;};

  $('overview-figure').innerHTML=box(225,16,270,70,'단백질 3D 구조','원자 종류와 좌표')+arrow(280,86,174,135)+arrow(440,86,547,135)+box(46,137,255,76,'fpocket 후보','먼저 자리 제안')+arrow(174,213,174,248)+box(46,250,255,80,'3D 격자 + CNN','DeepPocket',true)+arrow(174,330,174,375)+box(46,377,255,80,'후보 순위 + 공간 영역')+box(420,137,255,76,'표면 주변 원자 그래프','원자와 이웃 연결')+arrow(547,213,547,248)+box(420,250,255,80,'그래프 + 어텐션','GrASP',true)+arrow(547,330,547,375)+box(420,377,255,80,'원자 점수 → 포켓 무리');

  function training(mode){
    const train=mode==='train';
    $('training-figure').innerHTML=box(30,38,190,80,'단백질 입력','리간드 위치 제외')+arrow(220,78,270,78)+box(273,38,180,80,train?'조정 중인 모델':'학습된 모델',train?'수치 업데이트':'고정된 기준',true)+arrow(453,78,500,78)+box(503,38,185,80,'예측 결과','후보·영역·원자')+
    (train?`<g transform="translate(0 155) scale(.53)">${surface}${ligand(330,190)}</g>${label(185,402,'실험 리간드로 라벨 생성','small-label')}${arrow(280,295,470,295)}${arrow(595,118,578,246)}${box(475,250,205,85,'예측과 라벨 비교','오차를 줄이며 학습')}${arrow(570,250,380,125,teal)}`:`<g transform="translate(0 155) scale(.53)">${surface}</g>${label(185,402,'새 단백질: 정답 위치 미제공','small-label')}${box(420,230,260,105,'예측 결과 해석','정답 확인은 별도')}`);
    $('training-caption').textContent=train?'알려진 결합 위치는 라벨을 만드는 데 씁니다. 단백질 입력과 정답 경로는 분리합니다.':'새 입력에 답을 미리 주지 않습니다. 학습해 둔 기준으로 포켓을 예측합니다.';
    pressed('[data-training]','training',mode);
  }
  document.querySelectorAll('[data-training]').forEach(b=>b.addEventListener('click',()=>training(b.dataset.training)));training('train');

  let channel='all';
  function voxel(){
    const z=+$('voxel-slice').value,colors={C:teal,O:coral};
    const project=(i,j,k)=>[65+i*28+j*18,337+i*9-j*13-k*36];
    let grid='';
    for(let k=0;k<=4;k++){for(let i=0;i<=7;i++){const a=project(i,0,k),b=project(i,7,k);grid+=line(...a,...b,'#c5d4dc',.9);}for(let j=0;j<=7;j++){const a=project(0,j,k),b=project(7,j,k);grid+=line(...a,...b,'#c5d4dc',.9);}}
    const corners=[[0,0],[7,0],[7,7],[0,7]].map(([i,j])=>project(i,j,z));
    grid+=`<polygon points="${corners.map(p=>p.join(',')).join(' ')}" fill="${teal}" fill-opacity=".13" stroke="${teal}" stroke-width="2"/>`;
    for(const [i,j] of [[0,0],[7,0],[7,7],[0,7]])grid+=line(...project(i,j,0),...project(i,j,4),'#7d9da5',1.4);
    let slice='';
    for(let j=0;j<7;j++)for(let i=0;i<7;i++){
      const signals=[{type:'C',v:Math.exp(-((i-2)**2+(j-3)**2+(z-1)**2)/3.2)},{type:'O',v:Math.exp(-((i-4.7)**2+(j-2.5)**2+(z-3)**2)/2.4)}].filter(s=>channel==='all'||s.type===channel).sort((a,b)=>b.v-a.v);
      const s=signals[0];slice+=`<rect x="${440+i*30}" y="${138+j*30}" width="29" height="29" fill="${colors[s.type]}" fill-opacity="${(.05+.8*s.v).toFixed(3)}" stroke="#d4e0e6" stroke-width=".7"/>`;
    }
    $('voxel-figure').innerHTML=grid+label(200,95,'복셀 격자')+label(200,435,`선택한 단면: ${z+1} / 5층`,'small-label')+arrow(400,245,428,245)+slice+label(545,95,'그 단면의 정보')+label(545,398,'청록: C계열 · 주황: O계열','small-label');
    $('voxel-caption').textContent=`${z+1}층을 보고 있습니다. ${channel==='all'?'두 정보 채널을 색으로 겹쳐 표시했습니다.':channel==='C'?'탄소 계열 채널만 표시했습니다.':'산소 계열 채널만 표시했습니다.'} 칸의 진하기는 설명용 밀도입니다.`;
    pressed('[data-channel]','channel',channel);
  }
  $('voxel-slice').addEventListener('input',voxel);document.querySelectorAll('[data-channel]').forEach(b=>b.addEventListener('click',()=>{channel=b.dataset.channel;voxel();}));voxel();

  const deepCaptions=['fpocket이 찾은 알파 구 무리에서 후보 중심을 얻습니다.','각 후보 중심 주변을 원자 유형별 3차원 격자로 바꿉니다.','학습된 분류 CNN이 후보를 다시 평가하고 순위를 정합니다.','선택한 상위 후보를 별도 분할 모델로 읽어 공간 영역을 예측합니다.'];
  function deep(stage){
    let markup=surface;
    if(stage===0)markup+=alphaSpheres()+cross(335,185)+label(335,58,'후보 A')+line(335,70,335,149)+`<ellipse cx="139" cy="172" rx="30" ry="20" fill="${teal}" fill-opacity=".15" stroke="${teal}"/>`+label(74,132,'후보 B','small-label');
    if(stage===1){for(let i=0;i<7;i++){markup+=line(253+i*27,96,253+i*27,258,'#8fb9bf',1)+line(253,96+i*27,415,96+i*27,'#8fb9bf',1);}markup+=`<rect x="253" y="96" width="162" height="162" fill="#fff" fill-opacity=".3" stroke="${teal}" stroke-width="2"/>`+cross(334,177)+label(335,52,'각 후보 중심 주변의 격자');}
    if(stage===2)markup=box(45,45,220,73,'후보 A의 격자')+box(45,142,220,73,'후보 B의 격자')+arrow(265,82,330,139)+arrow(265,178,330,139)+box(333,101,155,77,'분류 CNN','학습된 패턴',true)+arrow(488,139,540,139)+box(543,47,135,73,'상위 후보')+box(543,147,135,73,'다음 후보')+label(360,340,'후보별 판단 → 같은 후보들의 새 순서')+label(360,389,'실제 점수·순위는 모델 실행 후에 얻습니다','small-label');
    if(stage===3)markup+=masks()+label(335,60,'상위 후보의 공간 영역')+box(120,390,460,65,'별도 분할 신경망 → 공간 칸별 출력','',true);
    $('deep-figure').innerHTML=markup;$('deep-caption').textContent=deepCaptions[stage];pressed('[data-deep]','deep',stage);
  }
  document.querySelectorAll('[data-deep]').forEach(b=>b.addEventListener('click',()=>deep(+b.dataset.deep)));deep(0);

  function mask(mode){
    const region=mode==='region';
    let markup=`<g transform="translate(80 -15) scale(.8)">${surface}${region?masks():cross(335,182)}</g>`;
    if(region)markup+=box(25,350,180,65,'고해상도 특징')+arrow(205,381,243,408)+box(246,382,180,65,'넓은 문맥 요약')+arrow(426,408,474,381)+box(477,350,215,65,'공간 해상도 복원')+`<path d="M112 350V315H585V350" fill="none" stroke="${teal}" stroke-width="2" stroke-dasharray="6 5"/>`+label(350,300,'앞 단계의 위치 정보도 연결','small-label');
    else markup+=box(105,350,510,83,'후보 중심과 점수·순위','어느 자리를 먼저 볼지 정하는 정보');
    $('mask-figure').innerHTML=markup;$('mask-caption').textContent=region?'여러 공간 칸을 선택하면 영역이 됩니다. 줄였다가 복원하는 경로에 앞 단계 정보를 연결합니다.':'중심은 위치를 한 점으로 요약합니다. 점수만으로 공간 경계가 정해지지는 않습니다.';pressed('[data-mask]','mask',mode);
  }
  document.querySelectorAll('[data-mask]').forEach(b=>b.addEventListener('click',()=>mask(b.dataset.mask)));mask('center');

  // Teaching coordinates in Angstrom units, not atoms from an actual protein.
  const atoms=[{p:[0,0,0],t:'N',surface:true},{p:[-3,1,1],t:'C',surface:true},{p:[2.5,2,0],t:'O',surface:true},{p:[0,-3.5,0],t:'C',surface:false},{p:[-5.5,3,0],t:'C',surface:true},{p:[5.5,3.5,-1],t:'N',surface:true},{p:[-1,-6,1],t:'C',surface:false},{p:[-4,-3,1],t:'C',surface:false},{p:[5,-2,1],t:'O',surface:true},{p:[0,6,0],t:'C',surface:true},{p:[-4,-7,0],t:'C',surface:false}];
  const distance=(a,b)=>Math.hypot(...a.p.map((v,i)=>v-b.p[i]));
  const included=atoms.map(a=>a.surface||atoms.some(b=>b.surface&&distance(a,b)<=5));
  const edges=[];atoms.forEach((a,i)=>atoms.forEach((b,j)=>{if(i<j&&distance(a,b)<=5)edges.push([i,j]);}));
  const atomPos=a=>[350+a.p[0]*35,235-a.p[1]*25-a.p[2]*13];
  function graphMarkup(mode,phase=-1){
    const near=mode==='surface',score=phase>=2,cluster=phase===3;
    let markup=`<path d="M70 240Q220 320 340 290Q480 310 650 230" fill="none" stroke="#99c9cd" stroke-width="2" stroke-dasharray="6 6"/>`+label(557,319,'표면의 개념선','small-label');
    if(mode!=='atoms')markup+=edges.filter(([i,j])=>!near||(included[i]&&included[j])).map(([i,j])=>line(...atomPos(atoms[i]),...atomPos(atoms[j]),phase===1?teal:'#b4c2cc',phase===1?3:1.5)).join('');
    markup+=atoms.map((a,i)=>{const [x,y]=atomPos(a),faded=near&&!included[i],high=score&&a.surface&&[0,1,2].includes(i);return `<g opacity="${faded?.17:1}"><circle cx="${x}" cy="${y}" r="18" fill="${high?coral:score&&a.surface?'#bad3ea':a.surface?'#e1f2f1':'#eff2f4'}" stroke="${a.surface?teal:'#91a2b2'}" stroke-width="2" ${!a.surface?'stroke-dasharray="4 3"':''}/>${label(x,y+6,a.t,'node-letter')}</g>`;}).join('');
    if(cluster)markup+=`<ellipse cx="342" cy="216" rx="145" ry="62" transform="rotate(-9 342 216)" fill="none" stroke="${coral}" stroke-width="3" stroke-dasharray="7 5"/>`+label(336,356,'높은 점수 원자들을 후보로 묶기','small-label');
    return markup;
  }
  function graph(mode){$('graph-figure').innerHTML=graphMarkup(mode)+label(350,458,'실선 원: 표면 원자 · 점선 원: 내부 원자','small-label');$('graph-caption').textContent=mode==='atoms'?'노드 하나는 수소를 제외한 원자 하나입니다. 표면과 내부 원자를 구분해 봅니다.':mode==='edges'?'이 설명용 3D 좌표에서 5 Å 이내인 원자 쌍을 연결했습니다. 연결이 모두 공유 결합인 것은 아닙니다.':'표면 원자와 그 5 Å 이내 이웃만 그래프에 남깁니다. 더 깊은 내부 원자는 흐리게 표시했습니다.';pressed('[data-graph]','graph',mode);}
  document.querySelectorAll('[data-graph]').forEach(b=>b.addEventListener('click',()=>graph(b.dataset.graph)));graph('atoms');

  const messageNodes=[[350,228],[197,139],[503,139],[350,361],[91,55],[617,55],[573,393]];
  function message(hop){
    const first=[1,2,3],second=[4,5,6];let markup='';
    for(const [i,j] of [[0,1],[0,2],[0,3],[1,4],[2,5],[3,6]])markup+=line(...messageNodes[i],...messageNodes[j],hop>0&&i===0?teal:hop===2?blue:'#d3dce3',hop>0&&i===0?([0,8,5,3][j]):2);
    if(hop>0)markup+=label(245,153,'55%','small-label')+label(460,153,'30%','small-label')+label(390,306,'15%','small-label');
    markup+=messageNodes.map(([x,y],i)=>{const active=i===0||(hop>0&&first.includes(i))||(hop===2&&second.includes(i));return `<circle cx="${x}" cy="${y}" r="${i?23:35}" fill="${i===0?teal:active?'#ccecee':'#f4f7f9'}" stroke="${active?teal:'#cad5dd'}" stroke-width="2"/>${i?label(x,y+7,['','C','O','N','C','N','O'][i],'node-letter'):`<text x="${x}" y="${y+7}" class="label" text-anchor="middle" style="fill:#fff">나</text>`}`;}).join('');
    markup+=label(350,448,hop===0?'자신의 특징':hop===1?'바로 이웃의 특징이 더해짐':'이웃이 모은, 그 너머의 정보까지 반영','small-label');
    $('message-figure').innerHTML=markup;
    $('message-caption').textContent=hop===0?'아직 이웃을 참고하지 않은 원자 표현입니다.':hop===1?'한 층에서 이웃 메시지를 모읍니다. 선 굵기는 이웃별 반영 비중을 단순화한 예시입니다.':'다음 층에서는 이웃이 앞 층에서 모은 정보도 받습니다. 영향 범위가 그래프를 따라 넓어집니다.';pressed('[data-hop]','hop',hop);
  }
  document.querySelectorAll('[data-hop]').forEach(b=>b.addEventListener('click',()=>message(+b.dataset.hop)));message(0);

  const graspCaptions=['표면 원자와 가까운 내부 원자의 그래프를 만듭니다.','여러 GAT 층으로 원자 주변 정보를 조합합니다.','표면 원자가 결합 부위에 속할 만한지 점수를 예측합니다. 색은 설명용입니다.','선택된 표면 원자를 군집화하고, 포켓별 점수와 순위를 정합니다.'];
  function grasp(stage){$('grasp-figure').innerHTML=graphMarkup('surface',stage)+label(350,44,['표면 주변 그래프','학습된 이웃 정보의 조합','표면 원자 점수 예측','원자 평가 → 포켓 후보'][stage])+label(350,457,stage>=2?'파랑: 낮음 · 주황: 높음 (설명용)':'내부 원자는 환경을 제공 · 평가 대상은 표면','small-label');$('grasp-caption').textContent=graspCaptions[stage];pressed('[data-grasp]','grasp',stage);}
  document.querySelectorAll('[data-grasp]').forEach(b=>b.addEventListener('click',()=>grasp(+b.dataset.grasp)));grasp(0);

  const cubic=(a,b,c,d,t)=>a.map((v,i)=>(1-t)**3*v+3*(1-t)**2*t*b[i]+3*(1-t)*t*t*c[i]+t**3*d[i]);
  const wall=Array.from({length:30},(_,i)=>i<15?cubic([255,155],[245,195],[273,250],[330,254],i/14):cubic([330,254],[390,256],[420,201],[408,158],(i-15)/14));
  function comparison(method){
    let overlay='';
    if(method===0)overlay=alphaSpheres()+cross(335,190);
    if(method===1)overlay=wall.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="4.5" fill="${blue}"/>`).join('')+cross(335,190);
    if(method===2)overlay=masks()+cross(335,190);
    if(method===3)overlay=wall.filter((p,i)=>i%2===0).map(([x,y],i)=>`<circle cx="${x}" cy="${y+10}" r="9" fill="${i>2&&i<12?coral:'#b8d4e9'}" stroke="${teal}" stroke-width="1.6"/>`).join('')+`<path d="M260 211Q330 310 410 211" fill="none" stroke="${coral}" stroke-width="2" stroke-dasharray="5 5"/>`;
    $('comparison-figure').innerHTML=surface+overlay;
    $('comparison-caption').textContent=['fpocket: 가상 구 무리와 포켓 중심','P2Rank: 표면에서 샘플링한 점들의 평가','DeepPocket: 후보 주변을 재평가한 뒤 공간 칸별 영역 예측','GrASP: 표면 원자별 평가를 후보 무리로 모으기'][method];
    document.querySelectorAll('[data-method]').forEach(el=>el.classList.toggle('is-active',+el.dataset.method===method));pressed('[data-compare]','compare',method);
  }
  document.querySelectorAll('[data-compare]').forEach(b=>b.addEventListener('click',()=>comparison(+b.dataset.compare)));comparison(0);

  const noteKey='pocket-learning-models-observation-v1';
  try{$('observation').value=localStorage.getItem(noteKey)||'';}catch{}
  $('observation').addEventListener('input',()=>{try{localStorage.setItem(noteKey,$('observation').value);$('note-status').textContent='이 브라우저에 저장됨';}catch{$('note-status').textContent='자동 저장을 사용할 수 없습니다.';}});
  $('save-note').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob(['포켓 구조 학습 3장 · 내 관찰 메모\n\n'+$('observation').value],{type:'text/plain;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='pocket-learning-models-notes.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
  readHash();
})();
