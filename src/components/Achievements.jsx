import { motion } from "framer-motion";
import SectionReveal from "./SectionReveal";

const achievements = [
  {
    title: "100+ Problems Solved",
    subtitle: "Practiced Data Structures and Algorithms by solving 100+ problems.",
    tag: "LeetCode",
    color: "text-yellow-400",
    accent: "from-yellow-400 to-cyan-500",
  },
  {
    title: "3rd Position in Hackathon",
    subtitle: "Summer Hackathon by IOSC, showcasing problem-solving and technical skills.",
    tag: "Hackathon",
    color: "text-emerald-400",
    accent: "from-emerald-400 to-cyan-500",
  },
  {
    title: "BVEST Technical Fest",
    subtitle: "Member of organizing committee, assisting in coordination and event execution.",
    tag: "OC",
    color: "text-blue-400",
    accent: "from-blue-400 to-cyan-400",
  },
  {
    title: "Odyssey 4.0 (College Magazine)",
    subtitle: "Worked as an editor for the college magazine, reviewing and refining content for clarity, grammar, and consistency while collaborating with the team to meet publication deadlines.",
    tag: "Editor",
    color: "text-red-400",
    accent: "from-red-400 to-cyan-400",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18 },
  },
};

const itemVariantsLeft = {
  hidden: { opacity: 0, x: -80, y: 40 },
  visible: {
    opacity: 1, x: 0, y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const itemVariantsRight = {
  hidden: { opacity: 0, x: 80, y: 40 },
  visible: {
    opacity: 1, x: 0, y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="relative py-28 px-6 md:px-20 overflow-hidden"
    >
      <SectionReveal>

        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <h1 className="text-[120px] md:text-[220px] font-bold text-white/5 tracking-widest">
            ACHIEVEMENTS
          </h1>
        </div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative text-5xl md:text-7xl font-bold mb-20 tracking-tight"
        >
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {"export const ACHIEVEMENTS"}
          </span>
        </motion.h2>

        {/* Timeline */}
        <motion.div
          className="relative max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >

          {/* Center Line */}
          <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-blue-500 via-cyan-400 to-transparent opacity-50 hidden md:block" />

          {achievements.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={index}
                variants={isLeft ? itemVariantsLeft : itemVariantsRight}
                className={`relative mb-14 flex ${
                  isLeft ? "md:justify-start" : "md:justify-end"
                }`}
              >
                {/* Timeline Dot */}
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-5 h-5 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.7)]"
                  />
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ x: isLeft ? -8 : 8, y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="relative w-full md:w-[45%] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl group"
                >
                  {/* Accent Line */}
                  <div className={`absolute top-0 left-0 h-1 w-full rounded-t-2xl bg-gradient-to-r ${item.accent}`} />

                  {/* Tag */}
                  <div className="flex items-center mb-6">
                    <span className="text-xs px-4 py-1 rounded-full border border-blue-400 text-blue-400">
                      {item.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`text-2xl md:text-3xl font-semibold ${item.color} group-hover:text-cyan-400 transition`}>
                    {item.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-gray-400 mt-3 text-sm md:text-base">
                    {item.subtitle}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}

        </motion.div>
      </SectionReveal>
    </section>
  );
}