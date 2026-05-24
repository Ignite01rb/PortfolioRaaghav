import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import profile from "../imagepacks/pic.jpeg";
import { useState, useRef, useEffect, useCallback } from "react";
import ResumeModal from "./ResumeModal";

// ── Touch detection ───────────────────────────────────────────────────────────
const isTouchDevice =
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

function useIsTouch() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);
  return isTouch;
}

// ── Typing animation hook ─────────────────────────────────────────────────────
function useTypewriter(lines, speed = 38) {
  const [displayed, setDisplayed] = useState([]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (lineIdx >= lines.length) { setDone(true); return; }
    if (charIdx <= lines[lineIdx].length) {
      const t = setTimeout(() => {
        setDisplayed((prev) => {
          const next = [...prev];
          next[lineIdx] = lines[lineIdx].slice(0, charIdx);
          return next;
        });
        setCharIdx((c) => c + 1);
      }, speed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => { setLineIdx((l) => l + 1); setCharIdx(0); }, 260);
      return () => clearTimeout(t);
    }
  }, [lineIdx, charIdx, lines, speed]);

  return { displayed, done };
}

// ── Magnetic button ───────────────────────────────────────────────────────────
function MagneticButton({ children, className, style, onClick, href, strength = 0.35 }) {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 300, damping: 22 });
  const y = useSpring(0, { stiffness: 300, damping: 22 });

  const handleMove = useCallback((e) => {
    if (isTouchDevice) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  }, [x, y, strength]);

  const handleLeave = () => { x.set(0); y.set(0); };

  const isHash = href?.startsWith("#");
  const isExternal = href && !isHash;

  const handleClick = (e) => {
    if (isHash) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    onClick?.();
  };

  const Tag = href ? motion.a : motion.button;
  const extra = isExternal
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : href
    ? { href }
    : {};

  return (
    <Tag
      ref={ref}
      {...extra}
      style={{ ...style, x, y }}
      className={className}
      onClick={handleClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 320, damping: 20 }}
    >
      {children}
    </Tag>
  );
}

