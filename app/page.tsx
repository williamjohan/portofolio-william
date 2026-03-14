"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import {
  Github, Linkedin, Mail, Phone, MapPin, ExternalLink, ArrowRight, ArrowUpRight,
  Code2, Smartphone, Database, Cloud, Server, Layers, Terminal, Cpu, GitBranch,
  Briefcase, GraduationCap, Award, Star, Menu, X, Sun, Moon, ChevronRight,
  CheckCircle2, Send, Copy, Check, Globe, Palette, TestTube2, Shield,
  Boxes, Workflow, Lightbulb, Building2, FileCode2, Zap,
} from "lucide-react";

/* ══════════════════════════════════════════════
   DATA
══════════════════════════════════════════════ */
const NAV = [
  { label: "About",      href: "#about" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Skills",     href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects" },
  { label: "Contact",    href: "#contact" },
];

const TYPED_WORDS = [
  "Mobile Engineer",
  "Flutter Specialist",
  "Clean Architecture",
  "Design Systems",
  ".NET / ASP.NET Core",
  "Fullstack Engineer",
];

// ── Philosophy / Core Values
const PHILOSOPHY = [
  {
    icon: <Layers size={20} />,
    title: "Architecture & Design Patterns",
    color: "blue",
    desc: "Clean Architecture bukan sekadar pola — ini adalah komitmen terhadap separasi kepentingan yang membuat codebase dapat bertahan dan berkembang. Setiap layer memiliki tanggung jawab yang jelas: UI hanya menampilkan state, domain murni berisi logika bisnis, data layer mengurus komunikasi eksternal.",
    items: ["Clean Architecture", "SOLID Principles", "Repository Pattern", "BLoC / Riverpod", "Domain-Driven Design"],
  },
  {
    icon: <Smartphone size={20} />,
    title: "Mobile Ecosystem",
    color: "violet",
    desc: "Flutter adalah pilihan strategis — satu codebase yang menghasilkan pengalaman native di semua platform. Bukan tentang memilih platform, tapi tentang memberikan konsistensi pengalaman kepada pengguna di mana pun mereka berada.",
    items: ["Flutter & Dart", "Cross-platform (iOS/Android)", "State Management", "Platform Channels", "Performance Profiling"],
  },
  {
    icon: <Palette size={20} />,
    title: "UI/UX Engineering",
    color: "emerald",
    desc: "Design System yang scalable adalah investasi jangka panjang. Setiap komponen harus reusable, setiap token konsisten, dan setiap interaksi terasa intuitif. Good design bukan hanya tentang tampilan — ini tentang membangun kepercayaan pengguna.",
    items: ["Scalable Design System", "Component Library", "Accessibility (a11y)", "Motion Design", "Figma to Code"],
  },
  {
    icon: <Shield size={20} />,
    title: "Code Quality & Testing",
    color: "amber",
    desc: "Production-grade engineering berarti kode yang bisa di-maintain oleh orang lain — atau diri sendiri — enam bulan ke depan. Testing bukan overhead, melainkan dokumentasi yang dapat dieksekusi.",
    items: ["Unit & Widget Testing", "Robot Framework (QA)", "Code Review", "CI/CD Pipeline", "Documentation"],
  },
];

// ── Skills
const SKILLS_CATS = [
  {
    label: "Mobile Development",
    color: "blue",
    icon: <Smartphone size={16} />,
    skills: [
      { name: "Flutter / Dart",   pct: 93 },
      { name: "BLoC / Riverpod",  pct: 88 },
      { name: "Platform Channels",pct: 72 },
    ],
  },
  {
    label: "Architecture",
    color: "violet",
    icon: <Layers size={16} />,
    skills: [
      { name: "Clean Architecture", pct: 88 },
      { name: "OOP & SOLID",        pct: 85 },
      { name: "Design Patterns",    pct: 82 },
    ],
  },
  {
    label: "Backend / Web",
    color: "emerald",
    icon: <Server size={16} />,
    skills: [
      { name: "Laravel (PHP)", pct: 84 },
      { name: "REST API / JSON", pct: 87 },
      { name: "JavaScript",    pct: 78 },
    ],
  },
  {
    label: "Design & UX",
    color: "amber",
    icon: <Palette size={16} />,
    skills: [
      { name: "UI/UX Design System", pct: 85 },
      { name: "Figma",               pct: 80 },
      { name: "Motion Design",       pct: 74 },
    ],
  },
  {
    label: "Database & Cloud",
    color: "cyan",
    icon: <Database size={16} />,
    skills: [
      { name: "MySQL / PostgreSQL", pct: 86 },
      { name: "Google Cloud (GCP)", pct: 70 },
      { name: "Firebase",          pct: 78 },
    ],
  },
  {
    label: "DevOps & Tools",
    color: "rose",
    icon: <GitBranch size={16} />,
    skills: [
      { name: "Git / GitHub",     pct: 88 },
      { name: "Robot Framework",  pct: 76 },
      { name: "CI/CD",            pct: 68 },
    ],
  },
  {
    label: "Web / Enterprise",
    color: "cyan",
    icon: <FileCode2 size={16} />,
    skills: [
      { name: "ASP.NET Core / C#", pct: 78 },
      { name: "EF Core & LINQ",    pct: 75 },
      { name: "Oracle Database",   pct: 72 },
    ],
  },
];

const TECH_ICONS = [
  { name: "Flutter",  icon: <Smartphone size={16} />,  color: "#0175C2" },
  { name: "Dart",     icon: <Code2 size={16} />,       color: "#0175C2" },
  { name: "Laravel",  icon: <Server size={16} />,      color: "#FF2D20" },
  { name: ".NET/C#",  icon: <FileCode2 size={16} />,   color: "#512BD4" },
  { name: "MySQL",    icon: <Database size={16} />,    color: "#4479A1" },
  { name: "Oracle",   icon: <Database size={16} />,    color: "#F80000" },
  { name: "GCP",      icon: <Cloud size={16} />,       color: "#4285F4" },
  { name: "Firebase", icon: <Zap size={16} />,         color: "#FFCA28" },
  { name: "Git",      icon: <GitBranch size={16} />,   color: "#F05032" },
  { name: "Figma",    icon: <Palette size={16} />,     color: "#A259FF" },
  { name: "Robot FW", icon: <TestTube2 size={16} />,   color: "#10B981" },
  { name: "Java",     icon: <Cpu size={16} />,         color: "#F89820" },
];

