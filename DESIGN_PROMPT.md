# Build Specification: World-Class Cybersecurity & Systems Portfolio (`omchandra.me`)

Build a complete, production-grade static portfolio website for **Om Chandra** using semantic HTML5, modular CSS3, and vanilla JavaScript (ES Modules). Do NOT use React, Tailwind, npm bundlers, or external CDN scripts—everything must run natively on GitHub Pages (`omchandra0907-jpg.github.io` with custom domain `omchandra.me`) with zero build steps and a strict Content Security Policy.

## 1. Modular File Architecture (Strictly Separate Concerns)
- `index.html` — Semantic landmarks (`<aside>` sticky left rail, `<main>` scrollable canvas, `<dialog>` architecture drawer, `<dialog>` command palette), strict CSP meta tag, and OpenGraph tags.
- `CNAME` — Single line: `omchandra.me`
- `css/tokens.css` — Design tokens (`--bg-canvas: #060911`, `--bg-card: rgba(13, 19, 33, 0.72)`, `--border-hairline: rgba(56, 189, 248, 0.16)`, `--text-primary: #e6edf3`, `--text-muted: #8b949e`, `--accent-cyan: #38bdf8`, `--accent-emerald: #34d399`), reset, subtle dot-matrix background, and `@media (prefers-reduced-motion: reduce)` rules.
- `css/layout.css` — Asymmetric sticky-rail desktop layout (`38%` left rail / `62%` right scrollable column), Bento grid rules, and responsive mobile header collapse (`< 900px`).
- `css/components.css` — Radial cursor-spotlight cards, `neofetch` telemetry widget, interactive embedded shell, category filter pills, slide-over architecture drawer, and `Ctrl+K` command palette modal.
- `js/data.js` — Single source of truth exporting `PROFILE`, `PROJECTS` (including ASCII architecture diagrams), `SECURITY_LOGS`, and `TECH_STACK`.
- `js/spotlight.js` — Tracks pointer coordinates (`pointermove`) on `.spotlight-card` elements to update `--mouse-x` and `--mouse-y` CSS variables smoothly.
- `js/terminal.js` — Interactive shell supporting `Tab` autocomplete, `ArrowUp`/`ArrowDown` history, safe DOM rendering (`textContent` only, never `innerHTML` for user input), and commands: `help`, `whoami`, `neofetch`, `ls`, `inspect <slug>`, `ctf`, `stack`, `contact`, `clear`.
- `js/palette.js` — Global `Ctrl+K` / `Cmd+K` / `/` Command Palette modal allowing instant keyboard filtering and jumping to any project, drawer, or external link.
- `js/drawer.js` — Slide-over Architecture Deep-Dive Drawer rendering the selected project's problem statement, ASCII system architecture diagram, engineering notes, stack tags, and GitHub link.
- `js/main.js` — Initializes all modules, runs the 450ms hero hex-scramble text reveal, and wires `IntersectionObserver` scroll-spy navigation.

## 2. Portfolio Content (`js/data.js`)

### Profile
- **Name:** Om Chandra
- **Headline:** B.Cyber Undergraduate @ IIT Madras
- **Sub-headline:** Low-Level Systems (C / Linux) • Applied Cryptography • Offensive & Defensive Security
- **Status:** `Open to Summer 2027 Security & Systems Internships`
- **Bio:** First-year Bachelor of Cybersecurity (B.Cyber) undergraduate at the Indian Institute of Technology Madras (2026–2030). I build security tools, cryptographic engines, and hardware simulation utilities from the metal up—writing memory-safe C parsers, modular Python toolchains, and working daily in keyboard-driven Linux environments (Arch/Hyprland, RHEL 9, Kali).
- **Telemetry (`neofetch` widget):**
  - `OS`: Arch Linux (Hyprland) / RHEL 9 / Kali
  - `INSTITUTE`: IIT Madras (B.Cyber '30)
  - `FOCUS`: Systems, Crypto, Binary RE, CTF
  - `DOMAIN`: omchandra.me
- **Links:**
  - GitHub: `https://github.com/omchandra0907-jpg`
  - LinkedIn: `https://www.linkedin.com/in/om-chandra-198812425/`

### Featured Projects
1. **`alchem-c`** (`systems`, Badge: `Pure C / Physics`)
2. **`Analyzer(VCD)`** (`systems`, Badge: `Hardware / Web`)
3. **`tracker` — Dark Web Threat Actor De-Anonymization** (`security`, Badge: `SIH 2026 Qualifier`)
4. **Real-Time Drone Intrusion Detection System (Drone IDS)** (`security`, Badge: `PUSHPAK IITB`)
5. **C Cryptography Suite & Nand2Tetris Toolchain** (`systems`, Badge: `C / Python`)
6. **Wearable Real-Time Sign Language Translator** (`hardware`, Badge: `NSS IITM`)
