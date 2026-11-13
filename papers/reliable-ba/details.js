(() => {
  'use strict';
  const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
  const data=window.REVIEW_DATA;
  const names=['GNINA','BIND','FlowDock','DynamicBind'];
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const n=x=>Number(x).toFixed(4);
  const cases=data.publicCases.cases;
  const numberCell=(value,best)=>`<td${best?' class="best-value"':''}>${escape(value)}</td>`;
  const metrics=names.map(name=>({name,pdb:data.tables.table1.find(r=>r[0]===name)[1],bdb:data.tables.table2.find(r=>r[0]===name)[1]}));
  const minP=Math.min(...metrics.map(m=>Number(m.pdb))),minB=Math.min(...metrics.map(m=>Number(m.bdb)));
  $('#engine-error-table').innerHTML=`<table><caption>원문 Tables 1–2 · 개별 엔진의 MAE · 낮을수록 좋음</caption><thead><tr><th>엔진</th><th>PDBbind</th><th>BDB2020+</th></tr></thead><tbody>${metrics.map(m=>`<tr><th>${m.name}</th>${numberCell(m.pdb,Number(m.pdb)===minP)}${numberCell(m.bdb,Number(m.bdb)===minB)}</tr>`).join('')}</tbody></table>`;
  function showCase(id,focus=false){
    const c=cases.find(x=>x.id===id);if(!c)return;
    $$('.case-tabs button').forEach(b=>{const active=b.dataset.case===id;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;if(active&&focus)b.focus();});
    $('#case-detail').setAttribute('aria-labelledby','case-tab-'+id);
    const best=Math.min(...c.absolute_differences),winner=c.absolute_differences.indexOf(best);
    $('#case-target').innerHTML=`<div><span>공개 복합체 ID</span><strong>${escape(c.id)}</strong></div><div><span>CSV의 실험 기록</span><strong>${escape(c.experimental)}</strong></div><div><span>몰 농도의 음의 로그</span><strong>${escape(c.endpoint)} ${n(c.target)}</strong></div>`;
    const lo=Math.floor(Math.min(c.target,...c.scores)-.5),hi=Math.ceil(Math.max(c.target,...c.scores)+.5),x=v=>155+(v-lo)/(hi-lo)*405;
    const ticks=Array.from({length:hi-lo+1},(_,i)=>lo+i);
    $('#case-plot').innerHTML=`<svg viewBox="0 0 680 255" role="img" aria-labelledby="case-plot-title case-plot-desc"><title id="case-plot-title">${escape(c.id)}의 원래 엔진 점수와 실험 pK 비교</title><desc id="case-plot-desc">검은 점선은 실험 ${escape(c.endpoint)} ${n(c.target)}입니다. 네 색점은 CSV에 기록된 원래 엔진 점수이며, 이 그림은 서로 다른 endpoint의 물리적 변환을 뜻하지 않습니다.</desc><g>${ticks.map(t=>`<line x1="${x(t)}" x2="${x(t)}" y1="38" y2="211" stroke="#e2e9ed"/><text x="${x(t)}" y="234" text-anchor="middle" font-size="13" fill="#526b7a">${t}</text>`).join('')}</g><line x1="${x(c.target)}" x2="${x(c.target)}" y1="24" y2="211" stroke="#102f43" stroke-width="2" stroke-dasharray="5 4"/><text x="${x(c.target)}" y="16" text-anchor="middle" font-size="12" fill="#102f43">실험 pK</text>${names.map((name,i)=>{const y=61+i*43,color=i===winner?'#087f8c':'#947bb7';return `<text x="8" y="${y+5}" fill="#102f43" font-size="15">${name}</text><line x1="${x(c.target)}" x2="${x(c.scores[i])}" y1="${y}" y2="${y}" stroke="${color}" stroke-width="4"/><circle cx="${x(c.scores[i])}" cy="${y}" r="7" fill="${color}"/><text x="660" y="${y+5}" text-anchor="end" font-size="14" fill="${color}">${n(c.scores[i])}</text>`;}).join('')}<text x="340" y="253" text-anchor="middle" font-size="11" fill="#526b7a">점·오른쪽 숫자: 원래 엔진 점수 / 선 길이: 실험 pK와의 수치 차이</text></svg>`;
    $('#case-score-table').innerHTML=`<table><caption>원본 열 이름을 보존한 수치 대조 · 통합 모델 출력 아님</caption><thead><tr><th>엔진·원본 열</th><th>원래 점수</th><th>실험 pK와 절대 차이</th></tr></thead><tbody>${names.map((name,i)=>`<tr${i===winner?' class="case-closest"':''}><th>${name}<small>${escape(c.columns[i])}</small></th><td>${n(c.scores[i])}</td><td>${n(c.absolute_differences[i])}${i===winner?' · 수치상 가장 가까움':''}</td></tr>`).join('')}</tbody></table>`;
    $('#case-reading').innerHTML=`<strong>이 행에서는 ${names[winner]}의 원래 값이 가장 가깝습니다.</strong><p>${names[winner]} ${n(c.scores[winner])}와 실험 ${escape(c.endpoint)} ${n(c.target)}의 수치 차이는 ${n(best)}입니다. 이 표에는 자세·측정 조건별 원인 분석이 없으므로, <strong>왜</strong> 가까웠거나 틀렸는지는 점수만으로 확정하지 않습니다.</p>`;
  }
  $$('.case-tabs button').forEach((b,index)=>{
    b.addEventListener('click',()=>showCase(b.dataset.case));
    b.addEventListener('keydown',e=>{let next=index;if(e.key==='ArrowRight')next=(index+1)%cases.length;else if(e.key==='ArrowLeft')next=(index+cases.length-1)%cases.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=cases.length-1;else return;e.preventDefault();showCase(cases[next].id,true);});
  });
  showCase(cases[0].id);
  function showTrainingCase(id){
    const real=cases.find(c=>c.id===id);if(!real)return;
    $('#real-training-row').innerHTML=`<div class="table-scroll"><table class="actual-training-table"><caption>공식 예제 CSV · ComplexID=${escape(real.id)} · 값 일부만 표시</caption><thead><tr><th>열</th><th>실제 기록</th><th>처리</th></tr></thead><tbody><tr><th scope="row">ComplexID</th><td>${escape(real.id)}</td><td>분할과 기록의 식별자</td></tr><tr><th scope="row">Binding_Affinity</th><td>${escape(real.experimental)}</td><td>목표 y = ${escape(real.endpoint)} ${n(real.target)}</td></tr>${real.columns.map((column,i)=>`<tr><th scope="row"><code>${escape(column)}</code></th><td>${n(real.scores[i])}</td><td>전문가 변환망의 입력</td></tr>`).join('')}<tr><th scope="row">Emb_0…Emb_703</th><td>${Object.entries(real.embedding_preview).map(([key,v])=>`${key}=${v}`).join('<br>')}<br>…</td><td>${real.embedding_dimension}개 특징 숫자 중 일부 표시</td></tr></tbody></table></div><p class="small">원본 CSV의 ${real.csv_line}번째 줄입니다. 위 숫자는 가상 c-Abl·이마티닙 사례와 다르며, 추가로 모델을 학습하거나 실행하지 않고 공개 기록을 읽은 것입니다.</p>`;
  }
  $('#training-real-select').addEventListener('change',e=>showTrainingCase(e.target.value));
  showTrainingCase($('#training-real-select').value);
  const learnButtons=$$('.learning-tabs button');
  function showLearn(step,focus=false){
    learnButtons.forEach(b=>{const active=Number(b.dataset.learn)===step;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;if(active&&focus)b.focus();});
    $$('.learning-panel').forEach(p=>p.hidden=p.id!=='learn-panel-'+step);
  }
  learnButtons.forEach((b,i)=>{b.addEventListener('click',()=>showLearn(i+1));b.addEventListener('keydown',e=>{let next=i;if(e.key==='ArrowRight')next=(i+1)%5;else if(e.key==='ArrowLeft')next=(i+4)%5;else if(e.key==='Home')next=0;else if(e.key==='End')next=4;else return;e.preventDefault();showLearn(next+1,true);});});
  function followLearningAnchor(){
    const match=location.hash.match(/^#learning\/learn-panel-([1-5])$/);
    if(match)showLearn(Number(match[1]));
  }
  addEventListener('hashchange',followLearningAnchor);followLearningAnchor();
})();
