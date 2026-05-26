export type ThemeMode = "dark" | "light";

const STORAGE_KEY = "vf:theme";

export function getThemeMode(): ThemeMode {
  if (typeof window === "undefined") return "dark";

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === "light" || raw === "dark") return raw;

  // Default: current app CSS is tuned for dark.
  return "dark";
}

export function setThemeMode(mode: ThemeMode) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, mode);
}

