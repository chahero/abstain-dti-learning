(() => {
  'use strict';
  const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const example=window.REVIEW_DATA.inputExample;
  const point=p=>'('+p.map(v=>Number(v).toFixed(2)).join(', ')+')';
  function tabs(selector,attribute,render){
    const buttons=$$(selector);
    function select(button,focus=false){buttons.forEach(b=>{const active=b===button;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;});if(focus)button.focus();render(button.dataset[attribute]);}
    buttons.forEach((button,i)=>{button.addEventListener('click',()=>select(button));button.addEventListener('keydown',e=>{let n=i;if(e.key==='ArrowRight')n=(i+1)%buttons.length;else if(e.key==='ArrowLeft')n=(i+buttons.length-1)%buttons.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=buttons.length-1;else return;e.preventDefault();select(buttons[n],true);});});
    select(buttons.find(b=>b.getAttribute('aria-selected')==='true')||buttons[0]);
  }
  $('#input-pair-summary').innerHTML=`<div><span>단백질 구성체</span><strong>1IEP · chain A</strong><small>선언 서열 ${example.declared_residues}잔기 / 좌표 관측 ${example.observed_residues}잔기</small></div><div><span>준비한 화합물</span><strong>이마티닙 · 전하 +${example.formal_charge}</strong><small>중원자 ${example.heavy_atoms}개 / 수소 포함 ${example.total_atoms}개</small></div>`;
  const formats={
    fasta:{title:'FASTA: 이름 한 줄 + 아미노산 서열',code:example.fasta_preview.join('\n')+'\n… (화면에서는 일부 생략)',file:'protein.fasta',reading:`<p><code>&gt;</code>로 시작하는 줄은 이름입니다. 그다음 <code>${esc(example.sequence.slice(0,8))}</code>의 G·A·M 등은 아미노산 한 글자 기호입니다. 이 글자 순서에는 x·y·z 좌표가 없습니다.</p><p>선언 서열은 ${example.declared_residues}잔기지만, PDB 좌표가 관측된 부분은 ${example.observed_residues}잔기입니다. 보이지 않는 구간이 있을 수 있어 서열 길이와 좌표의 잔기 수가 다를 수 있습니다. 다운로드는 전체 선언 서열입니다.</p>`},
    smiles:{title:'SMILES: 원자와 결합의 연결을 문자로 기록',code:example.smiles+' imatinib_plus1',file:'ligand.smi',reading:'<p><code>C</code>는 탄소, <code>N</code>은 질소, 소문자 <code>c</code>는 방향족 탄소입니다. 괄호는 가지, 숫자는 고리 연결, <code>[NH+]</code>는 양전하를 가진 질소 표현입니다. 마지막 이름은 분자 식별용입니다.</p><p>연결과 일부 입체화학 등을 표현하지만 원자별 3D 좌표는 담지 않습니다. 이 예시는 준비한 +1 상태의 이마티닙이며, 다른 양성자화 상태의 SMILES와 구분해야 합니다.</p>'},
    pdb:{title:'PDB: 단백질의 원자마다 한 줄의 3D 좌표',code:example.protein_preview.join('\n')+'\n… (원자 레코드 발췌)',file:'protein-chain-A.pdb',reading:`<p>첫 줄은 <strong>${esc(example.protein_preview[0].slice(12,16).trim())} 원자</strong>, 잔기는 <strong>${esc(example.protein_preview[0].slice(17,20))}</strong>, 사슬은 A, 잔기 번호는 ${esc(example.protein_preview[0].slice(22,26).trim())}입니다. 뒤의 세 수가 x·y·z이며 단위는 Å(옹스트롬, 10⁻¹⁰ m)입니다.</p><div class="table-scroll"><table><caption>첫 원자의 실제 좌표를 펼쳐 읽기</caption><thead><tr><th>원소</th><th>x / Å</th><th>y / Å</th><th>z / Å</th></tr></thead><tbody><tr><td>${esc(example.protein_preview[0].slice(76,78).trim())}</td>${[30,38,46].map(i=>'<td>'+esc(example.protein_preview[0].slice(i,i+8).trim())+'</td>').join('')}</tr></tbody></table></div><p>다운로드는 chain A의 단백질 원자만 추린 파일입니다. holo에서 추출한 것으로, 별도의 apo 구조나 도킹 준비 완료를 뜻하지 않습니다.</p>`},
    sdf:{title:'SDF: 화합물의 원자 좌표 + 결합 목록',code:example.sdf_preview.join('\n')+'\n… (나머지 원자와 결합 레코드 생략)',file:'ligand-prepared.sdf',reading:`<p>개수 줄의 <code>69 73</code>은 이 파일의 원자 ${example.total_atoms}개와 결합 73개를 뜻합니다. 이어지는 원자 줄에는 x·y·z와 원소가 나오고, 그 뒤 결합 줄이 어느 원자끼리 어떤 결합으로 이어지는지 정합니다.</p><p>예를 들어 첫 원자 ${esc(example.ligand_atoms[0].element)}의 좌표는 ${point(example.ligand_atoms[0].xyz)} Å입니다. 수소를 제외한 중원자 ${example.heavy_atoms}개의 좌표가 원본 1IEP의 STI와 일치하는지 확인했습니다. 다운로드는 발췌가 아닌 전체 SDF입니다.</p>`}
  };
  tabs('[data-format]','format',key=>{const f=formats[key];$('#format-panel').setAttribute('aria-labelledby','format-'+key);$('#format-title').textContent=f.title;$('#format-code').textContent=f.code;$('#format-reading').innerHTML=f.reading;$('#format-download').href='assets/input-example/'+f.file;$('#format-download').textContent='전체 '+f.file+' 다운로드';});

  const actualESM=window.REVIEW_DATA.esmExample;
  $('#esm-real-table').innerHTML=`<table class="embedding-table"><caption>실제 ESM-2 8M 결과 · 처음 5잔기와 처음 4특징만 발췌</caption><thead><tr><th>서열 위치·잔기</th><th>특징 1</th><th>특징 2</th><th>특징 3</th><th>특징 4</th></tr></thead><tbody>${actualESM.preview.map(r=>`<tr><th>${r.position} · ${r.residue}</th>${r.first_eight.slice(0,4).map(v=>`<td>${v.toFixed(4)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  $('#esm-real-shapes').innerHTML=`<strong>실제 배열의 크기를 따라 읽기</strong><p>한 단백질과 특수 토큰 포함: <code>[${actualESM.hidden_state_shape.join(', ')}]</code> → 양 끝 특수 토큰 제외: <code>[${actualESM.residue_shape.join(', ')}]</code></p><p>293잔기를 열별로 평균내면 단백질 벡터 <code>[320]</code>입니다. 앞 네 수는 <code>[${actualESM.mean_first_eight.slice(0,4).map(v=>v.toFixed(4)).join(', ')}]</code>. 이 평균도 친화도 점수는 아닙니다.</p><p class="small">모델: ${esc(actualESM.model_id)} · 평가 모드 · CPU float32 · 가중치 버전 ${esc(actualESM.revision.slice(0,12))}</p>`;

  const atoms={ligandO:[[2.2,2,1]],proteinN:[[3.4,2,1.4]],proteinC:[[.8,1,.5],[3.5,3.3,1.6]]};
  const channelNames={ligandO:'리간드 산소 O',proteinN:'단백질 질소 N',proteinC:'단백질 탄소 C'};
  const density=(channel,x,y,z)=>atoms[channel].reduce((sum,a)=>sum+Math.exp(-a.reduce((d,v,i)=>d+(v-[x,y,z][i])**2,0)/(2*.65**2)),0);
  function heat(v){const t=Math.min(v,1);return `rgb(${Math.round(244-236*t)},${Math.round(249-122*t)},${Math.round(250-110*t)})`;}
  function renderVoxel(){
    const channel=$('#voxel-channel').value,z=Number($('#voxel-z').value);
    $('#voxel-z-out').value=z+' Å';
    const tiles=[];for(let y=0;y<5;y++)for(let x=0;x<5;x++){const v=density(channel,x,y,z);tiles.push(`<rect x="${50+x*43}" y="${28+y*43}" width="43" height="43" fill="${heat(v)}" stroke="#c0d4dc"/><text x="${71.5+x*43}" y="${54+y*43}" text-anchor="middle" fill="${v>.5?'#fff':'#24495b'}" font-size="11">${v.toFixed(2)}</text>`);}
    $('#voxel-slice').innerHTML=`<svg viewBox="0 0 340 285" role="img" aria-label="${channelNames[channel]}의 z=${z} Å의 5 곱하기 5 밀도 단면"><title>설명용 원자 밀도 단면</title>${tiles.join('')}<rect x="93" y="71" width="129" height="129" fill="none" stroke="#7253ad" stroke-width="2" stroke-dasharray="5 3"/><rect x="136" y="114" width="43" height="43" fill="none" stroke="#102f43" stroke-width="3"/>${Array.from({length:5},(_,i)=>`<text x="${71.5+i*43}" y="263" text-anchor="middle" font-size="12" fill="#526b7a">${i}</text><text x="36" y="${54+i*43}" text-anchor="middle" font-size="12" fill="#526b7a">${i}</text>`).join('')}<text x="287" y="263" font-size="12" fill="#526b7a">x</text><text x="25" y="18" font-size="12" fill="#526b7a">y</text><text x="157" y="281" text-anchor="middle" font-size="11" fill="#7253ad">점선: 작은 필터 창의 단면 예시</text></svg>`;
    const planes=[];for(let layer=0;layer<3;layer++){const cells=[];for(let y=0;y<5;y++)for(let x=0;x<5;x++)cells.push(`<rect x="${x*25}" y="${y*25}" width="25" height="25" fill="${heat(density(channel,x,y,layer))}" stroke="${layer===z?'#087f8c':'#b8ccd5'}" stroke-width="1"/>`);planes.push(`<g opacity="${layer===z?1:.35}" transform="translate(127 ${162-layer*62})"><g transform="matrix(1 .32 -.62 .60 0 0)">${cells.join('')}<rect width="125" height="125" fill="none" stroke="${layer===z?'#087f8c':'#9db7c3'}" stroke-width="${layer===z?3:1}"/></g><text x="141" y="35" font-size="17" fill="#102f43">z=${layer}</text></g>`);}
    $('#voxel-stack').innerHTML=`<svg viewBox="0 0 360 295" role="img" aria-label="3D 밀도 격자의 z=0, 1, 2 세 층 중 ${z}층을 강조한 원리 그림">${planes.join('')}<text x="180" y="289" text-anchor="middle" font-size="12" fill="#526b7a">${channelNames[channel]} 채널 · 설명용 3D 격자</text></svg>`;
    const value=density(channel,2,2,z);
    $('#voxel-reading').innerHTML=`<strong>현재 채널: ${channelNames[channel]} · 높이 z=${z} Å</strong><p>이 채널의 원자 좌표: ${atoms[channel].map(point).join(' / ')} Å. 검은 테두리의 격자점 (2, 2, ${z})에는 <b>${value.toFixed(3)}</b>이 들어갑니다.</p><p class="small">이 장난감 배열의 모양은 [채널 3개, z 3개, y 5개, x 5개]입니다. 배열의 숫자가 아직 친화도는 아닙니다.</p>`;
    const windowValues=[];for(let y=1;y<=3;y++)for(let x=1;x<=3;x++)windowValues.push(density(channel,x,y,z));
    const sum=windowValues.reduce((a,b)=>a+b,0);
    $('#cnn-filter-example').innerHTML=`<strong>곱하고 더하는 계산 모양 · 설명용 고정 평균 필터</strong><p>점선 창의 9개 값에 각각 1/9을 곱해 더하면 <b>${(sum/9).toFixed(3)}</b>입니다. (${windowValues.map(v=>v.toFixed(2)).join(' + ')}) ÷ 9로 읽을 수 있습니다.</p><p class="small">출력은 반올림 전 값으로 계산합니다. 이 예시는 2D 한 채널의 단순한 고정 필터이고, 실제 GNINA의 학습된 3D 필터 가중치나 출력이 아닙니다. 실제 CNN은 여러 채널·z 층과 비선형 처리도 사용합니다. 이 숫자 역시 친화도가 아닙니다.</p>`;
  }
  $('#voxel-channel').addEventListener('change',renderVoxel);$('#voxel-z').addEventListener('input',renderVoxel);renderVoxel();

  const vectors=[[.12,-.36,.41,.08],[.52,.1,-.22,.3],[-.4,.8,.3,-.1],[.33,-.08,.55,.12],[-.28,.61,-.15,.45]];
  const weights=[[.4,.25,.15,.1,.1],[.1,.3,.15,.25,.2],[.05,.1,.6,.15,.1]];
  function renderAttention(index){
    const w=weights[index],names=['A','L','K','V','D'],name=['C₁','C₂','O₃'][index];
    $$('[data-atom]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.atom)===index)));
    $('#attention-example').innerHTML=w.map((value,i)=>`<div><b>${names[i]}</b><div class="attention-track"><span style="height:${value*100}%"></span></div><strong>${value.toFixed(2)}</strong></div>`).join('');
    const vector=[0,1,2,3].map(k=>w.reduce((sum,v,i)=>sum+v*vectors[i][k],0));
    $('#attention-reading').innerHTML=`<strong>${name}의 잔기 정보 가상 가중합</strong><p>가중치 합: ${w.map(v=>v.toFixed(2)).join(' + ')} = 1.00</p><p>다섯 잔기 벡터를 이 비율로 섞으면 <code>[${vector.map(v=>v.toFixed(3)).join(', ')}]</code>입니다.</p><p class="small">예를 들어 첫 숫자는 ${w.map((v,i)=>v.toFixed(2)+' × '+vectors[i][0]).join(' + ')} = ${vector[0].toFixed(3)}. 실제 BIND는 학습된 Q·K·V 변환, 여러 attention head와 잔차 처리를 더 사용합니다. 이 표는 그 가중합 개념만 보여줍니다.</p>`;
  }
  $$('[data-atom]').forEach(b=>b.addEventListener('click',()=>renderAttention(Number(b.dataset.atom))));renderAttention(2);

  let generation='flow';
  const states={flow:[[-3,1.5,0],[-1.6,.8,.2],[-.6,.2,.1],[0,0,0]],diffusion:[[-3,1.5,0],[-1.8,.6,-.3],[-.5,-.1,.1],[0,0,0]]};
  function renderGeneration(){
    const step=Number($('#generation-step').value),rotated=$('#generation-rotate').checked,p=states[generation][step],shown=rotated?[-p[1],p[0],p[2]]:p;
    $('#generation-step-out').value=step+' · '+['초기','중간 1','중간 2','후보'][step];
    $('#generation-heading').textContent=generation==='flow'?'각 상태에서 이동 방향을 계산해 후보로 갑니다.':'흐트러진 상태를 여러 번 복원해 후보로 갑니다.';
    $('#generation-explanation').textContent=generation==='flow'?'FlowDock: 기하학적 flow matching으로 학습한 이동장을 따라 복합체 후보를 생성하고 친화도도 추정합니다.':'DynamicBind: 등변성 확산 모델로 리간드와 단백질의 복합체 후보를 생성하고, 자세 점수와 친화도를 함께 다룹니다.';
    const lx=235+p[0]*38,ly=137-p[1]*32,open=step*5;
    const noise=generation==='diffusion'&&step<3?Array.from({length:7-step*2},(_,i)=>`<circle cx="${87+i*41}" cy="${60+(i%3)*46}" r="${4-step}" fill="#b6a4d2" opacity=".55"/>`).join(''):'';
    $('#generation-scene').innerHTML=`<svg viewBox="0 0 530 320" role="img" aria-label="${generation==='flow'?'FlowDock 흐름':'DynamicBind 복원'}의 가상 ${step}단계, 전체 회전 ${rotated?90:0}도"><g transform="rotate(${rotated?90:0} 235 145)"><path d="M${194-open} 86 Q156 108 179 153 Q190 193 235 197 Q281 193 291 153 Q313 108 ${276+open} 86" fill="#e8f3f4" stroke="#087f8c" stroke-width="6"/>${noise}<g transform="translate(${lx} ${ly}) rotate(${65-step*21})"><path d="M-23 0L-7 -13L12 0L25 -10" stroke="#7253ad" stroke-width="6" fill="none"/><g fill="#7253ad"><circle cx="-23" cy="0" r="6"/><circle cx="-7" cy="-13" r="6"/><circle cx="12" cy="0" r="6"/><circle cx="25" cy="-10" r="6"/></g></g></g><g font-size="14" fill="#526b7a"><text x="20" y="27">단백질 포켓: 청록 · 리간드: 보라</text><text x="20" y="276">원리 그림 / 실제 원자나 모델 궤적 아님</text><text x="20" y="308">가상 기준점 p = ${point(shown)} Å</text></g></svg>`;
    let reading='';
    if(step===3)reading='최종 후보에 해당하는 가상 배치입니다. 이 그림에서는 친화도나 자세의 정확성을 계산하지 않습니다.';
    else if(generation==='flow'){const next=states.flow[step+1],v=next.map((x,i)=>(x-p[i])/.25);reading=`가상의 다음 이동: p = ${point(p)}, v = ${point(v)}, Δt = 0.25라면 p + Δt·v = ${point(next)}. 이 이동장은 실제 FlowDock으로 계산한 값이 아닙니다.`;}
    else reading=`가상 복원 단계: 기준점 ${point(p)} → ${point(states.diffusion[step+1])}. 잔여 흐트러짐을 줄여 후보 배치로 가는 모습을 단순화했습니다.`;
    $('#generation-reading').innerHTML=`<strong>${generation==='flow'?'이동 방향의 예시':'복원 단계의 예시'}</strong><p>${reading}</p><p class="small">전체 회전: ${rotated?'90° · (x, y, z) → (−y, x, z)':'0°'}. 단백질과 리간드를 함께 돌리므로 상대 배치는 유지됩니다.</p>`;
  }
  tabs('[data-generation]','generation',key=>{generation=key;$('#generation-panel').setAttribute('aria-labelledby','generation-'+key);renderGeneration();});
  $('#generation-step').addEventListener('input',renderGeneration);$('#generation-rotate').addEventListener('change',renderGeneration);

  const raw=window.REVIEW_DATA.publicCases.cases[0];
  $('#fusion-input-columns').innerHTML=`<table><caption>공식 공개 CSV · ComplexID=${raw.id} · 원래 열과 저장값</caption><thead><tr><th>엔진</th><th>입력 열 이름</th><th>공개 기록</th></tr></thead><tbody>${['GNINA','BIND','FlowDock','DynamicBind'].map((name,i)=>`<tr><th>${name}</th><td><code>${esc(raw.columns[i])}</code></td><td>${raw.scores[i].toFixed(4)}</td></tr>`).join('')}</tbody></table>`;
  const noteKey='reliable-ba.representation-notes.v1';
  try{$('#representation-notes').value=localStorage.getItem(noteKey)||'';}catch{$('#representation-notes-status').textContent='이 환경에서는 메모 저장을 사용할 수 없습니다.';}
  $('#save-representation-notes').addEventListener('click',()=>{try{localStorage.setItem(noteKey,$('#representation-notes').value);$('#representation-notes-status').textContent='메모를 저장했습니다.';}catch{$('#representation-notes-status').textContent='저장할 수 없습니다. 메모를 별도로 복사해 주세요.';}});
  $('#clear-representation-notes').addEventListener('click',()=>{try{localStorage.removeItem(noteKey);$('#representation-notes').value='';$('#representation-notes-status').textContent='메모를 지웠습니다.';}catch{$('#representation-notes-status').textContent='저장된 메모를 지울 수 없습니다.';}});
})();
