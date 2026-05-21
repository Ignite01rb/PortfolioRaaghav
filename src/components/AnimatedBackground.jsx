import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let particles = [];
    let mouse = { x: -9999, y: -9999 };

    const orbs = [
      { x: 0.15, y: 0.2,  r: 260, color: "#1d4ed8", speed: 0.00018, angle: 0 },
      { x: 0.85, y: 0.75, r: 200, color: "#0891b2", speed: 0.00025, angle: 1.2 },
      { x: 0.7,  y: 0.15, r: 180, color: "#312e81", speed: 0.0002,  angle: 2.5 },
      { x: 0.3,  y: 0.8,  r: 150, color: "#164e63", speed: 0.00015, angle: 4.1 },
    ];

    const rand = (a, b) => a + Math.random() * (b - a);

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function initParticles() {
      particles = Array.from({ length: 80 }, () => ({
        x: rand(0, canvas.width), y: rand(0, canvas.height),
        vx: rand(-0.18, 0.18),   vy: rand(-0.18, 0.18),
        r: rand(1, 2.2),
        alpha: rand(0.15, 0.55),
        pulse: rand(0, Math.PI * 2),
        pulseSpeed: rand(0.005, 0.015),
      }));
    }

    function drawGrid() {
      const GRID = 40;
      const { width: W, height: H } = canvas;
      ctx.strokeStyle = "rgba(255,255,255,0.028)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < W; x += GRID) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += GRID) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
    }

    function drawOrbs(dt) {
      const { width: W, height: H } = canvas;
      orbs.forEach(o => {
        o.angle += o.speed * dt;
        const cx = o.x * W + Math.sin(o.angle) * 60;
        const cy = o.y * H + Math.cos(o.angle * 0.7) * 40;
        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, o.r);
        grd.addColorStop(0, o.color + "28");
        grd.addColorStop(1, "transparent");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(cx, cy, o.r, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function drawConnections() {
      const MAX = 100;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < MAX) {
            ctx.strokeStyle = `rgba(56,189,248,${0.07 * (1 - d / MAX)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
    }

    function drawParticles() {
      const { width: W, height: H } = canvas;
      particles.forEach(p => {
        p.x = (p.x + p.vx + W) % W;
        p.y = (p.y + p.vy + H) % H;
        p.pulse += p.pulseSpeed;
        const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        const glow = d < 120 ? 1 - d / 120 : 0;
        const a = Math.min(p.alpha + Math.sin(p.pulse) * 0.12 + glow * 0.4, 0.9);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + glow * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = glow > 0.1 ? `rgba(56,189,248,${a})` : `rgba(148,163,184,${a})`;
        ctx.fill();
      });
    }

    let last = 0;
    function loop(ts) {
      const dt = ts - last; last = ts;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid();
      drawOrbs(dt);
      drawConnections();
      drawParticles();
      animId = requestAnimationFrame(loop);
    }

    const onResize = () => { resize(); initParticles(); };
    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    resize(); initParticles(); animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}