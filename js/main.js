// js/main.js — Bootstraps all modules, runs hex-scramble and scroll-spy

import { PROFILE, PROJECTS, SECURITY_LOGS, TECH_STACK } from './data.js';
import { initSpotlightCards } from './spotlight.js';
import { initCommandPalette, openPalette } from './palette.js';
import { initDrawer, openDrawer } from './drawer.js';
import { initTerminal } from './terminal.js';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   1. Cryptographic Hex-Scramble Text Reveal (450ms)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function runHexScrambleReveal() {
  const targetEl = document.getElementById('scramble-subtitle');
  if (!targetEl) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finalPhrase = PROFILE.subHeadline;

  if (prefersReduced) {
    targetEl.textContent = finalPhrase;
    return;
  }

  const hexChars = '0123456789abcdefABCDEF<>#@*!~';
  const totalDuration = 450; // ms
  const intervalMs = 28;
  const totalFrames = Math.floor(totalDuration / intervalMs);
  let frame = 0;

  const timer = setInterval(() => {
    frame++;
    const progress = frame / totalFrames;
    const resolvedCharCount = Math.floor(progress * finalPhrase.length);

    let output = '';
    for (let i = 0; i < finalPhrase.length; i++) {
      if (i < resolvedCharCount) {
        output += finalPhrase[i];
      } else if (finalPhrase[i] === ' ' || finalPhrase[i] === '•') {
        output += finalPhrase[i];
      } else {
        output += hexChars[Math.floor(Math.random() * hexChars.length)];
      }
    }

    targetEl.textContent = output;

    if (frame >= totalFrames) {
      clearInterval(timer);
      targetEl.textContent = finalPhrase;
    }
  }, intervalMs);
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   2. Render Dynamic Components
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function renderDynamicContent() {
  // ── Render Builds Bento Grid ──
  const bentoGrid = document.getElementById('builds-grid');
  if (bentoGrid) {
    bentoGrid.innerHTML = '';
    PROJECTS.forEach(proj => {
      const card = document.createElement('article');
      card.className = 'spotlight-card';
      card.setAttribute('data-slug', proj.slug);

      // Top bar
      const topbar = document.createElement('div');
      topbar.className = 'project-topbar';

      const catBadge = document.createElement('span');
      catBadge.className = `project-category-pill cat-${proj.category}`;
      catBadge.textContent = proj.badge;

      const codeIcon = document.createElement('span');
      codeIcon.style.fontFamily = 'var(--font-mono)';
      codeIcon.style.fontSize = '0.72rem';
      codeIcon.style.color = 'var(--text-dim)';
      codeIcon.textContent = `[${proj.slug}]`;

      topbar.appendChild(catBadge);
      topbar.appendChild(codeIcon);
      card.appendChild(topbar);

      // Title
      const title = document.createElement('h3');
      title.className = 'project-card-title';
      title.textContent = proj.title;
      card.appendChild(title);

      // Summary
      const summary = document.createElement('p');
      summary.className = 'project-card-summary';
      summary.textContent = proj.summary;
      card.appendChild(summary);

      // Stack tags
      const tagWrap = document.createElement('div');
      tagWrap.className = 'project-tags';
      proj.stack.forEach(s => {
        const tag = document.createElement('span');
        tag.className = 'tag-badge';
        tag.textContent = s;
        tagWrap.appendChild(tag);
      });
      card.appendChild(tagWrap);

      // Actions footer
      const actions = document.createElement('div');
      actions.className = 'project-card-actions';

      const inspectBtn = document.createElement('button');
      inspectBtn.className = 'btn-inspect-action';
      inspectBtn.setAttribute('type', 'button');
      inspectBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"></path>
        </svg>
        <span>Inspect Architecture</span>
      `;
      inspectBtn.addEventListener('click', () => openDrawer(proj.slug));

      const repoLink = document.createElement('a');
      repoLink.className = 'btn-link-action';
      repoLink.href = proj.repoUrl;
      repoLink.target = '_blank';
      repoLink.rel = 'noopener noreferrer';
      repoLink.innerHTML = `
        <span>GitHub</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      `;

      actions.appendChild(inspectBtn);
      actions.appendChild(repoLink);
      card.appendChild(actions);

      bentoGrid.appendChild(card);
    });
  }

  // ── Render Security & CTF Logs ──
  const secList = document.getElementById('security-log-list');
  if (secList) {
    secList.innerHTML = '';
    SECURITY_LOGS.forEach(log => {
      const item = document.createElement('div');
      item.className = 'security-log-item';

      const header = document.createElement('div');
      header.className = 'sec-log-header';

      const title = document.createElement('h4');
      title.className = 'sec-log-title';
      title.textContent = log.title;

      const badge = document.createElement('span');
      badge.className = 'sec-log-badge';
      badge.textContent = log.badge;

      header.appendChild(title);
      header.appendChild(badge);
      item.appendChild(header);

      const desc = document.createElement('p');
      desc.className = 'sec-log-desc';
      desc.textContent = log.summary;
      item.appendChild(desc);

      secList.appendChild(item);
    });
  }

  // ── Render Tech Stack Pills ──
  const stackWrap = document.getElementById('tech-stack-wrap');
  if (stackWrap) {
    stackWrap.innerHTML = '';
    TECH_STACK.forEach(cat => {
      const catBox = document.createElement('div');
      catBox.className = 'spotlight-card';
      catBox.style.padding = 'var(--space-5)';

      const title = document.createElement('div');
      title.className = 'drawer-heading-tag';
      title.textContent = `// ${cat.category.toUpperCase()}`;
      catBox.appendChild(title);

      const pills = document.createElement('div');
      pills.className = 'project-tags';
      cat.items.forEach(item => {
        const pill = document.createElement('span');
        pill.className = 'tag-badge';
        pill.style.fontSize = '0.74rem';
        pill.style.padding = '4px 9px';
        pill.textContent = item;
        pills.appendChild(pill);
      });
      catBox.appendChild(pills);

      stackWrap.appendChild(catBox);
    });
  }
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   3. IntersectionObserver Scroll-Spy Navigation
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function initScrollSpy() {
  const sections = document.querySelectorAll('.canvas-section');
  const navItems = document.querySelectorAll('.nav-rail-item');
  if (!sections.length || !navItems.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navItems.forEach(item => {
          const href = item.getAttribute('href');
          item.classList.toggle('active', href === `#${id}`);
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  });

  sections.forEach(sec => observer.observe(sec));
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   4. App Initialization Sequence
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function init() {
  renderDynamicContent();
  runHexScrambleReveal();
  initSpotlightCards();
  initDrawer();
  initCommandPalette();
  initTerminal();
  initScrollSpy();

  // Wire command palette trigger button in left rail
  const palBtn = document.getElementById('trigger-palette-btn');
  if (palBtn) {
    palBtn.addEventListener('click', openPalette);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
