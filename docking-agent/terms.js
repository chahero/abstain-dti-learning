(() => {
  'use strict';
  const dialog = document.querySelector('#term-dialog');
  const details = document.querySelector('.glossary-details');
  const search = document.querySelector('#term-search');
  const list = document.querySelector('#term-list');
  const count = document.querySelector('#term-count');
  let terms = [], byId = new Map(), showGlossaryAfterClose = false;
  function openTerm(id, trigger) {
    const item = byId.get(id);
    if (!item) return;
    document.querySelector('#term-dialog-title').textContent = item.name;
    document.querySelector('#term-reading').textContent = `읽기 · ${item.reading}`;
    document.querySelector('#term-group').textContent = item.group;
    document.querySelector('#term-meaning').textContent = item.meaning;
    document.querySelector('#term-context').textContent = item.context;
    dialog.showModal();
  }
  function openGlossary() {
    details.open = true;
    details.scrollIntoView({block: 'start'});
    search.focus({preventScroll:true});
  }
  document.querySelectorAll('.glossary-open').forEach(button => button.addEventListener('click',openGlossary));
  document.querySelector('#term-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click', event => {
    const box=dialog.getBoundingClientRect();
    if(event.target===dialog && (event.clientX<box.left || event.clientX>box.right || event.clientY<box.top || event.clientY>box.bottom)) dialog.close();
  });
  dialog.addEventListener('close',()=>{if(showGlossaryAfterClose){showGlossaryAfterClose=false;openGlossary();}});
  dialog.addEventListener('keydown',event=>{
    if(event.key!=='Tab') return;
    const controls=[...dialog.querySelectorAll('button:not([disabled]),a[href],input:not([disabled]),[tabindex="0"]')];
    const first=controls[0],last=controls[controls.length-1];
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  });
  document.querySelector('#show-all-terms').addEventListener('click',()=>{showGlossaryAfterClose=true;dialog.close();});
  document.addEventListener('click', event => {
    const trigger = event.target.closest('button[data-term]');
    if(trigger) openTerm(trigger.dataset.term,trigger);
  });
  function renderList() {
    const query = search.value.trim().toLocaleLowerCase();
    const filtered = terms.filter(item => `${item.name} ${item.aliases.join(' ')} ${item.group}`.toLocaleLowerCase().includes(query));
    list.replaceChildren();
    filtered.forEach(item => {
      const article = document.createElement('article'); article.className='glossary-item';
      const button = document.createElement('button'); button.type='button';button.dataset.term=item.id;
      button.textContent=item.name;button.setAttribute('aria-haspopup','dialog');button.setAttribute('aria-label',`${item.name} 뜻 보기`);
      const reading = document.createElement('span');reading.textContent=item.reading;reading.className='glossary-reading';
      const meaning = document.createElement('p');meaning.textContent=item.meaning;
      article.append(button,reading,meaning);list.append(article);
    });
    count.textContent = query ? `${filtered.length}개 검색됨 · 전체 ${terms.length}개` : `전체 ${terms.length}개 용어`;
  }
  search.addEventListener('input',renderList);
  function annotate() {
    const aliases = new Map();
    terms.forEach(item=>item.aliases.forEach(alias=>aliases.set(alias.toLocaleLowerCase(),item.id)));
    const escape=value=>value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    const pattern=new RegExp(`(?<![A-Za-z0-9_가-힣])(${[...aliases.keys()].sort((a,b)=>b.length-a.length).map(escape).join('|')})(?![A-Za-z0-9_])`,'giu');
    document.querySelectorAll('main section:not(.glossary-section):not(.sources-section)').forEach(section=>{
      const seen = new Set(), nodes = [];
      const walker=document.createTreeWalker(section,NodeFilter.SHOW_TEXT,{
        acceptNode(node) {
          if(!node.textContent.trim() || node.parentElement.closest('a,button,summary,pre,script,style,svg,label,input,select,textarea,h1,h2,h3,h4,.eyebrow,.section-number,.chip,.label,.file-table,.term-hint')) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      });
      while(walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(node=>{
        const text=node.textContent, fragment=document.createDocumentFragment();let cursor=0,changed=false;
        pattern.lastIndex=0;
        for(const match of text.matchAll(pattern)) {
          const id=aliases.get(match[0].toLocaleLowerCase());
          if(seen.has(id)) continue;
          fragment.append(document.createTextNode(text.slice(cursor,match.index)));
          const button=document.createElement('button');button.type='button';button.className='term-trigger';button.dataset.term=id;
          button.textContent=match[0];button.setAttribute('aria-haspopup','dialog');button.setAttribute('aria-label',`${match[0]} 뜻 보기`);
          fragment.append(button);cursor=match.index+match[0].length;seen.add(id);changed=true;
        }
        if(changed){fragment.append(document.createTextNode(text.slice(cursor)));node.replaceWith(fragment);}
      });
    });
  }
  fetch('assets/terms.json').then(response=>{if(!response.ok)throw new Error(`HTTP ${response.status}`);return response.json();}).then(value=>{
    terms=value;byId=new Map(terms.map(item=>[item.id,item]));renderList();annotate();
  }).catch(error=>{count.textContent='용어 설명을 불러오지 못했습니다. 아래 Markdown 용어 사전을 이용해주세요.';console.error('Term help failed',error);});
})();
