// Ember particles — slow-rising sparks at the bottom of the viewport.
(function(){
  const canvas = document.getElementById('embers-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W = 0, H = 0, DPR = 1;
  const particles = [];
  const MAX = 90;

  function resize(){
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);

  function spawn(){
    particles.push({
      x: Math.random() * W,
      y: H + Math.random() * 20,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -0.3 - Math.random() * 0.8,
      life: 0,
      maxLife: 200 + Math.random() * 300,
      size: 0.6 + Math.random() * 1.6,
      hue: 14 + Math.random() * 18,           // 14..32 (red→orange)
      bright: 50 + Math.random() * 20,
      flicker: Math.random() * Math.PI * 2
    });
  }

  function step(){
    if (document.body.dataset.embers === 'off'){
      ctx.clearRect(0, 0, W, H);
      requestAnimationFrame(step);
      return;
    }
    ctx.clearRect(0, 0, W, H);
    if (particles.length < MAX && Math.random() < 0.6) spawn();

    for (let i = particles.length - 1; i >= 0; i--){
      const p = particles[i];
      p.life++;
      p.x += p.vx + Math.sin((p.life + p.flicker) * 0.04) * 0.25;
      p.y += p.vy;
      p.vy -= 0.0008;                        // slight upward acceleration (heat)
      const t = p.life / p.maxLife;
      const alpha = (1 - t) * 0.95;
      if (t >= 1 || p.y < -20){ particles.splice(i, 1); continue; }

      const r = p.size * (1 + Math.sin(p.life * 0.1 + p.flicker) * 0.1);
      // glow
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 6);
      grad.addColorStop(0, `hsla(${p.hue}, 90%, ${p.bright}%, ${alpha * 0.9})`);
      grad.addColorStop(0.4, `hsla(${p.hue}, 90%, ${p.bright - 10}%, ${alpha * 0.3})`);
      grad.addColorStop(1, `hsla(${p.hue}, 90%, 30%, 0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r * 6, 0, Math.PI * 2);
      ctx.fill();
      // core
      ctx.fillStyle = `hsla(${p.hue + 8}, 100%, 80%, ${alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
})();
