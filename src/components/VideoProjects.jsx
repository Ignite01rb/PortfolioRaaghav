import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import SectionReveal from "./SectionReveal";
import { useState, useRef, useCallback, useEffect } from "react";

const videos = [
  {
    title: "Gaming Montage",
    category: "gaming",
    duration: "2:47",
    src: "/videos/beggin.mov",
    featured: true,
  },
  {
    title: "Promo Edit",
    category: "promo",
    duration: "1:15",
    src: "/videos/Timeline 1.mov",
  },
  {
    title: "Gaming Montage",
    category: "gaming",
    duration: "3:22",
    src: "/videos/stay.mp4",
  },
  {
    title: "Promo Edit",
    category: "promo",
    duration: "0:10",
    src: "/videos/withoutme.mp4",
  },
];

// ── Touch detection ───────────────────────────────────────────────────────────
const isTouchDevice =
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

// ── Animated play button ──────────────────────────────────────────────────────
function PlayButton({ visible, accentColor = "#a855f7" }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="play"
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.75 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          {/* Ripple ring */}
          <motion.span
            className="absolute rounded-full"
            style={{ border: `1.5px solid ${accentColor}55`, width: 60, height: 60 }}
            initial={{ scale: 0.7, opacity: 0.6 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "easeOut" }}
          />
          {/* Button */}
          <motion.div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              background: `${accentColor}22`,
              border: `1.5px solid ${accentColor}88`,
              backdropFilter: "blur(6px)",
            }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill={accentColor}>
              <path d="M3 2.5l10 5.5-10 5.5V2.5z" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Duration badge ────────────────────────────────────────────────────────────
function DurationBadge({ duration, hovered }) {
  return (
    <motion.div
      className="text-[11px] shrink-0 self-end mb-0.5 px-2 py-0.5 rounded"
      style={{
        fontFamily: "'Fira Code', monospace",
        background: hovered ? "rgba(168,85,247,0.18)" : "rgba(0,0,0,0.35)",
        border: hovered ? "1px solid rgba(168,85,247,0.4)" : "1px solid rgba(255,255,255,0.08)",
        color: hovered ? "#c084fc" : "rgba(255,255,255,0.35)",
        transition: "all 0.3s ease",
      }}
    >
      {duration}
    </motion.div>
  );
}

