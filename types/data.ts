import portfolio from "../data/portfolio.json";

export type Skills = Record<string, string[]>;
export type Job = {
  title: string;
  period: string;
  points: string[];
  stack: string[];
};

export const skills: Skills = portfolio.skills;
export const jobs: Job[] = portfolio.jobs;