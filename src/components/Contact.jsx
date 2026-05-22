import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";
import SectionReveal from "./SectionReveal";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
  viewport: { once: true },
});

const socials = [
  {
    icon: <FaEnvelope size={14} />,
    label: "Email",
    value: "raaghavbisht@gmail.com",
    href: "mailto:raaghavbisht@gmail.com",
    color: "#38bdf8",
  },
  {
    icon: <FaLinkedin size={14} />,
    label: "LinkedIn",
    value: "linkedin.com/in/raaghav-bisht",
    href: "https://www.linkedin.com/in/raaghav-bisht-b03a60291/",
    color: "#818cf8",
  },
  {
    icon: <FaGithub size={14} />,
    label: "GitHub",
    value: "github.com/Ignite01rb",
    href: "https://github.com/Ignite01rb",
    color: "#a78bfa",
  },
  {
    icon: <FaPhone size={14} />,
    label: "Phone",
    value: "+91 9354458389",
    href: "tel:+919354458389",
    color: "#34d399",
  },
];

export default function Contact() {
  const form = useRef();
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [focused, setFocused] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setSending(true);

    emailjs
      .sendForm(
        "service_puelj4i",
        "template_1e55oga",
        form.current,
        "3fMSSnbjYglvFRtjD"
      )
      .then(
        () => {
          setSending(false);
          setSuccess(true);
          form.current.reset();
          setTimeout(() => setSuccess(false), 4000);
        },
        () => {
          setSending(false);
          alert("Failed to send message ❌");
        }
      );
  };

  const inputClass = () =>
    "w-full bg-transparent px-4 py-3.5 text-sm text-white rounded-xl outline-none transition-all duration-200 font-mono";

  const inputWrap = (name) => ({
    background: "rgba(255,255,255,0.03)",
    border: `0.5px solid ${
      focused === name
        ? "rgba(56,189,248,0.5)"
        : "rgba(255,255,255,0.08)"
    }`,
    borderRadius: "12px",
    transition: "border-color 0.2s",
  });

  return (
    <section
      id="contact"
      className="relative pt-24 pb-28 md:pt-32 md:pb-36 px-5 sm:px-6 md:px-20 flex flex-col items-center"
    >
      <SectionReveal>
        {/* Header */}
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <p
            className="font-mono text-[10px] tracking-[0.22em] uppercase mb-3"
            style={{ color: "rgba(56,189,248,0.5)" }}
          >
            // get in touch
          </p>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Let's Build Something{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Great
            </span>
          </h2>

          <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            Open to opportunities, collaborations, and impactful projects.
            Drop a message and I'll get back to you.
          </p>
        </motion.div>

        {/* Main Card */}
        <div className="w-full max-w-4xl">
          <div className="grid md:grid-cols-5 gap-4">
            {/* Left Panel */}
            <motion.div
              {...fadeUp(0.1)}
              className="md:col-span-2 rounded-2xl p-6 flex flex-col justify-between gap-8"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "0.5px solid rgba(255,255,255,0.08)",
              }}
            >
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "#38bdf8" }}
                  />
                  <span
                    className="font-mono text-[10px] tracking-[0.18em] uppercase"
                    style={{ color: "rgba(56,189,248,0.5)" }}
                  >
                    contact.info
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                  Raaghav Bisht
                </h3>

                <p
                  className="text-xs font-mono mb-6"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  B.Tech ECE · BVCOE · GGSIPU
                </p>

                {/* Social Links */}
                <div className="flex flex-col gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-3 p-3 rounded-xl transition-all duration-200"
                      style={{ border: "0.5px solid transparent" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `${s.color}0d`;
                        e.currentTarget.style.borderColor = `${s.color}30`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.borderColor = "transparent";
                      }}
                    >
                      <span
                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          background: `${s.color}15`,
                          color: s.color,
                        }}
                      >
                        {s.icon}
                      </span>

                      <div className="min-w-0">
                        <p
                          className="font-mono text-[9px] tracking-widest uppercase mb-0.5"
                          style={{ color: "rgba(255,255,255,0.25)" }}
                        >
                          {s.label}
                        </p>

                        <p
                          className="text-xs truncate transition-colors duration-200"
                          style={{ color: "rgba(255,255,255,0.55)" }}
                        >
                          {s.value}
                        </p>
                      </div>

                      <span
                        className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                        style={{ color: s.color }}
                      >
                        ↗
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{
                  background: "rgba(52,211,153,0.07)",
                  border: "0.5px solid rgba(52,211,153,0.2)",
                }}
              >
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.8 }}
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: "#34d399" }}
                />

                <span
                  className="font-mono text-[10px] tracking-wider"
                  style={{ color: "rgba(52,211,153,0.7)" }}
                >
                  Available for opportunities
                </span>
              </div>
            </motion.div>

            {/* Right Panel */}
            <motion.div
              {...fadeUp(0.15)}
              className="md:col-span-3 rounded-2xl p-6 sm:p-8"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "0.5px solid rgba(255,255,255,0.08)",
              }}
            >
              <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div style={inputWrap("name")}>
                    <input
                      type="text"
                      name="user_name"
                      placeholder="Your Name"
                      required
                      className={inputClass()}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                    />
                  </div>

                  <div style={inputWrap("email")}>
                    <input
                      type="email"
                      name="user_email"
                      placeholder="Your Email"
                      required
                      className={inputClass()}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                    />
                  </div>
                </div>

                <div style={inputWrap("subject")}>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    className={inputClass()}
                  />
                </div>

                <div style={inputWrap("message")}>
                  <textarea
                    rows="5"
                    name="message"
                    placeholder="Your Message"
                    required
                    className={`${inputClass()} resize-none`}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={sending || success}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3.5 rounded-xl text-sm font-semibold text-white"
                >
                  {success
                    ? "✓ Message Sent Successfully"
                    : sending
                    ? "Sending..."
                    : "Send Message →"}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}