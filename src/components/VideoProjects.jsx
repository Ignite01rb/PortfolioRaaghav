import { motion, AnimatePresence } from "framer-motion";
import SectionReveal from "./SectionReveal";
import { useState } from "react";

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

function PlayIcon() {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
        style={{
          background: "rgba(168,85,247,0.2)",
          border: "1.5px solid rgba(168,85,247,0.55)",
        }}
      >
        <div
          className="ml-1"
          style={{
            width: 0,
            height: 0,
            borderTop: "7px solid transparent",
            borderBottom: "7px solid transparent",
            borderLeft: "12px solid #d8b4fe",
          }}
        />
      </div>
    </div>
  );
}

function VideoCard({
  video,
  className = "",
  onClick,
  aspectClass = "aspect-video",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`relative group rounded-xl overflow-hidden cursor-pointer ${className}`}
      style={{ border: "1px solid rgba(255,255,255,0.07)" }}
      onClick={() => onClick(video.src)}
      whileHover={{ borderColor: "rgba(168,85,247,0.4)" }}
    >
      <video
        src={video.src}
        muted
        autoPlay
        loop
        playsInline
        className={`w-full ${aspectClass} object-cover transition-all duration-500 group-hover:scale-[1.03] group-hover:brightness-[0.8]`}
        style={{ filter: "brightness(0.65)" }}
      />

      {/* overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 55%)",
        }}
      />

      <PlayIcon />

      {video.featured && (
        <div
          className="absolute top-3 left-3 text-[10px] tracking-widest uppercase px-2 py-1 rounded"
          style={{
            fontFamily: "'Fira Code', monospace",
            background: "rgba(168,85,247,0.15)",
            border: "0.5px solid rgba(168,85,247,0.4)",
            color: "#c084fc",
          }}
        >
          Featured
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-3 flex items-end justify-between gap-2">
        <div>
          <div
            className="text-[10px] tracking-widest uppercase mb-1"
            style={{ fontFamily: "'Fira Code', monospace", color: "#a855f7" }}
          >
            // {video.category}
          </div>
          <div className="text-white font-semibold text-sm leading-tight">
            {video.title}
          </div>
        </div>
        <div
          className="text-[11px] shrink-0 self-end mb-0.5"
          style={{
            fontFamily: "'Fira Code', monospace",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          {video.duration}
        </div>
      </div>
    </motion.div>
  );
}

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
            <VideoCard
              video={videos[0]}
              onClick={setActiveVideo}
              aspectClass="aspect-video"
            />
          </div>

          {/* Side tall card */}
          <div className="lg:row-span-2">
            <VideoCard
              video={videos[1]}
              onClick={setActiveVideo}
              className="h-full"
              aspectClass="h-full min-h-[240px] lg:min-h-full"
            />
          </div>

          {/* Bottom small */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-3">
            <VideoCard
              video={videos[2]}
              onClick={setActiveVideo}
              aspectClass="aspect-video"
            />

            {/* Add slot */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-xl aspect-video flex flex-col items-center justify-center gap-2 cursor-default"
              style={{
                border: "1px dashed rgba(168,85,247,0.25)",
                background: "rgba(168,85,247,0.03)",
              }}
            >
              <VideoCard
                video={videos[3]}
                onClick={setActiveVideo}
                aspectClass="aspect-video"
              />
            </motion.div>
          </div>
        </div>
      </SectionReveal>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-[65] p-6"
            style={{ background: "rgba(0,0,0,0.92)" }}
            onClick={() => setActiveVideo(null)}
          >
            {/* Close button */}
            <button
              className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-colors z-[70]"
              style={{
                border: "1px solid rgba(168,85,247,0.4)",
                background: "rgba(168,85,247,0.1)",
                color: "#c084fc",
                fontSize: 18,
              }}
              onClick={() => setActiveVideo(null)}
            >
              ✕
            </button>

            <motion.video
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={activeVideo}
              controls
              autoPlay
              className="max-w-5xl w-full rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
