import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import h1 from "../imagepacks/h1.png";
import p4 from "../imagepacks/p4.png";
import p5 from "../imagepacks/p5main.png";
import p6 from "../imagepacks/p6.png";
import p7 from "../imagepacks/p7.png";
import P8 from "../imagepacks/P8.png";
import p9 from "../imagepacks/p9.png";
import p10 from "../imagepacks/p10.png";
import p11 from "../imagepacks/p11.jpeg";
import p12 from "../imagepacks/p12.png";
import SectionReveal from "./SectionReveal";

const projects = [
  {
    image: p9,
    title: "Referrr",
    description:
      "Referrrr is an AI-powered job outreach platform that generates personalized referral, cold email, LinkedIn, and HR messages using your resume and skills.",
    tech: ["React.js", "Tailwind CSS", "Framer Motion", "Lucide React", "Fetch API", "Node.js", "Express.js", "CORS", "Groq API"],
    link: "https://referrrr.vercel.app/",
    github: "https://github.com/Ignite01rb/referrrr",
    accent: "from-green-200 to-blue-800",
    accentColor: "#66ffc2",
    tag: "Full Stack",
    num: "01",
  },
  {
    image: p5,
    title: "Hospital Management System",
    description:
      "Scalable hospital workflow management platform with department filtering, patient modules and responsive UI.",
    tech: ["React", "TailwindCSS", "Node.js", "MySQL"],
    link: "https://careconnect-1v6s.vercel.app/",
    github: "https://github.com/Ignite01rb/Care-Connect",
    accent: "from-red-800 to-pink-500",
    accentColor: "#ffcc99",
    tag: "Full Stack",
    num: "02",
  },
  {
    image: h1,
    title: "MediBook",
    description:
      "Full-stack healthcare platform enabling appointment scheduling, doctor availability management, ML-based enhancements and secure backend integration.",
    tech: ["React", "Node.js", "MongoDB", "Express", "Python"],
    link: "https://medi-book-portal.vercel.app/",
    github: "https://github.com/Ignite01rb/MediBook-",
    accent: "from-cyan-400 to-orange-800",
    accentColor: "#22d3ee",
    tag: "Full Stack",
    num: "03",
  },
  {
    image: p7,
    title: "AuraPlay",
    description:
      "AuraPlay is a premium movie discovery platform that helps users explore films, manage watchlists, read community reviews, and find where to stream their favorite content.",
    tech: ["ReactJS", "React-Bootstrap", "FontAwesome", "Axios", "Vanilla CSS"],
    link: "https://aura-play-three.vercel.app/",
    github: "https://github.com/Ignite01rb/AuraPlay",
    accent: "from-yellow-400 to-red-500",
    accentColor: "#facc15",
    tag: "Frontend",
    num: "04",
  },
  {
    image: p10,
    title: "Taskify",
    description:
      "Taskify is a premium, glassmorphic productivity dashboard featuring account registration, real-time analytics, and nested checklists to help users manage their daily goals.",
    tech: ["React", "Vanilla CSS"],
    link: "https://taskify-kappa-green.vercel.app/",
    github: "https://github.com/Ignite01rb/Todos",
    accent: "from-red-600 to-brown-700",
    accentColor: "#a3c2c2",
    tag: "React",
    num: "05",
  },
  {
    image: p11,
    title: "Sentiment Analysis",
    description:
      "Machine learning model to classify tweets as positive or negative using NLP pipelines.",
    tech: ["Python", "NLTK", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    link: "https://sentimentanalysis6.streamlit.app/",
    github: "https://github.com/Ignite01rb/sentiment",
    accent: "from-blue-400 to-purple-500",
    accentColor: "#d24dff",
    tag: "ML / AI",
    num: "06",
  },
  {
    image: p12,
    title: "StockBot",
    description:
      "An agentic AI stock assistant that fetches real-time prices, compares stocks, and executes human-approved buy/sell orders using LLaMA 3.3 on Groq, orchestrated by LangGraph, and served via FastAPI.",
    tech: ["LLaMA 3.3", "LangGraph", "FastAPI", "HTML" ,"Vanilla CSS"],
    link: "https://stockchatbot-g39g.onrender.com",
    github: "https://github.com/Ignite01rb/stock-chatbot",
    accent: "from-green-200 to-white-500",
    accentColor: "#b8ed82",
    tag: "AI Agent",
    num: "07",
  },
  {
    image: P8,
    title: "TowerDefence",
    description:
      "A 2D Tower Defense game built in C++ with OpenGL and GLUT, featuring real-time enemy spawning, interactive combat, and strategic power-up mechanics.",
    tech: ["C++", "OpenGL", "GLUT", "G++ Compiler"],
    github: "https://github.com/Ignite01rb/towerdefence",
    accent: "from-green-400 to-red-500",
    accentColor: "#70db70",
    tag: "C++",
    num: "08",
  },
];

// ── Detect touch device ──────────────────────────────────────────────────────
const isTouchDevice =
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

// ── GitHubIcon ───────────────────────────────────────────────────────────────
function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

// ── ProjectCard ──────────────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const isEven = index % 2 === 0;

  // --- Scroll-based image parallax ---
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [-18, 18]);

  // --- 3D tilt (desktop only) ---
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 220, damping: 22 });
  const rotateY = useSpring(rawRotateY, { stiffness: 220, damping: 22 });

  // --- Glow position (desktop) ---
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  // --- Hover / touch state ---
  const [hovered, setHovered] = useState(false);
  const [touched, setTouched] = useState(false);
  const [activeTech, setActiveTech] = useState(null);

  // Desktop: mouse move → tilt + glow
  const handleMouseMove = useCallback(
    (e) => {
      if (isTouchDevice) return;
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);   // -1 … 1
      const dy = (e.clientY - cy) / (rect.height / 2);  // -1 … 1
      rawRotateY.set(dx * 5);
      rawRotateX.set(-dy * 3);
      glowX.set(((e.clientX - rect.left) / rect.width) * 100);
      glowY.set(((e.clientY - rect.top) / rect.height) * 100);
    },
    [rawRotateX, rawRotateY, glowX, glowY]
  );

  const handleMouseEnter = () => { if (!isTouchDevice) setHovered(true); };
  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    setHovered(false);
    rawRotateX.set(0);
    rawRotateY.set(0);
    glowX.set(50);
    glowY.set(50);
  };

  // Mobile: touch tap
  const handleTouchStart = () => setTouched(true);
  const handleTouchEnd   = () => setTimeout(() => setTouched(false), 350);

  const isActive = hovered || touched;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      // Mobile bounce on tap
      whileTap={isTouchDevice ? { scale: 0.985 } : {}}
      style={{
        rotateX: isTouchDevice ? 0 : rotateX,
        rotateY: isTouchDevice ? 0 : rotateY,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      className={`relative flex flex-col ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } items-stretch gap-0 rounded-2xl overflow-hidden cursor-pointer`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      // Border glow via box-shadow
      animate={{
        boxShadow: isActive
          ? `0 0 0 1px ${project.accentColor}55, 0 20px 60px ${project.accentColor}18, 0 4px 20px rgba(0,0,0,0.5)`
          : "0 0 0 1px rgba(255,255,255,0.07), 0 4px 20px rgba(0,0,0,0.3)",
      }}
      transition={{ duration: 0.35 }}
    >
      {/* ── Spotlight glow (desktop) ── */}
      {!isTouchDevice && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl z-10"
          style={{
            background: `radial-gradient(circle at ${glowX.get()}% ${glowY.get()}%, ${project.accentColor}14 0%, transparent 65%)`,
            opacity: hovered ? 1 : 0,
          }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* ── Image side ── */}
      <motion.div
        className="relative w-full md:w-1/2 overflow-hidden min-h-[220px] sm:min-h-[280px] md:min-h-[360px] bg-black/40"
        animate={{ transformStyle: "preserve-3d" }}
      >
        {/* Image with parallax + zoom */}
        <motion.img
          src={project.image}
          alt={project.title}
          loading="lazy"
          style={{ y: imageY }}
          className="absolute inset-0 w-full h-full object-cover object-center"
          animate={{
            scale: isActive ? 1.1 : 1.06,
          }}
          transition={{ duration: isTouchDevice ? 0.3 : 0.55, ease: "easeOut" }}
        />

        {/* Dark overlay */}
        <motion.div
          className="absolute inset-0 bg-black"
          animate={{ opacity: isActive ? 0.18 : 0.42 }}
          transition={{ duration: 0.4 }}
        />

        {/* Accent gradient wash */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-tr ${project.accent}`}
          animate={{ opacity: isActive ? 0.28 : 0 }}
          transition={{ duration: 0.45 }}
        />

        {/* Mobile: shimmer sweep on touch */}
        {isTouchDevice && (
          <AnimatePresence>
            {touched && (
              <motion.div
                key="shimmer"
                className="absolute inset-0 pointer-events-none"
                initial={{ x: "-100%", opacity: 0.6 }}
                animate={{ x: "200%", opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                style={{
                  background: `linear-gradient(105deg, transparent 40%, ${project.accentColor}33 50%, transparent 60%)`,
                }}
              />
            )}
          </AnimatePresence>
        )}

        {/* Number watermark */}
        <motion.div
          className="absolute top-4 left-5 font-mono font-bold select-none pointer-events-none"
          style={{ letterSpacing: "-0.04em" }}
          animate={{
            fontSize: isActive ? "4.5rem" : "3.5rem",
            color: isActive ? `${project.accentColor}18` : "rgba(255,255,255,0.06)",
          }}
          transition={{ duration: 0.5 }}
        >
          {project.num}
        </motion.div>

        {/* Tag pill */}
        <motion.div
          className="absolute top-4 right-4"
          animate={{ y: isActive ? -5 : 0, scale: isActive ? 1.06 : 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
        >
          <motion.span
            className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full"
            style={{
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(8px)",
            }}
            animate={{
              border: isActive
                ? `1px solid ${project.accentColor}88`
                : `1px solid ${project.accentColor}33`,
              color: isActive ? project.accentColor : `${project.accentColor}99`,
            }}
            transition={{ duration: 0.3 }}
          >
            {project.tag}
          </motion.span>
        </motion.div>
      </motion.div>

      {/* ── Content side ── */}
      <div
        className="relative w-full md:w-1/2 flex flex-col justify-center p-6 sm:p-8 md:p-10"
        style={{ background: "rgba(255,255,255,0.03)" }}
      >
        {/* Accent line — breathes on hover */}
        <motion.div
          className={`absolute top-0 ${
            isEven ? "right-0 md:left-0 md:right-auto" : "left-0"
          } h-full w-[2px]`}
          style={{
            background: `linear-gradient(to bottom, transparent, ${project.accentColor}, transparent)`,
          }}
          animate={{ opacity: isActive ? 0.8 : 0.3, scaleY: isActive ? 1 : 0.7 }}
          transition={{ duration: 0.4 }}
        />

        {/* Number label */}
        <motion.span
          className="font-mono text-xs tracking-[0.2em] mb-3 block"
          style={{ color: project.accentColor }}
          animate={{ opacity: isActive ? 1 : 0.55, x: isActive ? 4 : 0 }}
          transition={{ duration: 0.3 }}
        >
          // {project.num}
        </motion.span>

        {/* Title */}
        <motion.h3
          className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4"
          style={{ letterSpacing: "-0.02em", fontFamily: "'Fira Code', monospace" }}
          animate={{ color: isActive ? project.accentColor : "#ffffff" }}
          transition={{ duration: 0.25 }}
        >
          {project.title}
        </motion.h3>

        {/* Description */}
        <motion.p
          className="text-sm sm:text-base leading-relaxed mb-6"
          animate={{ color: isActive ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.45)" }}
          transition={{ duration: 0.3 }}
        >
          {project.description}
        </motion.p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((t, i) => (
            <motion.span
              key={i}
              className="text-xs font-mono px-3 py-1 rounded-full cursor-default"
              initial={{ opacity: 0, y: 10, scale: 0.88 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.35,
                delay: index * 0.08 + 0.35 + i * 0.045,
                ease: "easeOut",
              }}
              // Stagger-ripple when card becomes active
              animate={
                isActive
                  ? {
                      borderColor: `${project.accentColor}55`,
                      color: activeTech === i ? project.accentColor : `${project.accentColor}aa`,
                      background: `${project.accentColor}0d`,
                      y: activeTech === i ? -3 : 0,
                      transition: { delay: i * 0.03, duration: 0.22 },
                    }
                  : {
                      borderColor: "rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.55)",
                      background: "rgba(255,255,255,0.06)",
                      y: 0,
                      transition: { delay: i * 0.02, duration: 0.22 },
                    }
              }
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
              onMouseEnter={() => setActiveTech(i)}
              onMouseLeave={() => setActiveTech(null)}
              // Mobile: tap a tag to highlight it
              onTouchStart={() => setActiveTech(i)}
              onTouchEnd={() => setTimeout(() => setActiveTech(null), 600)}
              whileTap={{ scale: 0.93 }}
            >
              {t}
            </motion.span>
          ))}
        </div>

        {/* ── Visit Project CTA ── */}
        {project.link && (
          <motion.a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 w-fit mb-3 relative overflow-hidden rounded-lg px-4 py-2"
            style={{ border: `1px solid ${project.accentColor}33` }}
            animate={{
              background: isActive ? `${project.accentColor}14` : "transparent",
              borderColor: isActive ? `${project.accentColor}66` : `${project.accentColor}22`,
            }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Fill sweep animation on hover */}
            <motion.span
              className="absolute inset-0 pointer-events-none"
              style={{ background: `${project.accentColor}18`, originX: 0 }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isActive ? 1 : 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
            <motion.span
              className="text-sm font-semibold tracking-wide relative z-10"
              style={{ color: project.accentColor }}
              animate={{ x: isActive ? 2 : 0 }}
              transition={{ duration: 0.2 }}
            >
              Visit Project
            </motion.span>
            <motion.span
              className="inline-flex items-center justify-center w-7 h-7 rounded-full text-sm relative z-10"
              style={{
                border: `1px solid ${project.accentColor}55`,
                color: project.accentColor,
                background: `${project.accentColor}11`,
              }}
              animate={{ x: isActive ? 4 : 0, rotate: isActive ? 0 : 0 }}
              whileHover={{ x: 6, scale: 1.18 }}
              transition={{ type: "spring", stiffness: 340, damping: 20 }}
            >
              →
            </motion.span>
          </motion.a>
        )}

        {/* ── GitHub link ── */}
        <motion.a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 w-fit"
          whileHover={{ x: 3 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.18 }}
        >
          <motion.span
            className="text-sm font-semibold tracking-wide"
            animate={{ color: isActive ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.35)" }}
            transition={{ duration: 0.25 }}
          >
            GitHub
          </motion.span>
          <motion.span
            className="inline-flex items-center justify-center w-7 h-7 rounded-full text-sm"
            style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}
            animate={{
              borderColor: isActive ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)",
              color: isActive ? "#fff" : "rgba(255,255,255,0.35)",
              scale: 1,
            }}
            whileHover={{ scale: 1.18, rotate: 15 }}   // spin hint on hover
            whileTap={{ scale: 0.9, rotate: -10 }}
            transition={{ type: "spring", stiffness: 380, damping: 18 }}
          >
            <GitHubIcon />
          </motion.span>
        </motion.a>
      </div>
    </motion.div>
  );
}

// ── Projects section ─────────────────────────────────────────────────────────
export default function Projects() {
  return (
    <section
      id="projects"
      className="relative pt-20 pb-28 md:pt-28 md:pb-36 px-4 sm:px-6 md:px-14 lg:px-20 overflow-hidden"
    >
      {/* Background watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <h1 className="text-[70px] sm:text-[120px] md:text-[200px] font-bold text-white/[0.025] tracking-widest whitespace-nowrap">
          PROJECTS
        </h1>
      </div>

      {/* Title */}
      <SectionReveal>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          className="relative text-4xl sm:text-5xl md:text-7xl font-bold mb-16 md:mb-24 tracking-tight text-center"
          style={{ fontFamily: "'Fira Code', monospace" }}
        >
          <span
            style={{
              background: "linear-gradient(90deg, #38bdf8, #22d3ee)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {"<ProjectList />"}
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center gap-4 mb-12 md:mb-16 max-w-7xl mx-auto"
          style={{ transformOrigin: "left" }}
        >
          <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.08)" }} />
          <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
            projects
          </span>
          <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.08)" }} />
        </motion.div>
      </SectionReveal>

      {/* Project list */}
      <div className="relative max-w-7xl mx-auto flex flex-col gap-4 sm:gap-5">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>

      {/* Bottom line */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto mt-16 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
          transformOrigin: "center",
        }}
      />
    </section>
  );
}