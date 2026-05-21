import { motion } from "framer-motion";
import {
  BiLogoJavascript,
  BiLogoReact,
  BiLogoTailwindCss,
  BiLogoHtml5,
  BiLogoCss3,
  BiLogoNodejs,
  BiLogoMongodb,
  BiLogoPython,
  BiLogoCPlusPlus,
  BiLogoGithub,
  BiLogoAdobe,
  BiLogoBlender,
  BiLogoVisualStudio,
  BiLogoSteam,
  BiLogoSass,
  BiLogoBootstrap,
  BiLogoDiscord,
  BiLogoGit,
} from "react-icons/bi";

const skills = [
  { icon: <BiLogoReact />, name: "React", color: "text-cyan-400" },
  { icon: <BiLogoJavascript />, name: "JavaScript", color: "text-yellow-400" },
  { icon: <BiLogoTailwindCss />, name: "TailwindCSS", color: "text-sky-400" },
  { icon: <BiLogoHtml5 />, name: "HTML5", color: "text-orange-500" },
  { icon: <BiLogoCss3 />, name: "CSS3", color: "text-blue-500" },
  { icon: <BiLogoNodejs />, name: "Node.js", color: "text-green-500" },
  { icon: <BiLogoMongodb />, name: "MongoDB", color: "text-emerald-400" },
  { icon: <BiLogoPython />, name: "Python", color: "text-blue-400" },
  { icon: <BiLogoCPlusPlus />, name: "C++", color: "text-indigo-400" },
  
  { icon: <BiLogoAdobe />, name: "Adobe", color: "text-red-800" },
  { icon: <BiLogoBlender />, name: "Blender", color: "text-orange-500" },
  { icon: <BiLogoVisualStudio />, name: "VS Code", color: "text-blue-700" },
  { icon: <BiLogoSteam/>, name: "Steam", color: "text-gray-300" },
  { icon: <BiLogoSass />, name: "Sass", color: "text-pink-300" },
  { icon: <BiLogoBootstrap />, name: "Bootstrap ", color: "text-purple-500" },
  { icon: <BiLogoDiscord />, name: "Discord", color: "text-blue-500" },
  { icon: <BiLogoGit />, name: "Git", color: "text-orange-300" },
  
  
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-40 px-6 md:px-20 overflow-hidden"
    >
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <h1 className="text-[120px] md:text-[220px] font-bold text-white/5 tracking-widest">
          SKILLS
        </h1>
      </div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative text-5xl md:text-7xl font-bold mb-32 tracking-tight"
      >
        <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
        {'import { Skills } from "me"'}
        </span>
      </motion.h2>

      {/* Icon Layout */}
      <div className="relative max-w-6xl mx-auto flex flex-wrap justify-center gap-14">

        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
            whileHover={{
              y: -12,
              scale: 1.1,
            }}
            className="flex flex-col items-center group cursor-pointer"
          >
            {/* Icon Container */}
            <div className="relative w-24 h-24 flex items-center justify-center rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl transition group-hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]">
              <div className={`text-5xl ${skill.color}`}>
                {skill.icon}
              </div>
            </div>

            {/* Name */}
            <span className="mt-4 text-sm text-gray-400 group-hover:text-cyan-400 transition">
              {skill.name}
            </span>
          </motion.div>
        ))}

      </div>
    </section>
  );
}
