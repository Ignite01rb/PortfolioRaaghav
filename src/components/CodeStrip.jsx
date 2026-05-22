import { motion } from "framer-motion";

export default function CodeStrip() {
  const text =
    "const build = () => learn();   <Code />   deploy();   debug();   optimize();   repeat();   ";

  return (
    <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden border-y border-white/10 py-3">
      <motion.div
        className="flex whitespace-nowrap font-mono text-sm text-gray-500"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 18,
          ease: "linear",
        }}
      >
        {/* duplicate content twice */}
        <span className="mx-8">{text}</span>
        <span className="mx-8">{text}</span>
        <span className="mx-8">{text}</span>
        <span className="mx-8">{text}</span>
      </motion.div>
    </div>
  );
}