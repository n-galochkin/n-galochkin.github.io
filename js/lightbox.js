const lb           = document.getElementById('lightbox');
const lbImg        = document.getElementById('lb-img');
const lbVideo      = document.getElementById('lb-video');
const lbLocalVideo = document.getElementById('lb-local-video');
const lbCount      = document.getElementById('lb-counter');
let gallery = null, idx = 0;

function openLightbox(g, i) {
  gallery = g; idx = i;
  renderLb();
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lb.classList.remove('active');
  lbVideo.src = '';
  lbLocalVideo.pause();
  lbLocalVideo.src = '';
  document.body.style.overflow = '';
}

function navigate(dir) {
  const items = PROJECTS.find(p => p.id === gallery).gallery;
  idx = (idx + dir + items.length) % items.length;
  renderLb();
}

function renderLb() {
  const items = PROJECTS.find(p => p.id === gallery).gallery;
  const item  = items[idx];
  lbCount.textContent = `${idx + 1} / ${items.length}`;
  lbLocalVideo.pause();
  if (item.type === 'image') {
    lbImg.src = item.src;
    lbImg.style.display = 'block';
    lbVideo.style.display = 'none';
    lbVideo.src = '';
    lbLocalVideo.style.display = 'none';
    lbLocalVideo.src = '';
  } else if (item.type === 'video') {
    lbLocalVideo.style.display = 'block';
    lbImg.style.display = 'none';
    lbVideo.style.display = 'none';
    lbVideo.src = '';
    lbLocalVideo.src = item.src;
    lbLocalVideo.load();
    lbLocalVideo.play().catch(() => {});
  } else {
    lbVideo.src = `https://www.youtube.com/embed/${item.videoId}?autoplay=1`;
    lbVideo.style.display = 'block';
    lbImg.style.display = 'none';
    lbLocalVideo.style.display = 'none';
    lbLocalVideo.src = '';
  }
}

document.getElementById('lb-overlay').addEventListener('click', closeLightbox);
document.getElementById('lb-close').addEventListener('click', closeLightbox);
document.getElementById('lb-prev').addEventListener('click', () => navigate(-1));
document.getElementById('lb-next').addEventListener('click', () => navigate(1));

document.addEventListener('keydown', e => {
  if (!lb.classList.contains('active')) return;
  if (e.key === 'ArrowLeft')  navigate(-1);
  if (e.key === 'ArrowRight') navigate(1);
  if (e.key === 'Escape')     closeLightbox();
});
