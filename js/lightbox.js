const lb      = document.getElementById('lightbox');
const lbImg   = document.getElementById('lb-img');
const lbVideo = document.getElementById('lb-video');
const lbCount = document.getElementById('lb-counter');
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
  if (item.type === 'image') {
    lbImg.src = item.src;
    lbImg.style.display = 'block';
    lbVideo.style.display = 'none';
    lbVideo.src = '';
  } else {
    lbVideo.src = `https://www.youtube.com/embed/${item.videoId}?autoplay=1`;
    lbVideo.style.display = 'block';
    lbImg.style.display = 'none';
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
