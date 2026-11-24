<div align="center">

# ⚡ Om Chandra (`@omchandra0907-jpg`)

### **Systems Architect • Security Researcher • Creative Technologist**

<p align="center">
  <a href="https://github.com/omchandra0907-jpg">
    <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=22&duration=3000&pause=1000&color=00E5FF&center=true&vCenter=true&width=620&lines=Low-Level+Systems+%E2%80%A2+C99+Cellular+Engines;Adaptive+Deception+%E2%80%A2+In-Memory+SSH+Sandboxes;Deniable+Steganography+%E2%80%A2+Argon2id+%26+AES-256;3D+Codebase+Metropolis+%E2%80%A2+Three.js+WebGL;Real-Time+DSP+%E2%80%A2+48-Band+FFT+%26+Acoustic+ML" alt="Typing SVG" />
  </a>
</p>

[![GitHub followers](https://img.shields.io/github/followers/omchandra0907-jpg?style=for-the-badge&logo=github&color=00e5ff&labelColor=0d1117)](https://github.com/omchandra0907-jpg)
[![Status: Active Research](https://img.shields.io/badge/Status-Active_Research-00ff88?style=for-the-badge&logo=statuspage&logoColor=00ff88&labelColor=0d1117)](https://github.com/omchandra0907-jpg)
[![Email](https://img.shields.io/badge/Contact-omchandra0907%40gmail.com-ea4335?style=for-the-badge&logo=gmail&logoColor=white&labelColor=0d1117)](mailto:omchandra0907@gmail.com)

</div>

---

### 💻 `$ whoami --extended`

```bash
om@workstation:~$ neofetch --cyberpunk
 --------------------------- 
 OS: Arch Linux x86_64 [Kernel 6.x Low-Latency Zen]
 Host: Systems Research Lab
 Uptime: 24/7/365
 Shell: zsh 5.9 + tmux
 Primary Languages: C99/C11, Python 3.10+, TypeScript 5.3+, Bash
 Core Specializations: Low-overhead systems, deception engineering, applied cryptanalysis, real-time DSP
 Architecture Philosophy: Cache locality, zero unnecessary heap allocations, single-syscall I/O
 Status: 🟢 Open for systems architecture, security research, and high-performance computing
 --------------------------- 
```

---

### 🌟 Flagship Engineering Projects

Every project is engineered for production-grade rigor, featuring modular architectures, strict unit test suites, headless CI pipelines, and **interactive live web visualizers**.

<table>
  <thead>
    <tr>
      <th width="50%">Project & Core Architecture</th>
      <th width="50%">Technical Capabilities & Live Demos</th>
    </tr>
  </thead>
  <tbody>
    <!-- Project 1: alchem-c -->
    <tr>
      <td valign="top">
        <h3>🔥 <a href="https://github.com/omchandra0907-jpg/alchem-c">alchem-c</a></h3>
        <p><strong>Terminal Falling-Sand & Chemical Reaction Engine in Pure C99</strong></p>
        <p>A cache-friendly cellular automata engine capable of simulating thousands of interacting particles at a locked 60 FPS.</p>
        <ul>
          <li><strong>Memory Layout:</strong> Contiguous 1D <code>cell_t *grid</code> array (spatial cache locality, zero pointer fragmentation).</li>
          <li><strong>Bit-Packed Cells:</strong> 4-byte struct (<code>type</code>, <code>clock</code>, <code>life</code>, <code>tint</code>).</li>
          <li><strong>Unbiased Physics:</strong> Alternating horizontal sweep direction prevents directional drift.</li>
          <li><strong>Render Engine:</strong> Single-syscall ANSI 24-bit TrueColor half-block (<code>▀</code>) compositor.</li>
        </ul>
        <p>
          <img src="https://img.shields.io/badge/C-C99-00599C?style=flat-square&logo=c" />
          <img src="https://img.shields.io/badge/Physics-Cellular_Automata-FF6D00?style=flat-square" />
          <img src="https://img.shields.io/badge/Sanitizers-ASan_%26_UBSan-00E676?style=flat-square" />
        </p>
      </td>
      <td valign="top">
        <br/>
        <p align="center">
          <a href="https://omchandra0907-jpg.github.io/alchem-c/">
            <img src="https://img.shields.io/badge/🚀_Live_Demo-Try_Online_Canvas_Lab-00E5FF?style=for-the-badge&labelColor=0d1117" alt="alchem-c Live Demo" />
          </a>
        </p>
        <p><strong>Interactive Web Visualizer:</strong> Full HTML5 Canvas falling-sand simulator featuring Sand, Water, Lava, Acid, Gunpowder, Steam, Fire, and Stone. Includes reactive explosion physics, brush resizing, and retro CRT scanlines.</p>
        <p>
          🔗 <strong>Source:</strong> <a href="https://github.com/omchandra0907-jpg/alchem-c">github.com/omchandra0907-jpg/alchem-c</a><br/>
          🌐 <strong>Online Lab:</strong> <a href="https://omchandra0907-jpg.github.io/alchem-c/">omchandra0907-jpg.github.io/alchem-c</a>
        </p>
      </td>
    </tr>
    <!-- Project 2: mirage-pot -->
    <tr>
      <td valign="top">
        <h3>🛡️ <a href="https://github.com/omchandra0907-jpg/mirage-pot">mirage-pot</a></h3>
        <p><strong>Adaptive Deception SSH Honeypot & Live Attack HUD in Python</strong></p>
        <p>An asynchronous deception environment designed to trap, track, and profile automated botnet brute-forces and human attackers.</p>
        <ul>
          <li><strong>Async Core:</strong> Non-blocking <code>asyncssh</code> server handling hundreds of concurrent brute-force sessions.</li>
          <li><strong>Stateful In-Memory VFS:</strong> Sandboxed <code>VNode</code> hierarchy isolated per attacker session with copy-on-write simulation.</li>
          <li><strong>Dynamic Canaries:</strong> On-the-fly generation of traceable credentials when reading <code>.env</code> or <code>id_rsa</code>.</li>
          <li><strong>MITRE Telemetry:</strong> Regex/AST command mapping (<code>T1082</code>, <code>T1003</code>, <code>T1105</code>) to JSONL event streams.</li>
        </ul>
        <p>
          <img src="https://img.shields.io/badge/Python-AsyncIO-3776AB?style=flat-square&logo=python" />
          <img src="https://img.shields.io/badge/Security-MITRE_ATT%26CK-E02424?style=flat-square" />
          <img src="https://img.shields.io/badge/UI-Rich_Live_HUD-7C3AED?style=flat-square" />
        </p>
      </td>
      <td valign="top">
        <br/>
        <p align="center">
          <a href="https://omchandra0907-jpg.github.io/mirage-pot/">
            <img src="https://img.shields.io/badge/🚀_Live_Demo-Interactive_Terminal_Sandbox-00E5FF?style=for-the-badge&labelColor=0d1117" alt="mirage-pot Live Demo" />
          </a>
        </p>
        <p><strong>Interactive Web SOC HUD:</strong> Simulated SSH terminal emulator + live Security Operations Center (SOC) dashboard. Features MITRE classification badges, canary alert triggers, and keystroke replay controls.</p>
        <p>
          🔗 <strong>Source:</strong> <a href="https://github.com/omchandra0907-jpg/mirage-pot">github.com/omchandra0907-jpg/mirage-pot</a><br/>
          🌐 <strong>Online Lab:</strong> <a href="https://omchandra0907-jpg.github.io/mirage-pot/">omchandra0907-jpg.github.io/mirage-pot</a>
        </p>
      </td>
    </tr>
    <!-- Project 3: ghost-drop -->
    <tr>
      <td valign="top">
        <h3>👻 <a href="https://github.com/omchandra0907-jpg/ghost-drop">ghost-drop</a></h3>
        <p><strong>Deniable Encryption & Steganographic Dead-Drop CLI in Python</strong></p>
        <p>A coercion-proof cryptographic dead-drop tool providing plausible deniability via dual authenticated payloads embedded inside PNG images.</p>
        <ul>
          <li><strong>Deniable Architecture:</strong> Decoy passphrase decrypts innocent text; real passphrase unlocks hidden sensitive data.</li>
          <li><strong>Cryptographic Framing:</strong> Argon2id KDF derivation, 16-byte random salt, and AES-256-GCM authentication.</li>
          <li><strong>Zero Collision PRNG:</strong> NumPy vectorized coordinate permutation guarantees zero overlapping LSB positions.</li>
          <li><strong>Entropy Masking:</strong> Uniform random noise (<code>os.urandom</code>) overwrites all untouched bits, achieving PSNR &gt; 51 dB.</li>
        </ul>
        <p>
          <img src="https://img.shields.io/badge/Crypto-AES--256--GCM-FFD600?style=flat-square" />
          <img src="https://img.shields.io/badge/KDF-Argon2id-00E676?style=flat-square" />
          <img src="https://img.shields.io/badge/Stego-NumPy-013243?style=flat-square&logo=numpy" />
        </p>
      </td>
      <td valign="top">
        <br/>
        <p align="center">
          <a href="https://omchandra0907-jpg.github.io/ghost-drop/">
            <img src="https://img.shields.io/badge/🚀_Live_Demo-Web_Stego_Lab-00E5FF?style=for-the-badge&labelColor=0d1117" alt="ghost-drop Live Demo" />
          </a>
        </p>
        <p><strong>Interactive Web Cryptography Lab:</strong> Client-side deniable steganography powered by Web Crypto API (AES-GCM + PBKDF2/Argon2). Test dual embedding, inspect LSB bit-plane visual representations, and verify tamper alerts.</p>
        <p>
          🔗 <strong>Source:</strong> <a href="https://github.com/omchandra0907-jpg/ghost-drop">github.com/omchandra0907-jpg/ghost-drop</a><br/>
          🌐 <strong>Online Lab:</strong> <a href="https://omchandra0907-jpg.github.io/ghost-drop/">omchandra0907-jpg.github.io/ghost-drop</a>
        </p>
      </td>
    </tr>
    <!-- Project 4: chrono-git -->
    <tr>
      <td valign="top">
        <h3>🏙️ <a href="https://github.com/omchandra0907-jpg/chrono-git">chrono-git</a></h3>
        <p><strong>3D Git Repository Time-Machine & City Visualizer in TypeScript</strong></p>
        <p>Renders codebases as evolving 3D neon metropolises using squarified treemaps, WebGL shaders, and GPU instancing.</p>
        <ul>
          <li><strong>Treemap Engine:</strong> Pure TypeScript squarified treemap layout conserving hierarchical directory boundaries.</li>
          <li><strong>GPU Instancing:</strong> Renders entire repository structures within a single <code>THREE.InstancedMesh</code> at 60 FPS.</li>
          <li><strong>Building Metrics:</strong> <code>Math.log2(LOC + 1)</code> mapped to building height; neon emissive decay highlights recent commits.</li>
          <li><strong>Timeline Scrubber:</strong> Scrub backward and forward across repository commit histories in interactive 3D space.</li>
        </ul>
        <p>
          <img src="https://img.shields.io/badge/TypeScript-5.3-3178C6?style=flat-square&logo=typescript" />
          <img src="https://img.shields.io/badge/3D-Three.js-000000?style=flat-square&logo=threedotjs" />
          <img src="https://img.shields.io/badge/Build-Vite-646CFF?style=flat-square&logo=vite" />
        </p>
      </td>
      <td valign="top">
        <br/>
        <p align="center">
          <a href="https://omchandra0907-jpg.github.io/chrono-git/">
            <img src="https://img.shields.io/badge/🚀_Live_Demo-3D_City_Visualizer-00E5FF?style=for-the-badge&labelColor=0d1117" alt="chrono-git Live Demo" />
          </a>
        </p>
        <p><strong>Interactive 3D WebGL City Scroller:</strong> Direct in-browser 3D codebase visualizer with Three.js orbit controls, camera pan/zoom, commit scrubber, building inspection cards, and instant repo URL ingestion.</p>
        <p>
          🔗 <strong>Source:</strong> <a href="https://github.com/omchandra0907-jpg/chrono-git">github.com/omchandra0907-jpg/chrono-git</a><br/>
          🌐 <strong>Online Lab:</strong> <a href="https://omchandra0907-jpg.github.io/chrono-git/">omchandra0907-jpg.github.io/chrono-git</a>
        </p>
      </td>
    </tr>
    <!-- Project 5: beat-lens -->
    <tr>
      <td valign="top">
        <h3>🎵 <a href="https://github.com/omchandra0907-jpg/beat-lens">beat-lens</a></h3>
        <p><strong>Real-Time 48-Band Audio Visualizer & Mood Classifier in Python</strong></p>
        <p>A dual-rate acoustic signal processing pipeline combining real-time frequency analysis with machine-learning mood classification.</p>
        <ul>
          <li><strong>Lock-Free Ingestion:</strong> Continuous circular audio ring buffer for zero-latency microphone and audio stream handling.</li>
          <li><strong>48-Band Log rFFT:</strong> 2048-point Hann-windowed FFT mapped to 48 logarithmic bands mirroring human cochlear response.</li>
          <li><strong>Two-Speed Architecture:</strong> 60 Hz visual TrueColor bar animation thread + 2 Hz ML acoustic inference worker.</li>
          <li><strong>Acoustic Model:</strong> RandomForestClassifier with 13 MFCCs, spectral centroid, flux, and RMS predicting High-Energy, Chill, Lo-Fi, and Cinematic.</li>
        </ul>
        <p>
          <img src="https://img.shields.io/badge/DSP-Fast_Fourier_Transform-00E5FF?style=flat-square" />
          <img src="https://img.shields.io/badge/ML-Scikit--Learn-F7931E?style=flat-square&logo=scikitlearn" />
          <img src="https://img.shields.io/badge/Audio-MFCC-4B8BBE?style=flat-square" />
        </p>
      </td>
      <td valign="top">
        <br/>
        <p align="center">
          <a href="https://omchandra0907-jpg.github.io/beat-lens/">
            <img src="https://img.shields.io/badge/🚀_Live_Demo-Web_Audio_Synth_Lab-00E5FF?style=for-the-badge&labelColor=0d1117" alt="beat-lens Live Demo" />
          </a>
        </p>
        <p><strong>Interactive Web Audio Spectrum & Synth:</strong> Real-time 48-band Web Audio API analyzer with peak-hold decay, live microphone input, built-in synthwave melody generator, and dynamic acoustic mood predictor.</p>
        <p>
          🔗 <strong>Source:</strong> <a href="https://github.com/omchandra0907-jpg/beat-lens">github.com/omchandra0907-jpg/beat-lens</a><br/>
          🌐 <strong>Online Lab:</strong> <a href="https://omchandra0907-jpg.github.io/beat-lens/">omchandra0907-jpg.github.io/beat-lens</a>
        </p>
      </td>
    </tr>
  </tbody>
</table>

---

### 🛠️ Architecture & Technical Skills

<div align="center">

| Technical Domain | Core Competencies, Languages & Frameworks |
|:---|:---|
| **Low-Level Systems** | `C (C99/C11)`, `POSIX APIs`, `termios`, `Linux Kernel Internals`, `Memory Cache Locality`, `Zero-Copy Buffers`, `Valgrind`, `AddressSanitizer (ASan)`, `UndefinedBehaviorSanitizer (UBSan)`, `GNU Make` |
| **Cybersecurity & Deception** | `Adaptive Honeypots`, `In-Memory POSIX VFS`, `Canary Token Injection`, `MITRE ATT&CK Mapping`, `Intrusion Analysis`, `Network Protocol Emulation (SSH)`, `Reverse Engineering` |
| **Applied Cryptography** | `Argon2id KDF`, `AES-256-GCM`, `ChaCha20-Poly1305`, `LSB Steganography`, `Cryptographic PRNG Scattering`, `Entropy & Chi-Square Statistical Analysis` |
| **3D Graphics & Visual Computing** | `TypeScript`, `Three.js`, `WebGL`, `GPU Instancing (InstancedMesh)`, `Squarified Treemaps`, `GLSL Shaders`, `Canvas API`, `Vite`, `Vitest` |
| **Signal Processing & ML** | `Fast Fourier Transform (rFFT)`, `Hann/Hamming Windowing`, `Logarithmic Filterbanks`, `MFCCs`, `Spectral Flux`, `NumPy`, `SciPy`, `scikit-learn`, `Circular Ring Buffers` |