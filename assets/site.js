'use strict';
const list = document.getElementById('list');
const status = document.getElementById('status');
const time = n => { const total = Math.round(n); return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`; };
let episodes = [], videos = {}, selected = 0, player = null, apiPromise = null, generation = 0;

function validId(code) {
  const value = videos[code];
  return typeof value === 'string' && /^[A-Za-z0-9_-]{11}$/.test(value) ? value : null;
}
function youtubeApi() {
  if (window.YT?.Player) return Promise.resolve();
  if (!apiPromise) apiPromise = new Promise((resolve, reject) => {
    const timeout = setTimeout(() => { apiPromise = null; reject(new Error('YouTube 응답 지연')); }, 15000);
    window.onYouTubeIframeAPIReady = () => { clearTimeout(timeout); resolve(); };
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.onerror = () => { clearTimeout(timeout); apiPromise = null; script.remove(); reject(new Error('YouTube 연결 실패')); };
    document.head.appendChild(script);
  });
  return apiPromise;
}
function link(container, href, text, download = false) {
  const a = document.createElement('a'); a.href = href; a.textContent = text;
  if (download) a.download = '';
  if (href.startsWith('https://')) { a.target = '_blank'; a.rel = 'noopener'; }
  container.appendChild(a);
}
function resetPlayer() {
  if (player) { player.destroy(); player = null; }
  // YT replaces the mount element with an iframe, so create a fresh mount each time.
  document.getElementById('player')?.remove();
  const mount = document.createElement('div'); mount.id = 'player';
  document.getElementById('media').appendChild(mount);
}
async function choose(index, play = false, at = 0) {
  if (index < 0 || index >= episodes.length) return;
  selected = index; const e = episodes[index], id = validId(e.number), token = ++generation;
  resetPlayer();
  const poster = document.getElementById('poster');
  poster.hidden = false; poster.src = e.poster; poster.alt = `${e.number} · ${e.title} 썸네일`;
  document.getElementById('title').textContent = `${e.number} · ${e.title}`;
  document.title = `${e.topic} · Abstain-DTI`;
  document.getElementById('meta').textContent = `학습 ${String(index + 1).padStart(2, '0')} / ${episodes.length} · ${e.group} · ${time(e.seconds)}`;
  status.textContent = id ? 'YouTube 영상을 불러오는 중입니다.' : '영상 업로드 준비 중 · 읽기 가이드와 챕터를 먼저 살펴볼 수 있습니다.';
  const youtube = document.getElementById('youtube'); youtube.hidden = !id;
  if (id) youtube.href = `https://www.youtube.com/watch?v=${id}${at > 0 ? `&t=${Math.floor(at)}s` : ''}`;
  else youtube.removeAttribute('href');
  const aids = document.getElementById('study-aids'); aids.replaceChildren();
  link(aids, e.guide, '읽기 가이드 · 작은 실습');
  link(aids, e.source.url, e.source.title);
  link(aids, e.subtitle, '자막 SRT', true);
  const chapters = document.getElementById('chapters'); chapters.replaceChildren();
  const h2 = document.createElement('h2'); h2.textContent = '챕터'; chapters.appendChild(h2);
  const note = document.createElement('p'); note.className = 'chapter-note';
  note.textContent = id ? '영상이 준비되면 챕터를 눌러 해당 구간으로 이동할 수 있습니다.' : '영상 연결 후 각 챕터의 시간으로 바로 이동할 수 있습니다.';
  chapters.appendChild(note);
  const grid = document.createElement('div'); grid.className = 'chapter-grid';
  e.chapters.forEach(c => {
    const button = document.createElement('button'); button.textContent = `${time(c.seconds)} · ${c.title}`;
    button.disabled = true;
    button.onclick = () => {
      if (player?.seekTo) {
        player.seekTo(c.seconds, true);
        const params = new URLSearchParams(location.search); params.set('t', String(c.seconds));
        history.replaceState(null, '', `${location.pathname}?${params}`);
        youtube.href = `https://www.youtube.com/watch?v=${id}&t=${Math.floor(c.seconds)}s`;
        document.getElementById('player')?.focus();
      }
    };
    grid.appendChild(button);
  });
  chapters.appendChild(grid);
  document.getElementById('prev').disabled = index === 0;
  document.getElementById('next').disabled = index === episodes.length - 1;
  list.querySelectorAll('button.lesson').forEach((button, i) => {
    button.classList.toggle('selected', i === index);
    if (i === index) button.setAttribute('aria-current', 'step'); else button.removeAttribute('aria-current');
  });
  const params = new URLSearchParams(location.search); params.set('episode', e.number);
  if (at > 0) params.set('t', String(at)); else params.delete('t');
  history.replaceState(null, '', `${location.pathname}?${params}`);
  if (!id) return;
  try {
    await youtubeApi();
    if (token !== generation) return;
    player = new YT.Player('player', {
      host: 'https://www.youtube-nocookie.com', videoId: id,
      playerVars: { playsinline: 1, origin: location.origin, start: Math.floor(at), rel: 0 },
      events: {
        onReady: event => {
          if (token !== generation) return;
          poster.hidden = true; status.textContent = 'YouTube 영상 · 챕터를 눌러 필요한 부분부터 다시 보세요.';
          grid.querySelectorAll('button').forEach(button => { button.disabled = false; });
          if (play) event.target.playVideo();
        },
        onStateChange: event => {
          if (token === generation && event.data === YT.PlayerState.ENDED && validId(episodes[index + 1]?.number)) choose(index + 1, true);
        },
        onError: () => {
          if (token === generation) status.textContent = '영상을 불러오지 못했습니다. YouTube에서 보기를 이용해 주세요.';
        }
      }
    });
  } catch (error) {
    if (token === generation) status.textContent = 'YouTube에 연결하지 못했습니다. YouTube에서 보기를 이용해 주세요.';
  }
}
async function init() {
  try {
    [episodes, videos] = await Promise.all(['data/episodes.json', 'data/youtube-videos.json'].map(async url => {
      const response = await fetch(url, { cache: 'no-cache' }); if (!response.ok) throw new Error(`${url}: ${response.status}`); return response.json();
    }));
    episodes.forEach((e, i) => {
      if (i === 0 || e.group !== episodes[i - 1].group) {
        const group = document.createElement('h3'); group.className = 'lesson-group'; group.textContent = e.group; list.appendChild(group);
      }
      const button = document.createElement('button'); button.className = 'lesson'; button.dataset.episode = e.number; button.title = e.title;
      const number = document.createElement('span'); number.className = 'num'; number.textContent = String(i + 1).padStart(2, '0');
      const detail = document.createElement('div'), name = document.createElement('div'), length = document.createElement('div');
      name.className = 'name'; name.textContent = e.topic;
      length.className = 'length'; length.textContent = `${e.number} · ${time(e.seconds)}${validId(e.number) ? '' : ' · 업로드 준비 중'}`;
      detail.append(name, length); button.append(number, detail); button.onclick = () => choose(i); list.appendChild(button);
    });
    document.getElementById('prev').onclick = () => choose(selected - 1);
    document.getElementById('next').onclick = () => choose(selected + 1);
    const params = new URLSearchParams(location.search);
    const requested = episodes.findIndex(e => e.number === params.get('episode'));
    const index = requested >= 0 ? requested : 0;
    const at = Math.min(episodes[index].seconds, Math.max(0, Number(params.get('t')) || 0));
    await choose(index, false, at);
  } catch (error) {
    status.textContent = '학습 자료를 불러오지 못했습니다. 잠시 후 새로고침해 주세요.';
    console.error(error);
  }
}
init();
