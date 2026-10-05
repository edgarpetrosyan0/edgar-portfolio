"use client";

import { useEffect, useRef, useState } from "react";

interface CounterProps {
  value: number;
  suffix?: string;
  label: string;
}

function Counter({ value, suffix = "", label }: CounterProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Start when visible
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      setStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Animate
  useEffect(() => {
    if (!started) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(value);
      return;
    }

    const duration = 1400;
    const startTime = performance.now();
    let frameId = 0;

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic

      setCount(Math.floor(eased * value));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [started, value]);

  return (
    <div ref={ref} className="stat">
      <div className="stat-number">
        {count}
        {suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function Stats() {
  return (
    <div className="stats">
      <Counter value={8} suffix="+" label="Years Experience" />
      <Counter value={20} suffix="+" label="Projects" />

      <div className="stat">
        <div className="stat-number infinity" aria-hidden="true">
          ∞
        </div>
        <div className="stat-label stat-label-infinity">
          Infinite Coffee
        </div>
      </div>
    </div>
  );
}