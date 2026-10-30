(() => {
 'use strict';
 const $=id=>document.getElementById(id), C={protein:'#b3c4d1',carbon:'#73889a',ligand:'#e8793f',fp:'#008a94',p2:'#8952cc'};
 const scenes={
  structure:{name:'단백질 안에서 리간드는 어디에 있을까?',question:'회색 단백질과 주황색 맥아당을 따로 구분합니다.',points:['이것은 실험에서 얻은 MBP–맥아당 구조입니다. 전체 윤곽과 결합 부위를 함께 보세요.','자리 확대를 누르면 맥아당 주변의 원자와 빈 공간으로 이동합니다. 맥아당을 끄면 그 자리가 드러납니다.','포켓 탐지 입력에는 맥아당을 넣지 않았습니다. 주황색은 나중에 덧붙인 참고 위치입니다.'],note:'실험 구조에서 리간드를 가려도 단백질의 모양은 holo 유래 상태입니다. 리간드를 지웠다고 apo 구조로 이완되는 것은 아닙니다.'},
  alpha:{name:'네 원자 사이의 가상 구 하나를 봅니다',question:'작은 회색 점은 실제 원자 중심, 청록색 큰 구는 계산용 가상 구입니다.',points:['실제 fpocket 출력에서 맥아당 자리 근처의 구 하나를 골랐습니다.','네 원자 중심까지의 거리가 거의 같습니다. 이 거리가 가상 구의 반지름입니다. 회전해서 앞뒤 관계도 보세요.','작은 원자 표시 구와 큰 가상 구를 구분하세요. 반지름 선은 화학 결합선이 아닙니다.'],note:'알파 구는 원자나 리간드가 아닙니다. 원자 중심 좌표 사이의 기하학을 표현하는 가상 구이며, 이 화면에서는 큰 반지름이 기본으로 표시됩니다.'},
  cluster:{name:'가까운 가상 구들을 모으면 포켓 후보가 됩니다',question:'한 구가 포켓 하나가 아니라, 모인 구들이 한 후보 영역을 표현합니다.',points:['청록색 작은 점은 fpocket이 계산한 가상 구의 중심입니다.','반지름 표시를 켜면 각 점에 크기가 있는 구가 붙습니다. 겹치는 구가 공간 영역을 덮는 것을 보세요.','포켓 후보를 바꾸면 같은 단백질의 다른 자리가 나타납니다. 맥아당 위치는 예측 후의 비교 참고입니다.'],note:'구 중심의 평균을 후보 중심으로 요약했습니다. score는 도구 내부의 순위용 수치이며 결합 친화도나 특정 약물의 결합 확률이 아닙니다.'},
  surface:{name:'P2Rank는 표면의 점 주변 환경을 평가합니다',question:'보라색 점은 원자도 가상 구 중심도 아닌, 계산한 표면의 샘플 점입니다.',points:['단백질 입력은 fpocket과 동일합니다. 후보를 만드는 단위가 다릅니다.','보라색은 선택한 포켓에 모인 표면점입니다. 주변 원자들의 물리화학·기하 특징을 학습 모델로 평가합니다.','후보를 바꾸고 원자 크기·계산 표면을 번갈아 보면 점이 어느 공간에 있는지 볼 수 있습니다.'],note:'probability는 이 포켓 후보에 대한 도구 출력입니다. 특정 리간드와의 실제 결합 확률이나 친화도가 아닙니다.'},
  compare:{name:'같은 구조, 같은 시점으로 두 출력을 비교합니다',question:'왼쪽은 fpocket 가상 구 중심, 오른쪽은 P2Rank 표면점입니다.',points:['왼쪽을 회전하면 오른쪽도 같은 시점으로 바뀝니다.','두 후보가 어떤 공간을 가리키는지 주황색 맥아당 참고 위치와 비교하세요.','두 점수의 크기는 직접 비교하지 않습니다. 이 한 예시로 어느 방법이 더 좋다고 정하지 않습니다.'],note:'fpocket과 P2Rank는 같은 리간드 제거 입력을 받았지만 서로 다른 단위로 후보를 만듭니다. 표시 점의 크기는 식별을 위한 값이며 점수에 비례하지 않습니다.'},
  docking:{name:'도킹 출력에는 리간드 원자의 새로운 좌표가 있습니다',question:'공식 ABL–이마티닙 예제로 입력 좌표와 출력 mode를 골라 봅니다.',points:['여기서는 단백질이 MBP에서 ABL로 바뀝니다. 이마티닙은 중원자 37개인 다른 분자입니다.','입력 좌표와 출력 mode 1–4를 바꾸면 원자 배치와 Vina 점수가 달라집니다. 단백질 좌표는 고정입니다.','공식 입력 리간드는 이미 결합 자세에 가깝습니다. 이 선택은 탐색 과정의 시간 흐름을 재생하는 것이 아닙니다.'],note:'저장된 AutoDock Vina 공식 참고 출력입니다. 새 도킹 실행이 아니며, RMSD 열은 최상위 mode와의 거리 경계입니다. 실험 구조 대비 오차나 실험 Kd가 아닙니다.'}
 };
 let data, proteinPdb, ligandSdf, ablPdb, scene='structure', viewer, comparison, serial=0;
 const controls=['show-context','show-ligand','show-volume','show-labels','show-detail','element-colors','representation','fp-candidate','p2-candidate','vina-mode'];
 const xyz=p=>({x:p[0],y:p[1],z:p[2]});
 const fmt=x=>Number(x).toFixed(3);
 const chosenFp=()=>data.fpocket.pockets.find(p=>p.rank===Number($('fp-candidate').value))||data.fpocket.pockets[0];
 const chosenP2=()=>data.p2rank.pockets.find(p=>p.rank===Number($('p2-candidate').value))||data.p2rank.pockets[0];
 function metric(label,value){const d=document.createElement('div');d.textContent=label;const s=document.createElement('strong');s.textContent=value;d.append(s);return d;}
 function makeViewer(id){
  const element=$(id),v=$3Dmol.createViewer(element,{backgroundColor:'#f5f8fc',antialias:true});
  // Normalize the standard wheel delta before the library's legacy wheelDelta
  // handler sees it. Negative deltaY means wheel up / pinch out: zoom in.
  element.addEventListener('wheel',e=>{
   if(!Number.isFinite(e.deltaY)||e.deltaY===0)return;
   e.preventDefault();e.stopImmediatePropagation();
   const pixels=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?element.clientHeight:1);
   v.zoom(Math.exp(-Math.max(-120,Math.min(120,pixels))*.002));v.render();
  },{capture:true,passive:false});
  return v;
 }
 function labelAtom(a,v){$('atom-info').textContent=`${a.resn||a.resname||'LIG'} ${a.resi||a.residue||''} · ${a.atom||a.name||a.elem} · 원자 ${a.serial||''}`+` · xyz = (${fmt(a.x)}, ${fmt(a.y)}, ${fmt(a.z)}) Å`;}
 function base(v,method){
  v.removeAllModels();v.removeAllShapes();v.removeAllLabels();v.removeAllSurfaces();
  const dock=scene==='docking'; const protein=v.addModel(dock?ablPdb:proteinPdb,'pdb');
  protein.setStyle({},{});
  if($('show-context').checked)protein.setStyle({}, {cartoon:{color:C.protein,opacity:scene==='alpha'?.10:.30}});
  const local=dock?data.vina.nearbySerials:scene==='structure'?data.protein.localSerials:method==='p2rank'?chosenP2().nearbySerials:scene==='alpha'?data.alphaExample.atoms.map(a=>a.serial):chosenFp().nearbySerials;
  const palette=$('element-colors').checked?{colorscheme:'grayCarbon'}:{color:C.carbon};
  const center=dock?data.vina.center:scene==='structure'?data.ligand.center:method==='p2rank'?chosenP2().center:chosenFp().center;
  const atoms=dock?null:data.protein.atoms;
  const localSet=new Set(local);
  const core=$('show-detail').checked||dock?local:atoms.filter(a=>localSet.has(a.serial)&&Math.hypot(...a.xyz.map((n,i)=>n-center[i]))<7.5).map(a=>a.serial);
  if(scene==='alpha')protein.setStyle({serial:local},{sphere:{radius:.34,color:'#536b80'}});
  else if($('representation').value==='sphere')v.addStyle({model:0,serial:core},{sphere:{scale:.8,...palette,opacity:.68}});
  else{
   v.addStyle({model:0,serial:local},{line:{color:'#bac8d4',linewidth:1,opacity:.35}});
   v.addStyle({model:0,serial:core},{stick:{radius:.10,...palette},sphere:{scale:.19,...palette}});
  }
  const mode=$('vina-mode').value, pose=dock&&mode!=='input'?data.vina.poses.find(p=>p.rank===+mode):null;
  const ligand=v.addModel(dock?(pose?pose.sdf:data.vina.referenceSdf):ligandSdf,'sdf');
  ligand.setStyle({},(!dock&&!$('show-ligand').checked)?{}:{stick:{radius:.22,color:C.ligand},sphere:{scale:.25,color:C.ligand}});
  if(dock&&pose&&$('show-ligand').checked){const ref=v.addModel(data.vina.referenceSdf,'sdf');ref.setStyle({},{stick:{radius:.09,color:'#977cc0',opacity:.65}});}
  v.setClickable({model:0},true,a=>labelAtom(a,v));v.setClickable({model:1},true,a=>labelAtom(a,v));
  if(scene==='alpha'){
   const s=data.alphaExample.sphere, center=xyz(s.xyz);
   v.addSphere({center,radius:s.radius,color:C.fp,opacity:.22});
   for(let plane=0;plane<3;plane++){
    const points=Array.from({length:73},(_,i)=>{const t=i*Math.PI/36,c=s.radius*Math.cos(t),d=s.radius*Math.sin(t);return {x:center.x+(plane===0?0:c),y:center.y+(plane===1?0:plane===0?c:d),z:center.z+(plane===2?0:d)};});
    v.addCurve({points,radius:.025,color:C.fp,smooth:0});
   }
   v.addSphere({center,radius:.15,color:C.fp});
   for(const a of data.alphaExample.atoms){v.addCylinder({start:center,end:xyz(a.xyz),radius:.025,color:'#397687'});if($('show-labels').checked)v.addLabel(`${a.resname}${a.residue} ${a.name}`,{position:xyz(a.xyz),fontSize:13,fontColor:'#102f43',backgroundColor:'#fff',backgroundOpacity:.95,borderThickness:0,inFront:true});}
  }
  if(scene==='cluster'||scene==='compare'&&method==='fpocket')for(const s of chosenFp().spheres){v.addSphere({center:xyz(s.xyz),radius:.28,color:C.fp});if($('show-volume').checked)v.addSphere({center:xyz(s.xyz),radius:s.radius,color:C.fp,opacity:.035});}
  if(scene==='surface'||scene==='compare'&&method==='p2rank')for(const p of chosenP2().points)v.addSphere({center:xyz(p.xyz),radius:.31,color:C.p2});
  return {local,pose};
 }
 function localView(v){
  if(scene==='alpha'){v.zoomTo({model:0,serial:data.alphaExample.atoms.map(a=>a.serial)});v.zoom(.8);}
  else if(scene==='docking'){v.zoomTo({model:1});v.zoom(.8);}
  else{v.zoomTo({model:0,serial:scene==='structure'?data.protein.localSerials:scene==='surface'?chosenP2().nearbySerials:chosenFp().nearbySerials});v.zoom(1.15);}
  v.rotate(25,'y');v.rotate(12,'x');v.setSlab(-100,100);v.render();
 }
 function applyClip(){const cut=+$('clip').value;viewer.setSlab(-100,cut===0?100:22-cut);viewer.render();if(comparison&&scene==='compare'){comparison.setSlab(-100,cut===0?100:22-cut);comparison.render();}$('clip-value').textContent=cut===0?'끔':String(cut);}
 async function draw(reset=true){
  if(!data)return;const token=++serial, pair=scene==='compare', old=viewer.getView();
  $('compare-frame').hidden=!pair;$('viewers').classList.toggle('comparing',pair);
  $('main-view-label').textContent=pair?'fpocket · 가상 구 중심':scene==='docking'?'ABL–이마티닙 · 공식 Vina 예제':scene==='alpha'?'실제 네 원자 중심 + 가상 구 하나':'MBP–맥아당 · 원본 좌표';
  const main=base(viewer,scene==='surface'?'p2rank':'fpocket');
  if(pair){if(!comparison){comparison=makeViewer('viewer-compare');viewer.linkViewer(comparison);}base(comparison,'p2rank');comparison.resize();}
  viewer.resize();if(reset){$('clip').value='0';if(scene==='structure'){viewer.zoomTo({model:0});viewer.rotate(25,'y');viewer.rotate(12,'x');viewer.render();}else localView(viewer);}else viewer.setView(old);
  applyClip();
  if($('representation').value==='surface'&&scene!=='alpha'){
   try{const tasks=[[viewer,main.local]];if(pair)tasks.push([comparison,chosenP2().nearbySerials]);await Promise.all(tasks.map(async([v,local])=>{const pending=v.addSurface('SAS',{opacity:.36,color:'#b5cadb'},{model:0,serial:local},{model:0});await pending;if(token===serial)v.render();else v.removeSurface(pending.surfid);}));}catch(e){if(token===serial)$('load-status').textContent='표면 생성이 어려워 원자·결합 표현을 사용합니다.';}
  }
  showValues();
 }
 function showValues(){
  const fp=chosenFp(),p2=chosenP2(),alpha=data.alphaExample,mode=$('vina-mode').value,pose=data.vina.poses.find(p=>p.rank===+mode);
  let metrics=[],output,explain;
  if(scene==='alpha'){metrics=[metric('가상 구 반지름',`${fmt(alpha.sphere.radius)} Å`),metric('접촉 원자',4)];output={sphere_center_A:alpha.sphere.xyz,radius_A:alpha.sphere.radius,touching_atoms:alpha.atoms.map(a=>({serial:a.serial,residue:`${a.resname}${a.residue}`,atom:a.name,distance_A:a.distance}))};explain='동일한 구 중심에서 네 원자 중심까지의 거리를 계산했습니다. 이 거리 선은 분자 안의 결합선이 아닙니다.';}
  else if(scene==='surface'){metrics=[metric('후보 순위',p2.rank),metric('score',p2.score.toFixed(2)),metric('표면점',p2.pointCount),metric('probability',p2.probability.toFixed(3))];output={rank:p2.rank,score:p2.score,probability:p2.probability,center_A:p2.center,sas_points:p2.pointCount,one_surface_point:p2.points[0]};explain='실제 P2Rank CSV와 표면점 파일에서 읽은 값입니다. probability는 특정 분자의 결합 확률이 아닙니다.';}
  else if(scene==='docking'){metrics=[metric('중원자',37),metric('선택 좌표',pose?`mode ${pose.rank}`:'입력'),metric('Vina 점수',pose?pose.score:'—'),metric('고정 단백질 원자',data.vina.proteinAtoms)];output=pose?{raw_output_remark:pose.remark,score_kcal_mol:pose.score,rmsd_from_best_lower_A:pose.rmsdLower,rmsd_from_best_upper_A:pose.rmsdUpper,first_three_heavy_atoms:pose.atoms.slice(0,3)}:{mode:'공식 입력 리간드',heavy_atoms:37,first_three_heavy_atoms:data.vina.referenceAtoms.slice(0,3)};explain='주황색 원자의 xyz가 선택에 따라 달라집니다. 도킹 점수는 실험 결합 친화도나 결합 확률이 아닙니다.';}
  else if(scene==='compare'){metrics=[metric('fpocket 후보 수',21),metric('P2Rank 후보 수',5),metric('fpocket score',fp.score.toFixed(3)),metric('P2Rank score',p2.score.toFixed(2))];output={fpocket:{rank:fp.rank,score:fp.score,center_A:fp.center,alpha_spheres:fp.pointCount},p2rank:{rank:p2.rank,score:p2.score,center_A:p2.center,sas_points:p2.pointCount}};explain='이 두 score는 정의가 다릅니다. 37.43이 0.241보다 크다고 더 강하게 결합하거나 더 정확하다고 해석하지 않습니다.';}
  else{metrics=[metric('단백질 원자',2860),metric('선택 후보',fp.rank),metric('가상 구',fp.pointCount),metric('fpocket score',fp.score.toFixed(3))];output={rank:fp.rank,score:fp.score,center_A:fp.center,alpha_spheres:fp.pointCount,volume_A3:fp.volume,one_sphere:fp.spheres[0]};explain='xyz와 radius는 원본 PDB와 같은 좌표계의 Å 단위입니다. center는 이 예제에서 가상 구 중심들의 평균으로 요약한 위치입니다.';}
  $('live-metrics').replaceChildren(...metrics);$('output-values').textContent=JSON.stringify(output,null,2);$('output-explainer').textContent=explain;
  $('input-values').textContent=scene==='docking'?JSON.stringify({receptor:'1iep_receptor.pdbqt',ligand:'1iep_ligand.pdbqt',box:data.vina.box.trim(),first_input_heavy_atom:data.vina.referenceAtoms[0]},null,2):data.pdbInputSnippet+'\n…\n총 2,860개 원자 · 370개 잔기 · chain A';
  $('input-explainer').textContent=scene==='docking'?'입력에는 준비한 단백질·리간드와 탐색 범위가 있습니다. 이 예제의 리간드 입력은 이미 결정 구조의 결합 자세에 가깝습니다.':'ATOM 뒤에는 원자 번호·이름·잔기·chain·잔기 번호·x·y·z 등이 이어집니다. 리간드와 물을 제거한 동일 입력이 두 포켓 도구에 들어갔습니다.';
  $('io-description').textContent=scene==='docking'?'Vina 공식 예제의 저장된 입력과 출력입니다.':'이미 실행해 보존한 MBP 포켓 탐지 결과를 읽기 쉬운 JSON으로 요약했습니다. 새 모델을 실행한 결과가 아닙니다.';
 }
 function switchScene(id){
  scene=scenes[id]?id:'structure';const s=scenes[scene],dock=scene==='docking';
  document.querySelectorAll('[data-scene]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.scene===scene)));
  $('case-name').textContent=dock?'다른 예제 · ABL–이마티닙 / 1IEP':'동일 예제 · MBP–맥아당 / 1ANF';$('scene-title').textContent=s.name;$('scene-question').textContent=s.question;$('interpretation').textContent=s.note;
  $('scene-origin').textContent=dock?'공식 저장소의 참고 출력 · 새 도킹 실행 아님':'개인 실행을 보존한 실제 출력 · 리간드 제거 입력';
  $('scene-points').replaceChildren(...s.points.map(t=>{const li=document.createElement('li');li.textContent=t;return li;}));
  $('volume-label').hidden=!['cluster','compare'].includes(scene);$('labels-label').hidden=scene!=='alpha';$('representation-label').hidden=scene==='alpha';$('detail-label').hidden=scene==='alpha'||dock;$('element-label').hidden=scene==='alpha';$('touching-atoms').hidden=scene!=='alpha';
  $('fp-control').hidden=!['cluster','compare'].includes(scene);$('p2-control').hidden=!['surface','compare'].includes(scene);$('vina-control').hidden=!dock;
  $('show-ligand').parentElement.lastChild.textContent=dock?' 공식 입력도 겹쳐 보기':' 맥아당 참고 위치';
  $('display-note').textContent=scene==='alpha'?'회색 구는 네 원자 중심의 표시이며, 실제 원자 반지름을 표현한 크기가 아닙니다. 청록색 구와 반지름 선은 원본 출력 좌표·반지름으로 그렸습니다.':dock?'단백질 주변 원자를 회청색으로 낮추고 선택한 리간드 자세를 주황색으로 강조했습니다. 원소별 색을 켜면 단백질 C 회색 · O 빨강 · N 파랑 · S 노랑입니다. 표시 설정은 좌표·점수를 바꾸지 않습니다.':'기본 보기에서는 중심 7.5 Å 안쪽의 주변 원자를 강조하고 바깥은 가는 선으로 표시합니다. 원소별 색을 켜면 단백질 C 회색 · O 빨강 · N 파랑 · S 노랑입니다. 표시 크기와 투명도는 읽기 위한 설정이며 원본 좌표·점수는 바뀌지 않습니다.';
  $('show-ligand').checked=!dock&&scene!=='alpha';$('show-context').checked=scene==='structure';$('show-volume').checked=false;$('show-detail').checked=false;$('element-colors').checked=false;$('representation').value='stick';if(dock)$('vina-mode').value='1';
  const labels=scene==='alpha'?[[C.carbon,'실제 원자 중심'],[C.fp,'가상 구·중심'],['#447c91','반지름 선 · 화학 결합 아님']]:dock?[[C.protein,'고정 ABL 단백질'],[C.ligand,'선택한 리간드 자세'],['#977cc0','공식 입력 참고']]:[[C.protein,'단백질 원자·윤곽'],[C.ligand,'실험 맥아당 참고 위치'],...(scene==='surface'?[[C.p2,'P2Rank 표면점']]:scene==='compare'?[[C.fp,'fpocket 가상 구 중심'],[C.p2,'P2Rank 표면점']]:[[C.fp,'가상 구 중심 · 원자 아님']])];
  $('legend').replaceChildren(...labels.map(([color,t])=>{const span=document.createElement('span'),i=document.createElement('i');i.style.background=color;span.append(i,document.createTextNode(t));return span;}));
  const url=new URL(location.href);url.searchParams.set('scene',scene);history.replaceState(null,'',url);draw(true);
 }
 async function init(){
  if(!window.$3Dmol)throw Error('분자 표시 라이브러리를 불러오지 못했습니다.');
  [data,proteinPdb,ligandSdf,ablPdb]=await Promise.all(['assets/case.json','assets/mbp-protein.pdb','assets/maltose.sdf','assets/abl-receptor.pdb'].map(async (url,i)=>{const r=await fetch(url);if(!r.ok)throw Error(`파일을 불러오지 못했습니다: ${url}`);return i===0?r.json():r.text();}));
  viewer=makeViewer('viewer-main');
  for(const [id,pockets] of [['fp-candidate',data.fpocket.pockets],['p2-candidate',data.p2rank.pockets]])for(const p of pockets){const o=document.createElement('option');o.value=p.rank;o.textContent=`후보 ${p.rank} · score ${p.score}`;$(id).append(o);}
  for(const a of data.alphaExample.atoms){const tr=document.createElement('tr');for(const value of [`${a.resname}${a.residue} ${a.name}`,a.distance.toFixed(3)]){const td=document.createElement('td');td.textContent=value;tr.append(td);}$('atom-distances').append(tr);}
  document.querySelectorAll('[data-scene]').forEach(b=>b.addEventListener('click',()=>switchScene(b.dataset.scene)));
  controls.forEach(id=>$(id).addEventListener('change',()=>draw(['fp-candidate','p2-candidate','vina-mode'].includes(id))));
  $('clip').addEventListener('input',applyClip);$('zoom-local').addEventListener('click',()=>localView(viewer));$('zoom-all').addEventListener('click',()=>{viewer.zoomTo({model:0});viewer.setSlab(-100,100);viewer.render();});$('reset-view').addEventListener('click',()=>draw(true));
  $('zoom-in').addEventListener('click',()=>{viewer.zoom(1.18);viewer.render();});$('zoom-out').addEventListener('click',()=>{viewer.zoom(1/1.18);viewer.render();});
  $('turn-left').addEventListener('click',()=>{viewer.rotate(-25,'y');viewer.render();});$('turn-right').addEventListener('click',()=>{viewer.rotate(25,'y');viewer.render();});
  new ResizeObserver(()=>{viewer.resize();viewer.render();if(comparison&&scene==='compare'){comparison.resize();comparison.render();}}).observe($('viewers'));
  $('load-status').textContent='실제 좌표 로드 완료 · MBP 원자 2,860개 · 370잔기 · fpocket 후보 21개 / P2Rank 후보 5개';
  switchScene(new URLSearchParams(location.search).get('scene')||'structure');
 }
 init().catch(e=>{$('load-status').textContent=`3D를 열지 못했습니다. ${e.message} 원본 파일과 아래 수치 자료는 내려받아 확인할 수 있습니다.`;$('load-status').classList.add('error');console.error(e);});
})();