// ── Experience
const EXPERIENCES = [
  {
    role: "Mobile Engineer",
    company: "Bapenda Kota Surabaya",
    companyFull: "Badan Pendapatan Daerah Kota Surabaya",
    period: "2025 – Sekarang",
    location: "Surabaya, East Java",
    type: "Full-time",
    color: "blue",
    current: true,
    desc: "Bergabung sebagai Mobile Engineer di instansi pemerintahan daerah Kota Surabaya, bertanggung jawab atas pengembangan dan pemeliharaan aplikasi mobile untuk layanan perpajakan dan pendapatan daerah.",
    highlights: [
      "Memimpin pengembangan Surabaya Tax Mobile — aplikasi pajak daerah lintas platform",
      "Mengimplementasikan Clean Architecture & scalable Design System untuk codebase maintainability",
      "Mengembangkan Cek Reklame Mobile hingga tahap testing & persiapan distribusi multi-platform",
      "Merancang dan mengembangkan Parkir Digital Bapenda untuk digitalisasi layanan parkir",
      "Membangun MonPD — dashboard enterprise monitoring pajak dengan integrasi CCTV (ASP.NET Core/.NET 8)",
      "Mengembangkan SIAP — sistem back-office terpadu untuk manajemen aktivitas perpajakan daerah",
    ],
    tech: ["Flutter", "Clean Architecture", "BLoC", "REST API", "Design System"],
  },
  {
    role: "Fullstack Engineer",
    company: "Refactory (Software House)",
    companyFull: "Refactory — Software House Yogyakarta",
    period: "Okt 2024 – Feb 2025",
    location: "Yogyakarta",
    type: "Full-time",
    color: "violet",
    current: false,
    desc: "Bekerja sebagai fullstack engineer di software house dengan klien skala menengah-besar, fokus pada sistem yang scalable dan pengujian otomatis.",
    highlights: [
      "Merancang arsitektur sistem & database Jekoneng (Gojek Koneng) dari nol",
      "Membangun automated end-to-end QA testing menggunakan Robot Framework",
      "Kolaborasi lintas tim dalam metodologi Agile/Scrum sprint-based",
    ],
    tech: ["Laravel", "Flutter", "Robot Framework", "MySQL", "System Design"],
  },
  {
    role: "Mobile Developer",
    company: "Reviewin",
    companyFull: "Reviewin — Academic Journal Platform",
    period: "Mar 2023 – Agu 2024",
    location: "Surabaya, East Java",
    type: "Project",
    color: "emerald",
    current: false,
    desc: "Mengembangkan platform digital yang menghubungkan penulis artikel ilmiah dengan reviewer untuk fasilitasi publikasi jurnal akademik.",
    highlights: [
      "Merancang arsitektur sistem & skema database dari nol",
      "Mendesain UI/UX end-to-end menggunakan Figma",
      "Mengembangkan aplikasi mobile cross-platform dengan Flutter",
    ],
    tech: ["Flutter", "UI/UX", "Figma", "REST API", "Database Design"],
  },
  {
    role: "IT Intern — Teknologi Informasi",
    company: "PT SIER (BUMN)",
    companyFull: "PT Surabaya Industrial Estate Rungkut",
    period: "Agu – Des 2023",
    location: "Surabaya, East Java",
    type: "MSIB / Internship",
    color: "amber",
    current: false,
    desc: "Program Magang & Studi Independen Bersertifikat (Kampus Merdeka) di perusahaan BUMN pengelola kawasan industri.",
    highlights: [
      "Merancang & membangun aplikasi Peminjaman Sarana dan Prasarana",
      "Mendesain UI/UX, arsitektur sistem, dan skema database",
      "IT Support: Hardware, Networking, dan Software troubleshooting",
    ],
    tech: ["Flutter", "UI/UX", "Figma", "IT Support"],
  },
];

