import Hero from "@/components/Hero";
import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";
import { jobs, marquee, skills } from "@/lib/data";
import Navbar from "@/components/Navbar";


export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />

      {/* <section id="about">
        <div className="wrap">
          <h2>About</h2>
          <div className="about">
            <p>Senior Frontend Developer with 7 years of hands-on experience building scalable, high-quality web applications. I specialize in complex admin panels, dashboards, real-time features and performance-critical interfaces. I own features end to end, modernize legacy codebases, keep architectures clean and maintainable, and work closely with product, design and backend teams to ship production-grade solutions in fast-paced environments.</p>
            <div className="stats">
              <div className="stat"><Counter to={7} /><span>years of experience</span></div>
              <div className="stat"><Counter to={6} /><span>companies and clients</span></div>
              <div className="stat"><Counter to={3} /><span>languages spoken</span></div>
              <div className="stat"><b>React 19</b><span>Next.js 16, Angular 18+</span></div>
            </div>
          </div>
        </div>
      </section> */}

      <section id="experience">
        <div className="wrap">
          <h2>Where I've worked</h2>
          <div className="tl">
            {jobs.map((j) => (
              <Reveal key={j.title}>
                <h3>{j.title}</h3>
                <p className="meta">{j.period}</p>
                <ul>{j.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </Reveal>
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

      {/* <section>
        <div className="wrap two">
          <div>
            <h2>Education</h2>
            <h3>Armenian National Polytechnic University</h3>
            <p>Bachelor’s degree in Electrical Engineering, 2009–2013</p>
            <h3>Microsoft Armenia Innovation Center</h3>
            <p>Programming fundamentals for beginners; Web Programming, 2015–2016</p>
          </div>
          <div>
            <h2>Languages</h2>
            <h3>Armenian</h3><p>Native</p>
            <h3>Russian</h3><p>Fluent</p>
            <h3>English</h3><p>Intermediate</p>
          </div>
        </div>
      </section> */}

      <section id="contact">
        <div className="wrap">
          <div className="contact">
            <h2>Let's build something that thinks</h2>
            <p>Have a product to build or a codebase to modernize? Send me a message.</p>
            <div className="cta cta-footer">
              <a className="btn main" href="mailto:edgarpetrosyanak@gmail.com">
                edgarpetrosyanak@gmail.com
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
              <a
                className="btn"
                href="/Edgar_Petrosyan_CV.pdf"
                download
              >
                Download CV
              </a>

            </div>

          </div>
        </div>
      </section>

      <footer>© {new Date().getFullYear()} Edgar Petrosyan · Yerevan, Armenia</footer>
    </>
  );
}
