"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const WORDS = ["Edgar", "Petrosyan"] as const;

const PHRASES = [
  "Building Modern Web Applications",
  "Creating High-Performance Interfaces",
  "Developing Complex Web Applications",
] as const;

const OFFSETS = [0, WORDS[0].length] as const;

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  const [typed, setTyped] = useState<string>(PHRASES[0]);


  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      const phrase = PHRASES[phraseIndex];

      if (deleting) {
        charIndex -= 1;
      } else {
        charIndex += 1;
      }

      setTyped(phrase.slice(0, charIndex));

      let delay = deleting ? 35 : 70;

      if (!deleting && charIndex === phrase.length) {
        deleting = true;
        delay = 1600;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % PHRASES.length;
        delay = 300;
      }

      timeoutId = setTimeout(tick, delay);
    };

    setTyped("");

    timeoutId = setTimeout(tick, 900);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);


  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const titleElement = titleRef.current;

    if (!titleElement) {
      return;
    }

    const chars = Array.from(
      titleElement.querySelectorAll<HTMLElement>(".ch")
    );

    if (chars.length === 0) {
      return;
    }

    const onPointerMove = (event: PointerEvent) => {
      for (const char of chars) {
        const rect = char.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distance = Math.hypot(
          event.clientX - centerX,
          event.clientY - centerY
        );

        const influence = Math.max(0, 1 - distance / 200);

        const weight = Math.round(700 + 100 * influence);

        char.style.fontVariationSettings = `"wght" ${weight}`;
      }
    };

    const resetWeights = () => {
      for (const char of chars) {
        char.style.fontVariationSettings = `"wght" 700`;
      }
    };

    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerleave", resetWeights);

    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", resetWeights);
    };
  }, []);

  return (
    <header className="hero">
      <div className="wrap hero-grid">
        <div>
          <h1
            ref={titleRef}
            aria-label="Edgar Petrosyan, Senior Frontend Developer"
          >
            {WORDS.map((word, wordIndex) => (
              <span
                className="word"
                aria-hidden="true"
                key={word}
              >
                {[...word].map((char, charIndex) => (
                  <span
                    className="ch"
                    key={`${word}-${charIndex}`}
                    style={
                      {
                        "--i": OFFSETS[wordIndex] + charIndex,
                      } as React.CSSProperties
                    }
                  >
                    {char}
                  </span>
                ))}

                {wordIndex === 0 && "\u00A0"}
              </span>
            ))}

            <span className="line2 grad" aria-hidden="true">
              Senior Frontend Engineer
            </span>
          </h1>

          <p className="typed" aria-live="polite">
            {typed}
          </p>

          <p className="lede">
            Senior Frontend Engineer with  <strong>7 years</strong> of handson experience architecting scalable,
             high-quality
            web applications using <br></br><strong>ReactJs, Next.js and Angular</strong>, and TypeScript. Specialized in
            building complex admin panels, dashboards, realtime features, and performance-critical user
            experiences. Proven ability to own features endto-end, modernize legacy codebases, implement
            clean & maintainable architectures, and
            collaborate effectively with product, design, and
            backend teams to deliver intuitive, productiongrade solutions in fast-paced environments.

          </p>

          <div className="cta">
            <a className="btn main" href="#experience">
              See my experience
            </a>

            <a
              className="btn"
              href="/Edgar_Petrosyan_CV.pdf"
              download
            >
              Download CV
            </a>

            <a
              className="btn"
              href="https://www.linkedin.com/in/edgarpetrosyan"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Edgar Petrosyan's LinkedIn profile"
            >
              LinkedIn
            </a>
          </div>

          <div className="hero-bottom-row">
            <span>◎ Yerevan, Armenia</span>
            <span>
              ✉ edgarpetrosyanak@gmail.com
            </span>
          </div>
        </div>

        <div className="visual">
          <div className="frame">
            <Image
              src="/photo.jpg"
              alt="Portrait of Edgar Petrosyan"
              width={800}
              height={1000}
              priority
              sizes="(max-width: 860px) 250px, 340px"
            />
          </div>

          <div className="badge">
            Currently @ <b>Ideascoll</b>
          </div>
        </div>
      </div>
    </header>
  );
}