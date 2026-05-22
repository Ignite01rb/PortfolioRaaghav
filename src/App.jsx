import React, { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";
import PersonalityCard from "./components/PersonalityCard";
import Loader from "./components/Loader";
import DevStatus from "./components/DevStatus";
import Navbar from "./components/Navbar";
import VideoProjects from "./components/VideoProjects";
import CodingCursor from "./components/CodingCursor";
import MouseGlow from "./components/MouseGlow";
import ScrollProgress from "./components/ScrollProgress";
import SectionIndicator from "./components/SectionIndicator";
import DevTerminal from "./components/DevTerminal";
import Hero from "./components/Hero";
import CommandTerminal from "./components/CommandTerminal";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import CodeStrip from "./components/CodeStrip";
import DevQuote from "./components/DevQuote";
import AnimatedBackground from "./components/AnimatedBackground";

export default function App() {
  const [loading, setLoading] = useState(
    !sessionStorage.getItem("visited")
  );
  
  useEffect(() => {
    if (!sessionStorage.getItem("visited")) {
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("visited", "true");
      }, 2200);
  
      return () => clearTimeout(timer);
    }
  }, []);
  

  return (
    <>
    <AnimatedBackground/>
      {/* ===== Loader ===== */}
      <AnimatePresence>
        {loading && <Loader />}
      </AnimatePresence>

      {/* ===== Main Website ===== */}
      {!loading && (
        <motion.div
  initial={{ opacity: 0, scale: 0.98 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="relative bg-transparent text-white scroll-smooth overflow-x-hidden"
>
        
        {/* Global Responsive Container */}
        <div className="w-full max-w-[1400px] mx-auto ">
      
          {/* UI Layers */}
          <ScrollProgress />
          <MouseGlow />
          <Navbar />
          
          <CodingCursor />
          <DevStatus />
          <SectionIndicator />
      
          {/* Sections */}
          <Hero />
          {/* <DevTerminal /> */}
          <About />
          {/* <PersonalityCard /> */}
          <CodeStrip />
          <Skills />
          <Projects />
          
          <VideoProjects />
          <DevQuote />
          <Achievements />
          <Contact />
          <CommandTerminal />
      
        </div>
      </motion.div>
      )}
    </>
  );
}
