"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import {
  Github, Linkedin, Mail, Phone, MapPin, ExternalLink, ArrowRight,
  Code2, Smartphone, Database, Cloud, Server, Layers, Terminal,
  Briefcase, GraduationCap, Award, Star, Menu, X, Sun, Moon,
  ChevronRight, CheckCircle2, Send, Copy, Check, Download,
  Globe, Cpu, GitBranch, TestTube2, Palette,
} from "lucide-react";

/* ═══════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════ */

const NAV_LINKS = [
  { label: "About",      href: "#about" },
  { label: "Skills",     href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects" },
  { label: "Contact",    href: "#contact" },
];

const SKILLS_DATA = [
  {
    category: "Mobile Development",
    icon: <Smartphone size={20} />,
    color: "blue",
    items: [
      { name: "Flutter",     level: 92 },
      { name: "Dart",        level: 88 },
      { name: "Android SDK", level: 70 },
    ],
  },
  {
    category: "Backend / Web",
    icon: <Server size={20} />,
    color: "purple",
    items: [
      { name: "Laravel (PHP)", level: 85 },
      { name: "JavaScript",    level: 80 },
      { name: "Java",          level: 72 },
    ],
  },
  {
    category: "Database & Design",
    icon: <Database size={20} />,
    color: "teal",
    items: [
      { name: "MySQL",        level: 88 },
      { name: "UI/UX Design", level: 82 },
      { name: "Figma",        level: 78 },
    ],
  },
  {
    category: "DevOps & Tools",
    icon: <Cloud size={20} />,
    color: "emerald",
    items: [
      { name: "Google Cloud",     level: 68 },
      { name: "Robot Framework",  level: 75 },
      { name: "Git / GitHub",     level: 85 },
    ],
  },
];

const TECH_STACK = [
  { name: "Flutter",  icon: <Smartphone size={18} />,  color: "#0088cc" },
  { name: "Laravel",  icon: <Code2 size={18} />,       color: "#ff2d20" },
  { name: "JS",       icon: <Terminal size={18} />,    color: "#f7df1e" },
  { name: "Java",     icon: <Cpu size={18} />,         color: "#f89820" },
  { name: "MySQL",    icon: <Database size={18} />,    color: "#4479a1" },
  { name: "GCP",      icon: <Cloud size={18} />,       color: "#4285f4" },
  { name: "Git",      icon: <GitBranch size={18} />,   color: "#f05032" },
  { name: "Figma",    icon: <Palette size={18} />,     color: "#a259ff" },
  { name: "Robot FW", icon: <TestTube2 size={18} />,   color: "#10b981" },
  { name: "REST API", icon: <Globe size={18} />,       color: "#6366f1" },
];

const EXPERIENCES = [
  {
    role: "Fullstack Engineer",
    company: "Refactory (Software House)",
    period: "Okt 2024 – Feb 2025",
    location: "Yogyakarta",
    type: "Full-time",
    color: "blue",
    highlight: true,
    description: "Bergabung sebagai fullstack engineer di software house terkemuka di Yogyakarta.",
    points: [
      "Merancang arsitektur sistem & desain database Jekoneng (Gojek Koneng)",
      "Membangun automated QA testing end-to-end menggunakan Robot Framework",
      "Kolaborasi lintas tim dalam metodologi Agile/Scrum",
    ],
    tech: ["Laravel", "Flutter", "Robot Framework", "MySQL", "System Design"],
  },
  {
    role: "Mobile Developer",
    company: "Reviewin",
    period: "Mar 2023 – Agu 2024",
    location: "Surabaya, East Java",
    type: "Project",
    color: "purple",
    highlight: false,
    description: "Mengembangkan platform digital untuk ekosistem publikasi jurnal ilmiah.",
    points: [
      "Merancang sistem & arsitektur aplikasi Reviewin dari nol",
      "Mendesain UI/UX dan skema database yang skalabel",
      "Mengembangkan aplikasi mobile cross-platform dengan Flutter",
    ],
    tech: ["Flutter", "UI/UX", "Figma", "REST API", "Database Design"],
  },
  {
    role: "IT Intern – Teknologi Informasi",
    company: "PT SIER (BUMN)",
    period: "Agu 2023 – Des 2023",
    location: "Surabaya, East Java",
    type: "MSIB / Internship",
    color: "teal",
    highlight: false,
    description: "Program Magang & Studi Independen Bersertifikat (Kampus Merdeka) di PT SIER.",
    points: [
      "Merancang dan membangun aplikasi Peminjaman Sarana & Prasarana",
      "Mendesain UI/UX, arsitektur sistem, dan skema database",
      "IT Support: Hardware, Networking, dan Software troubleshooting",
    ],
    tech: ["Flutter", "UI/UX", "Figma", "IT Support", "Networking"],
  },
  {
    role: "Mobile Developer",
    company: "PKM-Pengabdian Masyarakat",
    period: "Apr 2024 – Agu 2024",
    location: "Sidoarjo, East Java",
    type: "Research",
    color: "emerald",
    highlight: false,
    description: "Program pengabdian masyarakat — pengembangan portal digital desa.",
    points: [
      "Mengembangkan APIK Buncitan — aplikasi portal informasi publik Desa Buncitan",
      "Menyusun User Manual Book aplikasi APIK Buncitan",
      "Mendapat pengakuan HAKI dari Kemenkumham RI",
    ],
    tech: ["Flutter", "Firebase", "Documentation", "HAKI"],
  },
];

const PROJECTS = [
  {
    name: "Jekoneng (Gojek Koneng)",
    tagline: "On-demand ride-hailing & services platform",
    description: "Aplikasi ride-hailing lokal dengan fitur pemesanan, tracking real-time, dan manajemen layanan. Dirancang dengan arsitektur sistem yang skalabel dan dilengkapi automated QA testing.",
    tech: ["Laravel", "Flutter", "Robot Framework", "MySQL"],
    color: "blue",
    icon: "🛵",
    year: "2024",
    type: "Professional",
    features: ["System Architecture", "Database Design", "Auto QA Testing"],
  },
  {
    name: "Reviewin",
    tagline: "Academic journal review request platform",
    description: "Platform yang menghubungkan penulis artikel ilmiah dengan reviewer untuk memfasilitasi proses review sebelum publikasi di jurnal akademik internasional.",
    tech: ["Flutter", "UI/UX", "REST API", "MySQL"],
    color: "purple",
    icon: "📝",
    year: "2023–2024",
    type: "Product",
    features: ["Mobile App", "UI/UX Design", "Real-time Matching"],
  },
  {
    name: "APIK Buncitan",
    tagline: "Public information portal — HAKI Awarded",
    description: "Aplikasi Portal Informasi Publik Desa Buncitan yang dibangun sebagai bagian dari program PKM. Aplikasi ini mendapat pengakuan HAKI dari Kementerian Hukum dan HAM RI.",
    tech: ["Flutter", "Firebase", "Community"],
    color: "emerald",
    icon: "🏘️",
    year: "2024",
    type: "HAKI Award",
    features: ["HAKI Certified", "Community App", "Open Source"],
  },
  {
    name: "Sistem Peminjaman PT SIER",
    tagline: "Asset loan management for BUMN enterprise",
    description: "Aplikasi mobile untuk manajemen peminjaman sarana dan prasarana internal PT SIER. Dibangun dalam program Magang & Studi Independen Bersertifikat (MSIB) Kampus Merdeka.",
    tech: ["Flutter", "UI/UX", "REST API"],
    color: "teal",
    icon: "🏢",
    year: "2023",
    type: "Enterprise",
    features: ["Enterprise App", "MSIB Program", "Asset Tracking"],
  },
];

/* ═══════════════════════════════════════════════════
   UTILITY HOOKS & HELPERS
═══════════════════════════════════════════════════ */

function useTypewriter(words: string[], speed = 90, pause = 2000) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [sub, setSub] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[idx];
    const delay = deleting ? speed / 2 : sub === word.length ? pause : speed;
    const t = setTimeout(() => {
      if (!deleting && sub < word.length) { setText(word.slice(0, sub + 1)); setSub(sub + 1); }
      else if (!deleting && sub === word.length) { setDeleting(true); }
      else if (deleting && sub > 0) { setText(word.slice(0, sub - 1)); setSub(sub - 1); }
      else { setDeleting(false); setIdx((idx + 1) % words.length); }
    }, delay);
    return () => clearTimeout(t);
  }, [text, idx, sub, deleting, words, speed, pause]);

  return text;
}

