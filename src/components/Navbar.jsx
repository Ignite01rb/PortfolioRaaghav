import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Achievements", href: "#achievements" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* ── Desktop Navbar ── */}
      <nav
        className="fixed top-6 left-1/2 -translate-x-1/2 hidden md:flex gap-10 px-10 py-3
        backdrop-blur-xl bg-white/5 border border-white/10 rounded-full z-50 text-sm shadow-lg"
      >
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="hover:text-cyan-400 transition duration-300"
          >
            {link.name}
          </a>
        ))}
      </nav>

      {/* ── Mobile Hamburger ── */}
      <div className="fixed top-5 right-4 md:hidden z-[60]">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.92 }}
          className="w-11 h-11 flex items-center justify-center rounded-xl text-white"
          style={{
            background: "transparent",
            border: "none",
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isOpen ? "x" : "menu"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {isOpen ? <HiX size={22} /> : <HiMenu size={22} />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="fixed top-0 left-0 right-0 md:hidden z-50 flex flex-col"
            style={{
              background: "rgba(3,5,13,0.45)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(24px)",
              borderBottom: "0.5px solid rgba(255,255,255,0.08)",
              borderBottomLeftRadius: "24px",
              borderBottomRightRadius: "24px",
            }}
          >
            {/* Header row */}
            {/* Header row — X button hata diya */}
            <div className="flex items-center justify-center px-6 pt-7 pb-4">
              <p className="text-white font-bold text-lg tracking-tight">
                Raaghav{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Bisht
                </span>
              </p>
            </div>

            {/* Divider */}
            <div
              style={{
                height: "0.5px",
                background: "rgba(255,255,255,0.07)",
                margin: "0 24px",
              }}
            />

            {/* Links */}
            <nav className="flex flex-col px-3 py-3 items-center">
              {links.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 + i * 0.055, duration: 0.22 }}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-2xl
                    transition-all duration-200 group"
                  style={{ border: "0.5px solid transparent" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(56,189,248,0.08)";
                    e.currentTarget.style.borderColor = "rgba(56,189,248,0.18)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "transparent";
                  }}
                >
                  {/* Cyan dot */}
                  

                  {/* Link name */}
                  <span
                    className="text-[17px] font-semibold tracking-tight
                    text-white/70 group-hover:text-cyan-400 transition-colors duration-200"
                  >
                    {link.name}
                  </span>
                </motion.a>
              ))}
            </nav>

            {/* Bottom padding */}
            <div className="pb-5" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
