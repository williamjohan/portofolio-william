"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import {
  Github, Linkedin, Mail, Phone, MapPin, ExternalLink,
  Code2, Smartphone, Database, Cloud, ChevronDown, Award,
  Briefcase, GraduationCap, Sparkles, ArrowUpRight, Copy, Check
} from "lucide-react";

/* ─── DATA ─────────────────────────────────────────── */
const skills = [
  { name: "Flutter", level: 92, category: "Mobile", color: "#63b3ff" },
  { name: "Laravel", level: 85, category: "Web", color: "#a78bfa" },
  { name: "JavaScript", level: 80, category: "Web", color: "#34d399" },
  { name: "Java", level: 72, category: "Backend", color: "#f6ad55" },
  { name: "Google Cloud", level: 68, category: "Cloud", color: "#63b3ff" },
  { name: "Robot Framework", level: 75, category: "QA", color: "#a78bfa" },
  { name: "UI/UX Design", level: 82, category: "Design", color: "#34d399" },
  { name: "Database Design", level: 88, category: "Backend", color: "#f6ad55" },
];

const experiences = [
  {
    role: "Fullstack Engineer",
    company: "Refactory (Software House)",
    period: "Oct 2024 – Feb 2025",
    location: "Yogyakarta",
    type: "Full-time",
    color: "#63b3ff",
    points: [
      "Merancang arsitektur sistem aplikasi Jekoneng (Gojek Koneng)",
      "Merancang desain database yang optimal dan scalable",
      "Membangun automatic QA testing menggunakan Robot Framework",
    ],
    tags: ["Laravel", "Flutter", "Robot Framework", "System Design"],
  },
  {
    role: "Mobile Developer",
    company: "Reviewin",
    period: "Mar 2023 – Aug 2024",
    location: "Surabaya, East Java",
    type: "Project",
    color: "#a78bfa",
    points: [
      "Merancang sistem aplikasi platform review artikel ilmiah untuk publikasi jurnal",
      "Mendesain UI/UX dan skema database aplikasi",
      "Mengembangkan aplikasi mobile cross-platform dengan Flutter",
    ],
    tags: ["Flutter", "UI/UX", "Database Design", "Mobile"],
  },
  {
    role: "Mobile Developer",
    company: "PKM-Pengabdian Masyarakat",
    period: "Apr 2024 – Aug 2024",
    location: "Sidoarjo, East Java",
    type: "Research",
    color: "#34d399",
    points: [
      "Mengembangkan APIK Buncitan — portal informasi Desa Buncitan berbasis mobile",
      "Membuat User Manual Book APIK Buncitan",
      "Mendapat HAKI (Hak Kekayaan Intelektual) atas aplikasi",
    ],
    tags: ["Flutter", "Community", "HAKI", "Documentation"],
  },
  {
    role: "IT Intern — Teknologi Informasi",
    company: "PT SIER",
    period: "Aug 2023 – Dec 2023",
    location: "Surabaya, East Java",
    type: "Internship",
    color: "#f6ad55",
    points: [
      "Merancang sistem aplikasi Peminjaman Sarana dan Prasarana",
      "Mendesain UI/UX dan skema database",
      "Mengembangkan aplikasi mobile dengan Flutter",
      "IT Support: Hardware, Networking, dan Software",
    ],
    tags: ["Flutter", "UI/UX", "IT Support", "Networking"],
  },
];

