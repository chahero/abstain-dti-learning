(() => {
  'use strict';
  const $=s=>document.querySelector(s);
  const $$=s=>[...document.querySelectorAll(s)];
  const data=window.REVIEW_DATA;
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const labels=['방법','MAE ↓','RMSE ↓','Corr ↑','R² ↑','ECE ↓','CRPS ↓','NLL ↓'];
  const chapters=$$('.chapter');
  const chapterRoute=chapter=>chapter.dataset.route||chapter.id;
  const chapterLink=id=>$('.sidebar a[data-view="'+id+'"]');
  const outline=$('#course-toc'),modelSubnav=$('#model-subnav'),modelToggle=$('#toggle-model-toc');
  const compactNav=matchMedia('(max-width:760px)');
  function toggleModelToc(open){
    modelSubnav.hidden=!open;modelToggle.setAttribute('aria-expanded',String(open));
    modelToggle.setAttribute('aria-label','2장 세부 목차 '+(open?'접기':'펼치기'));
  }
  modelToggle.addEventListener('click',()=>toggleModelToc(modelSubnav.hidden));
  $('.main-toc').addEventListener('click',e=>{if(compactNav.matches&&e.target.closest('a[data-view]'))outline.open=false;});
  compactNav.addEventListener('change',()=>{outline.open=!compactNav.matches;});
  outline.open=!compactNav.matches;
  let current='';
  let currentHash='';
  function route(){
    let requested=location.hash.slice(1)||'overview';
    if(requested==='agents'||requested.startsWith('agents/')){
      requested='results';history.replaceState(null,'','#results');
    }
    if(requested==='content'&&current){
      const title=$('#'+(current||'overview')+' h1');
      title.tabIndex=-1;title.focus();
      return;
    }
    const parts=requested.split('/');
    let chapter=chapters.find(c=>chapterRoute(c)===requested||c.id===requested),anchor=null;
    if(!chapter){
      const base=chapters.find(c=>c.id===parts[0]);
      const target=document.getElementById(parts[1]||parts[0]);
      const owner=target?.closest('.chapter');
      if(parts[0]==='limits'){chapter=$('#results');anchor='limits';}
      else if(owner&&(owner===base||owner.dataset.parent===parts[0])){chapter=owner;if(target!==owner)anchor=target.id;}
      else chapter=base||$('#overview');
    }
    const id=chapter.id;
    if(currentHash===requested)return;
    currentHash=requested;
    current=id;
    chapters.forEach(el=>el.hidden=el.id!==id);
    $$('.sidebar a[data-view]').forEach(a=>{if(a.dataset.view===id)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
    const inModels=id==='models'||chapter.dataset.parent==='models';
    $('#model-family').classList.toggle('family-active',inModels);
    if(inModels)toggleModelToc(true);
    $('#current-outline-label').textContent=chapterLink(id).textContent;
    if(compactNav.matches)outline.open=false;
    document.title=$('#'+id+' h1').textContent+' · RELIABLE-BA';
    if(anchor){
      let parent=document.getElementById(anchor).parentElement;
      while(parent&&parent!==chapter){if(parent.tagName==='DETAILS')parent.open=true;parent=parent.parentElement;}
    }
    if(document.readyState!=='loading'){
      const title=$('#'+id+' h1');title.tabIndex=-1;title.focus({preventScroll:true});
      if(anchor)requestAnimationFrame(()=>document.getElementById(anchor).scrollIntoView({block:'start',behavior:'instant'}));
      else window.scrollTo({top:0,behavior:'instant'});
    }
    const index=chapters.findIndex(c=>c.id===id);
    const previous=$('#previous-chapter'),next=$('#next-chapter');
    if(previous&&next){
      previous.hidden=index===0;next.hidden=index===chapters.length-1;
      if(index>0){previous.href='#'+chapterRoute(chapters[index-1]);previous.textContent='← '+chapterLink(chapters[index-1].id).textContent;}
      if(index<chapters.length-1){next.href='#'+chapterRoute(chapters[index+1]);next.textContent=chapterLink(chapters[index+1].id).textContent+' →';}
    }
    $('#copy-status').textContent='';
  }
  addEventListener('hashchange',route);
  route();

  function selectStep(n,focus=false){
    $$('.step-tabs button').forEach(b=>{const yes=Number(b.dataset.step)===n;b.setAttribute('aria-selected',String(yes));b.tabIndex=yes?0:-1;if(yes&&focus)b.focus();});
    $$('.step-panel').forEach(p=>p.hidden=p.id!=='method-step-'+n);
  }
  $$('.step-tabs button').forEach(b=>{
    b.addEventListener('click',()=>selectStep(Number(b.dataset.step)));
    b.addEventListener('keydown',e=>{let n=Number(b.dataset.step);if(e.key==='ArrowRight')n=n%3+1;else if(e.key==='ArrowLeft')n=(n+1)%3+1;else if(e.key==='Home')n=1;else if(e.key==='End')n=3;else return;e.preventDefault();selectStep(n,true);});
  });
  function updateFusion(){
    const meanA=Number($('#mean-a').value),meanB=Number($('#mean-b').value),rA=Number($('#trust-a').value),rB=Number($('#trust-b').value);
    $('#mean-a-out').value=meanA.toFixed(1);$('#mean-b-out').value=meanB.toFixed(1);$('#trust-a-out').value=rA.toFixed(2);$('#trust-b-out').value=rB.toFixed(2);
    const result=window.ReviewMath.fuse([{mean:meanA,nu:5,alpha:3,beta:2,r:rA},{mean:meanB,nu:5,alpha:3,beta:2,r:rB}]);
    $('#fusion-result').innerHTML=`<div><span>통합 평균</span><strong>${result.mean.toFixed(3)}</strong><small>A의 기여 ${(result.weights[0]*100).toFixed(1)}% · B ${(result.weights[1]*100).toFixed(1)}%</small></div><div><span>데이터 불확실성 · 분산</span><strong>${result.aleatoric.toFixed(3)}</strong><small>개별 분산과 불일치 항 반영</small></div><div><span>인식적 불확실성 · 분산</span><strong>${result.epistemic.toFixed(3)}</strong><small>불일치 항 Δβ = ${result.disagreement.toFixed(3)}</small></div>`;
  }
  $$('.simulation input').forEach(e=>e.addEventListener('input',updateFusion));
  $('#reset-sim').addEventListener('click',()=>{$('#mean-a').value=7;$('#mean-b').value=8;$('#trust-a').value=.8;$('#trust-b').value=.3;updateFusion();});
  updateFusion();

  function tableHTML(rows,caption,columns=null){
    const cols=columns||[0,1,2,3,4,5,6,7];
    return `<table class="numeric-table"><caption>${escape(caption)}</caption><thead><tr>${cols.map(i=>`<th scope="col">${labels[i]}</th>`).join('')}</tr></thead><tbody>${rows.slice(1).map(r=>r.length===1?`<tr class="group"><td colspan="${cols.length}">${escape(r[0])}</td></tr>`:`<tr${r[0]==='RELIABLE-BA'?' class="ours"':''}>${cols.map((i,n)=>n===0?`<th scope="row">${escape(r[i])}</th>`:`<td>${escape(r[i])}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  }
  const help={1:'MAE는 예측값과 정답의 거리의 평균입니다. 작을수록 좋습니다. 친화도의 로그 척도에서 비교합니다.',2:'RMSE는 큰 오차에 더 큰 벌점을 줍니다. 작을수록 좋습니다.',5:'여기서 ECE는 회귀 예측분포의 보정 오차입니다. 분류 확률의 ECE와 정의를 혼동하지 마세요. 작을수록 좋습니다.',6:'CRPS는 예측분포 전체와 관측값의 차이를 평가합니다. 작을수록 좋습니다.',7:'NLL은 관측된 정답에 모델이 부여한 확률밀도를 평가하는 손실입니다. 작을수록 좋습니다.'};
  function renderResults(){
    const key=$('#dataset').value,m=Number($('#metric').value),rows=data.tables[key];
    const numeric=rows.slice(1).filter(r=>r.length>1&&r[m]!=='-');
    const means=numeric.map(r=>parseFloat(r[m]));const max=Math.max(...means),min=Math.min(...means);
    $('#metric-help').textContent=help[m];
    $('#metric-chart').innerHTML=`<div class="bar-legend"><span><i class="teal-dot"></i>RELIABLE-BA</span><span><i class="purple-dot"></i>해당 지표의 수치상 최저</span><span>0에서 시작하는 막대 · 평균만 표시</span></div><div class="bars">${numeric.map((r,i)=>`<div class="bar-row${r[0]==='RELIABLE-BA'?' emphasized':''}"><span class="bar-name">${escape(r[0])}</span><span class="bar-track"><span style="width:${Math.max(means[i]/max*100,.4)}%" class="bar${r[0]==='RELIABLE-BA'?' bar-ours':means[i]===min?' bar-strong':' bar-other'}"></span></span><span class="bar-number">${means[i].toFixed(4)}</span></div>`).join('')}</div>`;
    const text=key==='table1'?(m===1?'<h2>평균 오차의 최저값은 DynamicBind입니다.</h2><p>DynamicBind MAE <strong>0.8095</strong>, RELIABLE-BA <strong>0.8247</strong>. RELIABLE-BA의 장점은 경쟁력 있는 정확도에 불확실성 평가를 함께 제공한다는 점입니다.</p>':m===2?'<h2>RMSE는 RELIABLE-BA가 더 낮습니다.</h2><p>DynamicBind 1.0840, RELIABLE-BA <strong>1.0473</strong>. 어떤 지표를 보는지에 따라 비교 결과가 달라집니다.</p>':'<h2>불확실성 품질에서는 가장 낮은 보고값을 보입니다.</h2><p>Table 1의 불확실성 비교 대상 중 RELIABLE-BA는 ECE·CRPS·NLL이 가장 낮습니다. 개별 엔진의 이 지표는 표에 보고되지 않았습니다.</p>'):(m===2?'<h2>Deep Ensemble과 매우 가까운 값입니다.</h2><p>RMSE는 Deep Ensemble <strong>0.9310</strong>, RELIABLE-BA <strong>0.9320</strong>. 모든 지표에서 가장 좋다고 요약하면 이 차이가 사라집니다.</p>':m===1?'<h2>MAE는 가장 낮지만, 차이의 크기도 보세요.</h2><p>RELIABLE-BA <strong>0.7220 ± 0.0220</strong>, Deep Ensemble <strong>0.7230 ± 0.0350</strong>. 평균 차이만으로 통계적 우월성이 입증됐다고 단정할 수는 없습니다.</p>':'<h2>독립 평가셋에서도 불확실성 품질이 좋습니다.</h2><p>Table 2의 보고값에서 RELIABLE-BA는 ECE·CRPS·NLL이 가장 낮습니다. 평가 범위는 필터링 후 96개 복합체입니다.</p>');
    $('#result-reading').innerHTML=text;
    $('#full-results').innerHTML=tableHTML(rows,key==='table1'?'원문 Table 1 · PDBbind 시간 분할':'원문 Table 2 · BDB2020+ 독립 평가');
    $('#result-citation').innerHTML=`<a href="https://arxiv.org/html/2607.17601v1#S4.T${key==='table1'?1:2}" target="_blank" rel="noopener">원문 ${key==='table1'?'Table 1':'Table 2'} ↗</a> · Hong et al., arXiv v1의 수치를 그대로 표시`;
  }
  $('#dataset').addEventListener('change',renderResults);$('#metric').addEventListener('change',renderResults);renderResults();
  $('#ablation-results').innerHTML=tableHTML(data.tables.table3,'Table 3 · 구성요소를 바꾼 비교 · 20 seeds 평균',[0,1,5,6,7]);
  $('#coverage-grid').innerHTML=Array.from({length:100},(_,i)=>`<span${i<10?' class="kept"':''}></span>`).join('');

  const dialog=$('#term-dialog');let previousTerm=null;
  function openTerm(id,button){
    const term=data.glossary.find(t=>t.id===id);if(!term)return;
    previousTerm=button;$('#term-title').textContent=term.name;$('#term-english').textContent=term.en;$('#term-meaning').textContent=term.meaning;$('#term-context').textContent=term.context;dialog.showModal();
  }
  document.addEventListener('click',e=>{const b=e.target.closest('button[data-term]');if(b)openTerm(b.dataset.term,b);});
  $('#term-close').addEventListener('click',()=>dialog.close());
  $('#term-more').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  dialog.addEventListener('close',()=>{if(previousTerm?.isConnected&&previousTerm.getClientRects().length)previousTerm.focus({preventScroll:true});});
  function glossary(){
    const q=$('#glossary-search').value.trim().toLowerCase();
    const terms=data.glossary.filter(t=>[t.name,t.en,t.meaning,t.context,...t.aliases].join(' ').toLowerCase().includes(q));
    $('#glossary-count').textContent=`${data.glossary.length}개 중 ${terms.length}개`;
    $('#glossary-list').innerHTML=terms.length?terms.map(t=>`<article><h2><button class="term" data-term="${t.id}" aria-label="${escape(t.name)} 뜻 보기">${escape(t.name)}</button></h2><p class="en">${escape(t.en)}</p><p>${escape(t.meaning)}</p><p class="small">${escape(t.context)}</p></article>`).join(''):'<p>찾는 용어가 없습니다. 다른 단어로 검색해 주세요.</p>';
  }
  $('#glossary-search').addEventListener('input',glossary);glossary();
  // First occurrence in each chapter. Never match Korean syllables inside an unrelated word.
  const aliases=data.glossary.flatMap(t=>t.aliases.map(a=>({a,id:t.id}))).sort((a,b)=>b.a.length-a.a.length);
  const termRE=new RegExp('(?<![A-Za-z0-9_가-힣])('+aliases.map(x=>x.a.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')+')(?![A-Za-z0-9_])','g');
  chapters.filter(c=>c.id!=='sources').forEach(chapter=>{
    const seen=new Set(),walker=document.createTreeWalker(chapter,NodeFilter.SHOW_TEXT,{acceptNode(node){return node.parentElement.closest('a,button,svg,code,table,figure,h1,h2,h3,script,style,output,summary,select,label,.formula,#fusion-result,#metric-chart')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT;}}),nodes=[];
    while(walker.nextNode())nodes.push(walker.currentNode);
    nodes.forEach(node=>{
      const original=node.textContent;termRE.lastIndex=0;const matches=[...original.matchAll(termRE)].filter(m=>{const t=aliases.find(x=>x.a===m[0]);if(seen.has(t.id))return false;seen.add(t.id);m.termId=t.id;return true;});if(!matches.length)return;
      const frag=document.createDocumentFragment();let at=0;
      matches.forEach(m=>{frag.append(document.createTextNode(original.slice(at,m.index)));const b=document.createElement('button');b.type='button';b.className='term';b.dataset.term=m.termId;b.textContent=m[0];b.setAttribute('aria-label',m[0]+' 뜻 보기');frag.append(b);at=m.index+m[0].length;});frag.append(document.createTextNode(original.slice(at)));node.replaceWith(frag);
    });
  });
  $('#copy-link').addEventListener('click',async()=>{
    const url=new URL(location.href);url.hash=location.hash||current;
    try{await navigator.clipboard.writeText(url.href);$('#copy-status').textContent='현재 장의 주소를 복사했습니다.';}catch{$('#copy-status').textContent='주소창의 링크를 복사해 주세요.';}
  });
  $('#print-page').addEventListener('click',()=>window.print());
  let openedBefore=[];
  addEventListener('beforeprint',()=>{openedBefore=$$('details').map(d=>d.open);$$('details').forEach(d=>d.open=true);});
  addEventListener('afterprint',()=>{$$('details').forEach((d,i)=>d.open=openedBefore[i]);});
})();
