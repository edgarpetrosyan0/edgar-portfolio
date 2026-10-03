"use client";

import { useState } from "react";
import Image from "next/image";
import { DownloadOutlined } from "@mui/icons-material";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav>
      <div className="wrap nav-wrap">
        <a href="/" onClick={closeMenu} className="logo-link">
          <span className="">Edgar</span>
         <svg
  className="logo-code"
  width="38"
  height="24"
  viewBox="0 0 38 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <defs>
    <linearGradient
      id="logoGradient"
      x1="0"
      y1="0"
      x2="38"
      y2="0"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0%" stopColor="#ffd166" />
      <stop offset="35%" stopColor="#ff8c00" />
      <stop offset="70%" stopColor="#ff3d00" />
      <stop offset="100%" stopColor="#d62828" />
    </linearGradient>
  </defs>

  <path
    d="M10 5L3 12L10 19"
    stroke="url(#logoGradient)"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  />

  <path
    d="M22 3L17 21"
    stroke="url(#logoGradient)"
    strokeWidth="2.5"
    strokeLinecap="round"
  />

  <path
    d="M28 5L35 12L28 19"
    stroke="url(#logoGradient)"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>
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

          <a
            className="cv"
            href="/Edgar_Petrosyan_CV.pdf"
            download="Edgar_Petrosyan_CV.pdf"
            aria-label="Download CV"
          >
            <div className="cv-content">
              <p>CV</p>
              <DownloadOutlined fontSize="small" />
            </div>

          </a>
        </div>

        {/* Mobile */}
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
          <DownloadOutlined />
          Download CV
        </a>
      </div>
    </nav>
  );
}