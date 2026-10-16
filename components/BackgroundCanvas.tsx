"use client";

import { useEffect, useRef } from "react";

type Particle = { x: number; y: number; vx: number; vy: number; r: number; c: number };

type Palette = {
  colors: string[]; 
  dot: number;       
  core: number;      
  link: number;    
  mouse: number;     
  mouseColor: string;
  opacity: number;   
};

const PALETTES: Record<"dark" | "light", Palette> = {
  dark: {
    colors: ["255,179,71", "255,90,31", "229,57,53"], 
    dot: 0.9,
    core: 0,
    link: 0.3,
    mouse: 0.6,
    mouseColor: "255,90,31",
    opacity: 0.7,
  },
  light: {
    colors: ["234,120,10", "255,90,31", "211,47,47"], // deeper amber, orange, red
    dot: 0.5,
    core: 0.9,
    link: 0.45,
    mouse: 0.7,
    mouseColor: "229,57,53",
    opacity: 1,
  },
};

const LINK_DIST = 140;
const MOUSE_DIST = 180;

const getTheme = (): "dark" | "light" =>
  document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";

export default function BackgroundCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: -9999, y: -9999 };
    let pal = PALETTES[getTheme()];
    let w = 0;
    let h = 0;
    let raf = 0;
    let particles: Particle[] = [];

    const applyTheme = () => {
      pal = PALETTES[getTheme()];
      canvas.style.opacity = String(pal.opacity);
      if (reduceMotion) frame(); // static mode: redraw once with the new colors
    };

    const init = () => {
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(90, Math.floor((w * h) / 16000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.8,
        c: Math.floor(Math.random() * 3),
      }));
    };

    function frame() {
      ctx!.clearRect(0, 0, w, h);

      for (const p of particles) {
        if (!reduceMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -20) p.x = w + 20;
          if (p.x > w + 20) p.x = -20;
          if (p.y < -20) p.y = h + 20;
          if (p.y > h + 20) p.y = -20;

          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < 110 && d > 0) {
            p.x += (dx / d) * 1.2;
            p.y += (dy / d) * 1.2;
          }
        }

        const col = pal.colors[p.c];

        // soft glow
        const g = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
        g.addColorStop(0, `rgba(${col},${pal.dot})`);
        g.addColorStop(1, `rgba(${col},0)`);
        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
        ctx!.fill();

        // solid core (keeps dots visible on light backgrounds)
        if (pal.core > 0) {
          ctx!.fillStyle = `rgba(${col},${pal.core})`;
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      ctx!.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK_DIST) {
            ctx!.strokeStyle = `rgba(${pal.colors[a.c]},${(1 - d / LINK_DIST) * pal.link})`;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }

        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (md < MOUSE_DIST) {
          ctx!.strokeStyle = `rgba(${pal.mouseColor},${(1 - md / MOUSE_DIST) * pal.mouse})`;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(mouse.x, mouse.y);
          ctx!.stroke();
        }
      }

      if (!reduceMotion) raf = requestAnimationFrame(frame);
    }

    const onMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };
    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduceMotion) raf = requestAnimationFrame(frame);
    };

    const ro = new ResizeObserver(() => init());
    ro.observe(parent);

    // react to the theme toggle (data-theme on <html>)
    const mo = new MutationObserver(applyTheme);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    init();
    canvas.style.opacity = String(pal.opacity);
    frame();

    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
}