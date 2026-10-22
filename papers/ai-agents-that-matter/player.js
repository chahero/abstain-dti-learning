(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const audio=$('narration'),image=$('slide-image'),canvas=$('motion'),ctx=canvas.getContext('2d');
  const play=$('play'),seek=$('seek'),status=$('status'),chapterList=$('chapter-list');
  let data=null,index=-1,raf=null,seeking=false,initialized=false,imageGeneration=0;
  const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clock=n=>{n=Math.max(0,Math.floor(n));return `${Math.floor(n/60)}:${String(n%60).padStart(2,'0')}`;};
  const color=c=>'#'+c.replace(/^0x/,'');
  const clamp=(x,a,b)=>Math.min(b,Math.max(a,x));
  function fade(t,a,b){if(t<a||t>=b)return 0;if(reduceMotion)return 1;const span=Math.min(.22,(b-a)/4);return Math.min(1,(t-a)/span,(b-t)/span);}
  function box(rect,fill,alpha=1,stroke=false){if(alpha<=0)return;ctx.globalAlpha=alpha;if(stroke){ctx.strokeStyle=fill;ctx.lineWidth=4;ctx.strokeRect(rect[0]+2,rect[1]+2,rect[2]-4,rect[3]-4);}else{ctx.fillStyle=fill;ctx.fillRect(...rect);}ctx.globalAlpha=1;}
  function draw(slide,t){
    ctx.clearRect(0,0,data.width,data.height);
    if(slide.tableHighlights){
      const p=slide.tableHighlights,phase=p.phases.find(e=>t>=e.start&&t<e.end);
      if(phase){for(const [y,h] of [[p.bodyTop,phase.y-p.bodyTop],[phase.y+phase.height,p.bodyBottom-phase.y-phase.height]])if(h>0)box([phase.x,y,phase.width,h],'#fff',.6);box([phase.x,phase.y,phase.width,phase.height],color(phase.color),1,true);}
    }
    for(const e of slide.focus){const alpha=fade(t,e.start,e.end);if(!alpha)continue;for(const rect of e.dim)box(rect,'#fff',.65*alpha);for(const rect of e.rects)box(rect,color(e.color),.9*alpha,true);}
    for(const e of slide.flows){
      if(t<e.start||t>=e.end)continue;
      const lengths=e.points.slice(1).map((p,i)=>Math.hypot(p[0]-e.points[i][0],p[1]-e.points[i][1]));
      const total=lengths.reduce((a,b)=>a+b,0);let distance=(t-e.start)/(e.end-e.start)*total,x,y;
      for(let i=0;i<lengths.length;i++){if(distance<=lengths[i]||i===lengths.length-1){let u=clamp(distance/lengths[i],0,1);if(lengths.length===1)u=.5-.5*Math.cos(Math.PI*u);x=e.points[i][0]+(e.points[i+1][0]-e.points[i][0])*u;y=e.points[i][1]+(e.points[i+1][1]-e.points[i][1])*u;break;}distance-=lengths[i];}
      ctx.beginPath();ctx.arc(x,y,11,0,2*Math.PI);ctx.fillStyle=color(e.color);ctx.fill();ctx.lineWidth=3;ctx.strokeStyle='#fff';ctx.stroke();
    }
  }
  function setSlide(n){
    if(n===index)return;index=n;const slide=data.slides[n],generation=++imageGeneration;
    image.onload=()=>{if(generation===imageGeneration)sync();};
    image.onerror=()=>{status.textContent='장표를 불러오지 못했습니다. 새로고침해 주세요.';};
    image.src=slide.image;image.alt=`${String(n+1).padStart(2,'0')}장: ${slide.title}`;
    $('counter').textContent=`${n+1} / ${data.slides.length}`;$('previous').disabled=n===0;$('next').disabled=n===data.slides.length-1;
    $('current-number').textContent=`${String(n+1).padStart(2,'0')} · 현재 장표`;$('current-title').textContent=slide.title;
    $('key-message').textContent=slide.message;$('transcript').textContent=slide.script;
    [...chapterList.children].forEach((b,i)=>{if(i===n)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});
    const preload=data.slides[n+1];if(preload){const next=new Image();next.src=preload.image;}
  }
  function sync(){
    if(!data)return;const time=clamp(audio.currentTime||0,0,data.duration);
    // Media seeks round to microseconds; keep an exact chapter-boundary seek
    // from briefly selecting the preceding slide after the seek completes.
    let n=data.slides.findLastIndex(s=>s.start<=time+.001);if(n<0)n=0;
    setSlide(n);draw(data.slides[n],time-data.slides[n].start);
    if(!seeking)seek.value=String(time);seek.setAttribute('aria-valuetext',`${clock(time)} / ${clock(Math.round(data.duration))}`);
    $('elapsed').textContent=clock(time);play.textContent=audio.paused?'재생':'일시정지';
  }
  function tick(){sync();if(!audio.paused)raf=requestAnimationFrame(tick);else raf=null;}
  async function toggle(){if(!data)return;if(!audio.paused){audio.pause();return;}if(audio.currentTime>=data.duration-.05)audio.currentTime=0;try{await audio.play();}catch{status.textContent='음성을 시작하지 못했습니다. 재생 버튼을 다시 눌러 주세요.';}}
  function jump(time){if(!data)return;audio.currentTime=clamp(time,0,data.duration);sync();const url=new URL(location.href);url.searchParams.set('t',audio.currentTime.toFixed(2));url.hash=`slide-${index+1}`;history.replaceState(null,'',url);}
  async function fullscreen(){try{if(document.fullscreenElement)await document.exitFullscreen();else if($('player-shell').requestFullscreen)await $('player-shell').requestFullscreen();else status.textContent='이 브라우저에서는 전체화면을 지원하지 않습니다.';}catch{status.textContent='브라우저 메뉴에서 전체화면을 이용해 주세요.';}}
  play.addEventListener('click',toggle);$('previous').addEventListener('click',()=>jump(data.slides[Math.max(0,index-1)].start));$('next').addEventListener('click',()=>jump(data.slides[Math.min(data.slides.length-1,index+1)].start));
  seek.addEventListener('input',()=>{seeking=true;$('elapsed').textContent=clock(Number(seek.value));});seek.addEventListener('change',()=>{jump(Number(seek.value));seeking=false;sync();});
  $('volume').addEventListener('input',()=>{audio.volume=Number($('volume').value);});$('fullscreen').addEventListener('click',fullscreen);
  document.addEventListener('fullscreenchange',()=>{$('fullscreen').textContent=document.fullscreenElement?'전체화면 해제':'전체화면';sync();});
  $('share').addEventListener('click',async()=>{const u=new URL(location.href);u.searchParams.set('t',audio.currentTime.toFixed(2));u.hash=`slide-${index+1}`;try{await navigator.clipboard.writeText(u.href);status.textContent='현재 구간의 링크를 복사했습니다.';}catch{history.replaceState(null,'',u);status.textContent='주소창의 링크를 복사하면 현재 구간을 공유할 수 있습니다.';}});
  document.addEventListener('keydown',e=>{if(!data||e.ctrlKey||e.metaKey||e.altKey||e.target.closest('input,textarea,select,button,summary,a'))return;if(e.key===' '){e.preventDefault();toggle();}else if(e.key==='ArrowRight'){e.preventDefault();jump(audio.currentTime+5);}else if(e.key==='ArrowLeft'){e.preventDefault();jump(audio.currentTime-5);}else if(e.key.toLowerCase()==='f'){e.preventDefault();fullscreen();}});
  audio.addEventListener('play',()=>{status.textContent='음성에 맞춰 장표와 강조를 재생하고 있습니다.';if(raf===null)raf=requestAnimationFrame(tick);sync();});
  audio.addEventListener('pause',()=>{if(raf!==null){cancelAnimationFrame(raf);raf=null;}sync();if(!audio.ended)status.textContent='일시정지했습니다. 장표나 재생 위치를 선택할 수 있습니다.';});
  audio.addEventListener('ended',()=>{sync();status.textContent='발표가 끝났습니다. 목차에서 필요한 장을 다시 볼 수 있습니다.';});
  ['timeupdate','seeked','loadeddata'].forEach(name=>audio.addEventListener(name,sync));
  audio.addEventListener('error',()=>{status.textContent='음성을 불러오지 못했습니다. 연결을 확인한 뒤 새로고침해 주세요.';play.disabled=true;});
  audio.addEventListener('loadedmetadata',()=>{
    if(!data||initialized)return;initialized=true;const u=new URL(location.href),hash=u.hash.match(/^#slide-(\d+)$/);
    const time=u.searchParams.has('t')?Number(u.searchParams.get('t')):hash?data.slides[clamp(Number(hash[1])-1,0,data.slides.length-1)].start:0;
    if(Number.isFinite(time)&&time>0)audio.currentTime=clamp(time,0,data.duration);
    play.disabled=false;seek.disabled=false;status.textContent='재생을 누르면 음성에 맞춰 장표가 넘어갑니다.';sync();
  });
  function fitStage(){const rect=$('slide-stage').getBoundingClientRect(),width=Math.min(rect.width,rect.height*16/9),height=width*9/16;for(const node of [image,canvas]){node.style.width=`${width}px`;node.style.height=`${height}px`;}}
  new ResizeObserver(fitStage).observe($('slide-stage'));
  async function init(){try{
    const response=await fetch('data/presentation.json');if(!response.ok)throw Error(`Presentation ${response.status}`);data=await response.json();
    if(data.slides.length!==11||!data.audio||!Number.isFinite(data.duration))throw Error('Invalid presentation data');
    canvas.width=data.width;canvas.height=data.height;seek.max=String(data.duration);$('duration').textContent=clock(Math.round(data.duration));$('meta').textContent=`TMLR 2025 · ${data.slides.length}장 · ${clock(Math.round(data.duration))} · Dustin 음성 1.2배속`;
    for(const [n,slide] of data.slides.entries()){const b=document.createElement('button');b.className='chapter';b.type='button';b.dataset.slide=String(n+1);const number=document.createElement('span');number.className='number';number.textContent=String(n+1).padStart(2,'0');const body=document.createElement('span'),name=document.createElement('span'),time=document.createElement('span');name.className='name';name.textContent=slide.title;time.className='time';time.textContent=clock(slide.start);body.append(name,time);b.append(number,body);b.addEventListener('click',()=>jump(slide.start));chapterList.append(b);}
    sync();audio.src=data.audio;audio.playbackRate=1;audio.load();
  }catch(error){play.disabled=true;seek.disabled=true;status.textContent='발표 자료를 불러오지 못했습니다. 새로고침해 주세요.';console.error(error);}}
  init();
})();
