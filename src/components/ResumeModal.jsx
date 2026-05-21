import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const RESUME_PDF = "/resume/RaaghavBisht.pdf";

const skills = {
  Languages:  ["C++", "Python", "JavaScript"],
  Frontend:   ["React.js", "Tailwind CSS", "Material UI", "Bootstrap", "HTML5", "CSS3"],
  Backend:    ["Node.js"],
  Databases:  ["MySQL", "MongoDB"],
  "ML / AI":  ["Scikit-learn", "TensorFlow", "Pandas", "NumPy"],
  Tools:      ["Git", "GitHub", "PowerBI", "Excel"],
};

const accentMap = {
  Languages: "#38bdf8", Frontend: "#a78bfa", Backend: "#34d399",
  Databases: "#fb923c", "ML / AI": "#f472b6", Tools: "#94a3b8",
};

const projects = [
  {
    title: "MediBook",
    stack: "React.js · Node.js · Express.js · MongoDB · Socket.io · Python",
    desc: "Full-stack healthcare platform with real-time appointment scheduling via Socket.io and ML-powered medical guidance.",
    accent: "#22d3ee",
    live: "https://doctorsite-qjri.vercel.app/",
  },
  {
    title: "CareConnect",
    stack: "React.js · Tailwind CSS · Node.js · MySQL",
    desc: "Hospital management system with patient records, staff workflows, and department-wise filtering.",
    accent: "#f472b6",
    live: "https://careconnect-1v6s.vercel.app/",
  },
  {
    title: "Sentiment Analysis",
    stack: "Python · Scikit-learn · NLTK · Pandas · NumPy",
    desc: "ML model classifying tweets as positive/negative using TF-IDF and Logistic Regression. Achieved 81% accuracy.",
    accent: "#fb7185",
    live: "https://sentimentanalysis6.streamlit.app/",
  },
];

const achievements = [
  { icon: "🥉", text: "3rd Position – Summer Hackathon by IOSC" },
  { icon: "⚡", text: "LeetCode – 200+ Problems Solved" },
  { icon: "🎪", text: "Bvest Technical Fest – Organizing Committee" },
];

const societies = [
  { org: "EduMinerva, BVCOE", role: "Video Editing Head", period: "Nov 2023 – Present", accent: "#a78bfa" },
  { org: "IOSC (Intel OneAPI Students Club)", role: "Video Editing Head & WebD Team", period: "Nov 2023 – Present", accent: "#38bdf8" },
  { org: "Odyssey 4.0 – College Magazine", role: "Editor", period: "Jan 2026 – May 2026", accent: "#34d399" },
];

function Tag({ children, color }) {
  return (
    <span
      className="text-[11px] font-mono px-2.5 py-1 rounded-md"
      style={{
        background: `${color}18`,
        border: `0.5px solid ${color}40`,
        color: color,
      }}
    >
      {children}
    </span>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "#38bdf8" }}>
        {children}
      </span>
      <div className="flex-1 h-px" style={{ background: "rgba(56,189,248,0.15)" }} />
    </div>
  );
}

