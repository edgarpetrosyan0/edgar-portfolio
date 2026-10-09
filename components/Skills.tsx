'use client'

import { motion } from "motion/react";
import { skills } from "@/types/data";

export default function Skills() {
    return (
        <section id="skills">
            <div className="wrapper">
                <h2>Technical Skills</h2>
                <div className="skills">
                    {Object.entries(skills).map(([group, tags], i) => (
                        <motion.div
                            className="group"
                            key={group}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: i * 0.15 }}
                        >
                            <h3>{group}</h3>
                            <div className="tags">
                                {tags.map((t) => <span key={t}>{t}</span>)}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}