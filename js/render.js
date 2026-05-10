function renderNav() {
  document.querySelector('.nav-logo').innerHTML = PLAYER.handle;
  document.querySelector('.nav-hire').href = 'mailto:' + CONTACT.email;
}

function renderPlayerPanel() {
  const initials = PLAYER.name.split(' ').map(w => w[0]).join('');
  document.getElementById('mount-player-panel').innerHTML = `
    <div class="avatar-block">
      <div class="avatar-frame"><span class="avatar-letter">${initials}</span></div>
      <div class="player-name">${PLAYER.name}</div>
      <div class="player-class">${PLAYER.title}</div>
      <div class="player-server">Server: ${PLAYER.server}</div>
      <br>
      <div class="avatar-online"><div class="online-dot"></div>${PLAYER.status}</div>
    </div>`;
}


const SOCIAL_ICONS = {
  'LinkedIn':   `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  'GitHub':     `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
  'Upwork':     `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.543-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/></svg>`,
  'Freelancer': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.004 0H1.996C.894 0 0 .894 0 1.996v20.008C0 23.106.894 24 1.996 24h20.008C23.106 24 24 23.106 24 22.004V1.996C24 .894 23.106 0 22.004 0zM7 17H5V9.525h2V17zm-1-8.55c-.65 0-1.175-.525-1.175-1.175S5.35 6.1 6 6.1s1.175.525 1.175 1.175S6.65 8.45 6 8.45zM19 17h-2v-3.925c0-1.025-.35-1.575-1.1-1.575-.8 0-1.225.575-1.225 1.575V17h-2v-3.925c0-1.025-.35-1.575-1.1-1.575-.8 0-1.225.575-1.225 1.575V17H9V9.525h1.925V10.4c.45-.65 1.125-1.05 2.05-1.05.95 0 1.675.4 2.125 1.15.525-.725 1.275-1.15 2.275-1.15C19.025 9.35 19 11.15 19 12.6V17z"/></svg>`,
};

function renderContact() {
  const links = CONTACT.links.map(l => {
    const icon = SOCIAL_ICONS[l.label] || '';
    return `<a href="${l.url}" target="_blank" class="c-link">${icon}${l.label}</a>`;
  }).join('');
  document.getElementById('mount-contact').innerHTML = `
    <div class="contact-section" id="contact">
      <div class="s-label" style="max-width:540px;margin:0 auto 2rem">Recruitment</div>
      <div class="contact-box">
        <div class="contact-title">Open to New Contracts</div>
        <div class="contact-sub">${CONTACT.availability}</div>
        <a href="mailto:${CONTACT.email}" class="contact-email">${CONTACT.email}</a>
        <div class="contact-links">${links}</div>
      </div>
    </div>`;
}

function renderSideStats() {
  const rows = PLAYER.stats.map(s =>
    `<div class="ss-row">
      <span class="ss-label">${s.label}</span>
      <span class="ss-val${s.color ? ' ' + s.color : ''}">${s.value}</span>
    </div>`
  ).join('');

  document.getElementById('mount-side-stats').innerHTML = `
    <div class="side-stats">
      <div class="ss-title">Quick Stats</div>
      ${rows}
    </div>`;
}

function renderCareerOverview() {
  const { bio, highlights = [] } = CAREER_OVERVIEW;
  const hl = highlights.map(h => `
    <div class="ov-highlight">
      <div class="ov-h-val${h.color ? ' ' + h.color : ''}">${h.value}</div>
      <div class="ov-h-label">${h.label}</div>
    </div>`).join('');

  document.getElementById('mount-overview').innerHTML = `
    <div class="overview-section">
      <div class="s-label">Career Overview</div>
      <p class="ov-bio">${bio}</p>
    </div>`;
}

function renderSkills() {
  const chips = SKILLS.map(s =>
    `<span class="skill-chip${s.tier === 1 ? ' tier1' : ''}">${s.label}</span>`
  ).join('');

  document.getElementById('mount-skills').innerHTML = `
    <div class="skills-section">
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
      if (item.type === 'video') {
        return `<div class="mm-thumb mm-video-thumb" data-gallery="${p.id}" data-index="${i}">
          <video src="${item.src}" preload="metadata" muted></video>
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
    <div class="match-section" id="projects">
      <div class="s-label">Key Projects</div>
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
  const cards = MEDALS.map(m => `
    <div class="medal-card ${m.tier}">
      <div class="medal ${m.tier}"><div class="medal-inner">${m.icon}</div></div>
      <div class="medal-name ${m.tier}">${m.name}</div>
      <div class="medal-desc">${m.desc}</div>
    </div>`).join('');

  document.getElementById('mount-medals').innerHTML = `
    <div class="achievements-section" id="achievements">
      <div class="s-label">Achievements</div>
      <div class="medals-grid">${cards}</div>
    </div>`;
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
  renderNav();
  renderPlayerPanel();
  renderSideStats();
  renderCareerOverview();
  renderSkills();
  renderProjects();
  renderSeasons();
  renderMedals();
  renderReports();
  renderContact();
});
