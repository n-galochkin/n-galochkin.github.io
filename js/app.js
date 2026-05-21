// ─── Custom cursor ───────────────────────────────────────────
(function(){
  const cur = document.querySelector('.cursor');
  if (!cur) return;
  let tx = 0, ty = 0, x = 0, y = 0;
  document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
  document.addEventListener('mouseleave', () => { cur.style.opacity = 0; });
  document.addEventListener('mouseenter', () => { cur.style.opacity = 1; });
  function tick(){
    x += (tx - x) * 0.25;
    y += (ty - y) * 0.25;
    cur.style.left = x + 'px';
    cur.style.top  = y + 'px';
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  const hovers = 'a, button, .shield, .beast, .weapon, .trophy, .summon-btn, .lbox-close, .lbox-nav, [data-cursor-hover]';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hovers)) cur.classList.add('hover');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hovers)) cur.classList.remove('hover');
  });
})();

// ─── Scroll reveal ───────────────────────────────────────────
(function(){
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting){
        en.target.classList.add('in');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
})();

// ─── Nav shield active state on scroll ───────────────────────
(function(){
  const shields = document.querySelectorAll('.shield[data-target]');
  const sections = [...shields].map(s => document.getElementById(s.dataset.target)).filter(Boolean);
  if (!sections.length) return;
  function update(){
    const y = window.scrollY + window.innerHeight * 0.35;
    let activeIdx = 0;
    sections.forEach((s, i) => { if (s.offsetTop <= y) activeIdx = i; });
    shields.forEach((s, i) => s.classList.toggle('active', i === activeIdx));
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

// ─── Glitch on hover for headings ────────────────────────────
(function(){
  document.querySelectorAll('.glitchable').forEach(el => {
    if (!el.dataset.text) el.dataset.text = el.textContent.trim();
    el.addEventListener('mouseenter', () => {
      el.classList.remove('glitch');
      void el.offsetWidth;
      el.classList.add('glitch');
    });
  });
  // occasional random glitch on hero name
  const hero = document.querySelector('.hero-name .glitchable');
  if (hero){
    setInterval(() => {
      if (Math.random() < 0.18){
        hero.classList.remove('glitch'); void hero.offsetWidth;
        hero.classList.add('glitch');
      }
    }, 3200);
  }
})();

// ─── Lightbox for beast screenshots ──────────────────────────
(function(){
  const lbox    = document.getElementById('lbox');
  const lboxImg = document.getElementById('lbox-img');
  const lboxC   = document.getElementById('lbox-counter');
  const btnX    = document.getElementById('lbox-close');
  const btnP    = document.getElementById('lbox-prev');
  const btnN    = document.getElementById('lbox-next');
  if (!lbox) return;

  let group = [];
  let idx = 0;

  function open(g, i){
    group = g; idx = i;
    show();
    lbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function show(){
    lboxImg.src = group[idx];
    lboxC.textContent = `${String(idx+1).padStart(2,'0')} / ${String(group.length).padStart(2,'0')}`;
  }
  function close(){
    lbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  function next(){ idx = (idx + 1) % group.length; show(); }
  function prev(){ idx = (idx - 1 + group.length) % group.length; show(); }

  btnX.addEventListener('click', close);
  btnN.addEventListener('click', next);
  btnP.addEventListener('click', prev);
  lbox.addEventListener('click', e => { if (e.target === lbox) close(); });
  document.addEventListener('keydown', e => {
    if (!lbox.classList.contains('active')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  document.querySelectorAll('.beast').forEach(beast => {
    const imgs = [...beast.querySelectorAll('.thumb img')].map(i => i.src);
    if (!imgs.length) return;
    beast.querySelectorAll('.thumb').forEach((thumb, i) => {
      if (!thumb.querySelector('img')) return;
      thumb.addEventListener('click', e => { e.stopPropagation(); open(imgs, i); });
    });
  });
})();

// ─── Smooth scroll for shield clicks ─────────────────────────
(function(){
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const t = document.getElementById(id);
      if (!t) return;
      e.preventDefault();
      window.scrollTo({ top: t.offsetTop - 40, behavior: 'smooth' });
    });
  });
})();
