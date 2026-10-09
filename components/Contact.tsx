'use client'

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { DownloadOutlined } from "@mui/icons-material";

export default function Contact() {


  return (
    <>

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
                    className="icon-wrapper"
                    href="mailto:edgarpetrosyanak@gmail.com"
                  >
                    <EmailOutlinedIcon />
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
                    <LinkedInIcon />
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
                    <GitHubIcon />
                    <span>GitHub</span>
                  </a>

                  <a href="/documents/Edgar_Petrosyan_CV.pdf" className="icon-wrapper" download>
                    <span className="download-cv">
                      <DownloadOutlined />
                      Download CV</span>
                  </a>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
