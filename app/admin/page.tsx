"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import JobsManager from "./jobs-manager/JobsManager";
import SkillsManager from "./skills-manager/SkillsManager";


type Skills = Record<string, string[]>;

type Job = {
  title: string;
  period: string;
  points: string[];
  stack: string[];
};

export default function AdminPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [skills, setSkills] = useState<Skills>({});
  const [jobs, setJobs] = useState<Job[]>([]);

  const [activeTab, setActiveTab] =
    useState<"skills" | "jobs">("jobs");

  useEffect(() => {
    const storedPassword =
      sessionStorage.getItem("admin-password");

    if (!storedPassword) {
      router.replace("/admin/login");
      return;
    }

    setPassword(storedPassword);
  }, [router]);

  useEffect(() => {
    if (!password) return;

    loadData();
  }, [password]);

  async function loadData() {
    try {
      const res = await fetch("/api/portfolio", {
        method: "GET",
        cache: "no-store",
      });

      const responseText = await res.text();

      if (!res.ok) {
        console.error("API response:", responseText);

        throw new Error(
          `Failed to load portfolio: ${res.status} ${res.statusText}`
        );
      }

      const data = JSON.parse(responseText);

      setSkills(data.skills ?? {});
      setJobs(data.jobs ?? []);
    } catch (error) {
      console.error(
        "Failed to load portfolio:",
        error
      );
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("admin-password");
    router.replace("/admin/login");
  }

  if (!password) {
    return null;
  }

  return (
    <div className="admin">
      <header className="admin__bar">
        <div className="admin__bar-left">
          <div className="logo">EP</div>

          <h1>Portfolio Dashboard</h1>
        </div>

        <button
          type="button"
          className="admin-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>

      <div className="admin__tabs">
        <button
          type="button"
          className={`admin__tab ${
            activeTab === "jobs" ? "active" : ""
          }`}
          onClick={() => setActiveTab("jobs")}
        >
          Experience
        </button>

        <button
          type="button"
          className={`admin__tab ${
            activeTab === "skills" ? "active" : ""
          }`}
          onClick={() => setActiveTab("skills")}
        >
          Skills
        </button>
      </div>

      <main className="admin__content">
        {activeTab === "jobs" && (
          <JobsManager
            jobs={jobs}
            onChange={setJobs}
            password={password}
          />
        )}

        {activeTab === "skills" && (
          <SkillsManager
            skills={skills}
            onChange={setSkills}
            password={password}
          />
        )}
      </main>
    </div>
  );
}