const colorMap: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  blue:    { bg: "var(--accent-s)",   text: "var(--accent)",   border: "rgba(37,99,235,0.2)",   dot: "var(--accent)" },
  purple:  { bg: "var(--purple-s)",   text: "var(--purple)",   border: "rgba(124,58,237,0.2)",  dot: "var(--purple)" },
  teal:    { bg: "var(--teal-s)",     text: "var(--teal)",     border: "rgba(8,145,178,0.2)",   dot: "var(--teal)" },
  emerald: { bg: "var(--emerald-s)",  text: "var(--emerald)",  border: "rgba(5,150,105,0.2)",   dot: "var(--emerald)" },
  amber:   { bg: "var(--amber-s)",    text: "var(--amber)",    border: "rgba(217,119,6,0.2)",   dot: "var(--amber)" },
};

function FadeIn({ children, delay = 0, y = 20, className = "" }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   COMPONENTS
═══════════════════════════════════════════════════ */

/* ── NAV ── */
function Navbar({ dark, setDark }: { dark: boolean; setDark: (v: boolean) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -64, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "nav-scrolled glass" : ""}`}
      style={{ padding: scrolled ? "14px 0" : "20px 0" }}
    >
      <div className="container-main flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-black"
            style={{ background: "linear-gradient(135deg, var(--accent), var(--purple))" }}>W</div>
          <span style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.95rem" }}>William<span style={{ color: "var(--accent)" }}>.</span></span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href}
              className="px-4 py-2 rounded-lg text-sm font-600 transition-all duration-200"
              style={{ fontWeight: 600, color: active === l.href ? "var(--accent)" : "var(--text-secondary)", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >{l.label}</a>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Dark toggle */}
          <button onClick={() => setDark(!dark)}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
            style={{ background: "var(--bg-2)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}>
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          {/* Hire me */}
          <a href="#contact" className="hidden md:flex btn-primary" style={{ padding: "9px 20px", fontSize: "0.825rem" }}>
            Hire Me <ArrowRight size={14} />
          </a>
          {/* Mobile menu */}
          <button onClick={() => setOpen(!open)} className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: "var(--bg-2)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}>
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="md:hidden glass"
            style={{ borderTop: "1px solid var(--border)", padding: "16px 0" }}>
            <div className="container-main flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-lg text-sm font-600"
                  style={{ fontWeight: 600, color: "var(--text-secondary)", textDecoration: "none" }}>
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ── HERO ── */
function Hero() {
  const typed = useTypewriter(["Flutter Developer", "Fullstack Engineer", "Laravel Developer", "Mobile App Builder", "UI/UX Enthusiast"]);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 80]);

  return (
    <section id="home" style={{ minHeight: "100vh", paddingTop: "80px", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
      {/* Grid bg */}
      <div className="hero-grid" style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.6 }} />
      {/* Glow orbs */}
      <motion.div style={{ y }} className="absolute pointer-events-none" >
        <div style={{ position: "absolute", top: "-100px", left: "-200px", width: "600px", height: "600px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div style={{ position: "absolute", top: "100px", right: "-100px", width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)", filter: "blur(40px)" }} />
      </motion.div>

      <div className="container-main" style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "48px", alignItems: "center" }}>
          {/* Left */}
          <div>
            {/* Available badge */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              style={{ marginBottom: "32px" }}>
              <span className="badge badge-emerald">
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--emerald)", display: "inline-block",
                  boxShadow: "0 0 6px var(--emerald)", animation: "pulse 2s ease infinite" }} />
                Available for opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="text-display" style={{ marginBottom: "12px" }}>
              William{" "}
              <span className="gradient-text">Johan</span>
              <br />
              <span style={{ color: "var(--text-primary)" }}>Pakpahan</span>
            </motion.h1>

            {/* Typed role */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
              style={{ height: "40px", display: "flex", alignItems: "center", marginBottom: "24px" }}>
              <span style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--accent)", fontFamily: "'JetBrains Mono', monospace" }}>
                &gt; {typed}<span className="animate-blink" style={{ color: "var(--accent)" }}>_</span>
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
              className="text-body" style={{ maxWidth: "540px", marginBottom: "40px", fontSize: "1.05rem" }}>
              Developer profesional & inovatif dari Sidoarjo, berpengalaman di Software House Yogyakarta sebagai{" "}
              <strong style={{ color: "var(--text-primary)", fontWeight: 700 }}>Fullstack Engineer</strong>.
              Mahir dalam <span style={{ color: "var(--accent)", fontWeight: 600 }}>Flutter</span> dan{" "}
              <span style={{ color: "var(--purple)", fontWeight: 600 }}>Laravel</span>, berorientasi pada detail & pengalaman pengguna.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
              style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "48px" }}>
              <a href="#projects" className="btn-primary">
                View Projects <ArrowRight size={15} />
              </a>
              <a href="#contact" className="btn-outline">
                Contact Me <Mail size={15} />
              </a>
              <a href="https://github.com/williamjohan" target="_blank" rel="noopener noreferrer" className="btn-outline">
                <Github size={15} /> GitHub
              </a>
            </motion.div>

            {/* Meta info */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}
              style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              {[
                { icon: <MapPin size={14} />, label: "Sidoarjo, East Java 🇮🇩" },
                { icon: <GraduationCap size={14} />, label: "GPA 3.87 — Universitas Dinamika" },
                { icon: <Award size={14} />, label: "HAKI Holder" },
              ].map((m) => (
                <div key={m.label} style={{ display: "flex", alignItems: "center", gap: "6px",
                  fontSize: "0.8rem", color: "var(--text-tertiary)", fontFamily: "'JetBrains Mono', monospace" }}>
                  <span style={{ color: "var(--accent)" }}>{m.icon}</span>{m.label}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: avatar card */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
            className="hidden lg:block">
            <div className="animate-float" style={{ position: "relative" }}>
              {/* Avatar placeholder with initials */}
              <div style={{ width: "280px", height: "280px", borderRadius: "32px", position: "relative", overflow: "hidden",
                background: "linear-gradient(135deg, var(--accent-s) 0%, var(--purple-s) 100%)",
                border: "1px solid var(--border-2)", boxShadow: "var(--shadow-lg)" }}>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                  flexDirection: "column", gap: "8px" }}>
                  <div style={{ width: "100px", height: "100px", borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--accent), var(--purple))",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "2.5rem", fontWeight: 900, color: "white", letterSpacing: "-2px" }}>WJP</div>
                  <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>William J. Pakpahan</span>
                  <span className="badge badge-blue" style={{ fontSize: "0.7rem" }}>Fullstack Engineer</span>
                </div>
              </div>

              {/* Floating stat chips */}
              {[
                { label: "Flutter Expert", val: "92%", x: -80, y: 20,  color: "blue" },
                { label: "GPA",            val: "3.87", x: 200, y: 40,  color: "emerald" },
                { label: "HAKI Award",     val: "🏅",   x: -40, y: 240, color: "amber" },
              ].map((chip) => (
                <motion.div key={chip.label} animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 2 }}
                  style={{ position: "absolute", left: chip.x, top: chip.y, background: "var(--surface)",
                    border: "1px solid var(--border-2)", borderRadius: "12px", padding: "8px 14px",
                    boxShadow: "var(--shadow-md)", display: "flex", alignItems: "center", gap: "8px", whiteSpace: "nowrap" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 600 }}>{chip.label}</span>
                  <span style={{ fontSize: "0.75rem", fontWeight: 800, color: colorMap[chip.color].text }}>{chip.val}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginTop: "64px" }}>
          {[
            { val: "3+",   label: "Years Experience",  icon: <Briefcase size={18} />, color: "blue" },
            { val: "4+",   label: "Projects Shipped",  icon: <Layers size={18} />,    color: "purple" },
            { val: "3.87", label: "GPA Score",         icon: <Star size={18} />,      color: "teal" },
            { val: "1",    label: "HAKI / IP Award",   icon: <Award size={18} />,     color: "emerald" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.08 }}
              className="surface" style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: "14px" }}>
              <div className="icon-box" style={{ background: colorMap[s.color].bg, color: colorMap[s.color].text }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: "1.5rem", fontWeight: 800, color: colorMap[s.color].text, lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginTop: "3px" }}>{s.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── ABOUT / TECH STACK ── */
function About() {
  return (
    <section id="about" style={{ background: "var(--bg-2)" }}>
      <div className="container-main">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
          <FadeIn>
            <span className="section-eyebrow"><Code2 size={12} /> About Me</span>
            <h2 className="text-h1" style={{ marginBottom: "16px" }}>Passionate about building <span className="gradient-text">great software</span></h2>
            <div className="divider" />
            <p className="text-body" style={{ marginBottom: "20px" }}>
              Saya adalah developer profesional dan inovatif dengan pengalaman bekerja di Software House di Yogyakarta sebagai
              Fullstack Engineer. Terampil dalam membangun aplikasi mobile dan web dari konsep hingga production.
            </p>
            <p className="text-body" style={{ marginBottom: "32px" }}>
              Kemampuan saya mencakup analisis sistem, perancangan database, dan pengembangan user experience (UX).
              Saya selalu berorientasi pada detail dan bersemangat untuk terus belajar teknologi baru.
            </p>
            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
              {[
                { icon: <CheckCircle2 size={15} />, label: "Clean Code Advocate" },
                { icon: <CheckCircle2 size={15} />, label: "Agile / Scrum" },
                { icon: <CheckCircle2 size={15} />, label: "UI/UX Driven" },
                { icon: <CheckCircle2 size={15} />, label: "Fast Learner" },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "8px",
                  fontSize: "0.875rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                  <span style={{ color: "var(--emerald)" }}>{item.icon}</span>{item.label}
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "20px",
              padding: "32px", boxShadow: "var(--shadow-md)" }}>
              <h3 className="text-h2" style={{ marginBottom: "8px" }}>Tech Stack</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-tertiary)", marginBottom: "24px" }}>Technologies I work with regularly</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {TECH_STACK.map((t) => (
                  <div key={t.name} style={{ display: "flex", alignItems: "center", gap: "10px",
                    padding: "10px 14px", borderRadius: "10px", background: "var(--bg-2)",
                    border: "1px solid var(--border)", transition: "all 0.2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = t.color + "40"; e.currentTarget.style.background = t.color + "0a"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "var(--bg-2)"; }}>
                    <span style={{ color: t.color }}>{t.icon}</span>
                    <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)" }}>{t.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ── SKILLS ── */
function Skills() {
  return (
    <section id="skills">
      <div className="container-main">
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span className="section-eyebrow"><Terminal size={12} /> Skills</span>
            <h2 className="text-h1" style={{ marginBottom: "16px" }}>Technical <span className="gradient-text">Expertise</span></h2>
            <p className="text-body" style={{ maxWidth: "480px", margin: "0 auto" }}>
              Skills yang dikuasai dari pengalaman nyata membangun produk di industri.
            </p>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
          {SKILLS_DATA.map((cat, ci) => (
            <FadeIn key={cat.category} delay={ci * 0.1}>
              <div className="surface surface-hover" style={{ padding: "28px 32px", height: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                  <div className="icon-box" style={{
                    background: colorMap[cat.color].bg,
                    color: colorMap[cat.color].text,
                    border: `1px solid ${colorMap[cat.color].border}`,
                  }}>{cat.icon}</div>
                  <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)" }}>{cat.category}</h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {cat.items.map((skill, si) => (
                    <SkillBar key={skill.name} skill={skill} color={cat.color} delay={ci * 0.1 + si * 0.05} />
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillBar({ skill, color, delay }: { skill: { name: string; level: number }; color: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)" }}>{skill.name}</span>
        <span style={{ fontSize: "0.75rem", fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, color: colorMap[color].text }}>{skill.level}%</span>
      </div>
      <div className="skill-track">
        <motion.div className="skill-fill"
          initial={{ width: 0 }} animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.1, delay: delay + 0.2, ease: [0.4, 0, 0.2, 1] }}
          style={{ background: `linear-gradient(90deg, ${colorMap[color].dot}, ${colorMap[color === "blue" ? "purple" : color].dot})` }}
        />
      </div>
    </div>
  );
}

/* ── EXPERIENCE ── */
function Experience() {
  return (
    <section id="experience" style={{ background: "var(--bg-2)" }}>
      <div className="container-main">
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span className="section-eyebrow"><Briefcase size={12} /> Experience</span>
            <h2 className="text-h1" style={{ marginBottom: "16px" }}>Career <span className="gradient-text">Journey</span></h2>
            <p className="text-body" style={{ maxWidth: "480px", margin: "0 auto" }}>
              Perjalanan profesional dari internship hingga fullstack engineer di software house.
            </p>
          </div>
        </FadeIn>

        <div style={{ maxWidth: "780px", margin: "0 auto" }}>
          {EXPERIENCES.map((exp, i) => (
            <FadeIn key={exp.company} delay={i * 0.1}>
              <div className="timeline-item" style={{ marginBottom: i < EXPERIENCES.length - 1 ? "40px" : 0 }}>
                <div className="timeline-dot" style={{ background: colorMap[exp.color].dot, boxShadow: `0 0 0 3px var(--surface), 0 0 0 5px ${colorMap[exp.color].dot}` }} />

                <div className="surface surface-hover" style={{ padding: "28px 32px" }}>
                  {/* Header */}
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "16px" }}>
                    <div>
                      <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "4px" }}>{exp.role}</h3>
                      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                        <span style={{ fontWeight: 700, color: colorMap[exp.color].text, fontSize: "0.9rem" }}>{exp.company}</span>
                        <span style={{ color: "var(--border-2)" }}>·</span>
                        <span style={{ fontSize: "0.8rem", color: "var(--text-tertiary)", fontFamily: "'JetBrains Mono', monospace" }}>{exp.location}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
                      <span className={`badge badge-${exp.color}`}>{exp.type}</span>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", fontFamily: "'JetBrains Mono', monospace" }}>{exp.period}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: 1.65 }}>{exp.description}</p>

                  {/* Points */}
                  <ul style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
                    {exp.points.map((pt) => (
                      <li key={pt} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                        <ChevronRight size={14} style={{ marginTop: 3, flexShrink: 0, color: colorMap[exp.color].dot }} />
                        <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {exp.tech.map((t) => (
                      <span key={t} className={`badge badge-${exp.color}`} style={{ fontSize: "0.7rem" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}

          {/* Education */}
          <FadeIn delay={0.4}>
            <div className="timeline-item" style={{ marginTop: "40px" }}>
              <div className="timeline-dot" style={{ background: "var(--amber)", boxShadow: `0 0 0 3px var(--surface), 0 0 0 5px var(--amber)` }} />
              <div className="surface surface-hover" style={{ padding: "28px 32px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                      <GraduationCap size={18} style={{ color: "var(--amber)" }} />
                      <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)" }}>Sistem Informasi — Diploma (D4)</h3>
                    </div>
                    <span style={{ fontWeight: 700, color: "var(--amber)", fontSize: "0.9rem" }}>Universitas Dinamika, Surabaya</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
                    <span className="badge badge-amber">Education</span>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", fontFamily: "'JetBrains Mono', monospace" }}>2021 – 2024</span>
                  </div>
                </div>
                <div style={{ marginTop: "16px", display: "flex", gap: "16px", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", borderRadius: "10px", background: "var(--amber-s)", border: "1px solid rgba(217,119,6,0.2)" }}>
                    <Star size={14} style={{ color: "var(--amber)" }} />
                    <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--amber)" }}>GPA: 3.87 / 4.00</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", borderRadius: "10px", background: "var(--emerald-s)", border: "1px solid rgba(5,150,105,0.2)" }}>
                    <Award size={14} style={{ color: "var(--emerald)" }} />
                    <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--emerald)" }}>Cum Laude</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ── PROJECTS ── */
function Projects() {
  return (
    <section id="projects">
      <div className="container-main">
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span className="section-eyebrow"><Layers size={12} /> Projects</span>
            <h2 className="text-h1" style={{ marginBottom: "16px" }}>Selected <span className="gradient-text">Work</span></h2>
            <p className="text-body" style={{ maxWidth: "480px", margin: "0 auto" }}>
              Aplikasi dan sistem yang dibangun dari konsep hingga production.
            </p>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
          {PROJECTS.map((proj, i) => (
            <FadeIn key={proj.name} delay={i * 0.08}>
              <div className="surface surface-hover" style={{ padding: "0", overflow: "hidden", height: "100%", display: "flex", flexDirection: "column" }}>
                {/* Header banner */}
                <div style={{ padding: "28px 28px 20px", background: `linear-gradient(135deg, ${colorMap[proj.color].bg} 0%, transparent 100%)`,
                  borderBottom: "1px solid var(--border)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                    <div style={{ fontSize: "2.5rem" }}>{proj.icon}</div>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "flex-end" }}>
                      <span style={{ fontSize: "0.7rem", fontFamily: "'JetBrains Mono', monospace", color: "var(--text-tertiary)" }}>{proj.year}</span>
                      <span className={`badge badge-${proj.color}`} style={{ fontSize: "0.7rem" }}>{proj.type}</span>
                    </div>
                  </div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "4px" }}>{proj.name}</h3>
                  <p style={{ fontSize: "0.8rem", fontStyle: "italic", color: colorMap[proj.color].text, fontWeight: 600 }}>{proj.tagline}</p>
                </div>

                {/* Body */}
                <div style={{ padding: "20px 28px 28px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: "20px", flex: 1 }}>{proj.description}</p>

                  {/* Feature tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
                    {proj.features.map((f) => (
                      <span key={f} style={{ display: "inline-flex", alignItems: "center", gap: "4px",
                        fontSize: "0.7rem", padding: "3px 10px", borderRadius: "100px", fontWeight: 600,
                        background: "var(--bg-2)", border: "1px solid var(--border)", color: "var(--text-tertiary)" }}>
                        <CheckCircle2 size={9} style={{ color: colorMap[proj.color].dot }} /> {f}
                      </span>
                    ))}
                  </div>

                  {/* Tech stack */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
                    {proj.tech.map((t) => (
                      <span key={t} className={`badge badge-${proj.color}`} style={{ fontSize: "0.7rem" }}>{t}</span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: "10px" }}>
                    <a href="https://github.com/williamjohan" target="_blank" rel="noopener noreferrer"
                      className="btn-outline" style={{ flex: 1, justifyContent: "center", padding: "9px 16px", fontSize: "0.8rem" }}>
                      <Github size={14} /> GitHub
                    </a>
                    <button className="btn-primary" style={{ flex: 1, justifyContent: "center", padding: "9px 16px", fontSize: "0.8rem", border: "none", cursor: "pointer" }}>
                      <ExternalLink size={14} /> Details
                    </button>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── AWARDS ── */
function Awards() {
  return (
    <section style={{ background: "var(--bg-2)", paddingTop: "64px", paddingBottom: "64px" }}>
      <div className="container-main">
        <FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
            {[
              { icon: "🏅", title: "HAKI — Aplikasi APIK Desa Buncitan", issuer: "Kemenkumham RI", date: "Sep 2024", color: "amber",
                desc: "Hak Kekayaan Intelektual atas karya cipta perangkat lunak APIK Buncitan." },
              { icon: "🎓", title: "Program MSIB Bersertifikat", issuer: "PT SIER · Kampus Merdeka", date: "Des 2023", color: "blue",
                desc: "Sertifikat Magang & Studi Independen Bersertifikat dari program Kampus Merdeka Kemdikbud." },
            ].map((award, i) => (
              <FadeIn key={award.title} delay={i * 0.1}>
                <div className="surface surface-hover" style={{ padding: "24px 28px", display: "flex", gap: "20px", alignItems: "flex-start" }}>
                  <div style={{ fontSize: "2.5rem", flexShrink: 0 }}>{award.icon}</div>
                  <div>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "4px", lineHeight: 1.4 }}>{award.title}</h3>
                    <p style={{ fontSize: "0.875rem", fontWeight: 700, color: colorMap[award.color].text, marginBottom: "6px" }}>{award.issuer}</p>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "8px" }}>{award.desc}</p>
                    <span style={{ fontSize: "0.7rem", fontFamily: "'JetBrains Mono', monospace", color: "var(--text-tertiary)" }}>{award.date}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── CONTACT ── */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("williamjohanp@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact">
      <div className="container-main">
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span className="section-eyebrow"><Mail size={12} /> Contact</span>
            <h2 className="text-h1" style={{ marginBottom: "16px" }}>Let's <span className="gradient-text">Work Together</span></h2>
            <p className="text-body" style={{ maxWidth: "480px", margin: "0 auto" }}>
              Open untuk full-time roles, freelance, atau kolaborasi proyek menarik. Mari ngobrol!
            </p>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "32px", alignItems: "start" }}>
          {/* Left: info */}
          <FadeIn>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Email */}
              <div className="surface" style={{ padding: "24px 28px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div className="icon-box" style={{ background: "var(--accent-s)", color: "var(--accent)" }}><Mail size={18} /></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginBottom: "2px" }}>Email</div>
                    <div style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.875rem" }}>williamjohanp@gmail.com</div>
                  </div>
                  <button onClick={copyEmail} style={{ background: "none", border: "1px solid var(--border)", borderRadius: "8px",
                    padding: "6px 10px", cursor: "pointer", color: "var(--text-tertiary)", display: "flex", alignItems: "center", gap: "4px",
                    fontSize: "0.75rem", transition: "all 0.2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-tertiary)"; }}>
                    {copied ? <><Check size={12} color="var(--emerald)" /> Copied!</> : <><Copy size={12} /> Copy</>}
                  </button>
                </div>
              </div>

              {/* Phone */}
              <div className="surface" style={{ padding: "24px 28px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div className="icon-box" style={{ background: "var(--emerald-s)", color: "var(--emerald)" }}><Phone size={18} /></div>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginBottom: "2px" }}>WhatsApp</div>
                    <a href="https://wa.me/628881766252" target="_blank" rel="noopener noreferrer"
                      style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.875rem", textDecoration: "none" }}>+62 888-1766-252</a>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="surface" style={{ padding: "24px 28px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div className="icon-box" style={{ background: "var(--teal-s)", color: "var(--teal)" }}><MapPin size={18} /></div>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginBottom: "2px" }}>Location</div>
                    <div style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.875rem" }}>Sidoarjo, East Java 🇮🇩</div>
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div className="surface" style={{ padding: "24px 28px" }}>
                <div style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginBottom: "16px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>Follow</div>
                <div style={{ display: "flex", gap: "10px" }}>
                  {[
                    { href: "https://github.com/williamjohan", icon: <Github size={18} />, label: "GitHub", color: "var(--text-primary)" },
                    { href: "https://linkedin.com/in/williamjohanp", icon: <Linkedin size={18} />, label: "LinkedIn", color: "#0077b5" },
                    { href: "mailto:williamjohanp@gmail.com", icon: <Mail size={18} />, label: "Email", color: "var(--accent)" },
                  ].map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      style={{ width: "44px", height: "44px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center",
                        background: "var(--bg-2)", border: "1px solid var(--border)", color: "var(--text-secondary)",
                        transition: "all 0.2s", textDecoration: "none" }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.color = s.color; e.currentTarget.style.transform = "translateY(-2px)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.transform = "none"; }}>
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right: form */}
          <FadeIn delay={0.15}>
            <div className="surface" style={{ padding: "36px 40px" }}>
              <h3 className="text-h2" style={{ marginBottom: "8px" }}>Send a Message</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-tertiary)", marginBottom: "28px" }}>I'll reply within 24 hours 🚀</p>

              {sent ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: "3rem", marginBottom: "16px" }}>✅</div>
                  <h3 style={{ fontWeight: 800, color: "var(--text-primary)", marginBottom: "8px" }}>Message Sent!</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Thanks for reaching out. I'll get back to you soon!</p>
                  <button onClick={() => setSent(false)} className="btn-outline" style={{ marginTop: "24px" }}>Send Another</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div>
                      <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "6px", display: "block" }}>Name *</label>
                      <input className="form-input" placeholder="Your name" required
                        value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "6px", display: "block" }}>Email *</label>
                      <input className="form-input" type="email" placeholder="your@email.com" required
                        value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "6px", display: "block" }}>Subject</label>
                    <input className="form-input" placeholder="Project inquiry, collaboration, etc."
                      value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "6px", display: "block" }}>Message *</label>
                    <textarea className="form-input" rows={5} placeholder="Tell me about your project or idea..." required
                      value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      style={{ resize: "vertical", minHeight: "120px" }} />
                  </div>
                  <button type="submit" className="btn-primary" disabled={sending}
                    style={{ width: "100%", justifyContent: "center", opacity: sending ? 0.7 : 1 }}>
                    {sending ? "Sending..." : <><Send size={15} /> Send Message</>}
                  </button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", background: "var(--bg-2)", padding: "32px 0" }}>
      <div className="container-main" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center",
              background: "linear-gradient(135deg, var(--accent), var(--purple))", color: "white", fontSize: "0.75rem", fontWeight: 900 }}>W</div>
            <span style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.9rem" }}>William J. Pakpahan</span>
          </div>
          <p style={{ fontSize: "0.775rem", color: "var(--text-tertiary)", fontFamily: "'JetBrains Mono', monospace" }}>
            © {new Date().getFullYear()} · Sidoarjo, East Java 🇮🇩
          </p>
        </div>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} style={{ fontSize: "0.8rem", color: "var(--text-tertiary)", textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-tertiary)")}>
              {l.label}
            </a>
          ))}
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          {[
            { href: "https://github.com/williamjohan", icon: <Github size={16} /> },
            { href: "https://linkedin.com/in/williamjohanp", icon: <Linkedin size={16} /> },
            { href: "mailto:williamjohanp@gmail.com", icon: <Mail size={16} /> },
          ].map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
              style={{ width: "36px", height: "36px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center",
                background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-tertiary)", transition: "all 0.2s", textDecoration: "none" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-tertiary)"; }}>
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════
   APP
═══════════════════════════════════════════════════ */

export default function Portfolio() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (saved === "dark" || (!saved && prefersDark)) setDark(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div>
      <Navbar dark={dark} setDark={setDark} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Awards />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
