import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Counter() {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const dur = 2000;
    const tick = () => {
      const t = Math.min((Date.now() - start) / dur, 1);
      const eased = t < 0.6 ? 0.7*(t/0.6) : t < 0.85 ? 0.7+0.18*((t-0.6)/0.25) : 0.88+0.12*((t-0.85)/0.15);
      setVal(Math.round(eased * 100));
      if (t < 1) requestAnimationFrame(tick);
    };
    const id = setTimeout(() => requestAnimationFrame(tick), 1100);
    return () => clearTimeout(id);
  }, []);
  return <>{val}%</>;
}

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-5 px-4"
      style={{
        background: `
          radial-gradient(ellipse 60% 50% at 30% 20%, rgba(14,165,233,0.07) 0%, transparent 70%),
          radial-gradient(ellipse 50% 60% at 75% 80%, rgba(139,92,246,0.06) 0%, transparent 70%),
          #07070e
        `
      }}
    >
      {/* RAAGHAV */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative leading-none"
      >
        {/* Ghost outline */}
        <span
          className="select-none text-transparent font-black tracking-[0.08em] sm:tracking-[0.1em]"
          style={{
            fontSize: "clamp(42px, 16vw, 92px)",
            WebkitTextStroke: "1.5px rgba(255,255,255,0.12)",
            display: "block",
          }}
        >
          RAAGHAV
        </span>

        {/* Wipe-in solid */}
        <motion.span
          className="absolute inset-0 text-white font-black tracking-[0.08em] sm:tracking-[0.1em] overflow-hidden"
          style={{ fontSize: "clamp(42px, 16vw, 92px)" }}
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0% 0 0 0)" }}
          transition={{ duration: 1, ease: [0.77, 0, 0.18, 1], delay: 0.3 }}
        >
          RAAGHAV
        </motion.span>
      </motion.div>

      {/* Loading bar row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex items-center gap-2.5"
      >
        <span className="text-[10px] tracking-[0.25em] text-white/20 uppercase font-mono">
          Loading
        </span>

        <div className="w-20 h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: [0.4, 0, 0.2, 1], delay: 1.1 }}
          />
        </div>

        <span className="text-[10px] text-cyan-400/35 font-mono min-w-[28px]">
          <Counter />
        </span>
      </motion.div>

      {/* Portfolio label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="text-[10px] tracking-[0.3em] text-white/[0.18] uppercase font-mono"
      >
        Portfolio
      </motion.p>
    </motion.div>
  );
}