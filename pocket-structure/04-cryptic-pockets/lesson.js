(() => {
  'use strict';
  const $=id=>document.getElementById(id);
  const titles=['지금 보이지 않는 포켓도 찾을 수 있을까?','단백질은 왜 한 모양에만 머물지 않을까?','분자동역학은 어떻게 움직임을 계산할까?','움직임 속에서 열린 순간을 어떻게 찾을까?','MD에서 안 열렸다면, 숨은 포켓이 없을까?','TEM-1의 실제 실험 구조에서 보겠습니다','PocketMiner는 MD에서 무엇을 배웠을까?','잔기 그래프와 GVP는 무엇일까?','새 단백질 하나를 넣으면 무엇이 나올까?','포켓 검출·MD·PocketMiner는 어떻게 다를까?','숨은 공간, 움직임, 예측을 연결합니다'];
  const intros=['한 구조에 공간이 보이지 않는 것과, 그 단백질에 결합 자리가 없는 것은 다릅니다.','열운동·여러 구조 상태·자유에너지 장벽을 연결해 봅니다.','상호작용과 힘을 계산하고, 작은 시간 간격으로 좌표와 속도를 갱신합니다.','궤적의 여러 프레임을 읽으며 포켓 공간의 변화를 관찰합니다.','샘플링이 다룬 범위와, 단백질이 가질 수 있는 전체 상태를 구분합니다.','원 논문의 두 실험 구조로, 숨은 공간이 드러난 모습을 읽어 봅니다.','시작 구조와 이후 포켓 변화의 관계를 학습하는 과정을 살펴봅니다.','아미노산 잔기·이웃 관계·숫자 크기·방향 벡터로 구조를 표현합니다.','한 구조에서 잔기별 점수까지 가는 과정을 단계별로 따라갑니다.','서로 답하는 질문과 출력이 다르므로, 역할을 나누어 이해합니다.','기본 개념에서 두 기술의 원리와 한계까지, 네 문장으로 정리합니다.'];
  let current=0,timer=null;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function stopFrames(){if(timer!==null){clearTimeout(timer);timer=null;}$('play-frames').setAttribute('aria-pressed','false');$('play-frames').textContent=reduced?'다음 프레임':'한 번 재생';}
  function navigate(n,focus=false){
    current=Math.max(0,Math.min(10,n));if(current!==3)stopFrames();
    document.querySelectorAll('article[data-step]').forEach((el,i)=>el.hidden=i!==current);
    document.querySelectorAll('[data-go]').forEach(el=>{if(+el.dataset.go===current)el.setAttribute('aria-current','step');else el.removeAttribute('aria-current');});
    $('lesson-title').textContent=titles[current];$('lesson-intro').textContent=intros[current];$('page-count').textContent=`${current+1} / 11`;
    $('previous').disabled=current===0;$('next').disabled=current===10;document.title=`${titles[current]} · 포켓 구조 학습 4장`;history.replaceState(null,'',`#step-${current+1}`);
    if(focus){$('lesson-title').focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});}
  }
  function readHash(){const m=location.hash.match(/^#step-(1[01]|[1-9])$/);navigate(m?+m[1]-1:0);}
  document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>navigate(+b.dataset.go,true)));
  $('previous').addEventListener('click',()=>navigate(current-1,true));$('next').addEventListener('click',()=>navigate(current+1,true));window.addEventListener('hashchange',readHash);
  document.addEventListener('keydown',e=>{if(e.ctrlKey||e.altKey||e.metaKey||e.target.closest('input,textarea,button,select,summary,a,[role="region"]'))return;if(e.key==='ArrowRight'){e.preventDefault();navigate(current+1,true);}if(e.key==='ArrowLeft'){e.preventDefault();navigate(current-1,true);}});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stopFrames();});$('print').addEventListener('click',()=>window.print());
  const ink='#10233c',teal='#087f8c',blue='#3976be',coral='#e87950',muted='#9aabba';
  const label=(x,y,t,kind='label',anchor='middle')=>`<text x="${x}" y="${y}" class="${kind}" text-anchor="${anchor}">${t}</text>`;
  const line=(x,y,a,b,color=muted,width=2,dash='')=>`<path d="M${x} ${y}L${a} ${b}" fill="none" stroke="${color}" stroke-width="${width}" ${dash?`stroke-dasharray="${dash}"`:''}/>`;
  const arrow=(x,y,a,b,color=muted)=>{const angle=Math.atan2(b-y,a-x),p=[a-10*Math.cos(angle-.5),b-10*Math.sin(angle-.5)],q=[a-10*Math.cos(angle+.5),b-10*Math.sin(angle+.5)];return line(x,y,a,b,color)+`<path d="M${p}L${a},${b}L${q}" fill="none" stroke="${color}" stroke-width="2"/>`;};
  const box=(x,y,w,h,t,sub='',active=false)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" fill="${active?'#e6f4f4':'#f5f9fa'}" stroke="${active?teal:'#cfdbe4'}"/>${label(x+w/2,y+(sub?h/2-4:h/2+7),t)}${sub?label(x+w/2,y+h/2+25,sub,'small-label'):''}`;
  function pressed(selector,key,value){document.querySelectorAll(selector).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset[key]===String(value))));}
  // Explanatory surface only: it is not a molecular mesh or a simulated conformation.
  function pocket(openness,mark=false){
    const right=285+135*openness,mid=(255+right)/2;
    let s=`<path class="surface" d="M110 310C60 280 63 188 111 175C90 114 129 79 175 92C212 66 259 101 255 155C245 195 273 250 ${mid} 254C${right-20} 256 ${right+12} 201 ${right} 158C${right-10} 118 ${right+19} 75 ${right+67} 91C${right+117} 66 ${right+159} 118 ${right+140} 165C${right+196} 174 ${right+201} 271 ${right+150} 313C${right+56} 386 200 389 110 310Z"/>`;
    if(openness>.6)s+=`<ellipse cx="${mid}" cy="178" rx="${(right-255)*.28}" ry="48" fill="${teal}" fill-opacity=".12" stroke="${teal}" stroke-dasharray="5 5"/>`;
    if(mark)s+=label(mid,openness>.6?172:54,openness>.6?'공간이 드러남':'공간이 매우 좁음','small-label')+(openness>.6?'':line(mid,64,mid,160));
    return s;
  }
  function hidden(state){const open=state==='open';$('hidden-figure').innerHTML=pocket(open?1:0,true)+label(355,432,open?'모양 변화로 결합할 공간이 나타날 수 있습니다':'기준 구조에서는 충분한 공간이 보이지 않습니다','small-label');$('hidden-caption').textContent=open?'곁사슬·루프·나선의 배치 변화로 공간이 생기거나 넓어질 수 있습니다.':'작은 홈이 있더라도 결합할 만큼 충분한 공간이 아닐 수 있습니다.';pressed('[data-hidden]','hidden',state);}
  document.querySelectorAll('[data-hidden]').forEach(b=>b.addEventListener('click',()=>hidden(b.dataset.hidden)));hidden('closed');

  function energy(state){const open=state==='open',x=open?530:180,y=open?270:330;
    $('energy-figure').innerHTML=arrow(60,370,60,65)+arrow(60,370,670,370)+label(78,54,'상대 자유에너지 (개념)','small-label','start')+label(360,432,'구조가 바뀌는 방향 (개념)','small-label')+`<path d="M85 185C120 185 125 330 180 330S260 105 350 105S450 270 530 270S610 180 655 180" fill="none" stroke="${teal}" stroke-width="4"/>`+line(350,115,350,333,muted,1.4,'5 6')+label(350,84,'장벽','small-label')+label(180,402,'닫힌 쪽')+label(530,402,'열린 쪽')+`<circle cx="${x}" cy="${y}" r="12" fill="${coral}" stroke="#fff" stroke-width="2"/>`;
    $('energy-caption').textContent=open?'열린 상태도 가능한 구조 중 하나입니다. 이 모식도에서는 닫힌 쪽보다 덜 선호되도록 그렸습니다.':'이 모식도에서는 닫힌 상태를 더 낮은 골짜기에 그렸습니다. 상태를 바꾸려면 장벽을 넘어야 합니다.';pressed('[data-energy]','energy',state);
  }
  document.querySelectorAll('[data-energy]').forEach(b=>b.addEventListener('click',()=>energy(b.dataset.energy)));energy('closed');

  const mdCaptions=['구조를 점검하고 수소·물·이온, 힘장과 계산 조건을 준비합니다.','힘장으로 현재 배치의 상호작용을 평가하고 원자에 작용하는 힘을 계산합니다.','운동 방정식을 수치적으로 적분해 아주 짧은 시간 뒤의 좌표와 속도를 구합니다.','같은 과정을 반복하고 선택한 간격으로 구조를 저장해 궤적을 만듭니다.'];
  function md(stage){
    let s=box(38,25,260,78,'계와 조건 준비','단백질 · 물 · 힘장',stage===0)+arrow(310,64,405,64)+box(417,25,260,78,'현재 배치의 힘','상호작용 에너지에서',stage===1)+arrow(547,116,547,326)+box(417,338,260,78,'작은 시간 뒤로 갱신','다음 좌표와 속도',stage===2)+arrow(405,377,310,377)+box(38,338,260,78,'반복 · 프레임 저장','궤적을 얻는 과정',stage===3)+arrow(168,326,168,116);
    const atoms=[[292,190],[356,157],[404,226],[327,252]].map(([x,y],i)=>[x+(stage===2?8-i*3:0),y+(stage===2?i*3-5:0)]);
    if(stage===0)s+=[[235,160],[450,158],[267,279],[436,282],[360,304]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="7" fill="#c8e3ef"/>`).join('');
    s+=line(...atoms[0],...atoms[1],teal,3)+line(...atoms[1],...atoms[2],teal,3)+line(...atoms[2],...atoms[3],teal,3)+atoms.map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="12" fill="${i===1?coral:'#b8e0e2'}" stroke="${teal}" stroke-width="1.5"/>`).join('');
    if(stage===1)s+=arrow(292,190,262,167,coral)+arrow(404,226,438,243,coral);
    if(stage===2)s+=label(350,303,'변화는 설명을 위해 크게 그렸습니다','tiny-label');
    $('md-figure').innerHTML=s;$('md-caption').textContent=mdCaptions[stage];pressed('[data-md]','md',stage);
  }
  document.querySelectorAll('[data-md]').forEach(b=>b.addEventListener('click',()=>md(+b.dataset.md)));md(0);

  const frames=[.02,.08,.05,.16,.3,.58,.96,.82,.42,.17,.09,.03];
  function drawFrame(){const n=+$('frame').value,v=frames[n];$('trajectory-figure').innerHTML=`<g transform="translate(65 -25) scale(.83)">${pocket(v)}</g>`+Array.from({length:12},(_,i)=>`<rect x="${55+i*50}" y="365" width="43" height="27" rx="3" fill="${i===n?teal:frames[i]>.6?'#ccecee':'#edf2f5'}" stroke="${i===n?teal:'#ccd8e0'}"/>${label(76+i*50,384,String(i+1),'tiny-label')}`).join('')+label(360,433,`${n+1} / 12 · ${v>.6?'공간이 넓어진 모식 장면':'좁거나 다시 닫힌 모식 장면'}`,'small-label');
    $('trajectory-figure').querySelectorAll('text').forEach(el=>{if(el.textContent===String(n+1)&&el.getAttribute('y')==='384')el.style.fill='#fff';});
    $('trajectory-caption').textContent=v>.6?'이 모식 프레임에서는 공간이 넓어졌습니다. 실제 분석은 정한 포켓 부피·위치 등의 기준으로 판정합니다.':'한 프레임이 닫혀 있어도, 다른 프레임에서는 공간이 드러날 수 있습니다.';
  }
  $('frame').addEventListener('input',()=>{stopFrames();drawFrame();});
  $('play-frames').addEventListener('click',()=>{
    if(reduced){$('frame').value=String((+$('frame').value+1)%12);drawFrame();return;}
    if(timer!==null){stopFrames();return;}
    $('frame').value='0';drawFrame();$('play-frames').setAttribute('aria-pressed','true');$('play-frames').textContent='멈추기';
    function advance(){const n=+$('frame').value;if(n>=11){stopFrames();return;}$('frame').value=String(n+1);drawFrame();if(n+1>=11)stopFrames();else timer=setTimeout(advance,600);}
    timer=setTimeout(advance,600);
  });drawFrame();stopFrames();

  function sampling(mode){let s='';
    if(mode==='parallel'){
      const paths=['M120 120Q190 104 255 121T390 110T535 118T650 116','M120 240Q205 254 280 239T395 230Q430 165 470 180T545 235T650 236','M120 360Q200 343 270 363T405 345T535 359T650 355'];
      s=paths.map((p,i)=>label(55,119+i*120,['궤적 A','궤적 B','궤적 C'][i],'small-label')+`<path d="${p}" fill="none" stroke="${i===1?teal:muted}" stroke-width="3"/>`+`<circle cx="120" cy="${120+i*120}" r="6" fill="${teal}"/>`).join('')+label(432,153,'열린 장면 (모식)','small-label')+`<circle cx="470" cy="180" r="9" fill="${coral}"/>`+label(375,431,'여러 궤적은 한 줄로 이어 붙인 시간이 아닙니다','small-label');
    }else{
      s=box(20,189,150,77,'출발 구조')+[[255,95],[255,230],[255,365]].map(([x,y],i)=>arrow(170,227,x-23,y)+`<circle cx="${x}" cy="${y}" r="28" fill="${i===1?'#fbe5db':'#e6f4f4'}" stroke="${i===1?coral:teal}" stroke-width="2"/>`+label(x,y+7,['A','B','C'][i])).join('')+label(355,62,'먼저 탐색')+arrow(288,230,395,230,coral)+box(405,189,150,77,'출발점 선택','새로움·목적 지표',true)+arrow(555,227,602,227)+box(610,189,90,77,'추가 MD')+label(355,438,'선택한 구조에서 다음 탐색 라운드를 시작합니다','small-label');
    }
    $('sampling-figure').innerHTML=s;$('sampling-caption').textContent=mode==='parallel'?'서로 다른 경로를 관찰하면 한 경로에서 놓친 상태를 만날 기회가 생깁니다. 성공을 보장하지는 않습니다.':'앞 라운드의 구조를 검토해 다음 라운드 출발점을 고릅니다. 각 궤적에서 직접 포켓을 벌리는 것과 다릅니다.';pressed('[data-sampling]','sampling',mode);
  }
  document.querySelectorAll('[data-sampling]').forEach(b=>b.addEventListener('click',()=>sampling(b.dataset.sampling)));sampling('parallel');

  $('learning-figure').innerHTML=box(40,25,235,80,'시작 구조','모델 입력')+arrow(290,65,430,65)+box(445,25,235,80,'잔기 그래프 모델','오차를 줄이며 학습',true)+arrow(157,116,157,184)+box(35,197,245,90,'뒤이은 MD 구조들','그 이후의 포켓 변화')+arrow(294,243,430,243)+box(445,197,235,90,'잔기별 라벨','포켓 공간의 변화에서')+arrow(562,185,562,117,coral)+label(360,366,'미래 장면은 학습용 정답을 만드는 경로','small-label')+label(360,414,'새 단백질의 예측 입력에는 그 미래 장면이 없습니다','small-label');

  const residuePoints=[[350,230],[160,128],[540,128],[170,350],[530,350],[350,72]];
  const residueNames=['ALA','LYS','GLY','LEU','SER','VAL'];
  const graphEdges=[[0,1],[0,2],[0,3],[0,4],[0,5],[1,5],[2,5],[1,3],[2,4]];
  function residueGraph(phase=0){
    let s=graphEdges.map(([i,j])=>line(...residuePoints[i],...residuePoints[j],phase===2?teal:'#b5c3cd',phase===2?3:1.6)).join('');
    s+=residuePoints.map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="31" fill="${phase===3?(i<3?'#edaa8e':'#bcd7eb'):'#e6f3f3'}" stroke="${phase===3?i<3?coral:blue:teal}" stroke-width="2"/>${label(x,y+7,residueNames[i],'node-letter')}`).join('');
    return s;
  }
  function gvp(mode){let s='';
    if(mode==='graph')s=residueGraph()+label(350,438,'노드 하나 = 아미노산 잔기 하나','small-label');
    else{
      const theta=mode==='rotated'?-.6:0,center=[360,230],p=a=>[center[0]+a*Math.cos(theta),center[1]+a*Math.sin(theta)];
      const a=p(-135),b=p(135);s=line(...a,...b,teal,3)+`<circle cx="${a[0]}" cy="${a[1]}" r="31" fill="#e6f3f3" stroke="${teal}" stroke-width="2"/>`+`<circle cx="${b[0]}" cy="${b[1]}" r="31" fill="#e6f3f3" stroke="${teal}" stroke-width="2"/>`+label(a[0],a[1]+7,'ALA','node-letter')+label(b[0],b[1]+7,'GLY','node-letter')+arrow(center[0]-65*Math.cos(theta),center[1]-65*Math.sin(theta)-55,center[0]+65*Math.cos(theta),center[1]+65*Math.sin(theta)-55,coral)+label(350,62,'거리 4 Å (설명용)')+label(350,384,'크기는 그대로 · 방향 벡터는 함께 회전','small-label')+label(350,435,'회전으로 새로운 포켓 점수를 계산한 것은 아닙니다','small-label');
    }
    $('gvp-figure').innerHTML=s;$('gvp-caption').textContent=mode==='graph'?'그림은 몇 개 이웃만 표시했습니다. 실제 논문의 그래프는 잔기마다 가까운 30개 이웃을 사용합니다.':mode==='features'?'거리 같은 숫자와, 어느 쪽을 향하는지를 나타내는 벡터를 함께 다룹니다.':'구조를 통째로 돌려도 거리는 같습니다. 방향 벡터는 구조와 함께 돌아갑니다.';pressed('[data-gvp]','gvp',mode);
  }
  document.querySelectorAll('[data-gvp]').forEach(b=>b.addEventListener('click',()=>gvp(b.dataset.gvp)));gvp('graph');

  const predictCaptions=['새 단백질의 한 구조에서 잔기 종류와 3차원 기하 정보를 읽습니다.','아미노산 잔기들을 가까운 이웃과 연결한 그래프로 표현합니다.','학습된 GVP-GNN의 여러 층에서 이웃 정보를 주고받습니다.','잔기별 숨은 포켓 형성 점수를 얻습니다. 여기의 색은 설명용입니다.'];
  function predict(stage){let s='';
    if(stage===0)s=`<g transform="translate(65 -15) scale(.85)">${pocket(.04)}</g>`+label(350,438,'단일 구조를 상징하는 모식도','small-label');
    else s=residueGraph(stage)+label(350,438,stage===3?'파랑: 낮음 · 주황: 높음 (설명용)':'입체 이웃 관계를 평면에 펼친 개념도','small-label');
    $('predict-figure').innerHTML=s;$('predict-caption').textContent=predictCaptions[stage];pressed('[data-predict]','predict',stage);
  }
  document.querySelectorAll('[data-predict]').forEach(b=>b.addEventListener('click',()=>predict(+b.dataset.predict)));predict(0);

  $('workflow-figure').setAttribute('viewBox','0 0 720 350');
  $('workflow-figure').innerHTML=box(25,30,280,85,'PocketMiner','열릴 만한 위치의 후보',true)+arrow(320,72,390,72)+box(405,30,280,85,'MD 등 추가 탐색','열린 구조들')+arrow(545,130,545,220)+box(405,235,280,85,'포켓 확인 · 도킹','공간과 결합 자세 검토')+arrow(390,277,320,277)+box(25,235,280,85,'실험으로 확인','결합·기능 등을 측정');

  const noteKey='pocket-cryptic-observation-v1';try{$('observation').value=localStorage.getItem(noteKey)||'';}catch{}
  $('observation').addEventListener('input',()=>{try{localStorage.setItem(noteKey,$('observation').value);$('note-status').textContent='이 브라우저에 저장됨';}catch{$('note-status').textContent='자동 저장을 사용할 수 없습니다.';}});
  $('save-note').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob(['포켓 구조 학습 4장 · 내 관찰 메모\n\n'+$('observation').value],{type:'text/plain;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='cryptic-pockets-notes.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
  readHash();
})();
