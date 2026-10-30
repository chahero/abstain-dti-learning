(() => {
 'use strict';
 const $=id=>document.getElementById(id),data=JSON.parse($('frontiers-data').textContent);
 const papers=new Map(data.papers.map(p=>[p.id,p]));
 const compact=window.matchMedia('(max-width:720px)');
 const esc=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const text=(x,y,t,kind='fr-body',anchor='middle')=>`<text x="${x}" y="${y}" class="${kind}" text-anchor="${anchor}">${esc(t)}</text>`;
 const line=(x,y,a,b,color='#8ca7b7',dash='')=>`<path d="M${x} ${y}L${a} ${b}" stroke="${color}" stroke-width="2" fill="none" ${dash?`stroke-dasharray="${dash}"`:''}/>`;
 const arrow=(x,y,a,b)=>line(x,y,a,b)+`<path d="M${a-8} ${b-5}L${a} ${b}L${a-8} ${b+5}" stroke="#8ca7b7" stroke-width="2" fill="none"/>`;
 const rect=(x,y,w,h,fill='#eef5f8',stroke='#d4e2ea')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`;
 const dot=(x,y,r=8,color='#738b9b')=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" stroke="white" stroke-width="1.5"/>`;
 function protein(x,y,open=true){return `<g transform="translate(${x} ${y})"><path d="M-116 40C-145-13-127-77-80-67C-77-120-15-114-27-61C-45-17 ${open?'-29 8 8 12C40 10 58-32 46-68':'-15-17 6-13C25-14 22-34 15-62'}C18-123 79-112 93-72C140-57 139 19 106 57C49 101-70 99-116 40Z" fill="#d8e9ed" stroke="#568a98" stroke-width="2"/></g>`;}
 let selected='motion',rankCase='initial',budget=data.toy.defaultBudget;
 function motion(){return text(380,33,'한 구조에서는 보이지 않는 자리','fr-title')+rect(18,65,332,306)+rect(410,65,332,306)+text(184,105,'실제 apo 상태','fr-label')+text(576,105,'다른 배치의 상태','fr-label')+protein(181,235,false)+protein(565,235,true)+arrow(356,220,403,220)+text(184,352,'현재 공간이 가려질 수 있음','fr-small')+text(576,352,'구조 변화로 드러날 수 있음','fr-small')+text(380,420,'holo에서 리간드를 지워도','fr-body')+text(380,451,'단백질의 결합형 배치는 남습니다.','fr-label');}
 function ranking(){
  const pool=Array.from({length:20},(_,i)=>i===14?'T':String(i+1));
  if(rankCase==='improved')[pool[1],pool[14]]=[pool[14],pool[1]];
  if(rankCase==='missing')pool[14]='21';
  const narrow=compact.matches,columns=narrow?4:5,cx=narrow?220:380;
  let svg=text(cx,33,`후보 ${pool.length}개 · 상위 ${budget}개${narrow?'':' 검토'}`,'fr-title');
  pool.forEach((candidate,i)=>{
   const x=(narrow?16:24)+(i%columns)*(narrow?106:144),y=(narrow?62:65)+Math.floor(i/columns)*(narrow?72:82),yes=i<budget,truth=candidate==='T',w=narrow?98:134;
   svg+=`<g data-candidate="${candidate}" data-reviewed="${yes}">`+rect(x,y,w,narrow?62:67,yes?'#e0f1ee':'#f3f6f9',yes?'#177d82':'#d7e2e9')+text(x+10,y+23,`${i+1}위`,'fr-small','start')+text(x+w/2,y+51,truth?'정답 자리':`후보 ${candidate}`,truth?'fr-label':'fr-small')+(truth?dot(x+w-17,y+19,narrow?6:8,'#e17c45'):'')+'</g>';
  });
  svg+=narrow?dot(25,448,7,'#e17c45')+text(44,455,'주황색 = 정답 후보','fr-small','start')+text(220,488,`상위 ${budget}개 안에`,'fr-body')+text(220,516,'정답 후보가 있나요?','fr-body'):dot(33,423,7,'#e17c45')+text(53,430,'정답 위치에 해당하는 후보','fr-small','start')+text(380,470,'테두리가 강한 상위 목록 안에 정답이 있나요?','fr-body');
  return svg;
 }
 function geometry(){
  const scattered=[[83,154],[154,245],[260,139],[110,308],[285,302],[225,223]],cluster=[[513,222],[543,191],[584,204],[606,246],[564,274],[521,260]];
  return text(380,33,'잔기 점수 → 공간에서 연결된 영역','fr-title')+rect(18,65,332,311)+rect(410,65,332,311)+text(184,108,'잔기마다 독립적인 점수','fr-label')+text(576,108,'3D 이웃 관계로 묶기','fr-label')+scattered.map((p,i)=>dot(...p,13,i%2?'#8464b6':'#158997')).join('')+`<ellipse cx="560" cy="232" rx="83" ry="68" fill="#e3f0ee" stroke="#5c9b9e" stroke-dasharray="5 5"/>`+cluster.map((p,i)=>line(...p,...cluster[(i+1)%cluster.length],'#6d9da6')+dot(...p,12,'#158997')).join('')+arrow(356,220,403,220)+text(184,354,'흩어진 점이 남을 수 있음','fr-small')+text(576,354,'포켓의 연결과 경계','fr-small')+text(380,423,'Seq2Pocket: 언어모델 예측 + 공간적 보정','fr-body')+text(380,456,'최종 포켓 구성에 구조 정보가 쓰입니다.','fr-label');
 }
 function annotation(){return text(380,33,'관찰·라벨의 범위도 결과에 영향을 줍니다','fr-title')+rect(18,65,332,308)+rect(410,65,332,308)+text(184,107,'한 구조의 라벨만 사용','fr-label')+text(576,107,'여러 관찰을 모아 확인','fr-label')+protein(175,235)+protein(568,235)+dot(174,201,20,'#e17c45')+dot(249,273,12,'#fff')+dot(568,201,20,'#e17c45')+dot(642,273,12,'#825ab8')+text(166,169,'자리 A','fr-small')+text(273,315,'B?','fr-small')+text(560,169,'자리 A','fr-small')+text(652,315,'자리 B','fr-small')+arrow(356,220,403,220)+text(184,352,'빠진 부위의 해석이 어려움','fr-small')+text(576,352,'추가 구조·실험 근거 필요','fr-small')+text(380,420,'작은 부위와 여러 구조의 관찰을 보강합니다.','fr-body')+text(380,453,'관찰된 결합 자리와 약물 표적 가능성은 구분합니다.','fr-small');}
 function ligand(){return text(380,33,'입력하는 정보에 따라 질문을 나눕니다','fr-title')+text(32,87,'넓게 후보 찾기','fr-label','start')+rect(28,110,205,91)+text(130,146,'단백질 3D 구조','fr-body')+text(130,177,'리간드 정보 없음','fr-small')+arrow(243,155,287,155)+rect(297,110,202,91)+text(398,163,'fpocket · P2Rank','fr-label')+arrow(509,155,553,155)+rect(563,110,168,91)+text(647,149,'여러 자리 후보','fr-body')+text(647,179,'중심·영역·순위','fr-small')+text(32,267,'특정 분자의 자리 찾기','fr-label','start')+rect(28,290,205,91,'#f7f1eb')+text(130,326,'단백질 서열','fr-body')+text(130,357,'+ 분자 X의 SMILES','fr-small')+arrow(243,335,287,335)+rect(297,290,202,91,'#f1eef8')+text(398,343,'ProMoSite','fr-label')+arrow(509,335,553,335)+rect(563,290,168,91,'#f4f1f9')+text(647,329,'X에 대한','fr-body')+text(647,359,'잔기별 부위 점수','fr-small')+text(380,443,'추가 입력 정보와 출력 단위를 맞춰 비교합니다.','fr-body')+text(380,475,'잔기 점수 · 복합체 좌표 · 친화도는 별개 출력입니다.','fr-small');}
 const drawings={motion,ranking,geometry,data:annotation,ligand};
 function status(){
  const truthRank=rankCase==='missing'?null:rankCase==='improved'?2:15,found=truthRank!==null,selectedForReview=found&&truthRank<=budget;
  $('ranking-status').replaceChildren(...[['정답 후보 생성',found?'성공':'없음',!found],[`상위 ${budget}개 검토`,selectedForReview?'정답 포함':'정답 누락',!selectedForReview]].map(([label,value,miss])=>{const d=document.createElement('div'),s=document.createElement('strong');d.textContent=label;s.textContent=value;d.classList.toggle('miss',miss);d.append(s);return d;}));
  $('review-budget-value').textContent=`${budget}개`;
  document.querySelectorAll('[data-rank-case]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.rankCase===rankCase)));
 }
 function draw(){
  $('frontier-figure').setAttribute('viewBox',selected==='ranking'&&compact.matches?'0 0 440 535':'0 0 760 490');
  $('frontier-figure').innerHTML=drawings[selected]();
  $('frontier-figure').setAttribute('aria-label',data.topics.find(t=>t.id===selected).title+(selected==='ranking'?` 정답 후보 ${rankCase==='missing'?'없음':rankCase==='improved'?'2위':'15위'}, 상위 ${budget}개를 검토하는 가상 예시.`:' 원리 설명용 모식도입니다.'));
  $('frontier-caption').textContent=selected==='ranking'?'설명용 가상 예시 · 실제 모델·논문 수치가 아닙니다.':'개념 설명용 모식도 · 실제 원자 좌표나 새 모델의 실행 결과가 아닙니다.';
  status();
 }
 function show(id,write=true){
  const topic=data.topics.find(t=>t.id===id)||data.topics[0];selected=topic.id;
  for(const key of ['question','title','limit','example','direction','boundary'])$('frontier-'+key).textContent=topic[key];
  $('ranking-controls').hidden=selected!=='ranking';
  document.querySelectorAll('[data-frontier]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.frontier===selected)));
  $('frontier-papers').replaceChildren(...topic.sources.map(id=>{const p=papers.get(id),a=document.createElement('a');a.href=p.url;a.target='_blank';a.rel='noopener';a.textContent=`${p.name} · ${p.year}${p.peerReviewed?'':' · 프리프린트'}`;return a;}));
  $('frontier-backlinks').replaceChildren(...topic.links.flatMap((link,i)=>{const a=document.createElement('a');a.textContent=link.title+' →';a.href=link.url;return i?[document.createTextNode(' · '),a]:[a];}));
  draw();
  if(write&&new URLSearchParams(location.search).get('view')==='frontiers'){const url=new URL(location.href);url.searchParams.set('topic',selected);history.replaceState(null,'',url);}
 }
 document.querySelectorAll('[data-frontier]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.frontier)));
 document.querySelectorAll('[data-rank-case]').forEach(b=>b.addEventListener('click',()=>{rankCase=b.dataset.rankCase;draw();}));
 $('review-budget').addEventListener('input',()=>{budget=Number($('review-budget').value);draw();});
 window.addEventListener('overviewviewchange',e=>{if(e.detail.view==='frontiers')show(selected);});
 compact.addEventListener('change',draw);
 show(new URLSearchParams(location.search).get('topic')||'motion',false);
})();