const projects = [
  {
    name: "Jekoneng (Gojek Koneng)",
    desc: "Aplikasi ride-hailing & layanan on-demand. Dirancang dari nol termasuk arsitektur sistem, database, dan pengujian otomatis.",
    tech: ["Laravel", "Flutter", "Robot Framework", "MySQL"],
    color: "#63b3ff",
    year: "2024",
    type: "Professional",
    icon: "🛵",
  },
  {
    name: "Reviewin",
    desc: "Platform penghubung penulis artikel ilmiah dengan reviewer untuk proses publikasi jurnal akademik.",
    tech: ["Flutter", "UI/UX", "REST API", "Database"],
    color: "#a78bfa",
    year: "2023–2024",
    type: "Product",
    icon: "📝",
  },
  {
    name: "APIK Buncitan",
    desc: "Aplikasi Portal Informasi Publik Desa Buncitan — meraih HAKI dari Kemenkumham RI.",
    tech: ["Flutter", "Community", "Firebase"],
    color: "#34d399",
    year: "2024",
    type: "HAKI",
    icon: "🏘️",
  },
  {
    name: "Sistem Peminjaman PT SIER",
    desc: "Aplikasi mobile manajemen peminjaman sarana dan prasarana internal perusahaan BUMN.",
    tech: ["Flutter", "UI/UX", "REST API"],
    color: "#f6ad55",
    year: "2023",
    type: "Enterprise",
    icon: "🏢",
  },
];

const typewriterTexts = [
  "Fullstack Engineer",
  "Flutter Developer",
  "Laravel Developer",
  "Mobile App Builder",
  "UI/UX Enthusiast",
];

/* ─── COMPONENTS ──────────────────────────────────── */

function Typewriter() {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    const target = typewriterTexts[index];
    const speed = deleting ? 40 : 80;
    const timer = setTimeout(() => {
      if (!deleting && sub < target.length) {
        setText(target.slice(0, sub + 1));
        setSub(sub + 1);
      } else if (!deleting && sub === target.length) {
        setTimeout(() => setDeleting(true), 1800);
      } else if (deleting && sub > 0) {
        setText(target.slice(0, sub - 1));
        setSub(sub - 1);
      } else {
        setDeleting(false);
        setIndex((index + 1) % typewriterTexts.length);
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [text, deleting, sub, index]);

  return (
    <span className="mono text-[#63b3ff]">
      {text}
      <span className="animate-blink">_</span>
    </span>
  );
}

function SkillCard({ skill, i }: { skill: typeof skills[0]; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: i * 0.05, duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-[#e8edf7]">{skill.name}</span>
        <div className="flex items-center gap-2">
          <span className="tag text-[10px] py-0.5 px-2">{skill.category}</span>
          <span className="mono text-xs" style={{ color: skill.color }}>{skill.level}%</span>
        </div>
      </div>
      <div className="skill-bar">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ delay: i * 0.05 + 0.2, duration: 1, ease: "easeOut" }}
          style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)` }}
        />
      </div>
    </motion.div>
  );
}

function ExperienceCard({ exp, i }: { exp: typeof experiences[0]; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const typeColors: Record<string, string> = {
    "Full-time": "tag",
    "Project": "tag-purple",
    "Research": "tag-green",
    "Internship": "tag",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.1, duration: 0.6 }}
      className="relative pl-8"
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: `linear-gradient(to bottom, ${exp.color}40, transparent)` }} />
      {/* Timeline dot */}
      <div className="absolute left-0 top-6 w-2 h-2 rounded-full -translate-x-[3px]" style={{ background: exp.color, boxShadow: `0 0 12px ${exp.color}80` }} />

      <div className="card p-6 mb-6">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="text-lg font-bold text-[#e8edf7]">{exp.role}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-semibold" style={{ color: exp.color }}>{exp.company}</span>
              <span className="text-[#3d4a66]">·</span>
              <span className="mono text-xs text-[#6b7a99]">{exp.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className={typeColors[exp.type] || "tag"}>{exp.type}</span>
            <span className="mono text-xs text-[#6b7a99]">{exp.period}</span>
          </div>
        </div>

        <ul className="space-y-2 mb-4">
          {exp.points.map((p, j) => (
            <li key={j} className="flex items-start gap-2 text-sm text-[#8896b3] leading-relaxed">
              <span className="mt-1.5 flex-shrink-0 w-1 h-1 rounded-full" style={{ background: exp.color }} />
              {p}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {exp.tags.map((t) => (
            <span key={t} className="tag text-[10px]">{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ proj, i }: { proj: typeof projects[0]; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.08, duration: 0.5 }}
      className="card p-6 h-full flex flex-col group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-3xl">{proj.icon}</div>
        <div className="flex items-center gap-2">
          <span className="mono text-xs text-[#6b7a99]">{proj.year}</span>
          <span className="tag-green text-[10px]" style={{ borderColor: `${proj.color}30`, background: `${proj.color}08`, color: proj.color }}>{proj.type}</span>
        </div>
      </div>

      <h3 className="text-lg font-bold text-[#e8edf7] mb-2 group-hover:text-[#63b3ff] transition-colors">{proj.name}</h3>
      <p className="text-sm text-[#8896b3] leading-relaxed flex-1 mb-4">{proj.desc}</p>

      <div className="flex flex-wrap gap-1.5">
        {proj.tech.map((t) => (
          <span key={t} className="tag text-[10px]">{t}</span>
        ))}
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(circle at 50% 100%, ${proj.color}06, transparent 70%)` }} />
    </motion.div>
  );
}

