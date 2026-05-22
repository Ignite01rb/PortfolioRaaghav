import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import p1 from "../imagepacks/p1.png";
// import p2 from "../imagepacks/p2.png";
// import p3 from "../imagepacks/p3.png";
import p4 from "../imagepacks/p4.png";
import p5 from "../imagepacks/p5main.png";
import p6 from "../imagepacks/p6.png";
import p7 from "../imagepacks/p7.png";
import P8 from "../imagepacks/p8.png";
import p9 from "../imagepacks/p9.png";
import SectionReveal from "./SectionReveal";

const projects = [
  {
    image: p1,
    title: "MediBook",
    description:
      "Full-stack healthcare platform enabling appointment scheduling, doctor availability management, ML-based enhancements and secure backend integration.",
    tech: ["React", "Node.js", "MongoDB", "Express", "Python"],
    link: "https://doctorsite-qjri.vercel.app/",
    github: "https://github.com/Ignite01rb/MediBook-",
    accent: "from-cyan-400 to-orange-800",
    accentColor: "#22d3ee",
    tag: "Full Stack",
    num: "01",
  },
  {
    image: p9,
    title: "Referrr",
    description:
      "Referrrr is an AI-powered job outreach platform that generates personalized referral, cold email, LinkedIn, and HR messages using your resume and skills.",
    tech: ["React.js", " Tailwind CSS","Framer Motion","Lucide React","Fetch API" ,"Node.js","Express.js","CORS","Groq API"],
    link: "https://referrrr.vercel.app/",
    github: "https://github.com/Ignite01rb/referrrr",
    accent: "from-green-200 to-blue-800",
    accentColor: "#66ffc2",
    tag: "Full Stack",
    num: "02",
  },
  {
    image: p5,
    title: "Hospital Management System",
    description:
      "Scalable hospital workflow management platform with department filtering, patient modules and responsive UI.",
    tech: ["React", "TailwindCSS"],
    link: "https://careconnect-1v6s.vercel.app/",
    github: "https://github.com/Ignite01rb/Care-Connect",
    accent: "from-red-800 to-pink-500",
    accentColor: "#ffcc99",
    tag: "Full Stack",
    num: "03",
  },
  {
    image: p6,
    title: "Sentiment Analysis",
    description:
      "Machine learning model to classify tweets as positive or negative using NLP pipelines.",
    tech: [
      "Python",
      "NLTK",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
    ],
    link: "https://sentimentanalysis6.streamlit.app/",
    github: "https://github.com/Ignite01rb/sentiment",
    accent: "from-blue-400 to-purple-500",
    accentColor: "#d24dff",
    tag: "ML / AI",
    num: "04",
  },
  {
    image: p7,
    title: "AuraPlay",
    description:
      "AuraPlay is a premium movie discovery platform that helps users explore films, manage watchlists, read community reviews, and find where to stream their favorite content.",
    tech: [
      "ReactJS",
      
    ],
    link: "https://aura-play-three.vercel.app/",
    github: "https://github.com/Ignite01rb/AuraPlay",
    accent: "from-yellow-400 to-red-500",
    accentColor: "#facc15",
    tag: "Frontend",
    num: "05",
  },
  {
    image: p4,
    title: "React TODO Application",
    description:
      "Task management app with local storage persistence, editing features and completed task segregation.",
    tech: ["React", "CSS"],
    link: "https://669dfd7759d015c16460b482--ephemeral-medovik-909ca2.netlify.app/",
    github: "https://github.com/Ignite01rb/Todos",
    accent: "from-red-600 to-brown-700",
    accentColor: "#a3c2c2",
    tag: "React",
    num: "06",
  },
  {
    image: P8,
    title: "TowerDefence",
    description:
      "A 2D Tower Defense game built in C++ with OpenGL and GLUT, featuring real-time enemy spawning, interactive combat, and strategic power-up mechanics.",
    tech: [
      "C++",
      "OpenGL",
      "GLUT",
      "G++ Compiler",
    ],
    // link: "https://sentimentanalysis6.streamlit.app/",
    github: "https://github.com/Ignite01rb/towerdefence",
    accent: "from-green-400 to-red-500",
    accentColor: "#70db70",
    tag: "C++",
    num: "07",
  },
];

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const isEven = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative flex flex-col ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } items-stretch gap-0 rounded-2xl overflow-hidden`}
      style={{ border: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* Image side */}
      <div className="relative w-full md:w-1/2 overflow-hidden min-h-[220px] sm:min-h-[280px] md:min-h-[360px] bg-black/40">
        <motion.img
          src={project.image}
          alt={project.title}
          loading="lazy"
          style={{ y: imageY }}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Accent overlay on hover */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-tr ${project.accent} opacity-0`}
          whileHover={{ opacity: 0.18 }}
          transition={{ duration: 0.3 }}
        />

        {/* Project number watermark */}
        <div
          className="absolute top-4 left-5 font-mono text-5xl sm:text-6xl font-bold select-none pointer-events-none"
          style={{ color: "rgba(255,255,255,0.06)", letterSpacing: "-0.04em" }}
        >
          {project.num}
        </div>

        {/* Tag pill */}
        <div className="absolute top-4 right-4">
          <span
            className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full"
            style={{
              background: "rgba(0,0,0,0.55)",
              border: `1px solid ${project.accentColor}44`,
              color: project.accentColor,
              backdropFilter: "blur(8px)",
            }}
          >
            {project.tag}
          </span>
        </div>
      </div>

      {/* Content side */}
      <div
        className="relative w-full md:w-1/2 flex flex-col justify-center p-6 sm:p-8 md:p-10"
        style={{ background: "rgba(255,255,255,0.03)" }}
      >
        {/* Top accent line */}
        <div
          className={`absolute top-0 ${isEven ? "right-0 md:left-0 md:right-auto" : "left-0"} h-full w-[2px] bg-gradient-to-b ${project.accent} opacity-40`}
        />

        {/* Number label */}
        <span
          className="font-mono text-xs tracking-[0.2em] mb-3 block"
          style={{ color: project.accentColor, opacity: 0.7 }}
        >
          // {project.num}
        </span>

        <motion.h3
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-4"
          style={{ letterSpacing: "-0.02em" }}
          whileHover={{ color: project.accentColor }}
          transition={{ duration: 0.2 }}
        >
          {project.title}
        </motion.h3>

        <p
          className="text-sm sm:text-base leading-relaxed mb-6"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((t, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="text-xs font-mono px-3 py-1 rounded-full"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.65)",
              }}
            >
              {t}
            </motion.span>
          ))}
        </div>

        {/* CTA */}
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-3 w-fit"
        >
          <motion.span
            className="text-sm font-semibold tracking-wide"
            style={{ color: project.accentColor }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            Visit Project
          </motion.span>
          <motion.span
            className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm"
            style={{
              border: `1px solid ${project.accentColor}55`,
              color: project.accentColor,
              background: `${project.accentColor}11`,
            }}
            whileHover={{ scale: 1.15, x: 3 }}
            transition={{ duration: 0.2 }}
          >
            →
          </motion.span>
        </a>
        {/* <span style={{ color: "rgba(255,255,255,0.1)" }}>|</span> */}
        {/* GitHub link */}
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2"
        >
          <motion.span
            className="text-sm font-semibold tracking-wide"
            style={{ color: "rgba(255,255,255,0.4)" }}
            whileHover={{ color: "#fff", x: 4 }}
            transition={{ duration: 0.2 }}
          >
            GitHub
          </motion.span>
          <motion.span
            className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm"
            style={{
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.4)",
              background: "rgba(255,255,255,0.04)",
            }}
            whileHover={{
              scale: 1.15,
              x: 3,
              borderColor: "rgba(255,255,255,0.3)",
              color: "#fff",
            }}
            transition={{ duration: 0.2 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </motion.span>
        </a>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative pt-20 pb-28 md:pt-28 md:pb-36 px-4 sm:px-6 md:px-14 lg:px-20 overflow-hidden"
    >
      {/* Background watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <h1 className="text-[70px] sm:text-[120px] md:text-[200px] font-bold text-white/[0.03] tracking-widest whitespace-nowrap">
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

        {/* Project count line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center gap-4 mb-12 md:mb-16 max-w-7xl mx-auto"
          style={{ transformOrigin: "left" }}
        >
          <div
            className="h-px flex-1"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />
          <span
            className="font-mono text-xs tracking-[0.2em] uppercase"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            projects
          </span>
          <div
            className="h-px flex-1"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />
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
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
          transformOrigin: "center",
        }}
      />
    </section>
  );
}