// ── Floating particle ─────────────────────────────────────────────────────────
function Particle({ x, y, size, color, duration, delay }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: color }}
      animate={{ y: [0, -22, 0], opacity: [0.18, 0.5, 0.18] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// ── Social icon with magnetic + tooltip ──────────────────────────────────────
function SocialIcon({ href, icon: Icon, size = 18, hoverColor, label }) {
  const ref = useRef(null);
  const [tip, setTip] = useState(false);
  const x = useSpring(0, { stiffness: 400, damping: 20 });
  const y = useSpring(0, { stiffness: 400, damping: 20 });

  const handleMove = (e) => {
    if (isTouchDevice) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.5);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.5);
  };

  return (
    <div className="relative flex flex-col items-center" onMouseEnter={() => setTip(true)} onMouseLeave={() => { setTip(false); x.set(0); y.set(0); }}>
      <AnimatePresence>
        {tip && (
          <motion.span
            key="tip"
            className="absolute -top-8 text-[10px] font-mono tracking-wider px-2 py-1 rounded whitespace-nowrap pointer-events-none"
            style={{ background: "rgba(14,16,27,0.9)", border: "1px solid rgba(99,179,237,0.3)", color: "#93c5fd" }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
      <motion.a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ x, y, color: tip ? hoverColor : "rgba(156,163,175,1)" }}
        onMouseMove={handleMove}
        whileTap={{ scale: 0.88 }}
        animate={{ color: tip ? hoverColor : "rgba(156,163,175,1)" }}
        transition={{ duration: 0.2 }}
        className="transition-colors"
      >
        <Icon size={size} />
      </motion.a>
    </div>
  );
}

// ── Animated rings ────────────────────────────────────────────────────────────
function ProfileRings({ hovered }) {
  return (
    <>
      {/* Outermost slow ring */}
      <motion.div
        className="absolute rounded-full border border-blue-500/20"
        style={{ width: "110%", height: "110%" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />
      {/* Dashed orbit ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "120%", height: "120%",
          border: "1px dashed rgba(99,179,237,0.18)",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      {/* Accent dot on orbit */}
      <motion.div
        className="absolute rounded-full"
        style={{ width: "120%", height: "120%", top: "-10%", left: "-10%" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-400"
          animate={{ scale: hovered ? 1.6 : 1, opacity: hovered ? 1 : 0.6 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
      {/* Inner pulse ring */}
      <motion.div
        className="absolute rounded-full border border-cyan-400/25"
        style={{ width: "105%", height: "105%" }}
        animate={{ scale: [1, 1.04, 1], opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}

// ── Main Hero ─────────────────────────────────────────────────────────────────
const codeLines = [
  ">> const raaghav = new Developer();",
  ">> raaghav.skills = ['DSA', 'Full Stack', 'AI/ML'];",
  ">> raaghav.status = 'open_to_work ✓';",
];

const particles = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1.5,
  color: i % 2 === 0 ? "rgba(99,179,237,0.55)" : "rgba(34,211,238,0.4)",
  duration: 3 + Math.random() * 3,
  delay: Math.random() * 3,
}));

export default function Hero() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [imgHovered, setImgHovered] = useState(false);
  const { displayed, done } = useTypewriter(codeLines, 36);
  const isTouch = useIsTouch();

  // Profile 3D tilt
  const imgRef = useRef(null);
  const rawRX = useMotionValue(0);
  const rawRY = useMotionValue(0);
  const rotateX = useSpring(rawRX, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(rawRY, { stiffness: 200, damping: 20 });

  const handleImgMove = (e) => {
    if (isTouch) return;
    const rect = imgRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawRY.set(((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 10);
    rawRX.set(-((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 8);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 md:pt-32 lg:pt-36 px-5 sm:px-6 md:px-20 overflow-hidden"
    >
      {/* Ambient background — full-width even coverage */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Center glow — sits behind everything, covers the split */}
        <div
          className="absolute"
          style={{
            top: "10%", left: "50%",
            transform: "translateX(-50%)",
            width: "80vw", height: "70vh",
            background: "radial-gradient(ellipse at center, rgba(37,99,235,0.11) 0%, rgba(34,211,238,0.06) 40%, transparent 72%)",
            filter: "blur(60px)",
          }}
        />
        {/* Top-left accent */}
        <motion.div
          className="absolute rounded-full"
          style={{
            top: "-5%", left: "5%",
            width: "45vw", height: "45vw", maxWidth: 520,
            background: "radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Bottom-right accent */}
        <motion.div
          className="absolute rounded-full"
          style={{
            bottom: "0%", right: "5%",
            width: "40vw", height: "40vw", maxWidth: 480,
            background: "radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)",
            filter: "blur(55px)",
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.75, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        />
        {/* Right-side fill to balance brightness */}
        <motion.div
          className="absolute rounded-full"
          style={{
            top: "20%", right: "-5%",
            width: "35vw", height: "35vw", maxWidth: 400,
            background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => <Particle key={p.id} {...p} />)}
      </div>

      {/* Grid dot overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(99,179,237,0.07) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* ── Content ── */}
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center w-full max-w-7xl relative z-10">

        {/* ── LEFT ── */}
        <div className="text-center md:text-left">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-blue-400 text-xs sm:text-sm mb-6"
              style={{ border: "1px solid rgba(96,165,250,0.35)", background: "rgba(96,165,250,0.06)" }}
              animate={{ borderColor: ["rgba(96,165,250,0.3)", "rgba(34,211,238,0.5)", "rgba(96,165,250,0.3)"] }}
              transition={{ duration: 3.5, repeat: Infinity }}
            >
              {/* Status dot */}
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-green-400"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
              SOFTWARE DEVELOPER • DSA • AI/ML ENTHUSIAST
            </motion.div>
          </motion.div>

          {/* Typewriter code block */}
          <motion.div
            className="font-mono text-xs sm:text-sm text-blue-400 mb-6 text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              background: "rgba(15,23,42,0.7)",
              border: "1px solid rgba(99,179,237,0.12)",
              borderRadius: 10,
              padding: "10px 14px",
              backdropFilter: "blur(6px)",
            }}
          >
            {codeLines.map((line, i) => (
              <div key={i} className="leading-6">
                <span style={{ color: "rgba(99,179,237,0.45)" }}>
                  {displayed[i] !== undefined ? displayed[i] : ""}
                </span>
                {/* Blinking cursor on active line */}
                {i === (displayed.length - 1) && !done && (
                  <motion.span
                    className="inline-block w-[2px] h-[1em] bg-blue-400 ml-0.5 align-middle"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.7, repeat: Infinity }}
                  />
                )}
              </div>
            ))}
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            Hi, I'm{" "}
            <motion.span
              style={{
                background: "linear-gradient(90deg, #3b82f6, #22d3ee, #3b82f6)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              animate={{ backgroundPosition: ["0% center", "200% center"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              Raaghav Bisht
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-5 text-gray-400 max-w-xl text-base sm:text-lg leading-relaxed mx-auto md:mx-0"
          >
            B.Tech ECE student passionate about software development and problem solving.
            Building modern applications while strengthening skills in{" "}
            <motion.span
              style={{ color: "#93c5fd" }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              Data Structures & Algorithms
            </motion.span>{" "}
            to create efficient and scalable solutions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex gap-4 sm:gap-5 mt-10 flex-wrap justify-center md:justify-start"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {/* Primary CTA */}
            <MagneticButton
              href="#projects"
              className="relative px-7 py-3 rounded-full text-white text-sm sm:text-base font-semibold overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #2563eb, #0891b2)",
                boxShadow: "0 0 24px rgba(37,99,235,0.35)",
              }}
            >
              <motion.span
                className="absolute inset-0 opacity-0 rounded-full"
                style={{ background: "linear-gradient(135deg, #3b82f6, #22d3ee)" }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center gap-2">
                Explore My Work
                <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
                  →
                </motion.span>
              </span>
            </MagneticButton>

            {/* Resume CTA */}
            <MagneticButton
              onClick={() => setResumeOpen(true)}
              className="relative px-7 py-3 rounded-full text-blue-400 text-sm sm:text-base font-semibold overflow-hidden"
              style={{
                border: "1px solid rgba(96,165,250,0.45)",
                background: "rgba(96,165,250,0.06)",
              }}
            >
              <motion.span
                className="absolute inset-0 rounded-full opacity-0"
                style={{ background: "rgba(96,165,250,0.12)" }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
              />
              <span className="relative z-10 flex items-center gap-2">
                Resume
                <motion.span animate={{ y: [0, 2, 0] }} transition={{ duration: 1.1, repeat: Infinity }}>
                  ↓
                </motion.span>
              </span>
            </MagneticButton>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            className="mt-14 hidden md:flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <motion.div
              className="w-5 h-8 rounded-full flex items-start justify-center pt-1"
              style={{ border: "1.5px solid rgba(99,179,237,0.3)" }}
            >
              <motion.div
                className="w-1 h-2 rounded-full bg-blue-400"
                animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
            <span className="text-xs font-mono" style={{ color: "rgba(99,179,237,0.4)" }}>
              scroll to explore
            </span>
          </motion.div>
        </div>

        {/* ── RIGHT ── */}
        <motion.div
          className="flex flex-col items-center mt-10 md:mt-0"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Profile image + rings */}
          <motion.div
            ref={imgRef}
            className="relative flex items-center justify-center w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80"
            style={{
              rotateX: isTouch ? 0 : rotateX,
              rotateY: isTouch ? 0 : rotateY,
              transformPerspective: 900,
            }}
            onMouseMove={handleImgMove}
            onMouseEnter={() => setImgHovered(true)}
            onMouseLeave={() => {
              setImgHovered(false);
              rawRX.set(0); rawRY.set(0);
            }}
          >
            <ProfileRings hovered={imgHovered} />

            {/* Profile image */}
            <motion.div
              className="relative z-10"
              animate={{
                boxShadow: imgHovered
                  ? "0 0 0 4px #3b82f6, 0 0 40px rgba(37,99,235,0.5), 0 0 80px rgba(34,211,238,0.2)"
                  : "0 0 0 4px #1d4ed8, 0 8px 40px rgba(37,99,235,0.25)",
              }}
              style={{ borderRadius: "50%" }}
              transition={{ duration: 0.4 }}
              whileTap={isTouch ? { scale: 0.97 } : {}}
            >
              <img
                src={profile}
                alt="Raaghav Bisht"
                className="w-52 h-52 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full object-cover"
              />
            </motion.div>

            {/* Floating skill badge — top right */}
            <motion.div
              className="absolute -top-2 -right-2 z-20 px-2.5 py-1 rounded-lg text-[10px] font-mono tracking-wide"
              style={{
                background: "rgba(14,16,27,0.92)",
                border: "1px solid rgba(99,179,237,0.3)",
                color: "#93c5fd",
                backdropFilter: "blur(6px)",
              }}
              initial={{ opacity: 0, scale: 0.7, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: [0, -5, 0] }}
              transition={{ delay: 1.1, y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
            >
              Full Stack Dev 🚀
            </motion.div>

            {/* Floating badge — bottom left */}
            <motion.div
              className="absolute -bottom-2 -left-2 z-20 px-2.5 py-1 rounded-lg text-[10px] font-mono tracking-wide"
              style={{
                background: "rgba(14,16,27,0.92)",
                border: "1px solid rgba(34,211,238,0.3)",
                color: "#67e8f9",
                backdropFilter: "blur(6px)",
              }}
              initial={{ opacity: 0, scale: 0.7, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: [0, 5, 0] }}
              transition={{ delay: 1.3, y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 } }}
            >
              DSA Enthusiast ⚡
            </motion.div>
          </motion.div>

          {/* Social icons bar */}
          <motion.div
            className="mt-8 flex gap-5 sm:gap-6 px-6 py-3 rounded-2xl"
            style={{
              background: "rgba(15,23,42,0.8)",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            whileHover={{
              boxShadow: "0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(99,179,237,0.2)",
            }}
          >
            <SocialIcon
              href="https://github.com/Ignite01rb"
              icon={FaGithub}
              size={19}
              hoverColor="#ffffff"
              label="GitHub"
            />
            <div className="w-px self-stretch" style={{ background: "rgba(255,255,255,0.08)" }} />
            <SocialIcon
              href="https://www.linkedin.com/in/raaghav-bisht-b03a60291/"
              icon={FaLinkedin}
              size={19}
              hoverColor="#60a5fa"
              label="LinkedIn"
            />
            <div className="w-px self-stretch" style={{ background: "rgba(255,255,255,0.08)" }} />
            <SocialIcon
              href="https://leetcode.com/u/IgniteRB/"
              icon={SiLeetcode}
              size={19}
              hoverColor="#fbbf24"
              label="LeetCode"
            />
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="mt-5 flex gap-5 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05 }}
          >
            {[
              { val: "7+", label: "Projects" },
              { val: "DSA", label: "Problem Solver" },
              { val: "Open", label: "to Work" },
            ].map(({ val, label }) => (
              <motion.div
                key={label}
                className="px-3 py-2 rounded-xl"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                whileHover={{
                  background: "rgba(99,179,237,0.07)",
                  borderColor: "rgba(99,179,237,0.25)",
                  y: -3,
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-sm font-bold text-blue-400 font-mono">{val}</div>
                <div className="text-[10px] text-gray-500 mt-0.5">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Resume Modal */}
      <AnimatePresence>
        {resumeOpen && (
          <ResumeModal open={resumeOpen} setOpen={setResumeOpen} />
        )}
      </AnimatePresence>
    </section>
  );
}