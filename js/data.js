// js/data.js — Single Source of Truth for Portfolio

export const PROFILE = {
  name: "Om Chandra",
  headline: "B.Cyber Undergraduate @ IIT Madras",
  subHeadline: "Low-Level Systems (C / Linux) • Applied Cryptography • Offensive & Defensive Security",
  status: "Open to Summer 2027 Security & Systems Internships",
  bio: "First-year Bachelor of Cybersecurity (B.Cyber) undergraduate at the Indian Institute of Technology Madras (2026–2030). I build security tools, cryptographic engines, and hardware simulation utilities from the metal up—writing memory-safe C parsers, modular Python toolchains, and working daily in keyboard-driven Linux environments (Arch/Hyprland, RHEL 9, Kali).",
  telemetry: {
    os: "Arch Linux (Hyprland) / RHEL 9 / Kali",
    institute: "IIT Madras (B.Cyber '30)",
    focus: "Systems, Crypto, Binary RE, CTF",
    domain: "omchandra.me"
  },
  links: {
    github: "https://github.com/omchandra0907-jpg",
    linkedin: "https://www.linkedin.com/in/om-chandra-198812425/",
    email: "mailto:omchandra0907@gmail.com"
  }
};

export const PROJECTS = [
  {
    slug: "alchem-c",
    title: "alchem-c — Terminal Falling Sand & Physics Engine",
    category: "systems",
    badge: "Pure C / Physics",
    summary: "Terminal falling-sand and chemical reaction physics engine rendered at 60 FPS using Unicode half-blocks (▀) and 24-bit ANSI true-color escape sequences.",
    repoUrl: "https://github.com/omchandra0907-jpg/alchem-c",
    problem: "Real-time cellular automata in terminal emulators suffer from heavy I/O tearing and memory bandwidth saturation when processing multi-thousand cell grids at 60Hz.",
    highlights: [
      "Bit-packed 4-byte cell_t structs (type, velocity, color, state flags) minimizing cache misses on L1/L2 caches.",
      "Cache-friendly 1D flat grid indexing: idx = y * WIDTH + x.",
      "Alternating scan direction per tick to prevent directional bias in fluid and sand dispersion.",
      "Zero-flicker double-buffered frame outputting entire frames in a single POSIX write() syscall.",
      "Built with strict memory safety: compiled cleanly under AddressSanitizer (ASan) and UndefinedBehaviorSanitizer (UBSan)."
    ],
    stack: ["C99", "POSIX API", "ANSI TrueColor", "Physics Simulation", "ASan/UBSan"],
    asciiDiagram: `
  +------------------ alchem-c System Pipeline -------------------+
  |                                                               |
  |  [SGR Mouse Event] ---> [Event Parser] ---> [Brush Ingestion] |
  |                                                    |          |
  |                                                    v          |
  |     +-------------------+              +--------------------+ |
  |     |  State Grid A     |<--- Tick --->|  State Grid B      | |
  |     |  1D Flat cell_t[] |              |  Double Buffered   | |
  |     +-------------------+              +--------------------+ |
  |               |                                  |            |
  |               +-------------> [Cellular Physics] <+           |
  |                               [Gravity / Fluid / React]       |
  |                                        |                      |
  |                                        v                      |
  |                       +----------------------------------+    |
  |                       | ANSI Frame Buffer (Unicode ▀)    |    |
  |                       +----------------------------------+    |
  |                                        |                      |
  |                                        v                      |
  |                       [Single write() to /dev/tty @ 60 FPS]   |
  +---------------------------------------------------------------+`
  },
  {
    slug: "analyzer-vcd",
    title: "Analyzer(VCD) — Digital Waveform Engine",
    category: "systems",
    badge: "Hardware / Web",
    summary: "Zero-dependency browser digital logic waveform analyzer that parses IEEE .vcd dump files and compiles Nand2Tetris .out hardware simulation tables on the fly.",
    repoUrl: "https://github.com/omchandra0907-jpg/Analyzer-VCD-",
    problem: "Hardware developers running HDL simulations often rely on heavy desktop software (GTKWave) rather than instant browser inspection for Nand2Tetris or Verilog test benches.",
    highlights: [
      "Finite-state VCD token parser with zero external dependencies.",
      "Tabular-to-event hardware simulation compiler with synchronized timing buses.",
      "Dual-cursor delta-time (Δt) measurement engine for pulse-width and clock skew calculation.",
      "Touchpad velocity-dampened zoom and pan canvas renderer."
    ],
    stack: ["JavaScript (ES-M)", "HTML5 Canvas", "IEEE 1364 VCD", "Digital Logic", "Nand2Tetris"],
    asciiDiagram: `
  +----------------- Analyzer(VCD) Architecture ------------------+
  |                                                               |
  |  [.vcd / .out File] ---> [Token Stream Scanner]               |
  |                                 |                             |
  |                                 v                             |
  |                    [Finite State Signal Parser]               |
  |                    (Scopes, Wires, Regs, TimeSteps)           |
  |                                 |                             |
  |                                 v                             |
  |                    [Signal Transition Vector Store]           |
  |                                 |                             |
  |             +-------------------+--------------------+        |
  |             |                                        |        |
  |             v                                        v        |
  |     [Virtual Viewport]                     [Dual-Cursor Delta] |
  |  (Canvas 2D Waveform Trace)                 (t1, t2, Delta-T) |
  +---------------------------------------------------------------+`
  },
  {
    slug: "tracker",
    title: "Dark Web Threat Actor De-Anonymization (tracker)",
    category: "security",
    badge: "SIH 2026 Qualifier",
    summary: "Entity-resolution and threat-actor correlation platform built for Smart India Hackathon 2026 (PS SIH26151), qualifying through the IIT Madras internal round.",
    repoUrl: "https://github.com/omchandra0907-jpg/tracker",
    problem: "Threat actors operate under pseudonymous aliases across multiple Tor/I2P forums, leaving fragmented metadata that traditional relational tables fail to correlate.",
    highlights: [
      "Models cross-forum aliases, PGP fingerprints, cryptocurrency addresses, and temporal activity inside a Neo4j property graph.",
      "TF-IDF stylistic NLP analysis for author identification and behavioral indicator matching.",
      "Interactive link-analysis interface for traversing actor infrastructure pivots."
    ],
    stack: ["Neo4j", "Cypher", "Python", "NLP Correlation", "OSINT Graph"],
    asciiDiagram: `
  +------------------ tracker Analytics Topology -----------------+
  |                                                               |
  |  [Darknet Forum Ingest] ---> [Entity Extraction & Normalizer] |
  |                                      |                        |
  |                                      v                        |
  |                         [Stylistic NLP Vectorizer]            |
  |                         (TF-IDF / Writing Style Profiler)     |
  |                                      |                        |
  |                                      v                        |
  |     +-------------------------------------------------------+ |
  |     |             Neo4j Graph Relationship Model            | |
  |     |   (Actor)-[:USES]->(PGP_Key)-[:LINKED_TO]->(Wallet)   | |
  |     +-------------------------------------------------------+ |
  |                                      |                        |
  |                                      v                        |
  |                       [Force-Directed Link Explorer]          |
  +---------------------------------------------------------------+`
  },
  {
    slug: "drone-ids",
    title: "Real-Time Drone Intrusion Detection System (Drone IDS)",
    category: "security",
    badge: "PUSHPAK IITB",
    summary: "Live UAV telemetry monitoring and anomaly-alert dashboard built in a 5-member team for Objective 2 of the PUSHPAK Grand Challenge at Techfest, IIT Bombay.",
    repoUrl: "https://github.com/omchandra0907-jpg",
    problem: "Unauthorized drones in restricted airspaces require low-latency spoofing detection and trajectory verification across continuous high-rate telemetry.",
    highlights: [
      "Parses real-time MAVLink flight telemetry streams over UDP sockets.",
      "Heuristic anomaly detection flagging kinematic violations, GPS spoofing jumps, and altitude geofence breaches.",
      "Low-latency real-time dashboard UI visualizing alert states and path histories."
    ],
    stack: ["MAVLink", "Python", "UDP Sockets", "Anomaly Detection", "Telemetry UI"],
    asciiDiagram: `
  +------------------- Drone IDS Telemetry Mesh ------------------+
  |                                                               |
  |   [UAV Telemetry] === UDP / MAVLink Stream ===> [Ingest Core] |
  |                                                       |       |
  |                                                       v       |
  |     +-------------------------------------------------------+ |
  |     |              Real-Time Validation Pipeline            | |
  |     |  * GPS Spoofing Jump Detector                         | |
  |     |  * Kinematic Rate Acceleration Filter                 | |
  |     |  * Geofence Spatial Boundary Sentry                   | |
  |     +-------------------------------------------------------+ |
  |                               |                               |
  |                               v                               |
  |             [State Engine & Incident Time-Series]             |
  |                               |                               |
  |                               v                               |
  |               [Mission Control Alert Dashboard]               |
  +---------------------------------------------------------------+`
  },
  {
    slug: "crypto-toolchain",
    title: "C Cryptography Suite & Nand2Tetris Toolchain",
    category: "systems",
    badge: "C / Python",
    summary: "From-scratch C implementations of AES-CBC, Grain-128AEADv2, and SHA-256 alongside a modular Python Hack Assembler and Virtual Machine Translator.",
    repoUrl: "https://github.com/omchandra0907-jpg",
    problem: "Understanding cryptographic primitives and computer architecture requires clean, specification-exact implementations from the bare metal up without third-party libraries.",
    highlights: [
      "Pure C AES-CBC with PKCS#7 padding and constant-time S-box operations.",
      "Grain-128AEADv2 stream cipher verified against IACR reference test vectors.",
      "SHA-256 test harness evaluating avalanche effect over randomized bit-flips.",
      "Two-pass Hack Assembler and VM Translator written in modular Python."
    ],
    stack: ["C99", "Applied Cryptography", "AES-CBC", "Grain-128", "SHA-256", "Python"],
    asciiDiagram: `
  +----------------- C Crypto & Toolchain Pipeline ---------------+
  |                                                               |
  |  [Raw Bitstream] ---> [Grain-128 / AES-CBC] ---> [Ciphertext] |
  |                               |                               |
  |                               v                               |
  |                     [SHA-256 Digest Engine]                   |
  |                     (512-bit Block Chunking)                  |
  |                                                               |
  |  [Hack ASM / VM Code]                                         |
  |           |                                                   |
  |           v                                                   |
  |      [Parser] ---> [Symbol Table Resolv] ---> [CodeWriter]    |
  |                                                    |          |
  |                                                    v          |
  |                                            [16-bit Hack ROM]  |
  +---------------------------------------------------------------+`
  },
  {
    slug: "nss-sign-glove",
    title: "Wearable Real-Time Sign Language Translator",
    category: "hardware",
    badge: "NSS IITM",
    summary: "Product-team hardware engineering project under NSS IIT Madras building a sensor-driven smart glove for real-time gesture-to-speech translation.",
    repoUrl: "https://github.com/omchandra0907-jpg",
    problem: "Speech- and hearing-impaired individuals face daily communication barriers that require lightweight, wearable real-time gesture translation hardware.",
    highlights: [
      "Designed modular 3D component enclosures and finger-joint mounts in Autodesk Fusion 360.",
      "Acquisition pipeline reading 5 flex sensors and IMU data through ADC channels on ESP32.",
      "Embedded gesture classification model streaming signs over BLE to an Android audio synthesizer."
    ],
    stack: ["ESP32", "Arduino", "Flex Sensors", "BLE", "Autodesk Fusion 360", "C++"],
    asciiDiagram: `
  +---------------- Sign Glove Embedded Workflow -----------------+
  |                                                               |
  |  [5x Flex Sensors + IMU] ---> [10-bit ADC Ingestion]          |
  |                                       |                       |
  |                                       v                       |
  |                         [ESP32 Filtering & Calibration]       |
  |                                       |                       |
  |                                       v                       |
  |                         [On-Device Gesture Classifier]        |
  |                                       |                       |
  |                                       v                       |
  |                     [Bluetooth Low Energy (BLE) Stream]       |
  |                                       |                       |
  |                                       v                       |
  |                         [Android Speech Synthesizer]          |
  +---------------------------------------------------------------+`
  }
];

