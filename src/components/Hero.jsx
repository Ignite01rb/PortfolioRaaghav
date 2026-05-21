import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import profile from "../imagepacks/pic.jpeg";
import { useState } from "react";
import ResumeModal from "./ResumeModal";
import {  AnimatePresence } from "framer-motion";

export default function Hero() {
  const [resumeOpen, setResumeOpen] = useState(false);
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center
      pt-28 md:pt-32 lg:pt-36
      px-5 sm:px-6 md:px-20
      "
    >
      {/* Background Grid */}

      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center w-full max-w-7xl">

        {/* ================= LEFT SIDE ================= */}
        <div className="text-center md:text-left">

          {/* Badge */}
          <div className="inline-block px-4 py-2 rounded-full border border-blue-400 text-blue-400 text-xs sm:text-sm mb-6">
            SOFTWARE DEVELOPER • DSA • AI/ML ENTHUSIAST
          </div>

          {/* Code Style Intro */}
          <div className="font-mono text-xs sm:text-sm text-blue-400 mb-6">
            <p>&gt;&gt; const raaghav = new Developer();</p>
            <p>&gt;&gt; raaghav.skills = ['DSA', 'Full Stack', 'Problem Solving'];</p>
          </div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight"
          >
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Raaghav Bisht
            </span>
          </motion.h1>

          {/* Description */}
          <p className="mt-6 text-gray-400 max-w-xl text-base sm:text-lg leading-relaxed mx-auto md:mx-0">
            B.Tech ECE student passionate about software development and problem solving.
            I enjoy building modern applications while strengthening my skills in
            Data Structures & Algorithms to create efficient and scalable solutions.
          </p>

          {/* Buttons */}
          <div className="flex gap-4 sm:gap-6 mt-10 flex-wrap justify-center md:justify-start">
            <a
              href="#projects"
              className="px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm sm:text-base font-medium hover:scale-105 transition"
            >
              Explore My Work →
            </a>

            <motion.button
  layoutId="resumeButton"
  onClick={() => setResumeOpen(true)}
  className="px-6 sm:px-8 py-3 rounded-full border border-blue-400
  text-blue-400 text-sm sm:text-base
  hover:bg-blue-400 hover:text-black
  transition cursor-pointer"
>
  Resume ↓
</motion.button>
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
      {/* ================= RIGHT SIDE ================= */}
<div className="flex flex-col items-center mt-16 md:mt-0">

{/* Rings + Image Wrapper */}
<div className="relative flex items-center justify-center">

  {/* Glow Rings */}
  <div className="absolute w-72 sm:w-80 md:w-96 h-72 sm:h-80 md:h-96 border border-blue-500 rounded-full opacity-20 animate-pulse"></div>
  <div className="absolute w-60 sm:w-72 md:w-80 h-60 sm:h-72 md:h-80 border border-cyan-400 rounded-full opacity-20"></div>

  {/* Profile Image */}
  <img
    src={profile}
    alt="Raaghav Bisht"
    className="relative z-10
    w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80
    rounded-full object-cover border-4 border-blue-500 shadow-2xl"
  />
</div>

{/* Social Icons (NORMAL FLOW — NOT ABSOLUTE) */}
<div className="mt-6 flex gap-4 sm:gap-5
bg-[#0f172a] px-4 sm:px-6 py-2 sm:py-3
rounded-xl border border-white/10 shadow-xl">
  <a
    href="https://github.com/Ignite01rb"
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-white transition"
  >
    <FaGithub size={18} />
  </a>

  <a
    href="https://www.linkedin.com/in/raaghav-bisht-b03a60291/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-blue-400 transition"
  >
    <FaLinkedin size={18} />
  </a>

  <a
    href="https://leetcode.com/u/IgniteRB/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-yellow-400 transition"
  >
    <SiLeetcode size={18} />
  </a>
</div>
</div>
          

        </div>
        <AnimatePresence>
  {resumeOpen && (
    <ResumeModal
      open={resumeOpen}
      setOpen={setResumeOpen}
    />
  )}
</AnimatePresence>
    </section>
  );
}