export default function ResumeModal({ open, setOpen }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setOpen]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={(e) => { if (e.target === overlayRef.current) setOpen(false); }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
          style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(8px)" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 28 }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl flex flex-col"
            style={{ background: "#07090f", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {/* sticky header */}
            <div
              className="sticky top-0 z-20 flex items-center justify-between px-5 sm:px-7 py-4 shrink-0"
              style={{
                background: "rgba(7,9,15,0.96)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full" style={{ background: "#38bdf8" }} />
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase" style={{ color: "rgba(56,189,248,0.7)" }}>
                  resume
                </span>
                <span
                  className="font-mono text-[10px] px-2 py-0.5 rounded"
                  style={{ background: "rgba(56,189,248,0.08)", border: "0.5px solid rgba(56,189,248,0.2)", color: "#38bdf8" }}
                >
                  2026
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={RESUME_PDF}
                  download
                  className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg transition-opacity hover:opacity-80"
                  style={{ background: "linear-gradient(90deg,#1d4ed8,#0891b2)", color: "#fff" }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Download PDF
                </a>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all"
                  style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.45)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.45)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* body */}
            <div className="px-5 sm:px-7 py-7 space-y-8">

              {/* NAME + CONTACT */}
              <motion.div
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                className="pb-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-1" style={{ letterSpacing: "-0.03em" }}>
                  <span className="text-white">Raaghav </span>
                  <span style={{
                    background: "linear-gradient(90deg,#38bdf8,#22d3ee)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}>Bisht</span>
                </h1>
                <p className="font-mono text-[11px] tracking-[0.16em] uppercase mb-4" style={{ color: "rgba(56,189,248,0.6)" }}>
                  B.Tech ECE · GGSIPU · CGPA 8.3 · Sept 2023 – June 2027
                </p>

                <div className="flex flex-wrap gap-3 items-center">
                  <a href="mailto:raaghavbisht@gmail.com"
                    className="flex items-center gap-1.5 text-xs transition-colors hover:text-white"
                    style={{ color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    raaghavbisht@gmail.com
                  </a>
                  <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
                  <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>+91 9354458389</span>
                  <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
                  <div className="flex items-center gap-2">
                    {[
                      { icon: <FaGithub size={13}/>, href: "https://github.com/Ignite01rb", hover: "#fff" },
                      { icon: <FaLinkedin size={13}/>, href: "https://www.linkedin.com/in/raaghav-bisht-b03a60291/", hover: "#38bdf8" },
                      { icon: <SiLeetcode size={13}/>, href: "https://leetcode.com/u/IgniteRB/", hover: "#facc15" },
                    ].map((s, i) => (
                      <a key={i} href={s.href} target="_blank" rel="noreferrer"
                        className="w-7 h-7 rounded-full flex items-center justify-center transition-all"
                        style={{ border: "0.5px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.4)" }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = s.hover; e.currentTarget.style.borderColor = s.hover + "55"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}>
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* SKILLS */}
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <SectionLabel>// skills</SectionLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {Object.entries(skills).map(([cat, items]) => (
                    <div key={cat} className="rounded-xl p-4"
                      style={{ background: "rgba(255,255,255,0.025)", border: "0.5px solid rgba(255,255,255,0.07)" }}>
                      <p className="font-mono text-[10px] tracking-widest uppercase mb-2.5" style={{ color: accentMap[cat] }}>
                        {cat}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {items.map(s => <Tag key={s} color={accentMap[cat]}>{s}</Tag>)}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* EXPERIENCE */}
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <SectionLabel>// experience</SectionLabel>
                <div className="rounded-xl p-4 sm:p-5"
                  style={{ background: "rgba(255,255,255,0.025)", border: "0.5px solid rgba(255,255,255,0.07)" }}>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <p className="text-white font-semibold text-sm">Summer Trainee – AI/ML & Deep Learning</p>
                      <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>
                        Bharati Vidyapeeth's College of Engineering, New Delhi
                      </p>
                    </div>
                    <Tag color="#34d399">June – July 2025</Tag>
                  </div>
                  <ul className="space-y-1.5">
                    {[
                      "Supervised & unsupervised learning, preprocessing pipelines, feature engineering",
                      "Classification & regression models evaluated with accuracy metrics and confusion matrix",
                      "Tools: NumPy, Pandas, Scikit-learn",
                    ].map((pt, i) => (
                      <li key={i} className="flex gap-2 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                        <span style={{ color: "#34d399", flexShrink: 0 }}>▸</span>{pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* PROJECTS */}
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
                <SectionLabel>// projects</SectionLabel>
                <div className="space-y-2.5">
                  {projects.map((p, i) => (
                    <div key={i} className="rounded-xl p-4 sm:p-5 flex gap-4"
                      style={{ background: "rgba(255,255,255,0.025)", border: "0.5px solid rgba(255,255,255,0.07)" }}>
                      <div className="w-1 rounded-full shrink-0 self-stretch" style={{ background: p.accent }} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                          <p className="text-white font-semibold text-sm">{p.title}</p>
                          <a href={p.live} target="_blank" rel="noreferrer"
                            className="font-mono text-[10px] flex items-center gap-1 transition-opacity hover:opacity-70"
                            style={{ color: p.accent }}>
                            Live ↗
                          </a>
                        </div>
                        <p className="font-mono text-[10px] mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>{p.stack}</p>
                        <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* ACHIEVEMENTS */}
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.21 }}>
                <SectionLabel>// achievements</SectionLabel>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {achievements.map((a, i) => (
                    <div key={i} className="rounded-xl p-4 flex flex-col gap-2"
                      style={{ background: "rgba(255,255,255,0.025)", border: "0.5px solid rgba(255,255,255,0.07)" }}>
                      <span className="text-2xl">{a.icon}</span>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{a.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* SOCIETIES */}
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}>
                <SectionLabel>// societies & responsibilities</SectionLabel>
                <div className="space-y-2.5">
                  {societies.map((s, i) => (
                    <div key={i} className="rounded-xl px-4 py-3 flex items-center gap-4"
                      style={{ background: "rgba(255,255,255,0.025)", border: "0.5px solid rgba(255,255,255,0.07)" }}>
                      <div className="w-1.5 h-8 rounded-full shrink-0" style={{ background: s.accent }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-semibold truncate">{s.org}</p>
                        <p className="text-xs mt-0.5" style={{ color: s.accent }}>{s.role}</p>
                      </div>
                      <span className="font-mono text-[10px] shrink-0 text-right" style={{ color: "rgba(255,255,255,0.25)" }}>
                        {s.period}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* BOTTOM CTA */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }}
                className="pt-2 pb-1 flex flex-col sm:flex-row items-center justify-between gap-4"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                <p className="font-mono text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>
                  // raaghavbisht@gmail.com · +91 9354458389
                </p>
                <a
                  href={RESUME_PDF}
                  download
                  className="flex items-center gap-2 text-sm font-semibold px-6 py-2.5 rounded-full transition-opacity hover:opacity-85"
                  style={{ background: "linear-gradient(90deg,#1d4ed8,#0891b2)", color: "#fff" }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Download Full Resume
                </a>
              </motion.div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}