"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        className="theme-toggle"
        aria-label="Toggle theme"
        title="Toggle theme"
        disabled
      >
        <span className="theme-toggle-track">
          <span className="theme-toggle-icon" />
        </span>
      </button>
    );
  }

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      className={`theme-toggle ${isDark ? "dark" : "light"}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      <span className="theme-toggle-track">
        <span className="theme-toggle-icon">
          {isDark ? (
            <DarkModeOutlined fontSize="inherit" />
          ) : (
            <LightModeOutlined fontSize="inherit" />
          )}
        </span>
      </span>
    </button>
  );
}