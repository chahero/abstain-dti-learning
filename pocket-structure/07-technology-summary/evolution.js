(() => {
  'use strict';
  const $=id=>document.getElementById(id), data=JSON.parse($('evolution-data').textContent);
  const dates=Object.fromEntries(data.history.methods.map(m=>[m.id,m]));
  const paperIds=new Set(JSON.parse($('paper-guide-data')?.textContent||'[]'));
  function paperLink(id,content,label){return paperIds.has(id)?`<a class="ev-paper-link" href="../papers/${id}/" data-paper-id="${id}" aria-label="${label} · 논문 핵심 읽기"><title>${label} · 논문 핵심 읽기</title>${content}</a>`:content;}
  const year=id=>String(dates[id].year);
  const teal='#087f8c',blue='#3976be',coral='#c96a42',purple='#7562a1',grey='#7d8c9c';
  const colours={data:teal,scope:grey,implementation:purple};
  const text=(x,y,t,kind='ev-body',anchor='middle')=>`<text x="${x}" y="${y}" class="${kind}" text-anchor="${anchor}">${t}</text>`;
  const rect=(x,y,w,h,colour=teal,wash='#f5f9fa')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${wash}" stroke="${colour}" stroke-width="1.7"/>`;
  function node(x,y,w,h,title,lines=[],colour=teal,wash='#fff',dateId=null) {
    let shape=rect(x,y,w,h,colour,wash)+text(x+w/2,y+35,title,'ev-node')+lines.map((t,i)=>text(x+w/2,y+68+i*26,t)).join('');
    if(dateId){const label=dates[dateId].badge,badgeWidth=label.length>4?110:74;shape+=`<g class="ev-date-badge"><title>${dates[dateId].name}: ${dates[dateId].basis}</title><rect x="${x+w-badgeWidth-12}" y="${y-14}" width="${badgeWidth}" height="27" rx="5" fill="white" stroke="${colour}" stroke-width="1.2"/>`+text(x+w-badgeWidth/2-12,y+5,label,'ev-year')+'</g>';}
    return paperLink(dateId,`<g data-ev-method="${dateId||''}">${shape}</g>`,title);
  }
  function arrow(points,kind='scope') {const colour=colours[kind],a=points[points.length-2],b=points[points.length-1],angle=Math.atan2(b[1]-a[1],b[0]-a[0]);return `<path d="M${points.map(p=>p.join(' ')).join('L')}" fill="none" stroke="${colour}" stroke-width="${kind==='implementation'?3:2.5}" stroke-linejoin="round" ${kind==='scope'?'stroke-dasharray="8 6"':''}/><path d="M${b[0]-10*Math.cos(angle-.45)} ${b[1]-10*Math.sin(angle-.45)}L${b.join(' ')}L${b[0]-10*Math.cos(angle+.45)} ${b[1]-10*Math.sin(angle+.45)}" fill="none" stroke="${colour}" stroke-width="2.5"/>`;}
  function drawOverview(){
    let s=text(35,39,'세 발전 축 + 포켓 탐지의 최근 확장','ev-title','start');
    const lanes=[
      {y:72,h:265,c:teal,w:'#edf8f7',name:'포켓 탐지',axis:'표현·처리·조건',nodes:[['기하학으로 찾기',`fpocket · ${year('fpocket')}`],['주변 환경을 학습',`P2Rank · ${year('p2rank')}`],['신경망으로 표현',`DeepPocket ${year('deeppocket')} · GrASP ${year('grasp')}`]],note:'아래 세 기술은 후보 통합·공간적 연결·리간드 조건이라는 별도 확장입니다.'},
      {y:357,h:165,c:coral,w:'#fff5ef',name:'도킹',axis:'생성·유연성 확장',nodes:[['점수 기반 탐색',`Vina · ${year('vina')}`],['학습된 자세 생성',`원본 DiffDock · ${year('diffdock')}`],['수용체도 함께 갱신',`DynamicBind · ${year('dynamicbind')}`]],note:'탐색 방식과 유연성은 다른 축입니다. Vina도 선택 곁사슬을 유연하게 설정할 수 있습니다.'},
      {y:542,h:165,c:purple,w:'#f6f2fb',name:'co-folding',axis:'대상·출력의 확장',nodes:[['단백질 중심 예측','출발 질문의 예'],['여러 구성 요소 공동 생성',`AlphaFold 3 · ${year('af3')}`],['입력·출력·재현 기반 확장',`Chai-1 ${year('chai1')} · Boltz-2 ${year('boltz2')}`,`OpenFold3-p2 ${year('openfold3')}`]],note:'공동 좌표 생성에서 추가 힌트·친화도 출력·공개 재구현으로 강조점이 나뉩니다.'}
    ];
    for(const row of lanes){s+=rect(15,row.y,1210,row.h,row.c,row.w)+text(40,row.y+46,row.name,'ev-node','start')+text(40,row.y+78,row.axis,'ev-body','start');for(let i=0;i<3;i++){const x=[230,555,880][i],w=i===2?325:285;s+=rect(x,row.y+22,w,105,row.c,'#fff')+text(x+w/2,row.y+52,row.nodes[i][0],'ev-node')+row.nodes[i].slice(1).map((line,j)=>text(x+w/2,row.y+(row.nodes[i].length===3?81:91)+j*25,line,'ev-overview-year')).join('');if(i<2)s+=arrow([[x+w,row.y+69],[x+w+40,row.y+69]],'scope');}
      if(row.name==='포켓 탐지'){
        s+=text(40,row.y+177,'최근 확장','ev-group','start');
        [['HOTPocket / hotpocketNN',`후보 통합·선별 · ${year('hotpocket')}`],['Seq2Pocket',`공간적 포켓화 · ${year('seq2pocket')}`],['ProMoNet / ProMoSite',`리간드 조건 · ${year('promonet')}`]].forEach((v,i)=>{const x=230+i*325;s+=rect(x,row.y+146,i===2?325:285,74,teal,'#fff')+text(x+(i===2?162.5:142.5),row.y+174,v[0],'ev-extension')+text(x+(i===2?162.5:142.5),row.y+202,v[1],'ev-small');});
      }
      s+=text(230,row.y+row.h-12,row.note,'ev-small','start');
    }
    return s+text(620,749,'점선은 접근·기능의 비교입니다. 직계 계보·성능 순위·필수 실행 순서가 아닙니다.','ev-small');
  }
  function drawPocket(){
    let s=text(35,42,'기존 구조 기반 접근 + 세 가지 보완 방향','ev-title','start')
      +node(35,105,220,105,'단백질 구조',['입력 3D 좌표'],teal,'#edf8f7')+arrow([[255,157],[330,157]],'data')
      +node(330,105,290,105,'fpocket',['알파 구로 공간 후보'],teal,'#fff','fpocket')+arrow([[620,157],[805,157]],'data')+text(712,127,'후보 재사용','ev-small')
      +node(805,105,385,105,'DeepPocket',['CNN 재평가 + 영역 분할'],teal,'#edf8f7','deeppocket')
      +text(40,270,'구조를 읽는 별도 접근','ev-group','start')
      +node(40,307,540,130,'P2Rank',['표면점의 주변 환경 특징','학습 점수 → 포켓 후보'],teal,'#f5f9fa','p2rank')
      +node(650,307,540,130,'GrASP',['표면과 이웃 원자의 그래프','정보 전달 → 포켓 후보'],teal,'#f5f9fa','grasp')
      +arrow([[310,437],[310,490],[220,490],[220,560]],'data')+text(430,484,'여러 탐지기의 후보 중 하나로 사용','ev-small','start')
      +text(40,537,'최근 확장: 세 기술은 서로의 필수 후속 단계가 아닙니다','ev-group','start')
      +node(35,570,370,172,'HOTPocket / hotpocketNN',['여러 탐지기 후보 + 잔기 특징','후보 선별 → 통합 포켓 지도','보완: 검출기의 결과를 모아 선별'],teal,'#edf8f7','hotpocket')
      +node(435,570,370,172,'Seq2Pocket',['서열 예측 + 후처리용 구조','이웃 보정 → SAS 표면 군집화','보완: 흩어진 잔기를 공간으로 연결'],teal,'#edf8f7','seq2pocket')
      +node(835,570,370,172,'ProMoNet / ProMoSite',['단백질 서열 + 리간드 SMILES','잔기–원자 표현 → 잔기 점수','보완: 특정 화합물의 부위 예측'],teal,'#edf8f7','promonet')
      +text(620,792,'Seq2Pocket은 3D 구조를 활용하고, ProMoSite는 단백질 3D 없이 추론할 수 있습니다.','ev-body')
      +text(620,826,'ProMoSite의 리간드 특징에는 RDKit conformer를 사용합니다. 부위 점수 ≠ 복합체 좌표·친화도','ev-small')
      +rect(35,863,1170,82,grey,'#f5f8fb')+text(620,892,'평가·분석 자료 · 예측 기술과 별도로 핵심 읽기','ev-group')
      +paperLink('ligysis',text(235,924,'LIGYSIS 비교 연구 →','ev-paper-label'),'LIGYSIS 비교 연구')
      +paperLink('cryptobench',text(620,924,'CryptoBench →','ev-paper-label'),'CryptoBench')
      +paperLink('ranking',text(1005,924,'검출·순위 분석 · 프리프린트 →','ev-paper-label'),'검출·순위 분석 프리프린트');
    return s;
  }
  function drawDocking(){let s=text(35,42,'같은 입력에서도 “어떻게 찾는가”와 “무엇을 움직이는가”가 달라집니다','ev-title','start')+text(620,99,'공통 입력의 기본 형태: 단백질 3D 구조 + 특정 리간드 정보','ev-body');const xs=[35,462,889];s+=node(xs[0],170,315,140,'Vina',['근사 점수 기반 탐색','리간드 자세를 찾기'],coral,'#fff5ef','vina')+node(xs[1],170,315,140,'DiffDock · 원본',['학습된 확산 생성','리간드 이동·회전·비틀림'],coral,'#fff5ef','diffdock')+node(xs[2],170,315,140,'DynamicBind',['리간드 + 수용체 배치 갱신','리간드에 맞춘 복합체'],coral,'#fff5ef','dynamicbind')+arrow([[350,240],[462,240]],'scope')+text(406,150,'탐색 방식 변화','ev-small')+arrow([[777,240],[889,240]],'scope')+text(833,150,'유연성 범위 확장','ev-small');s+=text(35,364,'수용체를 다루는 범위','ev-group','start')+node(xs[0],390,315,108,'고정 / 선택 곁사슬',['백본 전체 갱신과 구분'],coral)+node(xs[1],390,315,108,'수용체 고정',['AI라도 단백질은 고정'],coral)+node(xs[2],390,315,108,'잔기·곁사슬 갱신',['시작 구조를 받아 조정'],coral)+text(620,570,'발전의 축: 점수 탐색 ↔ 학습된 생성 / 고정 구조 ↔ 수용체 배치 조정','ev-positive')+text(620,618,'점선은 기능을 비교한 것입니다. 세 방법을 차례로 실행하거나 MD 시간으로 읽지 않습니다.','ev-small');return s;}
  function drawCofold(){return text(35,42,'공동 구조 예측 안에서도 확장 방향이 나뉩니다','ev-title','start')+text(946,79,'같은 공동 예측 계열의 서로 다른 강조점','ev-group')+node(35,263,310,135,'AlphaFold 3',['단백질·핵산·리간드 등','복합체 원자 좌표 공동 생성'],purple,'#f3effa','af3')+arrow([[345,330],[462,330],[462,183],[710,183]],'scope')+arrow([[345,330],[540,330],[540,374],[710,374]],'scope')+arrow([[345,360],[430,360],[430,563],[710,563]],'implementation')+text(520,225,'공통 패러다임의 확장','ev-small')+text(520,248,'독립적인 학습 모델','ev-small')+text(523,535,'AF3 계열 공개 재구현','ev-small')+node(710,115,485,135,'Chai-1',['단백질 언어모델 임베딩','선택적 MSA·템플릿·접촉 조건'],purple,'#fff','chai1')+node(710,306,485,135,'Boltz-2',['구조 confidence와 별도의','결합 분류·친화도 출력'],purple,'#fff','boltz2')+node(710,495,485,135,'OpenFold3-preview2',['코드·가중치·학습 자료','학습 재현과 개선의 기반'],purple,'#f3effa','openfold3')+text(35,466,'같은 학습 가중치가 아닙니다.','ev-body','start')+text(35,494,'Chai-1과 Boltz-2도 서로의','ev-body','start')+text(35,520,'후속 버전이라는 뜻이 아닙니다.','ev-body','start');}
  function drawConnections(){let s=text(35,40,'실선은 출력이 다음 입력으로 이어지는 활용 예입니다','ev-title','start');s+=node(25,85,200,100,'MD',['구조·환경·힘장 준비'],blue,'#edf3fb','md')+arrow([[225,135],[335,135]],'data')+text(280,108,'프레임 좌표','ev-small')+node(335,85,370,100,'프레임별 포켓 탐지',[`fpocket ${year('fpocket')} · P2Rank ${year('p2rank')}`],teal)+arrow([[705,135],[820,135]],'data')+node(820,85,390,100,'열림·공간 변화 분석',['계산 범위와 샘플링 점검'],blue);s+=node(25,218,235,85,'PocketMiner',['잔기별 영역 점수'],blue,'#fff','pocketminer')+arrow([[260,260],[292,260],[292,190],[172,190],[172,185]],'scope')+text(355,238,'필요하면 탐색 영역을 좁히는 데 참고','ev-small','start')+text(355,266,'열린 좌표를 직접 생성하지는 않습니다.','ev-small','start');s+=node(25,350,235,105,'포켓 후보 위치',['입력 좌표계·번호 확인'],teal,'#edf8f7')+arrow([[260,402],[350,402]],'data')+node(350,350,280,105,'탐색 범위 설정',['준비한 단백질·리간드'],coral)+arrow([[630,402],[720,402]],'data')+node(720,350,490,105,'Vina 등 도킹',['자세 후보·점수 → 정의에 맞게 해석'],coral,'#fff5ef','vina');s+=node(25,525,235,105,'co-folding 복합체',['서열·분자에서 생성'],purple,'#f3effa')+arrow([[260,577],[350,577]],'data')+node(350,525,280,105,'구조·인터페이스 검증',['화학 타당성·confidence'],purple)+arrow([[630,577],[720,577]],'scope')+node(720,525,490,105,'필요한 추가 분석',['새 질문이 있을 때 포켓 분석·도킹 등'],purple);s+=node(25,715,285,105,'여러 도구의 후보',['같은 구조·좌표계 확인'],teal,'#edf8f7')+arrow([[310,767],[377,767]],'data')+node(377,715,430,105,'HOTPocket / hotpocketNN',['잔기 특징으로 후보 선별·군집화'],teal,'#fff','hotpocket')+arrow([[807,767],[867,767]],'data')+node(867,715,343,105,'검토할 포켓 목록',['후보 점수·검토 예산 확인'],teal);
    s+=node(25,880,285,105,'서열 예측 + 3D 구조',['언어모델 잔기 점수·특징'],teal,'#edf8f7')+arrow([[310,932],[377,932]],'data')+node(377,880,430,105,'Seq2Pocket',['이웃 보정 + SAS 표면 군집화'],teal,'#fff','seq2pocket')+arrow([[807,932],[867,932]],'data')+node(867,880,343,105,'3D 포켓',['기존 좌표 위의 공간 영역'],teal);
    s+=node(25,1045,285,105,'서열 + 리간드 SMILES',['단백질 3D는 추론 필수 아님'],teal,'#edf8f7')+arrow([[310,1097],[377,1097]],'data')+node(377,1045,430,105,'ProMoNet / ProMoSite',['서열·분자 표현으로 상호작용 학습'],teal,'#fff','promonet')+arrow([[807,1097],[867,1097]],'data')+node(867,1045,343,105,'해당 리간드의 잔기 점수',['3D 평가는 별도 구조에 매핑'],teal);
    return s;}

  const drawers={overview:drawOverview,pocket:drawPocket,docking:drawDocking,cofold:drawCofold,connections:drawConnections};
  let selected='overview',overviewView='map';
  function updateUrl(){const url=new URL(location.href);if(overviewView==='evolution'){url.searchParams.set('view','evolution');if(selected!=='overview')url.searchParams.set('flow',selected);else url.searchParams.delete('flow');}else if(overviewView==='frontiers'){url.searchParams.set('view','frontiers');url.searchParams.delete('flow');}else{url.searchParams.delete('view');url.searchParams.delete('flow');}if(overviewView!=='frontiers')url.searchParams.delete('topic');history.replaceState(null,'',url);}
  function showScene(id,write=true){const scene=data.scenes.find(s=>s.id===id)||data.scenes[0];selected=scene.id;$('evolution-figure').setAttribute('viewBox',`0 0 1240 ${{overview:780,pocket:970,connections:1180}[selected]||670}`);$('evolution-figure').innerHTML=drawers[selected]();$('evolution-figure').setAttribute('role',$('evolution-figure').querySelector('a')?'group':'img');$('evolution-figure').setAttribute('aria-label',scene.title+'. '+scene.change);$('evolution-title').textContent=scene.title;$('evolution-change').textContent=scene.change;$('evolution-body').textContent=scene.body;$('evolution-limit').textContent=scene.limit;$('evolution-gains').replaceChildren(...scene.gains.map(t=>{const li=document.createElement('li');li.textContent=t;return li;}));$('evolution-links').replaceChildren(...scene.sources.flatMap((link,i)=>{const a=document.createElement('a');a.textContent=link.title;a.href=link.url;if(!link.url.startsWith('../')){a.target='_blank';a.rel='noopener';}return i?[document.createTextNode(' · '),a]:[a];}));document.querySelectorAll('[data-evolution]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.evolution===selected)));if(write)updateUrl();}
  function showView(view,write=true){overviewView=['map','evolution','frontiers'].includes(view)?view:'map';$('overview-map-view').hidden=overviewView!=='map';$('overview-evolution-view').hidden=overviewView!=='evolution';$('overview-frontiers-view').hidden=overviewView!=='frontiers';document.querySelectorAll('[data-overview-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.overviewView===overviewView)));if(write)updateUrl();window.dispatchEvent(new CustomEvent('overviewviewchange',{detail:{view:overviewView}}));}
  document.querySelectorAll('[data-overview-view]').forEach(b=>b.addEventListener('click',()=>showView(b.dataset.overviewView)));document.querySelectorAll('[data-evolution]').forEach(b=>b.addEventListener('click',()=>showScene(b.dataset.evolution)));
  const params=new URLSearchParams(location.search);showScene(params.get('flow')||'overview',false);showView(params.get('view'),false);
})();