/* ─── MAIN PAGE ───────────────────────────────────── */

export default function Portfolio() {
  const [copied, setCopied] = useState(false);
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 80], ["rgba(8,10,15,0)", "rgba(8,10,15,0.95)"]);

  const copyEmail = () => {
    navigator.clipboard.writeText("williamjohanp@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen grid-bg">

      {/* Ambient orbs */}
      <div className="glow-orb w-96 h-96 opacity-20" style={{ background: "#63b3ff", top: "5%", left: "10%", filter: "blur(120px)" }} />
      <div className="glow-orb w-80 h-80 opacity-15" style={{ background: "#a78bfa", top: "20%", right: "5%", filter: "blur(100px)" }} />
      <div className="glow-orb w-64 h-64 opacity-10" style={{ background: "#34d399", top: "60%", left: "50%", filter: "blur(100px)" }} />

      {/* ── NAV ── */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-5"
        style={{ background: navBg, backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0)" }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <span className="mono text-sm font-medium" style={{ color: "#63b3ff" }}>WJP</span>
            <span className="mono text-xs text-[#3d4a66] ml-2">// portfolio</span>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="hidden md:flex items-center gap-8">
            {["about", "experience", "projects", "skills", "contact"].map((s) => (
              <a key={s} href={`#${s}`} className="nav-link">{s}</a>
            ))}
          </motion.div>

          <motion.a
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            href="mailto:williamjohanp@gmail.com"
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-xs mono font-medium transition-all"
            style={{ border: "1px solid rgba(99,179,255,0.3)", color: "#63b3ff", background: "rgba(99,179,255,0.06)" }}
          >
            <Mail size={12} /> Hire Me
          </motion.a>
        </div>
      </motion.nav>

      {/* ── HERO ── */}
      <section id="about" className="min-h-screen flex flex-col justify-center relative pt-20 px-6">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="section-label mb-6"
              >
                Available for opportunities
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                className="text-5xl md:text-6xl font-extrabold leading-none tracking-tight mb-4"
              >
                <span className="text-[#e8edf7]">William</span>
                <br />
                <span className="serif italic" style={{ fontSize: "0.9em" }}>Johan</span>
                <br />
                <span className="gradient-text">Pakpahan</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="text-xl text-[#8896b3] mb-6 h-8"
              >
                <Typewriter />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                className="text-[#6b7a99] text-base leading-relaxed mb-8 max-w-md"
              >
                Developer profesional & inovatif dengan pengalaman di Software House. Mahir dalam{" "}
                <span style={{ color: "#63b3ff" }}>Flutter</span> dan{" "}
                <span style={{ color: "#a78bfa" }}>Laravel</span>. Berorientasi pada detail, selalu bersemangat belajar hal baru.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                className="flex flex-wrap items-center gap-3 mb-10"
              >
                <a
                  href="https://github.com/williamjohan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all"
                  style={{ background: "#63b3ff", color: "#080a0f" }}
                >
                  <Github size={14} /> GitHub
                </a>
                <a
                  href="https://linkedin.com/in/williamjohanp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all"
                  style={{ border: "1px solid rgba(99,179,255,0.3)", color: "#63b3ff" }}
                >
                  <Linkedin size={14} /> LinkedIn
                </a>
                <button
                  onClick={copyEmail}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm transition-all"
                  style={{ border: "1px solid rgba(255,255,255,0.07)", color: "#6b7a99" }}
                >
                  {copied ? <Check size={14} color="#34d399" /> : <Copy size={14} />}
                  {copied ? "Copied!" : "Copy Email"}
                </button>
              </motion.div>

              {/* Info badges */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}
                className="flex flex-wrap gap-3"
              >
                {[
                  { icon: <MapPin size={11} />, text: "Sidoarjo, East Java" },
                  { icon: <GraduationCap size={11} />, text: "GPA 3.87 — Universitas Dinamika" },
                  { icon: <Award size={11} />, text: "HAKI Holder" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-1.5 mono text-xs text-[#6b7a99]">
                    <span style={{ color: "#63b3ff" }}>{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: stat cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: "3+", label: "Years Experience", color: "#63b3ff", icon: <Briefcase size={20} /> },
                { value: "4+", label: "Projects Shipped", color: "#a78bfa", icon: <Code2 size={20} /> },
                { value: "3.87", label: "GPA Score", color: "#34d399", icon: <GraduationCap size={20} /> },
                { value: "1", label: "HAKI / IP Award", color: "#f6ad55", icon: <Award size={20} /> },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="card p-6 text-center animate-float"
                  style={{ animationDelay: `${i * 0.5}s` }}
                >
                  <div className="flex justify-center mb-3" style={{ color: stat.color }}>{stat.icon}</div>
                  <div className="text-3xl font-extrabold mb-1" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="mono text-xs text-[#6b7a99] leading-tight">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="mono text-xs text-[#3d4a66]">scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ChevronDown size={16} color="#3d4a66" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mb-14"
          >
            <div className="section-label mb-3">Career Journey</div>
            <h2 className="text-4xl font-extrabold text-[#e8edf7]">Experience</h2>
            <p className="text-[#6b7a99] mt-3 max-w-lg">Perjalanan profesional dari internship hingga fullstack engineer di software house.</p>
          </motion.div>

          <div className="space-y-0">
            {experiences.map((exp, i) => (
              <ExperienceCard key={exp.company} exp={exp} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mb-14"
          >
            <div className="section-label mb-3">Selected Work</div>
            <h2 className="text-4xl font-extrabold text-[#e8edf7]">Projects</h2>
            <p className="text-[#6b7a99] mt-3 max-w-lg">Aplikasi dan sistem yang dibangun dari konsep hingga production.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {projects.map((proj, i) => (
              <ProjectCard key={proj.name} proj={proj} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mb-14"
          >
            <div className="section-label mb-3">Technical Arsenal</div>
            <h2 className="text-4xl font-extrabold text-[#e8edf7]">Skills & Stack</h2>
            <p className="text-[#6b7a99] mt-3 max-w-lg">Teknologi dan tools yang dikuasai dari pengalaman nyata di lapangan.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-6">
            {skills.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} i={i} />
            ))}
          </div>

          {/* Stack icons row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-16 card p-8"
          >
            <div className="section-label mb-6 justify-center">Tech I Work With</div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-6 text-center">
              {[
                { icon: <Smartphone size={24} />, label: "Flutter", color: "#63b3ff" },
                { icon: <Code2 size={24} />, label: "Laravel", color: "#a78bfa" },
                { icon: <Code2 size={24} />, label: "JavaScript", color: "#34d399" },
                { icon: <Code2 size={24} />, label: "Java", color: "#f6ad55" },
                { icon: <Cloud size={24} />, label: "GCP", color: "#63b3ff" },
                { icon: <Database size={24} />, label: "MySQL", color: "#a78bfa" },
              ].map((t) => (
                <div key={t.label} className="flex flex-col items-center gap-2 group">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all group-hover:scale-110"
                    style={{ background: `${t.color}10`, border: `1px solid ${t.color}20`, color: t.color }}>
                    {t.icon}
                  </div>
                  <span className="mono text-xs text-[#6b7a99]">{t.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── AWARDS ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mb-10"
          >
            <div className="section-label mb-3">Recognition</div>
            <h2 className="text-4xl font-extrabold text-[#e8edf7]">Awards & Certs</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: "HAKI — Aplikasi APIK Desa Buncitan",
                issuer: "Kemenkumham RI",
                date: "September 2024",
                color: "#34d399",
                icon: "🏅",
              },
              {
                title: "Program Magang & Studi Independen Bersertifikat (MSIB)",
                issuer: "PT SIER · Kampus Merdeka",
                date: "Desember 2023",
                color: "#63b3ff",
                icon: "🎓",
              },
            ].map((award, i) => (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-6 flex items-start gap-4"
              >
                <div className="text-3xl flex-shrink-0">{award.icon}</div>
                <div>
                  <h3 className="font-bold text-[#e8edf7] mb-1 text-sm leading-snug">{award.title}</h3>
                  <div className="mono text-xs mb-2" style={{ color: award.color }}>{award.issuer}</div>
                  <span className="mono text-xs text-[#6b7a99]">{award.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <div className="section-label mb-4 justify-center">Let's Connect</div>
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6">
              <span className="gradient-text">Let's Build</span>
              <br />
              <span className="text-[#e8edf7]">Something</span>{" "}
              <span className="serif italic text-[#6b7a99]">great</span>
            </h2>
            <p className="text-[#6b7a99] text-lg max-w-md mx-auto mb-12 leading-relaxed">
              Open untuk full-time roles, freelance, atau kolaborasi proyek. Let's talk!
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-14">
              <a
                href="mailto:williamjohanp@gmail.com"
                className="flex items-center gap-3 px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:scale-105"
                style={{ background: "#63b3ff", color: "#080a0f" }}
              >
                <Mail size={16} /> williamjohanp@gmail.com
              </a>
              <a
                href="https://wa.me/628881766252"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-7 py-3.5 rounded-full font-bold text-sm transition-all"
                style={{ border: "1px solid rgba(99,179,255,0.3)", color: "#63b3ff" }}
              >
                <Phone size={16} /> +62 888-1766-252
              </a>
            </div>

            {/* Social links */}
            <div className="flex justify-center gap-4">
              {[
                { href: "https://github.com/williamjohan", icon: <Github size={18} />, label: "GitHub" },
                { href: "https://linkedin.com/in/williamjohanp", icon: <Linkedin size={18} />, label: "LinkedIn" },
                { href: "mailto:williamjohanp@gmail.com", icon: <Mail size={18} />, label: "Email" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ border: "1px solid rgba(255,255,255,0.07)", color: "#6b7a99" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,179,255,0.3)"; (e.currentTarget as HTMLElement).style.color = "#63b3ff"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.color = "#6b7a99"; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t py-8 px-6 text-center" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          <span className="mono text-xs text-[#3d4a66]">© 2025 William Johan Pakpahan</span>
          <span className="mono text-xs text-[#3d4a66]">Built with Next.js · Framer Motion · Tailwind CSS</span>
          <span className="mono text-xs text-[#3d4a66]">Sidoarjo, East Java 🇮🇩</span>
        </div>
      </footer>

    </div>
  );
}
