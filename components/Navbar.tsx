"use client";

import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav>
      <div className="wrap nav-wrap">
        <a href="/" onClick={closeMenu} className="logo-link">
          <Image
            src="/logo.svg"
            alt="Edgar Petrosyan"
            width={150}
            height={40}
            priority
          />
        </a>

        {/* Desktop navigation */}
        <div className="right desktop-nav">
          <ul>
            <li>
              <a href="#experience">Experience</a>
            </li>
            <li>
              <a href="#skills">Skills</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>

          <a className="cv" href="/Edgar_Petrosyan_CV.pdf" download>
            CV ↓
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`menu-toggle ${isOpen ? "active" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile navigation */}
      <div className={`mobile-nav ${isOpen ? "open" : ""}`}>
        <a href="#experience" onClick={closeMenu}>
          Experience
        </a>

        <a href="#skills" onClick={closeMenu}>
          Skills
        </a>

        <a href="#contact" onClick={closeMenu}>
          Contact
        </a>

        <a
          className="mobile-cv"
          href="/Edgar_Petrosyan_CV.pdf"
          download
          onClick={closeMenu}
        >
          Download CV ↓
        </a>
      </div>
    </nav>
  );
}