// js/ui.js — Card renderer, filter, drawer, timeline, skills

import { PROJECTS, CTF_HIGHLIGHTS, SKILLS, EDUCATION } from './data.js';

/* ── Helpers ── */
function el(tag, cls, attrs = {}) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
  return e;
}
function txt(s) { return document.createTextNode(s); }

function badgeCls(cat) {
  switch (cat) {
    case 'security': return 'badge-security';
    case 'systems':  return 'badge-systems';
    case 'hardware': return 'badge-hardware';
    default:         return 'badge-default';
  }
}

/* ═══════════════════════════════════════════════════════════════
   PROJECT GRID
   ═══════════════════════════════════════════════════════════════ */

let focusIdx = -1;

function buildCard(proj, idx) {
  const card = el('article', 'project-card reveal');
  card.setAttribute('role', 'listitem');
  card.setAttribute('data-category', proj.category);
  card.setAttribute('data-slug', proj.slug);
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', proj.title);
  card.style.transitionDelay = `${idx * 80}ms`;

  // Watermark number
  const num = el('span', 'project-num');
  num.textContent = String(idx + 1).padStart(2, '0');
  card.appendChild(num);

  // Top row
  const top = el('div', 'project-card-top');
  const iconBox = el('span', 'project-icon');
  iconBox.textContent = proj.icon;
  top.appendChild(iconBox);
  const badge = el('span', `project-badge ${badgeCls(proj.category)}`);
  badge.textContent = proj.badge;
  top.appendChild(badge);
  card.appendChild(top);

  // Title
  const title = el('h3', 'project-title');
  title.textContent = proj.title;
  card.appendChild(title);

  // Summary
  const summary = el('p', 'project-summary');
  summary.textContent = proj.summary;
  card.appendChild(summary);

  // Stack
  const stack = el('div', 'project-stack');
  proj.stack.forEach(s => {
    const pill = el('span', 'stack-pill');
    pill.textContent = s;
    stack.appendChild(pill);
  });
  card.appendChild(stack);

  // Footer
  const footer = el('div', 'project-card-footer');

  const inspectBtn = el('button', 'btn-inspect', { type: 'button', 'aria-label': `Inspect architecture of ${proj.title}` });
  inspectBtn.innerHTML =
    '<svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>';
  inspectBtn.appendChild(txt(' Inspect'));
  footer.appendChild(inspectBtn);

  const repo = el('a', 'icon-link', { href: proj.repoUrl, target: '_blank', rel: 'noopener noreferrer', 'aria-label': `${proj.title} on GitHub` });
  repo.innerHTML =
    '<svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>';
  repo.appendChild(txt(' GitHub'));
  footer.appendChild(repo);

  card.appendChild(footer);

  // Events
  inspectBtn.addEventListener('click', () => openDrawer(proj.slug));
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDrawer(proj.slug); }
  });

  // 3D tilt on hover (desktop only)
  if (window.matchMedia('(hover: hover)').matches) {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      card.style.transform = `translateY(-4px) perspective(800px) rotateY(${x * 2.5}deg) rotateX(${-y * 2.5}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  }

  return card;
}

export function renderProjects(filter = 'all') {
  const grid = document.getElementById('project-grid');
  if (!grid) return;
  grid.innerHTML = '';
  focusIdx = -1;
  const list = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === filter);
  list.forEach((proj, i) => {
    const card = buildCard(proj, i);
    grid.appendChild(card);
    requestAnimationFrame(() => requestAnimationFrame(() => card.classList.add('visible')));
  });
}

export function navigateProjects(dir) {
  const grid = document.getElementById('project-grid');
  if (!grid) return;
  const cards = Array.from(grid.querySelectorAll('.project-card'));
  if (!cards.length) return;
  cards.forEach(c => c.classList.remove('focused'));
  if (dir === 'next') focusIdx = (focusIdx + 1) % cards.length;
  else focusIdx = (focusIdx - 1 + cards.length) % cards.length;
  const card = cards[focusIdx];
  card.classList.add('focused');
  card.focus();
  card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ═══════════════════════════════════════════════════════════════
   ARCHITECTURE DRAWER
   ═══════════════════════════════════════════════════════════════ */

let prevFocus = null;

export function openDrawer(slug) {
  const proj = PROJECTS.find(p => p.slug === slug);
  if (!proj) return;
  prevFocus = document.activeElement;
  const drawer   = document.getElementById('arch-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  const title    = document.getElementById('drawer-title');
  const body     = document.getElementById('drawer-body');
  if (!drawer || !backdrop || !title || !body) return;

  title.textContent = proj.title;
  body.innerHTML = '';

  // Badge row
  const metaRow = el('div', 'drawer-stack');
  const b = el('span', `project-badge ${badgeCls(proj.category)}`);
  b.textContent = proj.badge;
  metaRow.appendChild(b);
  const catPill = el('span', `project-badge badge-default`);
  catPill.textContent = proj.category;
  metaRow.appendChild(catPill);
  body.appendChild(metaRow);

  // Architecture
  const archLbl = el('span', 'drawer-section-label');
  archLbl.textContent = 'Architecture Notes';
  body.appendChild(archLbl);
  const archBlock = el('p', 'drawer-arch-text');
  archBlock.textContent = proj.architectureNotes;
  body.appendChild(archBlock);

  // Stack
  const stackLbl = el('span', 'drawer-section-label');
  stackLbl.textContent = 'Technology Stack';
  body.appendChild(stackLbl);
  const stackRow = el('div', 'drawer-stack');
  proj.stack.forEach(s => {
    const p = el('span', 'drawer-stack-pill');
    p.textContent = s;
    stackRow.appendChild(p);
  });
  body.appendChild(stackRow);

  // Repo CTA
  const repoBtn = el('a', 'btn-repo', { href: proj.repoUrl, target: '_blank', rel: 'noopener noreferrer' });
  repoBtn.innerHTML =
    '<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>';
  repoBtn.appendChild(txt(' View on GitHub'));
  body.appendChild(repoBtn);

  // Open
  drawer.setAttribute('aria-hidden', 'false');
  backdrop.classList.add('open');
  drawer.classList.add('open');
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => document.getElementById('drawer-close-btn')?.focus());
  drawer.addEventListener('keydown', trapFocus);
}

export function closeDrawer() {
  const drawer   = document.getElementById('arch-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  if (!drawer || !backdrop) return;
  drawer.classList.remove('open');
  backdrop.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  drawer.removeEventListener('keydown', trapFocus);
  if (prevFocus?.focus) prevFocus.focus();
}

function trapFocus(e) {
  const drawer = document.getElementById('arch-drawer');
  if (!drawer) return;
  const focusable = Array.from(drawer.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'));
  if (!focusable.length) return;
  if (e.key === 'Tab') {
    if (e.shiftKey && document.activeElement === focusable[0]) { e.preventDefault(); focusable.at(-1).focus(); }
    else if (!e.shiftKey && document.activeElement === focusable.at(-1)) { e.preventDefault(); focusable[0].focus(); }
  }
}

/* ═══════════════════════════════════════════════════════════════
   CTF
   ═══════════════════════════════════════════════════════════════ */
export function renderCtfSection() {
  const container = document.getElementById('ctf-section');
  if (!container) return;
  const grid = el('div', 'ctf-grid');
  CTF_HIGHLIGHTS.forEach(c => {
    const card = el('div', 'ctf-card');
    const ev = el('span', 'ctf-event-name');
    ev.textContent = c.event;
    card.appendChild(ev);
    const t = el('h3', 'ctf-title');
    t.textContent = c.title;
    card.appendChild(t);
    const d = el('p', 'ctf-desc');
    d.textContent = c.description;
    card.appendChild(d);
    const tags = el('div', 'ctf-tags');
    c.tags.forEach(t => {
      const tag = el('span', 'ctf-tag');
      tag.textContent = t;
      tags.appendChild(tag);
    });
    card.appendChild(tags);
    grid.appendChild(card);
  });
  container.appendChild(grid);
}

/* ═══════════════════════════════════════════════════════════════
   SKILLS
   ═══════════════════════════════════════════════════════════════ */
export function renderSkillsSection() {
  const container = document.getElementById('skills-section');
  if (!container) return;
  const grid = el('div', 'skills-grid');
  SKILLS.forEach(cat => {
    const section = el('div', 'skills-category');
    const icon = el('div', `skills-cat-icon ${cat.colorClass}`);
    icon.textContent = cat.icon;
    section.appendChild(icon);
    const label = el('span', 'skills-cat-label');
    label.textContent = cat.category;
    section.appendChild(label);
    const list = el('ul', 'skills-list', { role: 'list' });
    cat.items.forEach(item => {
      const li = el('li', 'skill-item', { role: 'listitem' });
      li.textContent = item;
      list.appendChild(li);
    });
    section.appendChild(list);
    grid.appendChild(section);
  });
  container.appendChild(grid);
}

/* ═══════════════════════════════════════════════════════════════
   EDUCATION TIMELINE
   ═══════════════════════════════════════════════════════════════ */
export function renderEducation() {
  const container = document.getElementById('education-section');
  if (!container) return;
  const timeline = el('div', 'timeline');
  EDUCATION.forEach(item => {
    const wrapper = el('div', 'timeline-item');
    const dot = el('div', `timeline-dot${item.active ? ' active' : ''}`);
    wrapper.appendChild(dot);
    const content = el('div', 'timeline-content');
    const year = el('span', 'timeline-year');
    year.textContent = item.year;
    content.appendChild(year);
    const title = el('h3', 'timeline-title');
    title.textContent = item.title;
    content.appendChild(title);
    const org = el('span', 'mono muted', { style: 'font-size:0.78rem; display:block; margin-bottom:0.5rem' });
    org.textContent = item.org;
    content.appendChild(org);
    const desc = el('p', 'timeline-desc');
    desc.textContent = item.description;
    content.appendChild(desc);
    wrapper.appendChild(content);
    timeline.appendChild(wrapper);
  });
  container.appendChild(timeline);
}

/* ═══════════════════════════════════════════════════════════════
   FILTER BAR
   ═══════════════════════════════════════════════════════════════ */
export function initFilterBar() {
  const bar = document.querySelector('.filter-bar');
  if (!bar) return;
  bar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    bar.querySelectorAll('.filter-btn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');
    renderProjects(btn.dataset.filter || 'all');
  });
}

export function activateFilter(idx) {
  const bar = document.querySelector('.filter-bar');
  if (!bar) return;
  const btns = Array.from(bar.querySelectorAll('.filter-btn'));
  if (idx >= 0 && idx < btns.length) btns[idx].click();
}
