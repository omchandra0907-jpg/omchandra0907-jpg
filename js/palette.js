// js/palette.js — Global Command Palette (Ctrl+K / Cmd+K / /)

import { PROJECTS, PROFILE } from './data.js';
import { openDrawer } from './drawer.js';

let selectedIndex = 0;
let filteredItems = [];

const COMMAND_ACTIONS = [
  // Sections
  { id: 'sec-about', label: 'Jump to: About & Background', category: 'Section', action: () => scrollToSection('about') },
  { id: 'sec-builds', label: 'Jump to: Featured Builds', category: 'Section', action: () => scrollToSection('builds') },
  { id: 'sec-security', label: 'Jump to: Security & CTF Logs', category: 'Section', action: () => scrollToSection('security') },
  { id: 'sec-stack', label: 'Jump to: Technical Stack', category: 'Section', action: () => scrollToSection('stack') },
  { id: 'sec-terminal', label: 'Jump to: Interactive Shell', category: 'Section', action: () => scrollToSection('terminal') },

  // Projects architecture inspection
  ...PROJECTS.map(p => ({
    id: `inspect-${p.slug}`,
    label: `Inspect: ${p.title}`,
    category: 'Architecture',
    action: () => openDrawer(p.slug)
  })),

  // External Links
  { id: 'ext-gh', label: 'Open GitHub Profile', category: 'External', action: () => window.open(PROFILE.links.github, '_blank') },
  { id: 'ext-li', label: 'Open LinkedIn Profile', category: 'External', action: () => window.open(PROFILE.links.linkedin, '_blank') },
  { id: 'ext-em', label: 'Send Email to Om Chandra', category: 'External', action: () => window.location.href = PROFILE.links.email }
];

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

export function openPalette() {
  const dialog = document.getElementById('cmd-palette');
  const input = document.getElementById('palette-search-input');
  if (!dialog || !input) return;

  input.value = '';
  renderResults('');

  if (!dialog.open) {
    dialog.showModal();
    input.focus();
  }
}

export function closePalette() {
  const dialog = document.getElementById('cmd-palette');
  if (dialog && dialog.open) {
    dialog.close();
  }
}

function renderResults(query) {
  const container = document.getElementById('palette-results-list');
  if (!container) return;

  const q = query.trim().toLowerCase();
  filteredItems = COMMAND_ACTIONS.filter(item => {
    if (!q) return true;
    return item.label.toLowerCase().includes(q) || item.category.toLowerCase().includes(q);
  });

  selectedIndex = 0;
  container.innerHTML = '';

  if (!filteredItems.length) {
    const empty = document.createElement('div');
    empty.style.padding = '16px';
    empty.style.color = 'var(--text-muted)';
    empty.style.fontFamily = 'var(--font-mono)';
    empty.style.fontSize = '0.8rem';
    empty.textContent = 'No matching actions or commands found.';
    container.appendChild(empty);
    return;
  }

  filteredItems.forEach((item, idx) => {
    const btn = document.createElement('button');
    btn.className = `palette-item${idx === selectedIndex ? ' selected' : ''}`;
    btn.setAttribute('type', 'button');

    const labelSpan = document.createElement('span');
    labelSpan.textContent = item.label;

    const tagSpan = document.createElement('span');
    tagSpan.className = 'palette-item-tag';
    tagSpan.textContent = item.category;

    btn.appendChild(labelSpan);
    btn.appendChild(tagSpan);

    btn.addEventListener('click', () => {
      closePalette();
      item.action();
    });

    btn.addEventListener('mouseenter', () => {
      selectedIndex = idx;
      updateSelectedVisual();
    });

    container.appendChild(btn);
  });
}

function updateSelectedVisual() {
  const container = document.getElementById('palette-results-list');
  if (!container) return;
  const items = container.querySelectorAll('.palette-item');
  items.forEach((item, idx) => {
    item.classList.toggle('selected', idx === selectedIndex);
    if (idx === selectedIndex) {
      item.scrollIntoView({ block: 'nearest' });
    }
  });
}

export function initCommandPalette() {
  const dialog = document.getElementById('cmd-palette');
  const input = document.getElementById('palette-search-input');
  if (!dialog || !input) return;

  // Search input handler
  input.addEventListener('input', (e) => {
    renderResults(e.target.value);
  });

  // Keyboard navigation within palette
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (filteredItems.length > 0) {
        selectedIndex = (selectedIndex + 1) % filteredItems.length;
        updateSelectedVisual();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (filteredItems.length > 0) {
        selectedIndex = (selectedIndex - 1 + filteredItems.length) % filteredItems.length;
        updateSelectedVisual();
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        const action = filteredItems[selectedIndex].action;
        closePalette();
        action();
      }
    }
  });

  // Light dismiss on backdrop click
  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX && e.clientX <= rect.left + rect.width
    );
    if (!isInDialog) {
      closePalette();
    }
  });

  // Global hotkeys: Ctrl+K, Cmd+K, or Slash (/) when not in an input
  document.addEventListener('keydown', (e) => {
    const targetTag = e.target.tagName ? e.target.tagName.toLowerCase() : '';
    const isEditing = targetTag === 'input' || targetTag === 'textarea' || e.target.isContentEditable;

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (dialog.open) closePalette();
      else openPalette();
      return;
    }

    if (e.key === '/' && !isEditing) {
      e.preventDefault();
      if (!dialog.open) openPalette();
    }
  });
}
