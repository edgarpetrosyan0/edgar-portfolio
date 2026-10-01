"use client";

import { useEffect, useRef, useState } from "react";

export default function Counter({ to }: { to: number }) {

  const ref = useRef<HTMLElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer: ReturnType<typeof setInterval> | undefined;

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        if (still) return setN(to);
        let i = 0;
        timer = setInterval(() => {
          setN(++i);
          if (i >= to) clearInterval(timer);
        }, 110);
      },
      { threshold: 0.6 },
    );

    
    io.observe(el);
    return () => {
      io.disconnect();
      clearInterval(timer);
    };
  }, [to]);

  return <b ref={ref}>{n}</b>;
}
