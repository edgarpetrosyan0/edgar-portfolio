'use client'

import ProfileHeader from "@/components/ProfileHeader";
import ExperienceItem from "@/components/Experience";
import { jobs } from "@/types/data";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {

  return (
    <>
      <ProfileHeader />
      <section id="experience">
        <div className="wrapper">
          <h2>Career Journey</h2>
          <div className="exp-list">
            {jobs.map((j, i) => (
              <ExperienceItem key={j.title}>
                <div className="exp-side">
                  <span className="exp-index">{String(i + 1).padStart(2, "0")}</span>
                  <span className="exp-period">{j.period}</span>
                </div>

                <div className="exp-card">
                  <h3>{j.title}</h3>

                  <ul>
                    {j.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>

                  {j.stack && (
                    <div className="exp-stack">
                      {j.stack.map((s) => (
                        <span key={s}>{s}</span>
                      ))}
                    </div>
                  )}
                </div>
              </ExperienceItem>
            ))}
          </div>
        </div>
      </section>

      <Skills />
      <Contact />
      <Footer />
    </>
  );
}
