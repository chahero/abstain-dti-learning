(() => {
  'use strict';
  const root = document.getElementById('error-same-pair');
  if (!root) return;
  const states = [...root.querySelectorAll('[data-error-state-choice]')];
  const tabs = [...root.querySelectorAll('[data-error-model-choice]')];
  const panels = [...root.querySelectorAll('[data-error-model]')];
  function selectState(state) {
    states.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.errorStateChoice === state)));
    root.querySelectorAll('[data-error-state]').forEach(text => { text.hidden = text.dataset.errorState !== state; });
    document.getElementById('error-state-reading').textContent = state === 'favorable'
      ? 'A를 선택했습니다. 같은 공간을 보여줘도 모델마다 사용하는 정보와 계산 방법이 다릅니다.'
      : 'B를 선택했습니다. 시작 좌표만 바꿉니다. 구조를 받는 모델의 조건은 바뀌지만, BIND의 서열·SMILES 입력은 그대로입니다.';
  }
  function selectModel(button, focus = false) {
    tabs.forEach(tab => {
      const active = tab === button;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    panels.forEach(panel => { panel.hidden = panel.dataset.errorModel !== button.dataset.errorModelChoice; });
    if (focus) button.focus();
  }
  states.forEach(button => button.addEventListener('click', () => selectState(button.dataset.errorStateChoice)));
  tabs.forEach((button, index) => {
    button.addEventListener('click', () => selectModel(button));
    button.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      selectModel(tabs[next], true);
    });
  });
})();