// ── Projects (Technical Case Studies)
const PROJECTS = [
  {
    name: "Surabaya Tax Mobile",
    slug: "tax-mobile",
    tagline: "Government tax services — production-grade mobile app",
    icon: "🏛️",
    color: "blue",
    year: "2025",
    type: "Government",
    status: "Production",
    problem: "Proses pembayaran dan pengelolaan pajak daerah yang masih manual dan tersebar di berbagai kanal menyulitkan wajib pajak dan petugas Bapenda dalam monitoring real-time.",
    architecture: "Mengimplementasikan Clean Architecture dengan pemisahan layer yang ketat (Presentation → Domain → Data). State management menggunakan BLoC untuk predictable state flow. Repository pattern memisahkan logika data dari business logic.",
    uiux: "Design System berbasis token (warna, tipografi, spacing) yang konsisten di seluruh aplikasi. Komponen reusable yang terdokumentasi, memastikan konsistensi visual dan aksesibilitas.",
    impact: "Digitalisasi layanan pajak daerah Kota Surabaya, meningkatkan efisiensi proses dan aksesibilitas bagi wajib pajak.",
    tech: ["Flutter", "Clean Architecture", "BLoC", "REST API", "Design System", "MySQL"],
    features: ["Tax Payment", "Real-time Status", "Multi-platform", "Government Integration"],
  },
  {
    name: "Cek Reklame Mobile",
    slug: "cek-reklame",
    tagline: "Billboard & advertisement permit verification system",
    icon: "📋",
    color: "violet",
    year: "2025",
    type: "Government",
    status: "Testing / Pre-launch",
    problem: "Verifikasi izin reklame yang tersebar dan tidak terdigitalisasi menyebabkan inefisiensi pengawasan dan potensi kebocoran pendapatan daerah dari reklame ilegal.",
    architecture: "Scalable architecture dengan modular feature approach. Setiap fitur berdiri sendiri sebagai modul dengan dependency injection yang bersih, memudahkan testing dan penambahan fitur tanpa regresi.",
    uiux: "UI yang mengikuti panduan desain sistem yang telah didefinisikan — setiap komponen menggunakan token yang sama, memastikan konsistensi antara Surabaya Tax Mobile dan Cek Reklame dalam satu ekosistem aplikasi Bapenda.",
    impact: "Persiapan distribusi lintas platform (iOS & Android) untuk pengawasan reklame yang lebih efektif dan transparan di Kota Surabaya.",
    tech: ["Flutter", "Clean Architecture", "Riverpod", "REST API", "Cross-platform"],
    features: ["Permit Verification", "Multi-platform", "QR Scan", "Real-time Reporting"],
  },
  {
    name: "Parkir Digital Bapenda",
    slug: "parkir-digital",
    tagline: "Digital parking management & revenue digitalization",
    icon: "🅿️",
    color: "emerald",
    year: "2025",
    type: "Government",
    status: "Development",
    problem: "Manajemen parkir daerah yang masih konvensional mengakibatkan sulitnya audit pendapatan dan pengalaman pengguna yang kurang optimal.",
    architecture: "Menggunakan prinsip OOP yang kuat dengan separation of concerns yang jelas. Service layer yang terpisah memudahkan unit testing dan mocking — setiap komponen dapat diuji secara independen.",
    uiux: "Antarmuka yang dirancang untuk kecepatan operasional — petugas parkir dapat menyelesaikan transaksi dalam hitungan detik. Arus navigasi yang dioptimalkan berdasarkan user journey analysis.",
    impact: "Digitalisasi pendapatan parkir daerah, meningkatkan transparansi, akuntabilitas, dan kemudahan audit bagi Bapenda Kota Surabaya.",
    tech: ["Flutter", "BLoC", "Clean Architecture", "REST API", "Firebase"],
    features: ["Digital Payment", "Revenue Tracking", "Audit Trail", "Real-time Dashboard"],
  },
  {
    name: "Jekoneng (Gojek Koneng)",
    slug: "jekoneng",
    tagline: "Local ride-hailing & on-demand services platform",
    icon: "🛵",
    color: "amber",
    year: "2024",
    type: "Commercial",
    status: "Production",
    problem: "Kebutuhan platform ride-hailing lokal yang lebih terjangkau dengan fitur yang disesuaikan untuk pasar lokal Yogyakarta.",
    architecture: "Merancang sistem dari nol — mulai dari ERD database, arsitektur API, hingga integrasi mobile app. Automated testing dengan Robot Framework memastikan kualitas sebelum setiap deployment.",
    uiux: "UX yang familiar namun lebih personal — mengadopsi pola desain yang sudah dikenal pengguna ride-hailing dengan sentuhan lokal yang lebih hangat.",
    impact: "Berhasil diluncurkan ke production dengan automated QA pipeline yang mengurangi bug rate dan mempercepat siklus deployment.",
    tech: ["Laravel", "Flutter", "Robot Framework", "MySQL", "Google Maps API"],
    features: ["Ride Booking", "Real-time Tracking", "Automated QA", "Driver Management"],
  },
  {
    name: "MonPD — Monitoring Pajak Daerah",
    slug: "monpd",
    tagline: "Enterprise web dashboard for regional tax monitoring & analytics",
    icon: "📊",
    color: "cyan",
    year: "2025",
    type: "Enterprise Gov",
    status: "Production",
    problem: "Kebutuhan untuk merender data tabular pelaporan yang masif dan modul monitoring visual (CCTV Parkir) secara efisien tanpa memblokir thread server, sembari memastikan UI dashboard tetap konsisten dan interaktif bagi user internal pemerintahan.",
    architecture: "Menerapkan pola arsitektur MVC yang solid dengan ASP.NET Core (.NET 8). Query ke Oracle Database dioptimasi menggunakan LINQ & EF Core untuk mencegah N+1 bottleneck. Async/await diterapkan secara konsisten agar thread server tidak terblokir saat memproses laporan besar.",
    uiux: "Abstraksi komponen menggunakan DevExtreme UI Components — DataGrid, Chart, dan Scheduler dikonfigurasi sebagai reusable wrapper sehingga konsistensi UI/UX terjaga di seluruh modul sesuai standar design system Bapenda.",
    impact: "Dashboard monitoring yang robust dan scalable, mempercepat proses pengawasan objek pajak secara real-time. Technical debt frontend diminimalkan berkat standarisasi komponen DevExtreme yang terdokumentasi.",
    tech: ["ASP.NET Core MVC", ".NET 8", "C#", "EF Core", "LINQ", "DevExtreme", "Oracle DB"],
    features: ["Real-time Dashboard", "CCTV Integration", "Tax Analytics", "Bulk Reporting"],
  },
  {
    name: "SIAP — Sistem Informasi Aktifitas Pajak",
    slug: "siap",
    tagline: "Unified back-office for regional tax activity management",
    icon: "🗂️",
    color: "rose",
    year: "2025",
    type: "Enterprise Gov",
    status: "Production",
    problem: "Kompleksitas business rules pada aktivitas pajak harian dan tingginya risiko ketidakkonsistenan data jika validasi form dan state management tidak ditangani dengan baik pada level aplikasi.",
    architecture: "Mengadopsi prinsip OOP yang ketat untuk memodelkan entitas aktivitas pajak sebagai domain objects yang kaya (rich domain model). Service layer terpisah untuk setiap bounded context — validasi, rekap, dan pelaporan — memudahkan unit testing dan isolasi perubahan regulasi.",
    uiux: "Standarisasi komponen UI untuk form input dan tabel data agar reusable di seluruh modul. Pola interaksi yang konsisten mempersingkat kurva belajar pegawai baru dan mengurangi human error dalam entry data.",
    impact: "Meningkatkan produktivitas dan akurasi data pegawai Bapenda melalui antarmuka yang terstandarisasi. Arsitektur yang scalable siap menampung perubahan regulasi pajak baru tanpa refactor besar.",
    tech: ["ASP.NET Core MVC", "C#", "EF Core", "Oracle DB", "OOP", "MVC Pattern"],
    features: ["Activity Tracking", "Data Rekapitulasi", "Regulation-ready", "Back-office Suite"],
  },
];

/* ══════════════════════════════════════════════
   COLOR MAP
══════════════════════════════════════════════ */
const C: Record<string, { pill: string; text: string; dot: string; bg: string; border: string }> = {
  blue:    { pill: "pill-blue",    text: "var(--blue-600)",    dot: "var(--blue-600)",    bg: "var(--blue-50)",    border: "var(--blue-100)" },
  violet:  { pill: "pill-violet",  text: "var(--violet-600)",  dot: "var(--violet-500)",  bg: "var(--violet-50)",  border: "var(--violet-100)" },
  emerald: { pill: "pill-emerald", text: "var(--emerald-600)", dot: "var(--emerald-500)", bg: "var(--emerald-50)", border: "var(--emerald-100)" },
  amber:   { pill: "pill-amber",   text: "var(--amber-500)",   dot: "var(--amber-500)",   bg: "var(--amber-50)",   border: "var(--amber-100)" },
  cyan:    { pill: "pill-cyan",    text: "var(--cyan-500)",    dot: "var(--cyan-500)",    bg: "var(--cyan-50)",    border: "var(--cyan-100)" },
  rose:    { pill: "pill-rose",    text: "var(--rose-500)",    dot: "var(--rose-500)",    bg: "var(--rose-50)",    border: "rgba(244,63,94,0.15)" },
};

/* ══════════════════════════════════════════════
   HOOKS & UTILS
══════════════════════════════════════════════ */
function useTypewriter(words: string[], spd = 80, pause = 2200) {
  const [txt, setTxt] = useState(""); const [i, setI] = useState(0);
  const [s, setS] = useState(0); const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[i];
    const delay = del ? spd / 2 : s === w.length ? pause : spd;
    const t = setTimeout(() => {
      if (!del && s < w.length) { setTxt(w.slice(0, s + 1)); setS(s + 1); }
      else if (!del) { setDel(true); }
      else if (del && s > 0) { setTxt(w.slice(0, s - 1)); setS(s - 1); }
      else { setDel(false); setI((i + 1) % words.length); }
    }, delay);
    return () => clearTimeout(t);
  }, [txt, i, s, del, words, spd, pause]);
  return txt;
}

