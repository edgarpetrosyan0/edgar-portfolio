"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const WORDS = ["Edgar", "Petrosyan"] as const;
const AVAILABILITY = ["On-site", "Remote", "Freelance"] as const;

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
            Senior Frontend Engineer with <strong>7 years</strong> of
            hands-on experience architecting scalable, high-quality web
            applications using <br />
            <strong>ReactJS, Next.js and Angular</strong>, and TypeScript.
            Specialized in building complex admin panels, dashboards,
            realtime features, and performance-critical user experiences.
            Proven ability to own features end-to-end, modernize legacy
            codebases, implement clean & maintainable architectures, and
            collaborate effectively with product, design, and backend teams to
            deliver intuitive, production-grade solutions in fast-paced
            environments.
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
          </div>

          <div className="hero-bottom-row">
            <div className="icon-wrapper">
              <LocationOnOutlinedIcon fontSize="small" />
              <span>Yerevan, Armenia</span>
            </div>

            <a
              className="icon-wrapper"
              href="mailto:edgarpetrosyanak@gmail.com"
            >
              <EmailOutlinedIcon fontSize="small" />
              <span>edgarpetrosyanak@gmail.com</span>
            </a>

            <a
              className="icon-wrapper"
              href="https://www.linkedin.com/in/edgarpetrosyan"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <LinkedInIcon fontSize="small" />
              <span>LinkedIn</span>
            </a>

            <a
              className="icon-wrapper"
              href="https://github.com/edgarpetrosyan0"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="GitHub"
            >
              <GitHubIcon fontSize="small" />
              <span>GitHub</span>
            </a>
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
  <div className="badge-head">
    <i aria-hidden="true" />
    <span>Open to work</span>
  </div>
  <ul className="badge-tags">
    {AVAILABILITY.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
</div>
        </div>
      </div>
    </header>
  );
}