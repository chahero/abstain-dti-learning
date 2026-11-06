(() => {
  'use strict';
  // Preserve links shared before this page became a development report.
  const oldSteps = {
    'step-1': 'overview', 'step-2': 'implementation', 'step-3': 'experiment',
    'step-4': 'experiment', 'step-5': 'results', 'step-6': 'results',
    'step-7': 'failure', 'step-8': 'results', 'step-9': 'conclusion',
  };
  function followOldLink() {
    const id = oldSteps[location.hash.slice(1)];
    if (!id) return;
    history.replaceState(null, '', `#${id}`);
    document.getElementById(id)?.scrollIntoView();
  }
  followOldLink();
  addEventListener('hashchange', followOldLink);
  const links = [...document.querySelectorAll('.section-nav a')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href')));
  let scheduled = false;
  function updateLocation() {
    scheduled = false;
    let current = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= 140) current = section;
    }
    for (const link of links) {
      if (link.getAttribute('href') === `#${current.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  }
  addEventListener('scroll', () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(updateLocation); }
  }, {passive: true});
  updateLocation();
  document.querySelector('#print').addEventListener('click', () => print());
  let openDetails = [];
  addEventListener('beforeprint', () => {
    openDetails = [...document.querySelectorAll('details')].map(item => item.open);
    document.querySelectorAll('details').forEach(item => { item.open = true; });
  });
  addEventListener('afterprint', () => {
    document.querySelectorAll('details').forEach((item, index) => { item.open = openDetails[index]; });
  });
})();
