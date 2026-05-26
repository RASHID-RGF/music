import { useEffect } from "react";
import { getThemeMode, type ThemeMode } from "@/lib/theme";

// Applies the saved theme to <html> by toggling the `dark` class.
// This must be a plain React component (not a TanStack Route).
export function ThemeInit() {
  useEffect(() => {
    const mode: ThemeMode = getThemeMode();
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, []);

  return null;
}

