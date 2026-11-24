// js/terminal.js — Interactive Embedded TUI Shell

import { PROFILE, PROJECTS, SECURITY_LOGS, TECH_STACK } from './data.js';
import { openDrawer } from './drawer.js';

const VALID_COMMANDS = ['help', 'whoami', 'neofetch', 'ls', 'inspect', 'ctf', 'stack', 'contact', 'clear'];

export function initTerminal() {
  const container = document.getElementById('terminal-container');
  const outputEl = document.getElementById('terminal-output');
  const inputEl = document.getElementById('terminal-cli-input');
  if (!container || !outputEl || !inputEl) return;

  const history = [];
  let historyIdx = -1;

  function appendLine(textContent, type = 'normal') {
    const p = document.createElement('div');
    p.className = 'terminal-line';

    if (type === 'cmd') {
      p.className += ' term-cmd-txt';
    } else if (type === 'err') {
      p.className += ' term-err-txt';
    } else if (type === 'ok') {
      p.className += ' term-ok-txt';
    }

    p.textContent = textContent;
    outputEl.appendChild(p);
    outputEl.scrollTop = outputEl.scrollHeight;
  }

  function appendPromptEcho(cmd) {
    const p = document.createElement('div');
    p.className = 'terminal-line';

    const promptSpan = document.createElement('span');
    promptSpan.className = 'term-prompt-txt';
    promptSpan.textContent = 'om@iitm:~$ ';

    const cmdSpan = document.createElement('span');
    cmdSpan.className = 'term-cmd-txt';
    cmdSpan.textContent = cmd;

    p.appendChild(promptSpan);
    p.appendChild(cmdSpan);
    outputEl.appendChild(p);
    outputEl.scrollTop = outputEl.scrollHeight;
  }

  function execute(rawCmd) {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    appendPromptEcho(trimmed);

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').toLowerCase();

    switch (cmd) {
      case 'help':
        appendLine('Available shell commands:');
        appendLine('  whoami          — Identity & affiliations');
        appendLine('  neofetch        — System architecture & specs');
        appendLine('  ls              — List projects and portfolio nodes');
        appendLine('  inspect <slug>  — Open deep-dive architecture drawer');
        appendLine('  ctf             — Security writeups & exploit suite');
        appendLine('  stack           — Technical engineering stack');
        appendLine('  contact         — Direct contact channels');
        appendLine('  clear           — Clear shell display');
        break;

      case 'whoami':
        appendLine(`${PROFILE.name} — ${PROFILE.headline}`);
        appendLine(PROFILE.subHeadline);
        appendLine(`Status: ${PROFILE.status}`);
        appendLine(PROFILE.bio);
        break;

      case 'neofetch':
        appendLine('        ___       om@iitm');
        appendLine('       /   \\      -------');
        appendLine(`      /  ●  \\     OS: ${PROFILE.telemetry.os}`);
        appendLine(`     /   |   \\    INSTITUTE: ${PROFILE.telemetry.institute}`);
        appendLine(`    /    |    \\   FOCUS: ${PROFILE.telemetry.focus}`);
        appendLine(`   /_____|_____\\  DOMAIN: ${PROFILE.telemetry.domain}`);
        appendLine(`                  STATUS: ${PROFILE.status}`);
        break;

      case 'ls':
        appendLine('Featured Builds:');
        PROJECTS.forEach(p => {
          appendLine(`  ${p.slug.padEnd(20)} [${p.category.toUpperCase()}] ${p.title}`);
        });
        appendLine('\nTip: run `inspect <slug>` to open the architecture drawer.');
        break;

      case 'inspect':
        if (!arg) {
          appendLine('Error: inspect requires a project slug.', 'err');
          appendLine(`Available slugs: ${PROJECTS.map(p => p.slug).join(', ')}`);
          return;
        }
        const match = PROJECTS.find(p => p.slug.toLowerCase() === arg);
        if (match) {
          appendLine(`[+] Opening architecture drawer for ${match.title}...`, 'ok');
          openDrawer(match.slug);
        } else {
          appendLine(`Error: unknown project '${arg}'.`, 'err');
          appendLine(`Available slugs: ${PROJECTS.map(p => p.slug).join(', ')}`);
        }
        break;

      case 'ctf':
        appendLine('Security Research & CTF Highlights:');
        SECURITY_LOGS.forEach(log => {
          appendLine(`* [${log.date}] ${log.title} (${log.badge})`);
          appendLine(`  ${log.summary}`);
        });
        break;

      case 'stack':
        TECH_STACK.forEach(cat => {
          appendLine(`\n[${cat.category}]`);
          appendLine(`  ${cat.items.join(' • ')}`);
        });
        break;

      case 'contact':
        appendLine(`Email:    ${PROFILE.links.email.replace('mailto:', '')}`);
        appendLine(`GitHub:   ${PROFILE.links.github}`);
        appendLine(`LinkedIn: ${PROFILE.links.linkedin}`);
        break;

      case 'clear':
        outputEl.innerHTML = '';
        return;

      default:
        appendLine(`zsh: command not found: ${cmd}. Type 'help' for available commands.`, 'err');
        break;
    }

    appendLine('');
  }

  // Initial welcome message
  appendLine('Om Chandra Systems & Security Embedded Shell (v2.6.4)');
  appendLine("Type 'help' or 'neofetch' to begin. Press Tab for autocomplete.\n");

  // Input event handling
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = inputEl.value;
      if (val.trim()) {
        history.push(val);
        historyIdx = history.length;
        execute(val);
      }
      inputEl.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length && historyIdx > 0) {
        historyIdx--;
        inputEl.value = history[historyIdx];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (history.length && historyIdx < history.length - 1) {
        historyIdx++;
        inputEl.value = history[historyIdx];
      } else {
        historyIdx = history.length;
        inputEl.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const val = inputEl.value.trim().toLowerCase();
      if (!val) return;

      const words = val.split(/\s+/);
      if (words.length === 1) {
        const match = VALID_COMMANDS.find(c => c.startsWith(words[0]));
        if (match) inputEl.value = match;
      } else if (words.length === 2 && words[0] === 'inspect') {
        const slugMatch = PROJECTS.map(p => p.slug).find(s => s.startsWith(words[1]));
        if (slugMatch) inputEl.value = `inspect ${slugMatch}`;
      }
    }
  });
}
