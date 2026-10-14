'use client'

import { motion } from "motion/react";
import type { MouseEvent } from "react";
import {
  Code2, Layers, Database, Palette, Network,
  Gauge, FlaskConical, Sparkles, Wrench, type LucideIcon,
} from "lucide-react";
import { skills } from "@/types/data";

const icons: Record<string, LucideIcon> = {
  "Core": Code2,
  "Frameworks & libraries": Layers,
  "State management": Database,
  "UI & styling": Palette,
  "API & communication": Network,
  "Quality & performance": Gauge,
  "Testing": FlaskConical,
  "AI-assisted development": Sparkles,
  "Tools": Wrench,
};

function spotlight(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export default function Skills() {
  return (
    <section id="skills">
      <div className="wrapper">
        <h2>Technical Skills</h2>

        <div className="sk-grid">
          {Object.entries(skills).map(([group, tags], i) => {
            const Icon = icons[group] ?? Code2;
            return (
              <motion.article
                key={group}
                className="sk-card"
                onMouseMove={spotlight}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.12 }}
              >
                <header className="sk-head">
                  <span className="sk-icon"><Icon size={20} strokeWidth={1.8} /></span>
                  <h3>{group}</h3>
                </header>

                <div className="sk-tags">
                  {tags.map((t) => <span key={t} className="sk-tag">{t}</span>)}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}