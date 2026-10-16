'use client'

import ProfileHeader from "@/components/ProfileHeader";
import { jobs } from "@/types/data";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ExperienceAccordion from "@/components/ExperienceAccordion";

export default function Home() {
  return (
    <>
      <ProfileHeader />
      <div className="main-wrapper">
        <section id="experience">
          <div className="wrapper">
            <h2>Experience</h2>
            <ExperienceAccordion jobs={jobs} />
          </div>
        </section>

        <Skills />
        <Contact />
        <Footer />

      </div>

    </>
  );
}