export const SECURITY_LOGS = [
  {
    title: "10-Challenge CTF Technical Writeup Suite",
    event: "Offensive Security & RE",
    badge: "Pwn · Rev · Crypto · Web",
    date: "2026",
    summary: "Documented complete exploit chains and root-cause analyses covering Python sandbox escapes, Ghidra binary reverse engineering, SageMath elliptic-curve cryptography, multi-prime RSA factorization, zero-width Unicode steganography, and stack buffer overflows."
  },
  {
    title: "Smart India Hackathon (SIH) 2026 Qualifier",
    event: "IIT Madras Internal Selection",
    badge: "Problem Statement SIH26151",
    date: "Oct 2026",
    summary: "Engineered tracker—a darknet threat-actor de-anonymization and link analysis platform combining Neo4j graph schemas with stylistic NLP correlation, successfully qualifying through the IIT Madras internal round."
  },
  {
    title: "PUSHPAK Grand Challenge — Techfest, IIT Bombay",
    event: "National UAV Defense Hackathon",
    badge: "Objective 2 · Drone IDS",
    date: "2026",
    summary: "Collaborated in a 5-member team engineering a real-time drone intrusion detection and anomaly alert dashboard monitoring live MAVLink flight telemetry streams."
  },
  {
    title: "RAKSHAM AI Cybersecurity Hackathon",
    event: "Unstop Credential Verification",
    badge: "Credential ID: 8dcac092-86b2-4b80-bd49-acfdb45d502e",
    date: "Nov 2026",
    summary: "Competed in national AI-integrated offensive and defensive cybersecurity problem tracks covering automated vulnerability triage and defense mitigation workflows."
  }
];

export const TECH_STACK = [
  {
    category: "Languages & Low-Level",
    items: ["C (POSIX / Memory & Crypto)", "Python", "JavaScript (ES Modules)", "Bash / POSIX Shell", "Hack Assembly", "SQL"]
  },
  {
    category: "Security & Reverse Engineering",
    items: ["Ghidra", "Binary Exploitation (Buffer Overflows, ROP)", "Applied Cryptography (AES, RSA, ECC, Grain)", "Network Forensics & Wireshark", "OSINT & Threat Correlation"]
  },
  {
    category: "Systems & Linux Environments",
    items: ["Arch Linux (Hyprland / Wayland)", "Red Hat Enterprise Linux 9", "Kali Linux", "KVM / QEMU", "Neovim (Lua config)", "Git", "Docker"]
  },
  {
    category: "Hardware & Physical Design",
    items: ["Autodesk Fusion 360 (CAD)", "ESP32 & Arduino", "Digital Logic Design (HDL)", "IEEE VCD Simulation", "I2C / SPI / BLE Telemetry"]
  }
];
