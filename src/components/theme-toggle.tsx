import { useEffect, useState } from "react";
import { usePlayer } from "@/lib/player-context";
import { getThemeMode, setThemeMode, type ThemeMode } from "@/lib/theme";

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>("dark");

  // Keep audio/player context mounted; not strictly required but ensures
  // this component can be used inside app layout without breaking.
  usePlayer();

  useEffect(() => {
    const m = getThemeMode();
    setMode(m);

    // Apply .dark class only for dark mode.
    document.documentElement.classList.toggle("dark", m === "dark");
  }, []);

  function toggle() {
    const next: ThemeMode = mode === "dark" ? "light" : "dark";
    // Persist + apply immediately.
    setThemeMode(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    setMode(next);
  }


  return (
    <button
      onClick={toggle}
      className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90 hover:bg-white/15"
      aria-label="Toggle theme"
      type="button"
    >
      {mode === "dark" ? "Light" : "Dark"}
    </button>
  );
}

