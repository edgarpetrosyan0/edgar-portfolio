"use client";

import { useEffect, useRef, useState } from "react";

interface CounterProps {
  value: number;
  suffix?: string;
  label: string;
}

function Counter({
  value,
  suffix = "",
  label,
}: CounterProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    const duration = 1400;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      // Smooth ease-out
      const eased =
        1 - Math.pow(1 - progress, 3);

      setCount(
        Math.floor(eased * value)
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [started, value]);

  return (
    <div
      ref={ref}
      className="stat"
    >
      <div className="stat-number">
        {count}
        {suffix}
      </div>

      <div className="stat-label">
        {label}
      </div>
    </div>
  );
}

export default function Stats() {
  return (
    <div className="stats">
      <Counter
        value={8}
        suffix="+"
        label="Years Experience"
      />

      <Counter
        value={20}
        suffix="+"
        label="Projects"
      />

      <div className="stat">
        <div className="stat-number infinity">
          ∞
        </div>

        <div className="stat-label stat-label-infinity">
          Coffee
        </div>
      </div>
    </div>
  );
}