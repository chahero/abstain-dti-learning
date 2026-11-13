(() => {
  'use strict';
  document.querySelectorAll('[data-model-io]').forEach(group => {
    const buttons = [...group.querySelectorAll('[data-io-choice]')];
    if (!buttons.length) return;
    const panels = [...group.querySelectorAll('.io-panel')];
    function select(button, focus = false) {
      buttons.forEach(tab => {
        const active = tab === button;
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
      });
      panels.forEach(panel => { panel.hidden = panel.dataset.ioEngine !== button.dataset.ioChoice; });
      if (group.id === 'generation-example-io') {
        const target = document.getElementById(button.dataset.ioChoice === 'flow' ? 'generation-flow' : 'generation-diffusion');
        if (target?.getAttribute('aria-selected') !== 'true') target?.click();
      }
      if (focus) button.focus();
    }
    buttons.forEach((button, index) => {
      button.addEventListener('click', () => select(button));
      button.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
        else if (event.key === 'ArrowLeft') next = (index + buttons.length - 1) % buttons.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = buttons.length - 1;
        else return;
        event.preventDefault();
        select(buttons[next], true);
      });
    });
    if (group.id === 'generation-example-io') {
      ['flow', 'diffusion'].forEach(kind => {
        document.getElementById('generation-' + kind)?.addEventListener('click', () => {
          select(buttons.find(button => button.dataset.ioChoice === (kind === 'flow' ? 'flow' : 'dynamic')));
        });
      });
    }
  });
})();
