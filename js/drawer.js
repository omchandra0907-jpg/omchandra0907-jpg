// js/drawer.js — Slide-over Architecture Deep-Dive Drawer

import { PROJECTS } from './data.js';

let activeDrawerSlug = null;

export function openDrawer(slug) {
  const proj = PROJECTS.find(p => p.slug === slug);
  if (!proj) return;

  activeDrawerSlug = slug;
  const dialog = document.getElementById('arch-drawer');
  const titleEl = document.getElementById('drawer-title');
  const bodyEl = document.getElementById('drawer-body');
  if (!dialog || !titleEl || !bodyEl) return;

  titleEl.textContent = proj.title;
  bodyEl.innerHTML = '';

  // Problem statement section
  const probSection = document.createElement('div');
  const probHeading = document.createElement('div');
  probHeading.className = 'drawer-heading-tag';
  probHeading.textContent = '// PROBLEM & SYSTEM OBJECTIVE';
  const probText = document.createElement('p');
  probText.className = 'drawer-text';
  probText.textContent = proj.problem || proj.summary;
  probSection.appendChild(probHeading);
  probSection.appendChild(probText);
  bodyEl.appendChild(probSection);

  // ASCII Architecture Diagram
  if (proj.asciiDiagram) {
    const diagSection = document.createElement('div');
    const diagHeading = document.createElement('div');
    diagHeading.className = 'drawer-heading-tag';
    diagHeading.textContent = '// SYSTEM ARCHITECTURE TOPOLOGY';
    const pre = document.createElement('pre');
    pre.className = 'ascii-diagram-block';
    pre.textContent = proj.asciiDiagram.trim();
    diagSection.appendChild(diagHeading);
    diagSection.appendChild(pre);
    bodyEl.appendChild(diagSection);
  }

  // Implementation highlights
  if (proj.highlights && proj.highlights.length) {
    const hlSection = document.createElement('div');
    const hlHeading = document.createElement('div');
    hlHeading.className = 'drawer-heading-tag';
    hlHeading.textContent = '// ENGINEERING & MEMORY IMPLEMENTATION';
    const ul = document.createElement('ul');
    ul.style.listStyle = 'none';
    ul.style.display = 'flex';
    ul.style.flexDirection = 'column';
    ul.style.gap = '8px';

    proj.highlights.forEach(h => {
      const li = document.createElement('li');
      li.className = 'drawer-text';
      li.style.display = 'flex';
      li.style.gap = '8px';
      const bullet = document.createElement('span');
      bullet.style.color = 'var(--accent-cyan)';
      bullet.textContent = '›';
      const text = document.createElement('span');
      text.textContent = h;
      li.appendChild(bullet);
      li.appendChild(text);
      ul.appendChild(li);
    });
    hlSection.appendChild(hlHeading);
    hlSection.appendChild(ul);
    bodyEl.appendChild(hlSection);
  }

  // Tech stack pills
  const stackSection = document.createElement('div');
  const stackHeading = document.createElement('div');
  stackHeading.className = 'drawer-heading-tag';
  stackHeading.textContent = '// TECHNOLOGY STACK';
  const tagWrap = document.createElement('div');
  tagWrap.className = 'project-tags';
  proj.stack.forEach(s => {
    const tag = document.createElement('span');
    tag.className = 'tag-badge';
    tag.textContent = s;
    tagWrap.appendChild(tag);
  });
  stackSection.appendChild(stackHeading);
  stackSection.appendChild(tagWrap);
  bodyEl.appendChild(stackSection);

  // GitHub action button
  const actionRow = document.createElement('div');
  actionRow.style.paddingTop = 'var(--space-4)';
  const repoBtn = document.createElement('a');
  repoBtn.className = 'btn-inspect-action';
  repoBtn.href = proj.repoUrl;
  repoBtn.target = '_blank';
  repoBtn.rel = 'noopener noreferrer';
  repoBtn.innerHTML = `
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
    <span>Explore Source on GitHub</span>
  `;
  actionRow.appendChild(repoBtn);
  bodyEl.appendChild(actionRow);

  // Open native dialog
  if (!dialog.open) {
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  }
}

export function closeDrawer() {
  const dialog = document.getElementById('arch-drawer');
  if (dialog && dialog.open) {
    dialog.close();
    document.body.style.overflow = '';
    activeDrawerSlug = null;
  }
}

export function initDrawer() {
  const dialog = document.getElementById('arch-drawer');
  const closeBtn = document.getElementById('drawer-close-btn');
  if (!dialog) return;

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  // Light dismiss on backdrop click
  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX && e.clientX <= rect.left + rect.width
    );
    if (!isInDialog) {
      closeDrawer();
    }
  });

  dialog.addEventListener('close', () => {
    document.body.style.overflow = '';
  });
}
