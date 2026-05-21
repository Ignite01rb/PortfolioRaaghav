import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function NumberTick() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const duration = 1400;
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      setN(Math.round(progress * 100));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, []);
  return <>{n}%</>;
}

const letters = ["R", "B"];

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#03050d" }}
    >
      {/* Orbs */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute w-80 h-80 rounded-full"
        style={{ background: "rgba(29,78,216,0.18)", filter: "blur(80px)", top: "20%", left: "25%" }}
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
        className="absolute w-64 h-64 rounded-full"
        style={{ background: "rgba(8,145,178,0.15)", filter: "blur(80px)", bottom: "25%", right: "25%" }}
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
        className="absolute w-48 h-48 rounded-full"
        style={{ background: "rgba(124,58,237,0.2)", filter: "blur(60px)", top: "35%", right: "30%" }}
      />

      {/* Grid */}
      <div className="absolute inset-0" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px)",
        backgroundSize: "40px 40px"
      }} />

      {/* Content */}
      <div className="relative flex flex-col items-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center gap-2 mb-6 px-4 py-2 rounded-full"
          style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.08)" }}
        >
          <span className="w-2 h-2 rounded-full" style={{ background: "#38bdf8" }} />
          <span className="font-mono text-[10px] tracking-[0.22em] uppercase"
            style={{ color: "rgba(56,189,248,0.5)" }}>
            // loading portfolio
          </span>
        </motion.div>

        {/* RB */}
        <div className="flex items-center gap-3 mb-2">
          {letters.map((l, i) => (
            <motion.span
              key={l}
              initial={{ opacity: 0, y: 50, rotateX: 90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-bold"
              style={{
                fontSize: "clamp(72px, 18vw, 130px)",
                letterSpacing: "-0.04em",
                lineHeight: 1,
                background: i === 0
                  ? "linear-gradient(135deg, #38bdf8, #818cf8)"
                  : "linear-gradient(135deg, #818cf8, #38bdf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {l}
            </motion.span>
          ))}
        </div>

        {/* Name */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="font-mono text-xs tracking-[0.3em] uppercase mb-8"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          Raaghav Bisht
        </motion.p>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="w-56 flex flex-col items-center gap-3"
        >
          <div className="w-full h-[2px] rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.07)" }}>
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.85, duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #1d4ed8, #38bdf8, #818cf8)" }}
            />
          </div>
          <p className="font-mono text-[10px] tracking-widest"
            style={{ color: "rgba(56,189,248,0.4)" }}>
            <NumberTick />
          </p>
        </motion.div>

        {/* Blinking cursor */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-6 flex items-center gap-2"
        >
          <span className="font-mono text-[11px]"
            style={{ color: "rgba(255,255,255,0.2)" }}>
            &gt;&gt; initializing
          </span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.9 }}
            className="w-[6px] h-[14px] rounded-sm inline-block"
            style={{ background: "#38bdf8" }}
          />
        </motion.div>

      </div>
    </motion.div>
  );
}