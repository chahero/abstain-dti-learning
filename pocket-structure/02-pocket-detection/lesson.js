(() => {
  'use strict';
  const $=id=>document.getElementById(id);
  const titles=['붙을 자리, 컴퓨터는 어떻게 찾을까?','좌표·표면·후보·중심·순위를 먼저 익힙니다','fpocket은 빈 공간을 어떻게 찾을까?','P2Rank는 표면에서 무엇을 볼까?','두 방법은 무엇을 다르게 볼까?','맥아당을 가리고 같은 입력을 넣었습니다','실제로 어디를 찾았을까?','같은 단백질의 다른 모양을 넣으면?','공통 개념에서 두 기술의 차이까지'];
  const intros=['단백질의 좌표를 보고 결합 공간의 후보를 찾는 과정을 배웁니다.','원리 설명에 나올 공통 단어부터 그림과 연결합니다.','원자 사이의 빈 공간을 가상의 구로 표현합니다.','표면의 점마다 주변 환경을 읽고 학습된 기준으로 평가합니다.','후보를 만드는 단위와 점수의 뜻을 나란히 비교합니다.','같은 MBP 실험 구조를 두 도구에 동일하게 입력했습니다.','후보를 바꾸고 원래 맥아당 위치를 함께 확인해 보세요.','실험 구조의 상태와 점수의 정의를 결과 해석에 연결합니다.','개념 → 원리 → 실제 결과를 네 문장으로 정리합니다.'];
  let current=0, data=null;
  function navigate(n,focus=false){
    current=Math.max(0,Math.min(8,n));
    document.querySelectorAll('article[data-step]').forEach((a,i)=>a.hidden=i!==current);
    document.querySelectorAll('[data-go]').forEach(b=>{if(Number(b.dataset.go)===current)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});
    $('lesson-title').textContent=titles[current];$('lesson-intro').textContent=intros[current];$('page-count').textContent=`${current+1} / 9`;
    $('previous').disabled=current===0;$('next').disabled=current===8;document.title=`${titles[current]} · 포켓 구조 학습 2장`;
    history.replaceState(null,'',`#step-${current+1}`);
    if(focus){$('lesson-title').focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});}
  }
  function readHash(){const match=location.hash.match(/^#step-([1-9])$/);navigate(match?Number(match[1])-1:0);}
  document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>navigate(Number(b.dataset.go),true)));
  $('previous').addEventListener('click',()=>navigate(current-1,true));$('next').addEventListener('click',()=>navigate(current+1,true));
  window.addEventListener('hashchange',readHash);
  document.addEventListener('keydown',e=>{if(e.ctrlKey||e.altKey||e.metaKey||e.target.closest('input,textarea,button,select,summary,a'))return;if(e.key==='ArrowRight'){e.preventDefault();navigate(current+1,true);}if(e.key==='ArrowLeft'){e.preventDefault();navigate(current-1,true);}});
  $('print').addEventListener('click',()=>window.print());
  const txt=(x,y,t,small=false,extra='')=>`<text x="${x}" y="${y}" class="${small?'small-label':'label'}" ${extra}>${t}</text>`;
  const centered=(x,y,t,small=false)=>txt(x,y,t,small,'text-anchor="middle"');
  const surface='<path class="surface" d="M110 310C60 280 63 188 111 175C90 114 129 79 175 92C212 66 259 101 255 155C245 195 273 250 330 254C390 256 420 201 408 158C398 118 427 75 475 91C525 66 567 118 548 165C604 174 609 271 558 313C464 386 200 389 110 310Z"/>';
  const spheres=[[276,155,23],[295,183,26],[326,212,27],[361,214,27],[387,184,25],[397,151,20],[334,165,28],[100,74,51],[174,340,12],[550,78,55],[535,337,12]];
  const sphereMarkup=(filter=false)=>spheres.filter((p,i)=>!filter||i<7).map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" class="diagram-sphere"/>`).join('');
  const arrow=(x1,y1,x2,y2)=>`<path d="M${x1} ${y1}L${x2} ${y2}m-9-5 9 5-9 5" class="diagram-arrow"/>`;

  $('task-figure').innerHTML=surface+`<ellipse cx="330" cy="205" rx="72" ry="37" class="diagram-sphere"/><ellipse cx="148" cy="160" rx="38" ry="27" class="diagram-sphere"/><ellipse cx="490" cy="285" rx="42" ry="32" class="diagram-sphere"/>
    ${txt(342,160,'후보 A')}${txt(65,112,'후보 B')}${txt(510,360,'후보 C')}${centered(350,432,'단백질 한 개 → 여러 공간 후보 → 순위')}`;
  $('concept-figure').innerHTML=`<g transform="translate(35 55)"><circle class="diagram-atom" cx="115" cy="138" r="50"/><circle class="diagram-atom" cx="205" cy="112" r="46"/><circle class="diagram-atom" cx="278" cy="170" r="49"/><circle class="diagram-atom" cx="345" cy="112" r="45"/><path d="M50 122Q74 39 150 78Q207 24 258 91Q310 48 367 66Q427 106 397 155" fill="none" stroke="#3976be" stroke-width="4" stroke-dasharray="5 7"/><circle cx="260" cy="83" r="6" fill="#3976be"/><path d="m205 228 10 0m-5-5v10" stroke="#087f8c" stroke-width="3"/>
    ${txt(35,254,'원자 좌표')}${txt(395,85,'표면')}${txt(260,260,'후보 중심')}
    <path d="M120 235 115 188M392 90 350 78M257 251 216 228" class="guide"/></g>
    ${centered(360,390,'복잡한 공간을 한 점으로 요약하면 중심입니다',true)}`;

  const fpDescriptions=['3차원에서 네 원자에 닿고 내부가 빈 가상 구를 찾습니다.','너무 작거나 큰 구를 걸러 냅니다. 실제 실행 기본 반경은 3.4–6.2 Å입니다.','가까이 모인 구들을 묶어 하나의 포켓 후보로 만듭니다.','각 포켓의 특성값을 요약해 점수를 매기고 정렬합니다.'];
  function fpDiagram(stage){
    let body=surface+sphereMarkup(stage>0);
    if(stage===0)body+=`<g transform="translate(472 28)"><ellipse cx="80" cy="90" rx="70" ry="58" fill="#fff" stroke="#087f8c" stroke-width="2"/><ellipse cx="80" cy="90" rx="70" ry="18" fill="none" stroke="#8dbcc0" stroke-dasharray="4 5"/><ellipse cx="80" cy="90" rx="25" ry="58" fill="none" stroke="#8dbcc0" stroke-dasharray="4 5"/>${[[24,57],[133,62],[81,148]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="9" class="diagram-atom"/>`).join('')}<circle cx="73" cy="85" r="9" fill="#fff" stroke="#8fa1af" stroke-dasharray="3 3"/>${centered(80,182,'네 원자 · 3D 투영',true)}</g>`;
    if(stage>=2)body+='<ellipse cx="335" cy="190" rx="104" ry="86" fill="none" stroke="#087f8c" stroke-width="3" stroke-dasharray="7 6"/>';
    if(stage===3)body+=`${centered(335,220,'후보 1')}${centered(350,415,'구의 집합 → 특성값 → 점수·순위',true)}`;
    $('fpocket-figure').innerHTML=body;$('fp-description').textContent=fpDescriptions[stage];
    document.querySelectorAll('[data-fp]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.fp)===stage)));
  }
  document.querySelectorAll('[data-fp]').forEach(b=>b.addEventListener('click',()=>fpDiagram(Number(b.dataset.fp))));fpDiagram(0);

  const cubic=(a,b,c,d,t)=>a.map((v,i)=>(1-t)**3*v+3*(1-t)**2*t*b[i]+3*(1-t)*t*t*c[i]+t**3*d[i]);
  const surfaceSamples=Array.from({length:36},(_,i)=>i<18?cubic([255,155],[245,195],[273,250],[330,254],i/17):cubic([330,254],[390,256],[420,201],[408,158],(i-18)/17));
  const p2Descriptions=['물 분자가 접근할 수 있는 표면에 평가할 점들을 배치합니다.','각 점 주변의 원자·기하학·화학적 환경을 숫자 특징으로 만듭니다.','여러 결정 나무로 학습한 랜덤 포레스트가 각 점의 환경을 평가합니다.','평가가 좋은 주변 점들을 묶고 포켓 단위로 순위를 정합니다.'];
  function p2Diagram(stage){
    let body='';
    if(stage!==2){body=surface+surfaceSamples.map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="${stage===3&&i>9&&i<27?6:4}" fill="${stage===3&&(i<=9||i>=27)?'#b7c7db':'#3976be'}"/>`).join('');}
    if(stage===1)body+=`<circle cx="330" cy="254" r="54" fill="#fff" fill-opacity=".7" stroke="#3976be" stroke-width="2" stroke-dasharray="5 5"/>${txt(455,355,'주변 특징')}${txt(455,385,'원자 · 노출 · 모양',true)}<path d="M380 289 447 352" class="guide"/>`;
    if(stage===2){
      body=centered(360,62,'한 점의 주변 특징',false)+centered(360,106,'원자 종류 · 표면 노출 · 국소 환경',true);
      for(const x of [145,360,575])body+=`<path d="M${x} 168v28m0-2-45 49m45-49 45 49m-45-49v49" fill="none" stroke="#3976be" stroke-width="3"/><circle cx="${x}" cy="168" r="13" fill="#d9e7f7" stroke="#3976be"/><circle cx="${x-45}" cy="246" r="10" fill="#d9e7f7"/><circle cx="${x}" cy="246" r="10" fill="#d9e7f7"/><circle cx="${x+45}" cy="246" r="10" fill="#d9e7f7"/>`;
      body+=centered(360,320,'여러 결정 나무의 판단을 모읍니다')+centered(360,373,'이미 학습한 모델 → 표면점의 평가',true);
    }
    if(stage===3)body+='<ellipse cx="330" cy="233" rx="88" ry="46" fill="none" stroke="#3976be" stroke-width="3" stroke-dasharray="7 6"/>';
    $('p2rank-figure').innerHTML=body;$('p2-description').textContent=p2Descriptions[stage];
    document.querySelectorAll('[data-p2]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.p2)===stage)));
  }
  document.querySelectorAll('[data-p2]').forEach(b=>b.addEventListener('click',()=>p2Diagram(Number(b.dataset.p2))));p2Diagram(0);

  $('input-figure').innerHTML=`<g transform="translate(25 45) scale(.42)">${surface}<circle cx="330" cy="213" r="30" fill="#e87950"/></g><g transform="translate(385 45) scale(.42)">${surface}</g>${arrow(305,162,370,162)}${centered(174,250,'원본 1ANF')}${centered(535,250,'단백질만 남김')}${centered(535,287,'맥아당·물 제거',true)}${arrow(535,309,535,351)}<path d="M535 352H363v26M535 352h130v26" class="diagram-arrow"/>${centered(360,415,'fpocket')}${centered(646,415,'P2Rank')}`;
  $('reading-figure').innerHTML=`${centered(145,115,'어디에 공간이 있나?')}${centered(405,115,'이 분자가 붙나?')}${centered(405,205,'얼마나 강하게 붙나?')}${arrow(258,111,290,111)}${arrow(405,140,405,175)}${centered(145,160,'포켓 후보',true)}${centered(405,245,'친화도',true)}`;

  function project(p,angle){const c=Math.cos(angle),s=Math.sin(angle),x=p[0]*c+p[2]*s,z=-p[0]*s+p[2]*c;return [x,-(p[1]*.88+z*.475),z*.88-p[1]*.475];}
  const scale=5.2,cx=340,cy=207;
  const screen=(p,angle)=>{const q=project(p,angle);return [q[0]*scale+cx,q[1]*scale+cy,q[2]];};
  function drawMethod(method,key,angle,reference){
    const m=data.methods[method],pocket=m.pockets[Number($(key+'-candidate').value)-1];
    const color=method==='fpocket'?'#087f8c':'#3976be';
    let path=data.protein.map((p,i)=>{const q=screen(p,angle);return `${i?'L':'M'}${q[0].toFixed(2)},${q[1].toFixed(2)}`;}).join(' ');
    let markup=`<path d="${path}" fill="none" stroke="#a2b1bf" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/>`;
    const points=method==='fpocket'?pocket.spheres:pocket.points;
    markup+=points.map(p=>{const q=screen(p.xyz,angle);return {...p,q};}).sort((a,b)=>a.q[2]-b.q[2]).map(p=>`<circle cx="${p.q[0]}" cy="${p.q[1]}" r="${method==='fpocket'?p.radius*scale:2.8}" fill="${color}" fill-opacity="${method==='fpocket'?.07:.78}" ${method==='fpocket'?`stroke="${color}" stroke-opacity=".3" stroke-width=".8"`:''}/>`).join('');
    const center=screen(pocket.center,angle);markup+=`<path d="M${center[0]-7} ${center[1]}h14M${center[0]} ${center[1]-7}v14" stroke="#10233c" stroke-width="2.5"/>`;
    if(reference)markup+=data.ligand.map(p=>{const q=screen(p,angle);return `<circle cx="${q[0]}" cy="${q[1]}" r="4" fill="#e87950" stroke="#fff" stroke-width=".6"/>`;}).join('');
    $(key+'-result').innerHTML=markup;
    const score=method==='fpocket'?pocket.score.toFixed(3):pocket.score.toFixed(2);
    $(key+'-metrics').innerHTML=`<span>도구 점수<strong>${score}</strong></span><span>${method==='fpocket'?'가상 구':'표면점'}<strong>${pocket.pointCount}개</strong></span>${reference?`<span>중심→맥아당<strong>${pocket.distanceToLigand.toFixed(2)} Å</strong></span>`:''}`;
  }
  function drawResults(){
    if(!data)return;const angle=Number($('result-rotation').value)*Math.PI/180,reference=$('show-reference').checked;
    drawMethod('fpocket','fp',angle,reference);drawMethod('p2rank','p2',angle,reference);
    $('result-status').textContent=`같은 입력 · fpocket ${data.methods.fpocket.pockets.length}개 / P2Rank ${data.methods.p2rank.pockets.length}개 후보`;
    $('result-explanation').textContent=reference?'주황색은 예측이 끝난 뒤 덧붙인 실제 맥아당 원자 위치입니다. 후보 중심과의 거리를 참고해 각 포켓이 어느 공간을 가리키는지 읽어 보세요.':'후보를 바꾸면 각 도구가 찾은 다른 공간을 볼 수 있습니다. 맥아당 위치를 켜면 원래 결합 위치와 비교할 수 있습니다.';
  }
  ['fp-candidate','p2-candidate','show-reference'].forEach(id=>$(id).addEventListener('change',drawResults));$('result-rotation').addEventListener('input',drawResults);
  fetch('assets/results.json').then(r=>{if(!r.ok)throw Error('Results unavailable');return r.json();}).then(value=>{
    data=value;if(!data.methods.fpocket.pockets.length||!data.methods.p2rank.pockets.length)throw Error('Invalid result data');
    document.querySelectorAll('[data-value="atom-count"]').forEach(el=>el.textContent=data.provenance.inputAtomCount.toLocaleString('ko-KR'));
    for(const [method,key] of [['fpocket','fp'],['p2rank','p2']]){
      const select=$(key+'-candidate');
      for(const p of data.methods[method].pockets){const o=document.createElement('option');o.value=String(p.rank);o.textContent=`${p.rank}순위 · 점수 ${method==='fpocket'?p.score.toFixed(3):p.score.toFixed(2)}`;select.append(o);}
      select.disabled=false;
    }
    $('candidate-table').querySelector('tbody').innerHTML=Object.entries(data.methods).flatMap(([method,m])=>m.pockets.slice(0,5).map(p=>`<tr><td>${method==='fpocket'?'fpocket':'P2Rank'}</td><td>${p.rank}</td><td>${p.score}</td><td>${p.pointCount}</td><td>${p.distanceToLigand.toFixed(2)} Å</td></tr>`)).join('');
    $('structure-table').querySelector('tbody').innerHTML=data.structureComparison.map(s=>`<tr><th scope="row">${s.pdb}<br><small>${s.pdb==='1ANF'?'holo 유래 · 당 제거':'실제 apo 구조'}</small></th><td>${s.fpocketCandidates}개</td><td>${s.p2rankCandidates}개</td></tr>`).join('');
    drawResults();
  }).catch(e=>{$('result-status').textContent='결과를 불러오지 못했습니다. 새로고침하거나 원시 결과 파일을 확인해 주세요.';console.error(e);});

  const noteKey='pocket-detection-observation-v1';
  try{$('observation').value=localStorage.getItem(noteKey)||'';}catch{}
  $('observation').addEventListener('input',()=>{try{localStorage.setItem(noteKey,$('observation').value);$('note-status').textContent='이 브라우저에 저장됨';}catch{$('note-status').textContent='자동 저장을 사용할 수 없습니다.';}});
  $('save-note').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob(['포켓 구조 학습 2장 · 내 관찰 메모\n\n'+$('observation').value],{type:'text/plain;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='pocket-detection-notes.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
  readHash();
})();
