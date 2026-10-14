'use client'

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import DownloadOutlined from "@mui/icons-material/DownloadOutlined";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="wrapper contact-wrap">
        <div className="contact-card">
          <div className="contact-content">
            <div className="contact-heading">
              <h2>
                Let’s talk about
                <span>what’s next.</span>
              </h2>
            </div>

            <div className="contact-info">
              <p className="contact-description">
                Whether you’re building a new product, improving an existing
                application, or looking for an experienced frontend engineer,
                I’d be happy to hear about it.
              </p>

              <div className="contact-links">
                <a
                  className="ct-email"
                  href="mailto:edgarpetrosyanak@gmail.com"
                >
                  <span className="ct-email__icon">
                    <EmailOutlinedIcon />
                  </span>
                  <span className="ct-email__text">
                    <small>Email me</small>
                    <strong>edgarpetrosyanak@gmail.com</strong>
                  </span>
                  <NorthEastRoundedIcon className="ct-email__arrow" />
                </a>

                <a
                  className="ct-social"
                  href="https://www.linkedin.com/in/edgarpetrosyan"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <span className="ct-social__icon"><LinkedInIcon /></span>
                  LinkedIn
                </a>

                <a
                  className="ct-social"
                  href="https://github.com/edgarpetrosyan0"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <span className="ct-social__icon"><GitHubIcon /></span>
                  GitHub
                </a>

                <a
                  className="ct-social"
                  href="/documents/Edgar_Petrosyan_CV.pdf"
                  download
                >
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}