(() => {
  'use strict';
  let dialog, stage, art, ratio=1, fitWidth=1000, previousFocus, previousOverflow, copyNumber=0;
  const create=(tag,className,text)=>{const el=document.createElement(tag);el.className=className||'';if(text)el.textContent=text;return el;};
  function zoom(next,center=true){
    const before=art.offsetWidth;
    ratio=Math.max(.4,Math.min(4,next));art.style.width=Math.round(fitWidth*ratio)+'px';
    dialog.querySelector('.figure-percent').textContent=Math.round(ratio*100)+'%';
    if(center)stage.scrollLeft=Math.max(0,stage.scrollLeft+(art.offsetWidth-before)/2);
  }
  function initialize(){
    if(dialog)return;
    dialog=create('dialog','figure-dialog');dialog.setAttribute('aria-labelledby','figure-dialog-title');
    const head=create('div','figure-dialog-head'),title=create('h2','','그림 크게 보기');title.id='figure-dialog-title';
    const close=create('button','figure-close','닫기 · Esc');close.type='button';close.addEventListener('click',()=>dialog.close());head.append(title,close);
    const tools=create('div','figure-dialog-tools');tools.setAttribute('role','group');tools.setAttribute('aria-label','그림 확대와 축소');
    for(const [label,name,action] of [['＋','그림 확대',()=>zoom(ratio*1.2)],['−','그림 축소',()=>zoom(ratio/1.2)],['화면에 맞춤','그림을 화면에 맞춤',()=>{zoom(1,false);stage.scrollTo(0,0);} ]]){
      const b=create('button','',label);b.type='button';b.setAttribute('aria-label',name);b.addEventListener('click',action);tools.append(b);
    }
    const percent=create('output','figure-percent','100%');percent.setAttribute('aria-live','polite');tools.append(percent,create('span','figure-instruction','휠 ↑ 확대 · ↓ 축소 · 드래그로 그림 이동'));
    stage=create('div','figure-stage');stage.tabIndex=0;stage.setAttribute('aria-label','확대한 그림; 스크롤로 상하좌우 이동');art=create('div','figure-art');stage.append(art);
    const caption=create('p','figure-dialog-caption');dialog.append(head,tools,stage,caption);document.body.append(dialog);
    stage.addEventListener('wheel',e=>{if(e.ctrlKey||e.metaKey||e.shiftKey||Math.abs(e.deltaX)>Math.abs(e.deltaY)||e.deltaY===0)return;e.preventDefault();const pixels=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?stage.clientHeight:1);zoom(ratio*Math.exp(-Math.max(-120,Math.min(120,pixels))*.002));},{passive:false});
    let pan;
    stage.addEventListener('pointerdown',e=>{if(e.pointerType==='touch'||e.button!==0)return;e.preventDefault();pan={id:e.pointerId,x:e.clientX,y:e.clientY,left:stage.scrollLeft,top:stage.scrollTop};stage.setPointerCapture(e.pointerId);stage.classList.add('is-panning');});
    stage.addEventListener('pointermove',e=>{if(pan&&pan.id===e.pointerId){stage.scrollLeft=pan.left+pan.x-e.clientX;stage.scrollTop=pan.top+pan.y-e.clientY;}});
    const endPan=e=>{if(pan?.id===e.pointerId){pan=null;stage.classList.remove('is-panning');}};
    stage.addEventListener('pointerup',endPan);stage.addEventListener('pointercancel',endPan);
    dialog.addEventListener('keydown',e=>{e.stopPropagation();if(e.key==='+'||e.key==='='){e.preventDefault();zoom(ratio*1.2);}if(e.key==='-'){e.preventDefault();zoom(ratio/1.2);}});
    dialog.addEventListener('close',()=>{document.body.style.overflow=previousOverflow;art.replaceChildren();previousFocus?.focus({preventScroll:true});});
  }
  function copyMedia(source){
    if(source.tagName.toLowerCase()==='canvas'){
      const img=create('img');img.src=source.toDataURL('image/png');img.alt=source.getAttribute('aria-label')||'현재 그림';return img;
    }
    const copy=source.cloneNode(true);
    if(source.tagName.toLowerCase()!=='svg'){copy.draggable=false;return copy;}
    // Freeze the currently visible frame; keep text sharp and reference IDs local.
    const originals=[source,...source.querySelectorAll('*')],clones=[copy,...copy.querySelectorAll('*')];
    originals.forEach((el,i)=>{
      if(['text','tspan','path','circle','ellipse','rect','polygon','polyline','line','g'].includes(el.tagName)){
        const style=getComputedStyle(el);
        for(const key of ['fill','stroke','stroke-width','font-family','font-size','font-weight','letter-spacing'])clones[i].style.setProperty(key,style.getPropertyValue(key));
        clones[i].style.animation='none';clones[i].style.transition='none';
        if(style.transform!=='none'){clones[i].style.transform=style.transform;clones[i].style.transformOrigin=style.transformOrigin;}
      }
    });
    const ids=new Map(),prefix='figure-copy-'+(++copyNumber)+'-';
    clones.forEach(el=>{if(el.id){ids.set(el.id,prefix+el.id);el.id=prefix+el.id;}});
    clones.forEach(el=>{for(const attr of [...el.attributes]){
      if(attr.name==='id')continue;
      let value=attr.value.replace(/url\(["']?#([^\s)'";]+)["']?\)/g,(all,id)=>ids.has(id)?'url(#'+ids.get(id)+')':all);
      if(value.startsWith('#')&&ids.has(value.slice(1)))value='#'+ids.get(value.slice(1));
      if(attr.name==='aria-labelledby'||attr.name==='aria-describedby')value=value.split(/\s+/).map(id=>ids.get(id)||id).join(' ');
      if(value!==attr.value)el.setAttribute(attr.name,value);
    }});
    return copy;
  }
  function open(figure,button){
    initialize();previousFocus=button;previousOverflow=document.body.style.overflow;
    const caption=figure.querySelector('figcaption')?.textContent.trim()||'현재 표시된 그림을 확대합니다.';
    dialog.querySelector('h2').textContent=document.querySelector('#lesson-title')?.textContent||'그림 크게 보기';
    dialog.querySelector('.figure-dialog-caption').textContent=caption+' · 현재 화면을 확대한 보기입니다. 단계 조작은 닫은 뒤 원래 그림에서 하세요.';
    art.replaceChildren();
    for(const media of figure.querySelectorAll('svg,img,canvas')){
      if(media.parentElement.closest('svg'))continue;
      art.append(copyMedia(media));
    }
    for(const label of figure.querySelectorAll('.hero-label'))art.append(label.cloneNode(true));
    document.body.style.overflow='hidden';dialog.showModal();
    const aspect=[...art.children].reduce((sum,el)=>{
      if(el.tagName.toLowerCase()==='svg'){const box=el.viewBox.baseVal;return sum+(box.width?box.height/box.width:1);}
      if(el.tagName.toLowerCase()==='img')return sum+(el.naturalWidth?el.naturalHeight/el.naturalWidth:1);
      return sum;
    },0);
    fitWidth=Math.max(160,Math.min(stage.clientWidth-44,(stage.clientHeight-44)/Math.max(.1,aspect)));zoom(1,false);stage.scrollTo(0,0);
  }
  function install(){
    document.querySelectorAll('.reader figure').forEach(figure=>{
      if(figure.classList.contains('has-figure-viewer')||!figure.querySelector('svg,img,canvas'))return;
      figure.classList.add('has-figure-viewer');
      const row=create('div','figure-action-row'),button=create('button','figure-open','크게 보기 ↗');button.type='button';
      button.setAttribute('aria-label',(figure.querySelector('figcaption')?.textContent.trim()||'그림')+' 크게 보기');
      button.addEventListener('click',()=>open(figure,button));row.append(button);figure.prepend(row);
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
