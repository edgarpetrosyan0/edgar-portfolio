"use client";

import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ExpandMoreRounded from "@mui/icons-material/ExpandMoreRounded";
import ExperienceItem from "@/components/Experience";

type Job = {
    title: string;
    period: string;
    points: string[];
    stack?: string[];
    type: "Full-time" | "Part-time";
};

export default function ExperienceAccordion({ jobs }: { jobs: Job[] }) {

    const [open, setOpen] = useState<Set<number>>(
        () =>
            new Set(
                jobs
                    .map((j, i) => (/present/i.test(j.period) ? i : -1))
                    .filter((i) => i !== -1)
            )
    );

    const toggle = (i: number) =>
        setOpen((prev) => {
            const next = new Set(prev);
            if (next.has(i)) next.delete(i);
            else next.add(i);
            return next;
        });

    return (
        <div className="exp-list">
            {jobs.map((j, i) => (
                <ExperienceItem key={j.title}>
                    <Accordion
                        className="exp-acc"
                        expanded={open.has(i)}
                        onChange={() => toggle(i)}
                        disableGutters
                        elevation={0}
                        square
                        slotProps={{ transition: { unmountOnExit: true } }}

                        sx={{
                            position: "relative",
                            overflow: "hidden",
                            width: "100%",
                            color: "var(--ink)",
                            "&::before": { display: "none" },
                        }}
                    >
                        <AccordionSummary
                            expandIcon={
                                <Box
                                    sx={{
                                        display: "grid",
                                        placeItems: "center",
                                        width: 30,
                                        height: 30,
                                        borderRadius: "50%",
                                        background: "var(--surface2)",
                                        color: "var(--ink)",
                                        transition: "background .25s, color .25s, border-color .25s",
                                        ".Mui-expanded &": {
                                            border: "1px solid var(--crimson)",
                                            color: "var(--crimson)",
                                            background:"transparent"
                                        },
                                    }}
                                >
                                    <ExpandMoreRounded />
                                </Box>
                            }
                            sx={{
                                px: { xs: 2, md: 4 },
                                py: { xs: 1.5, md: 2.5 },
                                "& .MuiAccordionSummary-content": {
                                    m: 0,
                                    flexDirection: { xs: "column", md: "row" },
                                    alignItems: { xs: "flex-start", md: "center" },
                                    justifyContent: "space-between",
                                    gap: { xs: 0.5, md: 3 },
                                },
                            }}
                        >
                            <Box sx={{ minWidth: 0 }}>
                                <Typography
                                    component="h3"
                                    sx={{
                                        m: 0,
                                        fontWeight: 700,
                                        lineHeight: 1.3,
                                    }}
                                >
                                    {j.title}
                                </Typography>

                                <Typography
                                    sx={{
                                        mt: 0.5,
                                        fontSize: "0.85rem",
                                        letterSpacing: "0.02em",
                                        color:
                                            "var(--muted)",
                                    }}
                                >
                                    {j.type}
                                </Typography>
                            </Box>

                            <Typography
                                sx={{
                                    flexShrink: 0,
                                    mr: { md: 2 },
                                    color: "var(--muted)",
                                    fontSize: "0.82rem",
                                    fontWeight: 600,
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {j.period}
                            </Typography>
                        </AccordionSummary>

                        <AccordionDetails
                            sx={{
                                px: { xs: 2, md: 4 },
                                pb: { xs: 2.5, md: 4 },
                                pt: 0,
                            }}
                        >
                            <Box
                                component="ul"
                                sx={{
                                    m: 0,
                                    pl: "1.1rem",
                                    maxWidth: "70ch",
                                    color: "var(--soft-ink)",
                                    "& li": { mb: 0.9, fontSize: { xs: 14, md: 16 } },
                                    "& li::marker": { color: "var(--crimson)" },
                                }}
                            >
                                {j.points.map((p) => (
                                    <li key={p}>{p}</li>
                                ))}
                            </Box>

                            {j.stack && (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 0.75,
                                        mt: 2.5,
                                        pt: 2,
                                        borderTop: "1px solid var(--line)",
                                    }}
                                >
                                    {j.stack.map((s) => (
                                        <Chip
                                            key={s}
                                            label={s}
                                            size="small"
                                            variant="outlined"
                                            sx={{
                                                borderRadius: "10px",
                                                color: "var(--ink)",
                                                background: "#ffffff0d",
                                                borderColor: "#ffffff17",
                                                fontSize: "0.82rem",
                                                height: "35px",
                                                transition: "border-color .2s, transform .2s",
                                            }}
                                        />
                                    ))}
                                </Box>
                            )}
                        </AccordionDetails>
                    </Accordion>
                </ExperienceItem>
            ))}
        </div>
    );
}