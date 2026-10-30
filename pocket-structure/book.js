(() => {
  'use strict';
  const chapter = document.body.dataset.chapter;
  const nav = document.createElement('nav'); nav.className='book-bar'; nav.setAttribute('aria-label','교재의 장 선택');
  for(const item of [
    {href:'../',name:'전체 목차'},
    {href:'../08-3d-lab/',name:'3D 실습실 · 실제 좌표와 값',number:'3d'},
    {href:'../07-technology-summary/',name:'개요 · 전체 기술 요약',number:'7'},
    {href:'../01-pocket-basics/',name:'1장 · 포켓과 움직임',number:'1'},
    {href:'../02-pocket-detection/',name:'2장 · 포켓 후보 탐지',number:'2'},
    {href:'../03-learning-pockets/',name:'3장 · 딥러닝으로 읽기',number:'3'},
    {href:'../04-cryptic-pockets/',name:'4장 · 숨은 포켓과 MD',number:'4'},
    {href:'../05-docking/',name:'5장 · 도킹과 유연성',number:'5'},
    {href:'../06-cofolding/',name:'6장 · 복합체 공동 예측',number:'6'}
  ]) {
    const a=document.createElement('a'); a.href=item.href; a.textContent=item.name;
    if(item.number===chapter)a.setAttribute('aria-current','page'); nav.append(a);
  }
  document.querySelector('.site-header').after(nav);
  if(chapter==='1') {
    const next=document.querySelector('.next-topic');
    if(next){const a=document.createElement('a');a.href='../02-pocket-detection/';a.className='chapter-transition';a.textContent='2장 · fpocket과 P2Rank로 이어서 읽기 →';next.append(document.createElement('br'),a);}
  }
  if(chapter==='2') {
    const next=document.querySelector('.next-topic');
    if(next){const a=document.createElement('a');a.href='../03-learning-pockets/';a.className='chapter-transition';a.textContent='3장 · DeepPocket과 GrASP로 이어서 읽기 →';next.append(document.createElement('br'),a);}
  }
  if(chapter==='3') {
    const next=document.querySelector('.next-topic');
    if(next){const a=document.createElement('a');a.href='../04-cryptic-pockets/';a.className='chapter-transition';a.textContent='4장 · PocketMiner와 분자동역학으로 이어서 읽기 →';next.append(document.createElement('br'),a);}
  }
  if(chapter==='4') {
    const next=document.querySelector('.next-topic');
    if(next){const a=document.createElement('a');a.href='../05-docking/';a.className='chapter-transition';a.textContent='5장 · Vina·DiffDock·DynamicBind로 이어서 읽기 →';next.append(document.createElement('br'),a);}
  }
  if(chapter==='5') {
    const next=document.querySelector('.next-topic');
    if(next){const a=document.createElement('a');a.href='../06-cofolding/';a.className='chapter-transition';a.textContent='6장 · AlphaFold 3·Boltz-2·Chai-1·OpenFold3로 이어서 읽기 →';next.append(document.createElement('br'),a);}
  }
  if(chapter==='6') {
    const next=document.querySelector('.next-topic');
    if(next){const a=document.createElement('a');a.href='../07-technology-summary/';a.className='chapter-transition';a.textContent='개요 · 전체 기술 요약 다시 보기 →';next.append(document.createElement('br'),a);}
  }
  let printDetails=[];
  window.addEventListener('beforeprint',()=>{
    printDetails=[...document.querySelectorAll('details.sources, details.technical')].map(el=>({el,open:el.open}));
    printDetails.forEach(({el})=>el.open=true);
  });
  window.addEventListener('afterprint',()=>{printDetails.forEach(({el,open})=>el.open=open);printDetails=[];});
})();