// ── VideoCard ─────────────────────────────────────────────────────────────────
function VideoCard({ video, className = "", onClick, aspectClass = "aspect-video", delay = 0 }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [touched, setTouched] = useState(false);
  const [shimmer, setShimmer] = useState(false);

  const isActive = hovered || touched;

  // 3D tilt (desktop only)
  const rawRX = useMotionValue(0);
  const rawRY = useMotionValue(0);
  const rotateX = useSpring(rawRX, { stiffness: 260, damping: 24 });
  const rotateY = useSpring(rawRY, { stiffness: 260, damping: 24 });

  // Spotlight glow position
  const gX = useMotionValue(50);
  const gY = useMotionValue(50);

  const handleMouseMove = useCallback((e) => {
    if (isTouchDevice) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rawRY.set(((e.clientX - cx) / (rect.width / 2)) * 6);
    rawRX.set(-((e.clientY - cy) / (rect.height / 2)) * 4);
    gX.set(((e.clientX - rect.left) / rect.width) * 100);
    gY.set(((e.clientY - rect.top) / rect.height) * 100);
  }, [rawRX, rawRY, gX, gY]);

  const handleMouseEnter = () => {
    if (isTouchDevice) return;
    setHovered(true);
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    setHovered(false);
    rawRX.set(0); rawRY.set(0);
    gX.set(50); gY.set(50);
  };

  // Mobile touch
  const handleTouchStart = () => {
    setTouched(true);
    setShimmer(true);
    setTimeout(() => setShimmer(false), 500);
  };
  const handleTouchEnd = () => setTimeout(() => setTouched(false), 420);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileTap={isTouchDevice ? { scale: 0.975 } : {}}
      style={{
        rotateX: isTouchDevice ? 0 : rotateX,
        rotateY: isTouchDevice ? 0 : rotateY,
        transformPerspective: 800,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      animate={{
        boxShadow: isActive
          ? "0 0 0 1px rgba(168,85,247,0.5), 0 16px 50px rgba(168,85,247,0.2), 0 4px 20px rgba(0,0,0,0.6)"
          : "0 0 0 1px rgba(255,255,255,0.07), 0 4px 16px rgba(0,0,0,0.4)",
      }}
      className={`relative group rounded-xl overflow-hidden cursor-pointer ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={() => onClick(video.src)}
    >
      {/* Spotlight glow */}
      {!isTouchDevice && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-10 rounded-xl"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `radial-gradient(circle at ${gX.get()}% ${gY.get()}%, rgba(168,85,247,0.18) 0%, transparent 60%)`,
          }}
        />
      )}

      {/* Video */}
      <motion.video
        ref={videoRef}
        src={video.src}
        muted
        autoPlay
        loop
        playsInline
        className={`w-full ${aspectClass} object-cover`}
        animate={{
          scale: isActive ? 1.07 : 1.0,
          filter: isActive ? "brightness(0.55)" : "brightness(0.65)",
        }}
        transition={{ duration: isTouchDevice ? 0.3 : 0.55, ease: "easeOut" }}
      />

      {/* Gradient overlay — deepens on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: isActive
            ? "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(88,28,135,0.12) 55%, transparent 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 55%)",
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Accent edge glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-xl"
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{
          boxShadow: "inset 0 0 0 1px rgba(168,85,247,0.4)",
        }}
      />

      {/* Mobile shimmer sweep */}
      <AnimatePresence>
        {shimmer && (
          <motion.div
            key="shimmer"
            className="absolute inset-0 pointer-events-none z-20"
            initial={{ x: "-100%", opacity: 0.7 }}
            animate={{ x: "200%", opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              background: "linear-gradient(105deg, transparent 35%, rgba(168,85,247,0.35) 50%, transparent 65%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Play button */}
      <PlayButton visible={isActive} />

      {/* Featured badge */}
      {video.featured && (
        <motion.div
          className="absolute top-3 left-3 text-[10px] tracking-widest uppercase px-2 py-1 rounded"
          style={{
            fontFamily: "'Fira Code', monospace",
            background: "rgba(168,85,247,0.15)",
            border: "0.5px solid rgba(168,85,247,0.4)",
            color: "#c084fc",
          }}
          animate={{ y: isActive ? -2 : 0, opacity: isActive ? 1 : 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          Featured
        </motion.div>
      )}

      {/* Bottom meta */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-3 flex items-end justify-between gap-2"
        animate={{ y: isActive ? -4 : 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
      >
        <div>
          <motion.div
            className="text-[10px] tracking-widest uppercase mb-1"
            style={{ fontFamily: "'Fira Code', monospace" }}
            animate={{ color: isActive ? "#d8b4fe" : "#a855f7", x: isActive ? 2 : 0 }}
            transition={{ duration: 0.25 }}
          >
            // {video.category}
          </motion.div>
          <motion.div
            className="font-semibold text-sm leading-tight"
            animate={{ color: isActive ? "#fff" : "rgba(255,255,255,0.85)" }}
            transition={{ duration: 0.2 }}
          >
            {video.title}
          </motion.div>
        </div>
        <DurationBadge duration={video.duration} hovered={isActive} />
      </motion.div>
    </motion.div>
  );
}

// ── Modal ─────────────────────────────────────────────────────────────────────
function VideoModal({ src, onClose }) {
  // Close on Escape
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 flex items-center justify-center z-[65] p-4 sm:p-6"
      style={{ background: "rgba(0,0,0,0.93)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      {/* Close button */}
      <motion.button
        className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center z-[70]"
        style={{
          border: "1px solid rgba(168,85,247,0.45)",
          background: "rgba(168,85,247,0.12)",
          color: "#c084fc",
          fontSize: 16,
        }}
        onClick={onClose}
        initial={{ opacity: 0, scale: 0.7, rotate: -45 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.7, rotate: 45 }}
        transition={{ duration: 0.25 }}
        whileHover={{ scale: 1.12, background: "rgba(168,85,247,0.22)" }}
        whileTap={{ scale: 0.9 }}
      >
        ✕
      </motion.button>

      {/* Video */}
      <motion.div
        initial={{ scale: 0.82, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.82, opacity: 0, y: 30 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="max-w-5xl w-full rounded-2xl overflow-hidden"
        style={{
          boxShadow: "0 0 0 1px rgba(168,85,247,0.3), 0 30px 80px rgba(0,0,0,0.8)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <video
          src={src}
          controls
          autoPlay
          className="w-full rounded-2xl"
        />
      </motion.div>
    </motion.div>
  );
}

// ── VideoProjects ─────────────────────────────────────────────────────────────
export default function VideoProjects() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section
      id="video-projects"
      className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-16 lg:px-20"
    >
      <SectionReveal>
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-6xl font-bold mb-14 text-center"
          style={{ fontFamily: "'Fira Code', monospace" }}
        >
          <span
            style={{
              background: "linear-gradient(90deg, #a855f7, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {"<VideoShowcase />"}
          </span>
        </motion.h2>

        {/* Grid */}
        <div className="grid lg:grid-cols-3 gap-3 max-w-6xl mx-auto">
          {/* Featured — spans 2 cols */}
          <div className="lg:col-span-2">
            <VideoCard video={videos[0]} onClick={setActiveVideo} aspectClass="aspect-video" delay={0} />
          </div>

          {/* Side tall card */}
          <div className="lg:row-span-2">
            <VideoCard
              video={videos[1]}
              onClick={setActiveVideo}
              className="h-full"
              aspectClass="h-full min-h-[240px] lg:min-h-full"
              delay={0.08}
            />
          </div>

          {/* Bottom row */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-3">
            <VideoCard video={videos[2]} onClick={setActiveVideo} aspectClass="aspect-video" delay={0.14} />
            <VideoCard video={videos[3]} onClick={setActiveVideo} aspectClass="aspect-video" delay={0.2} />
          </div>
        </div>
      </SectionReveal>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {activeVideo && (
          <VideoModal key="modal" src={activeVideo} onClose={() => setActiveVideo(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}