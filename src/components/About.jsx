import { motion } from "framer-motion";
import SectionReveal from "./SectionReveal";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
  viewport: { once: true },
});

const tags = [
  { label: "Full Stack", color: "blue" },
  { label: "DSA", color: "purple" },
  { label: "AI / ML", color: "green" },
  { label: "UI UX Design", color: "pink" },
  // { label: "React.js", color: "blue" },
  // { label: "Node.js", color: "purple" },
  { label: "Python", color: "green" },
  { label: "MongoDB", color: "pink" },
  { label: "MySQL", color: "pink" },
];

const tagColors = {
  blue:   { text: "#38bdf8", border: "rgba(56,189,248,0.3)",   bg: "rgba(56,189,248,0.07)"   },
  purple: { text: "#a78bfa", border: "rgba(167,139,250,0.3)",  bg: "rgba(167,139,250,0.07)"  },
  green:  { text: "#34d399", border: "rgba(52,211,153,0.3)",   bg: "rgba(52,211,153,0.07)"   },
  pink:   { text: "#f472b6", border: "rgba(244,114,182,0.3)",  bg: "rgba(244,114,182,0.07)"  },
};

const skills = [
  { label: "Problem Solving", pct: 90, gradient: "linear-gradient(90deg,#38bdf8,#818cf8)" },
  { label: "Full Stack Dev",  pct: 80, gradient: "linear-gradient(90deg,#a78bfa,#38bdf8)" },
  { label: "AI / ML",         pct: 65, gradient: "linear-gradient(90deg,#34d399,#38bdf8)" },
  { label: "UI / UX",         pct: 90, gradient: "linear-gradient(90deg,#f472b6,#a78bfa)" },
];

const timeline = [
  { date: "Sept 2023", color: "#38bdf8", title: "Joined BVCOE",          sub: "B.Tech ECE begins"       },
  { date: "Nov 2023",  color: "#a78bfa", title: "Joined Societies",          sub: "EduMinerva & IOSC"       },
  { date: "2024",      color: "#34d399", title: "Projects",           },
  { date: "2025",      color: "#fb923c", title: "Training ",              sub: "AI/ML training" },
  { date: "2026 →",    color: "#f472b6", title: "Now",                   sub: "Seeking opportunities"   },
];

function Card({ children, className = "", style = {} }) {
  return (
    <div
      className={`rounded-2xl p-6 border transition-all duration-300 hover:border-cyan-400/30 ${className}`}
      style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.1)", ...style }}
    >
      {children}
    </div>
  );
}

function CardTag({ color, label }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
      <span className="font-mono text-[10px] tracking-[0.18em] uppercase" style={{ color }}>{label}</span>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-6 md:px-20 py-24 mt-7">

      {/* Header */}
      <motion.div {...fadeUp(0)} className="text-center mb-14">
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: "rgba(56,189,248,0.5)" }}>
          // who am i
        </p>
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
          About{" "}
          <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Me</span>
        </h2>
      </motion.div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* identity.json — tall card */}
        <motion.div {...fadeUp(0.1)} className="md:row-span-2">
          <Card className="h-full">
            <CardTag color="#38bdf8" label="identity.json" />
            <div className="border-l-2 border-cyan-400/40 pl-4 font-mono text-xs leading-7">
              <span className="text-violet-400">const</span>{" "}
              <span className="text-cyan-300">Raaghav</span>{" = "}
              <span className="text-cyan-400">{"{"}</span>
              <br />
              {[
                ["role",    '"Software Developer"',   "text-green-400"],
                ["college", '"BVCOE, GGSIPU"',        "text-green-400"],
                ["year",    "3rd",                    "text-orange-400"],
                ["cgpa",    "8.3",                    "text-orange-400"],
                ["openTo",  '"Internships"',           "text-green-400"],
                ["learning",'"Always"',               "text-green-400"],
              ].map(([k, v, vc]) => (
                <div key={k} className="ml-4">
                  <span className="text-violet-400">{k}</span>
                  <span className="text-gray-400">: </span>
                  <span className={vc}>{v}</span>
                  <span className="text-gray-500">,</span>
                </div>
              ))}
              <span className="text-cyan-400">{"}"}</span>
              <span className="text-gray-400">;</span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              {[["200+", "LC Solved"], ["8.3", "CGPA"], ["3+", "Projects"]].map(([n, l]) => (
                <div key={l} className="rounded-xl p-3 text-center" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <div className="text-2xl font-bold font-mono" style={{ color: "#38bdf8" }}>{n}</div>
                  <div className="text-[10px] mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>{l}</div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* interests */}
        <motion.div {...fadeUp(0.15)}>
          <Card>
            <CardTag color="#a78bfa" label="interests.map()" />
            {/* <h3 className="text-sm font-semibold text-white mb-3">What I Love Building</h3> */}
            <div className="flex flex-wrap gap-2">
              {tags.map(({ label, color }) => (
                <span
                  key={label}
                  className="font-mono text-[11px] px-2.5 py-1 rounded-md"
                  style={{ color: tagColors[color].text, border: `0.5px solid ${tagColors[color].border}`, background: tagColors[color].bg }}
                >
                  {label}
                </span>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* proficiency */}
        <motion.div {...fadeUp(0.2)}>
          <Card>
            <CardTag color="#34d399" label="skills.proficiency" />
            <h3 className="text-sm font-semibold text-white mb-4">Core Proficiency</h3>
            <div className="flex flex-col gap-3">
              {skills.map(({ label, pct, gradient }) => (
                <div key={label}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>{label}</span>
                    <span className="text-xs font-mono" style={{ color: "#38bdf8" }}>{pct}%</span>
                  </div>
                  <div className="h-[3px] rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: gradient }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* timeline — full width */}
        <motion.div {...fadeUp(0.25)} className="md:col-span-2">
          <Card>
            <CardTag color="#fb923c" label="journey.timeline" />
            <h3 className="text-sm font-semibold text-white mb-6">My Journey</h3>
            <div className="flex items-start gap-0">
              {timeline.map((item, i) => (
                <div key={i} className="flex-1 flex flex-col items-center text-center gap-2 relative">
                  {/* connector line */}
                  {i < timeline.length - 1 && (
                    <div className="absolute top-[4px] left-1/2 w-full h-[1px]"
                      style={{ background: `linear-gradient(90deg, ${item.color}44, ${timeline[i+1].color}44)` }} />
                  )}
                  <div className="w-2.5 h-2.5 rounded-full z-10 relative"
                    style={{ background: item.color, boxShadow: i === timeline.length - 1 ? `0 0 8px ${item.color}` : "none" }} />
                  <span className="font-mono text-[10px]" style={{ color: item.color }}>{item.date}</span>
                  <span className="text-xs font-semibold text-white leading-tight">{item.title}</span>
                  <span className="text-[11px] leading-tight" style={{ color: "rgba(255,255,255,0.35)" }}>{item.sub}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

      </div>
    </section>
  );
}