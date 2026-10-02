import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ExperienceItem from "@/components/Experience";
import { jobs, skills } from "@/types/data";


export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />

      <section id="experience">
        <div className="wrap">
          <h2>Where I've worked</h2>
          <div className="tl">
            {jobs.map((j) => (
              <ExperienceItem key={j.title}>
                <h3>{j.title}</h3>
                <p className="meta">{j.period}</p>
                <ul>{j.points.map((p) => <li key={p}>{p}</li>)}</ul>
                {j.stack && (
                  <div className="job-stack">
                    {j.stack.map((s) => <span key={s}>{s}</span>)}
                  </div>
                )}
              </ExperienceItem>
            ))}
          </div>
        </div>
      </section>

      <section id="skills">
        <div className="wrap">
          <h2>What I build with</h2>
          <div className="skills">
            {Object.entries(skills).map(([group, tags]) => (
              <div className="group" key={group}>
                <h3>{group}</h3>
                <div className="tags">{tags.map((t) => <span key={t}>{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <section id="education">
        <div className="wrap">
          <div className="language-list">
            <div className="languages-column">
              <h2> Languages</h2>
              <div className="language-list">
                <div className="language-card">
                  <div>
                    <h3>Armenian</h3>
                    <span>Native</span>
                  </div>
                  <strong>01</strong>
                </div>

                <div className="language-card">
                  <div>
                    <h3>Russian</h3>
                    <span>Fluent</span>
                  </div>
                  <strong>02</strong>
                </div>

                <div className="language-card">
                  <div>
                    <h3>English</h3>
                    <span>Intermediate</span>
                  </div>
                  <strong>03</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="education-grid">
            <div className="education-column">
              <h2>Education  </h2>
              <div className="education-item">
                <div className="education-dot" />
                <div className="education-content">
                  <span className="education-period">2009 — 2013</span>
                  <h3>Armenian National Polytechnic University</h3>
                  <p className="education-degree">
                    Bachelor’s Degree in Electrical Engineering
                  </p>
                </div>
              </div>

              <div className="education-item">
                <div className="education-dot" />
                <div className="education-content">
                  <span className="education-period">2015 — 2016</span>
                  <h3>Microsoft Armenia Innovation Center</h3>
                  <p className="education-degree">
                    Programming Fundamentals & Web Programming
                  </p>
                </div>
              </div>
            </div>


          </div>

        </div>
      </section> */}
      <section id="contact" className="contact-section">
        <div className="wrap contact-wrap">
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
                  <a className="btn main" href="mailto:edgarpetrosyanak@gmail.com">
                    edgarpetrosyanak@gmail.com
                  </a>

                  <a
                    href="https://www.linkedin.com/in/edgarpetrosyan"
                    className="btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>

                  <a href="/Edgar_Petrosyan_CV.pdf" className="btn" download>
                    Download CV
                  </a>
                </div>
              </div>
            </div>


          </div>
        </div>
      </section>

      <footer>© {new Date().getFullYear()} Edgar Petrosyan · Yerevan, Armenia</footer>
    </>
  );
}
