# Project Specification: Personal Portfolio Website (`omchandra.me`)

## 1. Objective & Stack
Build a fast, zero-dependency, static portfolio website for **Om Chandra** using semantic HTML5, modular CSS3, and vanilla JavaScript (ES Modules). No frameworks, bundlers, or external CDNs are permitted so the site deploys directly to GitHub Pages (`omchandra0907-jpg.github.io` / `omchandra.me`) with instant load speed and a strict Content Security Policy.

## 2. File Structure (Strictly Modular)
- `index.html` — Semantic layout, CSP meta tag, accessible landmarks, and drawer modal markup.
- `CNAME` — Single line containing `omchandra.me`.
- `SPEC.md` — Project specification & architecture blueprint.
- `css/tokens.css` — CSS design tokens, reset, subtle CSS grid background, ambient effects, and responsive layout rules.
- `css/components.css` — Hero split-grid, interactive terminal widget, 3D project cards, filter pills, CTF/achievements, education timeline, and slide-over architecture drawer.
- `js/data.js` — Structured portfolio data (projects, CTF writeups, stack, education, stats).
- `js/terminal.js` — Terminal shell supporting command history, Tab autocomplete, neofetch, and interactive commands.
- `js/ui.js` — Card renderer with 3D tilt, filter controller, accessible architecture drawer with focus trapping, CTF, skills, and education timeline.
- `js/main.js` — Boot sequence, scroll progress bar, mouse cursor glow, smart nav, typewriter effect, counters, and global keyboard shortcuts.

## 3. Verified Content Data
- **Name:** Om Chandra
- **Role:** B.Cyber Undergraduate @ Indian Institute of Technology Madras (IIT Madras, 2026–2030)
- **Tagline:** Building low-level security tools, cryptographic engines, and digital logic analyzers from scratch on Linux.
- **Location:** Chennai / Munger, India
- **Links:**
  - GitHub: `https://github.com/omchandra0907-jpg`
  - LinkedIn: `https://www.linkedin.com/in/om-chandra-198812425/`
  - Domain: `https://omchandra.me`
