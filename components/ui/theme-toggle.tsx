"use client"

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const initial = (stored as "light" | "dark") || "light";
    setTheme(initial);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", initial === "dark");
      document.documentElement.style.colorScheme = initial === "dark" ? "dark" : "light";
    }
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isLight = theme === "light";

  const toggle = () => {
    const next = isLight ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", next === "dark");
      document.documentElement.style.colorScheme = next === "dark" ? "dark" : "light";
    }
  };

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggle}
      className="inline-flex items-center gap-2 rounded-md border px-3 py-1 text-sm hover:bg-muted"
    >
      {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
      <span>{isLight ? "Dark" : "Light"}</span>
    </button>
  );
}
