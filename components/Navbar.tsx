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
                <stop offset="0%" stopColor="#ff6b6b" />
                <stop offset="55%" stopColor="#e11d48" />
                <stop offset="100%" stopColor="#a3154f" />
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
            <span>CV</span>

            <svg
              className="pdf-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M14 2V8H20"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M8 14H16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />

              <path
                d="M8 17H13"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
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
          Download CV
        </a>
      </div>
    </nav>
  );
}