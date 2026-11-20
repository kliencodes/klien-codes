export type ThemePresetKey =
  | "cherry-obsidian"
  | "obsidian-cyan"
  | "carbon-cobalt"
  | "zinc-emerald";

export interface ThemePreset {
  key: ThemePresetKey;
  name: string;
  canvasDark: string;
  accentPrimary: string;
  accentSecondary: string;
}

export const themePresets: Record<ThemePresetKey, ThemePreset> = {
  "cherry-obsidian": {
    key: "cherry-obsidian",
    name: "Classic Cherry Red & Obsidian Black",
    canvasDark: "#0A0A0B",
    accentPrimary: "#DC2626",
    accentSecondary: "#7F1D1D",
  },
  "obsidian-cyan": {
    key: "obsidian-cyan",
    name: "Obsidian & Electric Cyan",
    canvasDark: "#090B10",
    accentPrimary: "#06B6D4",
    accentSecondary: "#6366F1",
  },
  "carbon-cobalt": {
    key: "carbon-cobalt",
    name: "Carbon & Royal Cobalt",
    canvasDark: "#0A0B0E",
    accentPrimary: "#3B82F6",
    accentSecondary: "#8B5CF6",
  },
  "zinc-emerald": {
    key: "zinc-emerald",
    name: "Zinc & Terminal Emerald",
    canvasDark: "#09090B",
    accentPrimary: "#10B981",
    accentSecondary: "#14B8A6",
  },
};

export const activeThemePreset: ThemePresetKey = "cherry-obsidian";