function Reveal({ children, delay = 0, y = 24, className = "" }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════ */
function Navbar({ dark, setDark }: { dark: boolean; setDark: (v: boolean) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.header initial={{ y: -72, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? "14px 0" : "22px 0",
        transition: "padding 0.3s ease",
      }}
      className={scrolled ? "nav-blur" : ""}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <a href="#" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div style={{ width: 32, height: 32, borderRadius: "8px", background: "linear-gradient(135deg, var(--blue-600), var(--violet-500))",
            display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 900, fontSize: "0.8rem" }}>W</div>
          <span style={{ fontWeight: 800, fontSize: "0.95rem", color: "var(--fg)", letterSpacing: "-0.02em" }}>
            william<span style={{ color: "var(--accent)" }}>.</span>dev
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          {NAV.map(l => (
            <a key={l.href} href={l.href} style={{ padding: "7px 14px", borderRadius: "var(--r-md)", fontSize: "0.85rem", fontWeight: 500,
              color: "var(--fg-secondary)", textDecoration: "none", transition: "all 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.color = "var(--fg)"; e.currentTarget.style.background = "var(--bg-muted)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "var(--fg-secondary)"; e.currentTarget.style.background = "transparent"; }}>
              {l.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button onClick={() => setDark(!dark)}
            style={{ width: 36, height: 36, borderRadius: "var(--r-md)", background: "var(--bg-muted)",
              border: "1px solid var(--border)", color: "var(--fg-secondary)", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <a href="#contact" className="btn btn-primary hide-mobile" style={{ padding: "9px 18px", fontSize: "0.825rem" }}>
            Let's Talk <ArrowRight size={13} />
          </a>
          <button onClick={() => setMobileOpen(!mobileOpen)}
            style={{ width: 36, height: 36, borderRadius: "var(--r-md)", background: "var(--bg-muted)",
              border: "1px solid var(--border)", color: "var(--fg-secondary)", cursor: "pointer",
              display: "none", alignItems: "center", justifyContent: "center" }}
            className="mobile-menu-btn">
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            style={{ overflow: "hidden", borderTop: "1px solid var(--border)", background: "var(--surface)" }}>
            <div className="container" style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: "4px" }}>
              {NAV.map(l => (
                <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                  style={{ padding: "10px 12px", borderRadius: "var(--r-md)", fontSize: "0.9rem", fontWeight: 500,
                    color: "var(--fg-secondary)", textDecoration: "none" }}>
                  {l.label}
                </a>
              ))}
              <a href="#contact" className="btn btn-primary" style={{ marginTop: 8, justifyContent: "center" }}>Let's Talk</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ══════════════════════════════════════════════
   HERO
══════════════════════════════════════════════ */
function Hero() {
  const typed = useTypewriter(TYPED_WORDS);
  const { scrollY } = useScroll();
  const yOrb = useTransform(scrollY, [0, 600], [0, 80]);

  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative",
      paddingTop: "100px", paddingBottom: "80px", overflow: "hidden" }}>
      {/* Background */}
      <div className="hero-noise" style={{ position: "absolute", inset: 0, zIndex: 0 }} />
      <div className="dot-grid" style={{ position: "absolute", inset: 0, zIndex: 0 }} />

      {/* Orbs */}
      <motion.div style={{ y: yOrb, position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "15%", left: "-5%", width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 65%)", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", top: "30%", right: "-8%", width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 65%)", filter: "blur(60px)" }} />
      </motion.div>

      <div className="container" style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: "80px", alignItems: "center" }}>
          {/* Left copy */}
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}
              style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "32px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "7px", padding: "5px 12px",
                borderRadius: "var(--r-full)", background: "var(--emerald-50)", border: "1px solid var(--emerald-100)",
                fontSize: "0.75rem", fontWeight: 700, color: "var(--emerald-600)" }}>
                <span className="ring-dot" style={{ background: "var(--emerald-500)", color: "var(--emerald-500)" }} />
                Currently at Bapenda Kota Surabaya
              </span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7, ease: [0.22,1,0.36,1] }}
              className="display-xl" style={{ marginBottom: "16px" }}>
              Building apps
              <br />
              <span className="serif-italic gradient-cool">that scale.</span>
            </motion.h1>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              style={{ height: "36px", display: "flex", alignItems: "center", marginBottom: "28px" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.05rem", fontWeight: 500, color: "var(--accent)" }}>
                &gt; {typed}<span className="animate-blink">_</span>
              </span>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="body-lg" style={{ maxWidth: "520px", marginBottom: "40px" }}>
              Mobile Engineer di <strong style={{ color: "var(--fg)", fontWeight: 700 }}>Bapenda Kota Surabaya</strong>,
              mengembangkan aplikasi pemerintahan berbasis{" "}
              <strong style={{ color: "var(--blue-600)", fontWeight: 600 }}>Flutter</strong> dengan pendekatan{" "}
              <strong style={{ color: "var(--violet-600)", fontWeight: 600 }}>Clean Architecture</strong> dan
              Design System yang scalable & maintainable.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "48px" }}>
              <a href="#projects" className="btn btn-primary">View Projects <ArrowRight size={14} /></a>
              <a href="#contact" className="btn btn-secondary">Contact Me <Mail size={14} /></a>
              <a href="https://github.com/williamjohan" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <Github size={14} /> GitHub
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}
              style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              {[
                { icon: <MapPin size={12} />, text: "Sidoarjo, East Java 🇮🇩" },
                { icon: <GraduationCap size={12} />, text: "GPA 3.87 — Universitas Dinamika" },
                { icon: <Award size={12} />, text: "HAKI Holder" },
              ].map(m => (
                <div key={m.text} style={{ display: "flex", alignItems: "center", gap: "6px",
                  fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--fg-tertiary)" }}>
                  <span style={{ color: "var(--accent)" }}>{m.icon}</span>{m.text}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: profile card */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35, duration: 0.7, ease: [0.22,1,0.36,1] }}
            className="hide-mobile animate-float">
            <div style={{ position: "relative" }}>
              {/* Main card */}
              <div className="card" style={{ padding: "32px", textAlign: "center", boxShadow: "var(--shadow-2xl)" }}>
                {/* Avatar */}
                <div style={{ width: 96, height: 96, borderRadius: "50%", margin: "0 auto 20px",
                  background: "linear-gradient(135deg, var(--blue-600), var(--violet-500))",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.75rem", fontWeight: 900, color: "white",
                  boxShadow: "var(--shadow-blue)" }}>WJP</div>

                <h3 style={{ fontWeight: 800, fontSize: "1.05rem", marginBottom: "4px", color: "var(--fg)" }}>William J. Pakpahan</h3>
                <p style={{ fontSize: "0.8rem", color: "var(--fg-secondary)", marginBottom: "16px" }}>Mobile Engineer · Bapenda Surabaya</p>

                {/* Status */}
                <div style={{ display: "flex", gap: "6px", justifyContent: "center", flexWrap: "wrap", marginBottom: "24px" }}>
                  <span className="pill pill-blue">Flutter</span>
                  <span className="pill pill-violet">Clean Arch</span>
                  <span className="pill pill-emerald">GCP</span>
                </div>

                {/* Stats */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  {[
                    { v: "3+",   l: "Years Exp",    c: "blue" },
                    { v: "7+",   l: "Apps Built",   c: "violet" },
                    { v: "3.87", l: "GPA Score",    c: "emerald" },
                    { v: "HAKI", l: "IP Award",     c: "amber" },
                  ].map(s => (
                    <div key={s.l} style={{ padding: "12px 10px", borderRadius: "var(--r-md)",
                      background: C[s.c].bg, border: `1px solid ${C[s.c].border}`, textAlign: "center" }}>
                      <div style={{ fontWeight: 800, fontSize: "1.1rem", color: C[s.c].text, letterSpacing: "-0.02em" }}>{s.v}</div>
                      <div style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: "var(--fg-tertiary)", marginTop: "2px" }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badges */}
              {[
                { label: "Clean Architecture", sub: "Applied in production", x: -110, y: 20,  c: "blue"    },
                { label: "Design System",      sub: "Scalable & consistent", x: 260,   y: 130, c: "violet"  },
                { label: "HAKI Certified",     sub: "Kemenkumham RI",        x: -90,   y: 290, c: "emerald" },
              ].map(chip => (
                <motion.div key={chip.label} animate={{ y: [0,-4,0] }} transition={{ duration: 3.5, repeat: Infinity, delay: Math.random()*1.5 }}
                  className="card" style={{ position: "absolute", left: chip.x, top: chip.y, padding: "10px 14px",
                    whiteSpace: "nowrap", boxShadow: "var(--shadow-lg)", minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: "0.75rem", color: C[chip.c].text }}>{chip.label}</div>
                  <div style={{ fontSize: "0.65rem", color: "var(--fg-tertiary)", marginTop: "1px" }}>{chip.sub}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   ABOUT
══════════════════════════════════════════════ */
function About() {
  return (
    <section id="about" className="section-spacing" style={{ background: "var(--bg-subtle)" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
          <Reveal>
            <span className="eyebrow">About Me</span>
            <h2 className="display-lg" style={{ marginBottom: "14px" }}>
              Engineering with<br />
              <span className="serif-italic" style={{ color: "var(--fg-secondary)", fontWeight: 400 }}>intent & clarity.</span>
            </h2>
            <div className="divider-accent" />
            <p className="body-lg" style={{ marginBottom: "20px" }}>
              Saya adalah Mobile Engineer yang saat ini berkarir di{" "}
              <strong style={{ color: "var(--fg)" }}>Badan Pendapatan Daerah (Bapenda) Kota Surabaya</strong>,
              membangun aplikasi mobile government-grade yang digunakan oleh masyarakat Kota Surabaya dalam layanan perpajakan daerah.
            </p>
            <p className="body-lg" style={{ marginBottom: "20px" }}>
              Saya percaya bahwa kode yang baik adalah kode yang dapat di-maintain — tidak hanya oleh diri sendiri,
              tapi oleh seluruh tim, bahkan enam bulan ke depan. Inilah mengapa saya selalu mengedepankan{" "}
              <strong style={{ color: "var(--blue-600)" }}>Clean Architecture</strong>,{" "}
              <strong style={{ color: "var(--violet-600)" }}>prinsip SOLID</strong>, dan
              <strong style={{ color: "var(--emerald-600)" }}> Design System yang konsisten</strong>.
            </p>
            <p className="body-lg" style={{ marginBottom: "36px" }}>
              Di luar coding, saya memiliki ketertarikan kuat pada UI/UX — karena teknologi terbaik sekalipun
              gagal jika penggunanya tidak dapat menggunakannya dengan intuitif.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a href="https://github.com/williamjohan" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <Github size={14} /> GitHub
              </a>
              <a href="https://linkedin.com/in/williamjohanp" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <Linkedin size={14} /> LinkedIn
              </a>
            </div>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Current role highlight */}
            <Reveal delay={0.1}>
              <div className="card" style={{ padding: "24px 28px",
                borderLeft: "3px solid var(--blue-600)", borderRadius: "0 var(--r-xl) var(--r-xl) 0",
                background: "linear-gradient(to right, var(--blue-50), var(--surface))" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "var(--r-md)", background: "var(--blue-100)",
                    display: "flex", alignItems: "center", justifyContent: "center", color: "var(--blue-600)" }}>
                    <Building2 size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: "0.9rem", color: "var(--fg)" }}>Mobile Engineer</div>
                    <div style={{ fontWeight: 600, fontSize: "0.8rem", color: "var(--blue-600)" }}>Bapenda Kota Surabaya</div>
                  </div>
                  <span className="pill pill-emerald" style={{ marginLeft: "auto", fontSize: "0.6rem" }}>Current</span>
                </div>
                <p className="body-sm">Membangun ekosistem aplikasi mobile untuk layanan perpajakan daerah Kota Surabaya dengan fokus pada Clean Architecture dan scalable Design System.</p>
              </div>
            </Reveal>

            {/* Tech stack grid */}
            <Reveal delay={0.2}>
              <div className="card" style={{ padding: "24px 28px" }}>
                <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--fg)", marginBottom: "16px" }}>Tech Stack</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  {TECH_ICONS.map(t => (
                    <div key={t.name} style={{ display: "flex", alignItems: "center", gap: "9px",
                      padding: "9px 12px", borderRadius: "var(--r-md)", background: "var(--bg-muted)",
                      border: "1px solid var(--border)", cursor: "default",
                      transition: "all 0.2s ease" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = t.color + "50"; e.currentTarget.style.background = t.color + "0d"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "var(--bg-muted)"; }}>
                      <span style={{ color: t.color, flexShrink: 0 }}>{t.icon}</span>
                      <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--fg-secondary)" }}>{t.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   PHILOSOPHY
══════════════════════════════════════════════ */
function Philosophy() {
  return (
    <section id="philosophy" className="section-spacing">
      <div className="container">
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <span className="eyebrow" style={{ justifyContent: "center" }}>Core Philosophy</span>
            <h2 className="display-lg" style={{ marginBottom: "16px" }}>
              Not just tools —<br />
              <span className="serif-italic gradient-cool">a way of thinking.</span>
            </h2>
            <p className="body-lg" style={{ maxWidth: "540px", margin: "0 auto" }}>
              Keahlian teknis bukan sekadar daftar teknologi yang dikuasai, melainkan filosofi
              bagaimana setiap alat digunakan untuk membangun solusi yang bertahan lama.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
          {PHILOSOPHY.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="card card-hover" style={{ padding: "32px 36px", height: "100%" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "20px" }}>
                  <div style={{ width: 44, height: 44, borderRadius: "var(--r-md)", flexShrink: 0,
                    background: C[p.color].bg, border: `1px solid ${C[p.color].border}`,
                    color: C[p.color].text, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {p.icon}
                  </div>
                  <div>
                    <h3 className="heading-lg" style={{ marginBottom: "4px" }}>{p.title}</h3>
                    <div style={{ width: 28, height: 2, borderRadius: 1, background: C[p.color].dot }} />
                  </div>
                </div>
                <p className="body-md" style={{ marginBottom: "20px", lineHeight: 1.7 }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {p.items.map(item => (
                    <span key={item} className={`pill pill-${p.color}`} style={{ fontSize: "0.65rem" }}>{item}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   SKILLS
══════════════════════════════════════════════ */
function Skills() {
  return (
    <section id="skills" className="section-spacing" style={{ background: "var(--bg-subtle)" }}>
      <div className="container">
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <span className="eyebrow" style={{ justifyContent: "center" }}>Technical Skills</span>
            <h2 className="display-lg" style={{ marginBottom: "16px" }}>
              Depth over breadth —<br />
              <span className="serif-italic" style={{ color: "var(--fg-secondary)", fontWeight: 400 }}>mastery in what matters.</span>
            </h2>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {SKILLS_CATS.map((cat, ci) => (
            <Reveal key={cat.label} delay={ci * 0.07}>
              <div className="card card-hover" style={{ padding: "28px 32px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "var(--r-md)", background: C[cat.color].bg,
                    border: `1px solid ${C[cat.color].border}`, color: C[cat.color].text,
                    display: "flex", alignItems: "center", justifyContent: "center" }}>{cat.icon}</div>
                  <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--fg)" }}>{cat.label}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                  {cat.skills.map((skill, si) => (
                    <SkillRow key={skill.name} skill={skill} color={cat.color} delay={ci * 0.07 + si * 0.05} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillRow({ skill, color, delay }: { skill: { name: string; pct: number }; color: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "7px" }}>
        <span style={{ fontSize: "0.825rem", fontWeight: 600, color: "var(--fg)" }}>{skill.name}</span>
        <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", fontWeight: 600, color: C[color].text }}>{skill.pct}%</span>
      </div>
      <div className="skill-track">
        <motion.div className="skill-fill"
          initial={{ width: 0 }} animate={inView ? { width: `${skill.pct}%` } : {}}
          transition={{ duration: 1.3, delay: delay + 0.3, ease: [0.4, 0, 0.2, 1] }}
          style={{ background: `linear-gradient(90deg, ${C[color].dot}, ${C[color === "blue" ? "violet" : color === "violet" ? "blue" : color].dot})` }} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   EXPERIENCE
══════════════════════════════════════════════ */
function Experience() {
  return (
    <section id="experience" className="section-spacing">
      <div className="container">
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <span className="eyebrow" style={{ justifyContent: "center" }}>Experience</span>
            <h2 className="display-lg" style={{ marginBottom: "16px" }}>
              Career <span className="serif-italic gradient-cool">trajectory.</span>
            </h2>
            <p className="body-lg" style={{ maxWidth: "480px", margin: "0 auto" }}>
              Dari internship hingga mobile engineer di instansi pemerintahan Kota Surabaya.
            </p>
          </div>
        </Reveal>

        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {EXPERIENCES.map((exp, i) => (
            <Reveal key={exp.company} delay={i * 0.09}>
              <div style={{ position: "relative", paddingLeft: "32px", marginBottom: i < EXPERIENCES.length - 1 ? "32px" : 0 }}>
                {i < EXPERIENCES.length - 1 && <div className="timeline-line" />}
                <div className="timeline-node" style={{ background: exp.current ? "var(--emerald-500)" : C[exp.color].dot,
                  boxShadow: `0 0 0 3px var(--bg), 0 0 0 5px ${exp.current ? "var(--emerald-500)" : C[exp.color].dot}` }} />

                <div className="card card-hover" style={{ padding: "28px 32px" }}>
                  {/* Header row */}
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "16px" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                        <h3 className="heading-xl" style={{ fontSize: "1.05rem" }}>{exp.role}</h3>
                        {exp.current && <span className="pill pill-emerald" style={{ fontSize: "0.6rem" }}>Current</span>}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                        <span style={{ fontWeight: 700, fontSize: "0.875rem", color: C[exp.color].text }}>{exp.company}</span>
                        <span style={{ color: "var(--border-strong)" }}>·</span>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--fg-tertiary)" }}>{exp.location}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
                      <span className={`pill pill-${exp.color}`}>{exp.type}</span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--fg-tertiary)" }}>{exp.period}</span>
                    </div>
                  </div>

                  <p className="body-md" style={{ marginBottom: "16px" }}>{exp.desc}</p>

                  {/* Highlights */}
                  <ul style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
                    {exp.highlights.map(h => (
                      <li key={h} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                        <ChevronRight size={13} style={{ marginTop: 4, flexShrink: 0, color: C[exp.color].dot }} />
                        <span style={{ fontSize: "0.85rem", color: "var(--fg-secondary)", lineHeight: 1.6 }}>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {exp.tech.map(t => (
                      <span key={t} className={`pill pill-${exp.color}`} style={{ fontSize: "0.65rem" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}

          {/* Education */}
          <Reveal delay={0.4}>
            <div style={{ position: "relative", paddingLeft: "32px", marginTop: "32px" }}>
              <div className="timeline-node" style={{ background: "var(--amber-500)", boxShadow: "0 0 0 3px var(--bg), 0 0 0 5px var(--amber-500)" }} />
              <div className="card" style={{ padding: "24px 32px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "12px" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <GraduationCap size={16} style={{ color: "var(--amber-500)" }} />
                      <h3 style={{ fontWeight: 800, fontSize: "0.95rem", color: "var(--fg)" }}>Sistem Informasi — Diploma (D4)</h3>
                    </div>
                    <span style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--amber-500)" }}>Universitas Dinamika, Surabaya</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
                    <span className="pill pill-amber">Education</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--fg-tertiary)" }}>2021 – 2024</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "12px", marginTop: "16px", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "9px 14px",
                    borderRadius: "var(--r-md)", background: "var(--amber-50)", border: "1px solid var(--amber-100)" }}>
                    <Star size={13} style={{ color: "var(--amber-500)" }} />
                    <span style={{ fontSize: "0.825rem", fontWeight: 700, color: "var(--amber-500)" }}>GPA 3.87 / 4.00</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "9px 14px",
                    borderRadius: "var(--r-md)", background: "var(--emerald-50)", border: "1px solid var(--emerald-100)" }}>
                    <Award size={13} style={{ color: "var(--emerald-600)" }} />
                    <span style={{ fontSize: "0.825rem", fontWeight: 700, color: "var(--emerald-600)" }}>Cum Laude</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   PROJECTS (CASE STUDIES)
══════════════════════════════════════════════ */
function Projects() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="projects" className="section-spacing" style={{ background: "var(--bg-subtle)" }}>
      <div className="container">
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <span className="eyebrow" style={{ justifyContent: "center" }}>Featured Projects</span>
            <h2 className="display-lg" style={{ marginBottom: "16px" }}>
              Technical <span className="serif-italic gradient-cool">case studies.</span>
            </h2>
            <p className="body-lg" style={{ maxWidth: "520px", margin: "0 auto" }}>
              Setiap proyek adalah studi kasus — masalah nyata, keputusan arsitektur yang deliberate,
              dan dampak yang terukur.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {PROJECTS.map((proj, i) => (
            <Reveal key={proj.slug} delay={i * 0.08}>
              <div className="card card-hover" style={{ overflow: "hidden", height: "100%", display: "flex", flexDirection: "column" }}>
                {/* Banner */}
                <div style={{ padding: "28px 28px 0",
                  background: `linear-gradient(135deg, ${C[proj.color].bg} 0%, var(--surface) 100%)` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                    <span style={{ fontSize: "2.5rem", lineHeight: 1 }}>{proj.icon}</span>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "flex-end" }}>
                      <span className={`pill pill-${proj.color}`} style={{ fontSize: "0.6rem" }}>{proj.type}</span>
                      <span style={{ padding: "3px 8px", borderRadius: "var(--r-full)", fontSize: "0.6rem", fontWeight: 600,
                        background: proj.status === "Production" ? "var(--emerald-50)" : proj.status.includes("Testing") ? "var(--amber-50)" : "var(--blue-50)",
                        color: proj.status === "Production" ? "var(--emerald-600)" : proj.status.includes("Testing") ? "var(--amber-500)" : "var(--blue-600)",
                        border: `1px solid ${proj.status === "Production" ? "var(--emerald-100)" : proj.status.includes("Testing") ? "var(--amber-100)" : "var(--blue-100)"}` }}>
                        {proj.status}
                      </span>
                    </div>
                  </div>
                  <h3 style={{ fontWeight: 800, fontSize: "1.05rem", color: "var(--fg)", marginBottom: "4px" }}>{proj.name}</h3>
                  <p style={{ fontSize: "0.8rem", fontStyle: "italic", color: C[proj.color].text, fontWeight: 600, marginBottom: "16px" }}>{proj.tagline}</p>
                </div>

                {/* Case study body */}
                <div style={{ padding: "20px 28px 28px", flex: 1, display: "flex", flexDirection: "column" }}>
                  {/* Problem → Impact accordion */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px", flex: 1 }}>
                    {[
                      { key: "problem",      icon: <Lightbulb size={12} />, label: "Problem",           text: proj.problem,      color: "rose"    },
                      { key: "architecture", icon: <Layers size={12} />,    label: "Architecture",      text: proj.architecture, color: "blue"    },
                      { key: "uiux",         icon: <Palette size={12} />,   label: "UI/UX Consistency", text: proj.uiux,         color: "violet"  },
                      { key: "impact",       icon: <Zap size={12} />,       label: "Business Impact",   text: proj.impact,       color: "emerald" },
                    ].map(item => (
                      <div key={item.key}>
                        <button onClick={() => setActive(active === `${proj.slug}-${item.key}` ? null : `${proj.slug}-${item.key}`)}
                          style={{ width: "100%", display: "flex", alignItems: "center", gap: "8px", padding: "9px 12px",
                            borderRadius: "var(--r-md)", border: "none", cursor: "pointer", textAlign: "left",
                            background: active === `${proj.slug}-${item.key}` ? C[item.color].bg : "var(--bg-muted)",
                            color: active === `${proj.slug}-${item.key}` ? C[item.color].text : "var(--fg-secondary)",
                            transition: "all 0.2s", fontFamily: "var(--font-sans)" }}>
                          <span style={{ opacity: 0.7 }}>{item.icon}</span>
                          <span style={{ fontWeight: 700, fontSize: "0.775rem" }}>{item.label}</span>
                          <ChevronRight size={11} style={{ marginLeft: "auto",
                            transform: active === `${proj.slug}-${item.key}` ? "rotate(90deg)" : "none",
                            transition: "transform 0.2s" }} />
                        </button>
                        <AnimatePresence>
                          {active === `${proj.slug}-${item.key}` && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
                              <p style={{ padding: "10px 12px 4px", fontSize: "0.8rem", lineHeight: 1.65,
                                color: "var(--fg-secondary)" }}>{item.text}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>

                  {/* Tech */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                    {proj.tech.map(t => (
                      <span key={t} className={`pill pill-${proj.color}`} style={{ fontSize: "0.63rem" }}>{t}</span>
                    ))}
                  </div>

                  {/* Features */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                    {proj.features.map(f => (
                      <span key={f} style={{ display: "inline-flex", alignItems: "center", gap: "4px",
                        fontSize: "0.63rem", padding: "3px 8px", borderRadius: "var(--r-full)", fontWeight: 600,
                        background: "var(--bg-muted)", border: "1px solid var(--border)", color: "var(--fg-tertiary)" }}>
                        <CheckCircle2 size={8} style={{ color: C[proj.color].dot }} />{f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   AWARDS
══════════════════════════════════════════════ */
function Awards() {
  return (
    <section className="section-spacing" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
      <div className="container">
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span className="eyebrow" style={{ justifyContent: "center" }}>Recognition</span>
            <h2 className="heading-xl">Awards & Certificates</h2>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
          {[
            { icon: "🏅", title: "HAKI — Aplikasi APIK Desa Buncitan", issuer: "Kemenkumham RI", date: "Sep 2024",
              desc: "Hak Kekayaan Intelektual Hak Cipta Perangkat Lunak atas karya APIK Buncitan.", color: "amber" },
            { icon: "🎓", title: "Sertifikat MSIB — PT SIER Internship", issuer: "Kampus Merdeka · Kemdikbud", date: "Des 2023",
              desc: "Program Magang & Studi Independen Bersertifikat dalam program Kampus Merdeka.", color: "blue" },
          ].map((a, i) => (
            <Reveal key={a.title} delay={i * 0.1}>
              <div className="card card-hover" style={{ padding: "24px 28px", display: "flex", gap: "18px" }}>
                <span style={{ fontSize: "2rem", flexShrink: 0, lineHeight: 1 }}>{a.icon}</span>
                <div>
                  <h3 style={{ fontWeight: 800, fontSize: "0.9rem", color: "var(--fg)", marginBottom: "4px", lineHeight: 1.4 }}>{a.title}</h3>
                  <p style={{ fontWeight: 700, fontSize: "0.8rem", color: C[a.color].text, marginBottom: "6px" }}>{a.issuer}</p>
                  <p style={{ fontSize: "0.8rem", color: "var(--fg-secondary)", lineHeight: 1.6, marginBottom: "6px" }}>{a.desc}</p>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--fg-tertiary)" }}>{a.date}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   CONTACT
══════════════════════════════════════════════ */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle"|"sending"|"sent">("idle");
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("williamjohanp@gmail.com");
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setStatus("sending");
    await new Promise(r => setTimeout(r, 1400));
    setStatus("sent"); setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="section-spacing" style={{ background: "var(--bg-subtle)" }}>
      <div className="container">
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <span className="eyebrow" style={{ justifyContent: "center" }}>Contact</span>
            <h2 className="display-lg" style={{ marginBottom: "16px" }}>
              Let's build<br />
              <span className="serif-italic gradient-cool">something great.</span>
            </h2>
            <p className="body-lg" style={{ maxWidth: "480px", margin: "0 auto" }}>
              Open untuk diskusi proyek, kolaborasi, atau sekadar ngobrol soal Flutter dan Clean Architecture.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: "28px", alignItems: "start" }}>
          {/* Info */}
          <Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                { icon: <Mail size={16} />, label: "Email", value: "williamjohanp@gmail.com", href: "mailto:williamjohanp@gmail.com", color: "blue", action: copyEmail, actionLabel: copied ? "Copied!" : "Copy" },
                { icon: <Phone size={16} />, label: "WhatsApp", value: "+62 888-1766-252", href: "https://wa.me/628881766252", color: "emerald", action: null, actionLabel: null },
                { icon: <MapPin size={16} />, label: "Location", value: "Sidoarjo, East Java 🇮🇩", href: null, color: "cyan", action: null, actionLabel: null },
                { icon: <Building2 size={16} />, label: "Current", value: "Bapenda Kota Surabaya", href: null, color: "violet", action: null, actionLabel: null },
              ].map(item => (
                <div key={item.label} className="card" style={{ padding: "18px 20px", display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ width: 38, height: 38, borderRadius: "var(--r-md)", flexShrink: 0,
                    background: C[item.color].bg, border: `1px solid ${C[item.color].border}`, color: C[item.color].text,
                    display: "flex", alignItems: "center", justifyContent: "center" }}>{item.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "0.7rem", color: "var(--fg-tertiary)", fontFamily: "var(--font-mono)", marginBottom: "2px" }}>{item.label}</div>
                    {item.href ? (
                      <a href={item.href} style={{ fontWeight: 700, fontSize: "0.84rem", color: "var(--fg)", textDecoration: "none", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.value}</a>
                    ) : (
                      <div style={{ fontWeight: 700, fontSize: "0.84rem", color: "var(--fg)" }}>{item.value}</div>
                    )}
                  </div>
                  {item.action && (
                    <button onClick={item.action} style={{ flexShrink: 0, padding: "5px 10px", borderRadius: "var(--r-sm)",
                      background: "var(--bg-muted)", border: "1px solid var(--border)", fontSize: "0.7rem",
                      fontWeight: 600, color: "var(--fg-secondary)", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
                      {copied ? <Check size={11} color="var(--emerald-500)" /> : <Copy size={11} />}{item.actionLabel}
                    </button>
                  )}
                </div>
              ))}

              {/* Social */}
              <div className="card" style={{ padding: "18px 20px" }}>
                <div style={{ fontSize: "0.7rem", color: "var(--fg-tertiary)", fontFamily: "var(--font-mono)", marginBottom: "12px" }}>SOCIAL</div>
                <div style={{ display: "flex", gap: "8px" }}>
                  {[
                    { href: "https://github.com/williamjohan", icon: <Github size={16} />, label: "GitHub" },
                    { href: "https://linkedin.com/in/williamjohanp", icon: <Linkedin size={16} />, label: "LinkedIn" },
                    { href: "mailto:williamjohanp@gmail.com", icon: <Mail size={16} />, label: "Email" },
                  ].map(s => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      style={{ flex: 1, padding: "10px", borderRadius: "var(--r-md)", display: "flex", alignItems: "center", justifyContent: "center",
                        flexDirection: "column", gap: "4px", background: "var(--bg-muted)", border: "1px solid var(--border)",
                        color: "var(--fg-secondary)", textDecoration: "none", transition: "all 0.2s", fontSize: "0.65rem", fontWeight: 600 }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.background = "var(--accent-subtle)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--fg-secondary)"; e.currentTarget.style.background = "var(--bg-muted)"; }}>
                      {s.icon}{s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.15}>
            <div className="card" style={{ padding: "36px 40px" }}>
              {status === "sent" ? (
                <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🚀</div>
                  <h3 style={{ fontWeight: 800, color: "var(--fg)", marginBottom: "8px" }}>Message delivered!</h3>
                  <p style={{ fontSize: "0.9rem", color: "var(--fg-secondary)", marginBottom: "24px" }}>I'll get back to you within 24 hours.</p>
                  <button onClick={() => setStatus("idle")} className="btn btn-secondary">Send Another</button>
                </motion.div>
              ) : (
                <>
                  <h3 className="heading-xl" style={{ marginBottom: "6px" }}>Send a Message</h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--fg-tertiary)", marginBottom: "28px" }}>Reply guaranteed within 24 hours ⚡</p>
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                      {[
                        { field: "name", label: "Name *", placeholder: "Your name", type: "text" },
                        { field: "email", label: "Email *", placeholder: "you@email.com", type: "email" },
                      ].map(f => (
                        <div key={f.field}>
                          <label className="input-label">{f.label}</label>
                          <input className="input" type={f.type} placeholder={f.placeholder} required
                            value={form[f.field as keyof typeof form]}
                            onChange={e => setForm({ ...form, [f.field]: e.target.value })} />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className="input-label">Subject</label>
                      <input className="input" placeholder="Project collaboration, inquiry, etc."
                        value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} />
                    </div>
                    <div>
                      <label className="input-label">Message *</label>
                      <textarea className="input" rows={5} placeholder="Tell me about your project or what you'd like to discuss..." required
                        value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                        style={{ resize: "vertical", minHeight: "120px" }} />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={status === "sending"}
                      style={{ justifyContent: "center", opacity: status === "sending" ? 0.7 : 1 }}>
                      {status === "sending" ? "Sending..." : <><Send size={14} /> Send Message</>}
                    </button>
                  </form>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "32px 0" }}>
      <div className="container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <div style={{ width: 24, height: 24, borderRadius: "6px", background: "linear-gradient(135deg, var(--blue-600), var(--violet-500))",
              display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.65rem", fontWeight: 900 }}>W</div>
            <span style={{ fontWeight: 800, fontSize: "0.85rem", color: "var(--fg)" }}>william.dev</span>
          </div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--fg-tertiary)" }}>
            © {new Date().getFullYear()} William Johan Pakpahan · Sidoarjo, East Java 🇮🇩
          </p>
        </div>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {NAV.map(l => (
            <a key={l.href} href={l.href} style={{ fontSize: "0.78rem", color: "var(--fg-tertiary)", textDecoration: "none", fontWeight: 500, transition: "color 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--fg)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--fg-tertiary)")}>
              {l.label}
            </a>
          ))}
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          {[
            { href: "https://github.com/williamjohan", icon: <Github size={14} /> },
            { href: "https://linkedin.com/in/williamjohanp", icon: <Linkedin size={14} /> },
            { href: "mailto:williamjohanp@gmail.com", icon: <Mail size={14} /> },
          ].map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
              style={{ width: 32, height: 32, borderRadius: "var(--r-sm)", display: "flex", alignItems: "center", justifyContent: "center",
                background: "var(--bg-muted)", border: "1px solid var(--border)", color: "var(--fg-tertiary)", transition: "all 0.15s", textDecoration: "none" }}
              onMouseEnter={e => { e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.borderColor = "var(--accent)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "var(--fg-tertiary)"; e.currentTarget.style.borderColor = "var(--border)"; }}>
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════
   APP ROOT
══════════════════════════════════════════════ */
export default function Portfolio() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("wjp-theme");
    const sys = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (saved === "dark" || (!saved && sys)) setDark(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("wjp-theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <>
      <Navbar dark={dark} setDark={setDark} />
      <main>
        <Hero />
        <About />
        <Philosophy />
        <Skills />
        <Experience />
        <Projects />
        <Awards />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
