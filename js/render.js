function renderCareerOverview() {
  const { bio, highlights } = CAREER_OVERVIEW;
  const hl = highlights.map(h => `
    <div class="ov-highlight">
      <div class="ov-h-val${h.color ? ' ' + h.color : ''}">${h.value}</div>
      <div class="ov-h-label">${h.label}</div>
    </div>`).join('');

  document.getElementById('mount-overview').innerHTML = `
    <div class="overview-section">
      <div class="s-label">Career Overview</div>
      <p class="ov-bio">${bio}</p>
      <div class="ov-highlights">${hl}</div>
    </div>`;
}

function renderSkills() {
  const chips = SKILLS.map(s =>
    `<span class="skill-chip${s.tier === 1 ? ' tier1' : ''}">${s.label}</span>`
  ).join('');

  document.getElementById('mount-skills').innerHTML = `
    <div class="skills-section">
      <div class="s-label">Equipped Skills</div>
      <div class="skills-row">${chips}</div>
    </div>`;
}

function renderProjects() {
  const rows = PROJECTS.map(p => {
    const thumbs = p.gallery.map((item, i) => {
      if (item.type === 'youtube') {
        return `<div class="mm-thumb mm-video-thumb" data-gallery="${p.id}" data-index="${i}">
          <img src="https://img.youtube.com/vi/${item.videoId}/mqdefault.jpg" alt="${item.alt}">
          <div class="mm-play-icon">▶</div>
        </div>`;
      }
      return `<div class="mm-thumb" data-gallery="${p.id}" data-index="${i}">
        <img src="${item.src}" alt="${item.alt}">
      </div>`;
    }).join('');

    const tags  = p.tags.map(t => `<span class="mi-tag">${t}</span>`).join('');
    const links = p.links.map(l =>
      `<a href="${l.url}" target="_blank" rel="noopener" class="mi-link">${l.label}</a>`
    ).join('');

    return `
      <div class="match-row ${p.tier}">
        <div class="match-info">
          <div class="mi-header">
            <div class="mi-header-left">
              <span class="mi-name">${p.name}</span>
              <span class="mi-badge ${p.badge}">${p.badge.toUpperCase()}</span>
            </div>
            <div class="mi-header-right">
              <span class="res-status ${p.status.type}">${p.status.label}</span>
              <span class="res-date">${p.date}</span>
              <span class="res-kd">${p.role}</span>
            </div>
          </div>
          <div class="mi-studio">${p.studio}</div>
          <div class="match-media">${thumbs}</div>
          <div class="mi-desc">${p.desc}</div>
          <div class="mi-tags">${tags}</div>
          ${links ? `<div class="mi-links">${links}</div>` : ''}
        </div>
      </div>`;
  }).join('');

  document.getElementById('mount-projects').innerHTML = `
    <div class="match-section" id="matches">
      <div class="s-label">Match History · Key Projects</div>
      <div class="match-list">${rows}</div>
    </div>`;

  document.querySelectorAll('.mm-thumb').forEach(thumb => {
    thumb.addEventListener('click', () =>
      openLightbox(thumb.dataset.gallery, parseInt(thumb.dataset.index))
    );
  });
}

function renderSeasons() {
  const items = SEASONS.map(s => {
    const points = s.points.map(p => `<li>${p}</li>`).join('');
    return `
      <div class="season-item">
        <div class="si-left">
          <div class="si-season">${s.season}</div>
          <div class="si-period">${s.period}</div>
        </div>
        <div class="si-right">
          <div class="si-role">${s.role}</div>
          <div class="si-company">${s.company}</div>
          <ul class="si-points">${points}</ul>
        </div>
      </div>`;
  }).join('');

  document.getElementById('mount-seasons').innerHTML = `
    <div class="seasons-section" id="seasons">
      <div class="s-label">Season History · Career Timeline</div>
      <div class="season-list">${items}</div>
    </div>`;
}

function renderMedals() {
  const summary = MEDALS_SUMMARY.map(m => `
    <div class="ms-item">
      <span class="ms-dot ${m.tier}" ${!m.tier ? 'style="background:var(--muted)"' : ''}></span>
      <span class="ms-label">${m.label}</span>
      <span class="ms-count">×${m.count}</span>
    </div>`).join('');

  const cards = MEDALS.map(m => `
    <div class="medal-card ${m.tier}">
      <div class="medal ${m.tier}"><div class="medal-inner">${m.icon}</div></div>
      <div class="medal-tier-label ${m.tier}">${tierLabel(m.tier)}</div>
      <div class="medal-name">${m.name}</div>
      <div class="medal-desc">${m.desc}</div>
    </div>`).join('');

  document.getElementById('mount-medals').innerHTML = `
    <div class="achievements-section" id="achievements">
      <div class="s-label">Achievements · Medal Cabinet</div>
      <div class="medals-summary">${summary}</div>
      <div class="medals-grid">${cards}</div>
    </div>`;
}

function tierLabel(tier) {
  if (tier === 't3')     return '★★★ Tier 3 · Legendary';
  if (tier === 't2')     return '★★ Tier 2 · Epic';
  if (tier === 't1')     return '★ Tier 1 · Rare';
  if (tier === 'locked') return '⌬ Locked';
  return '';
}

function renderReports() {
  const cards = REPORTS.map(r => `
    <a href="${r.url}" class="report-card">
      <div class="rc-top">
        <span class="rc-id">Report #${r.id}</span>
        <span class="rc-cat ${r.cat}">${r.cat.charAt(0).toUpperCase() + r.cat.slice(1)}</span>
      </div>
      <h3 class="rc-title">${r.title}</h3>
      <p class="rc-excerpt">${r.excerpt}</p>
      <div class="rc-meta">
        <span class="rc-date">${r.date}</span>
        <span class="rc-read">Read</span>
      </div>
    </a>`).join('');

  const placeholder = `
    <div class="report-card coming-soon">
      <div>
        <div class="cs-icon">+</div>
        <div class="cs-title">More Reports Inbound</div>
        <div class="cs-sub">New articles published regularly. Stay tuned.</div>
      </div>
    </div>`;

  document.getElementById('mount-reports').innerHTML = `
    <div class="reports-section" id="reports">
      <div class="reports-header">
        <div class="s-label" style="margin-bottom:0">Field Reports · Articles &amp; Devlogs</div>
        <a href="#" class="reports-feed-link">Subscribe / RSS</a>
      </div>
      <div class="reports-grid">${cards}${placeholder}</div>
    </div>`;
}

document.addEventListener('DOMContentLoaded', () => {
  renderCareerOverview();
  renderSkills();
  renderProjects();
  renderSeasons();
  renderMedals();
  renderReports();
});
