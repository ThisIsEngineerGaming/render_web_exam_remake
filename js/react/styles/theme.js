// Theme tokens for styled-components.
// Mirrors the CSS custom properties that used to live in public/css/*.css.
// `themes.dark` / `themes.light` hold color values that swap with the dark/light toggle; `tokens` holds values that never change per-theme.

export const themes = {
  dark: {
    mode: "dark",
    brand: "#1d7fe8",
    brandDim: "rgba(29, 127, 232, 0.18)",
    brandGlow: "rgba(29, 127, 232, 0.30)",
    bg: "#0a0a0b",
    surface: "#111114",
    surface2: "#18181c",
    surface3: "#1e1e24",
    border: "rgba(255,255,255,0.07)",
    borderHover: "rgba(255,255,255,0.14)",
    text: "#f0eeeb",
    textMuted: "#7a7772",
    textDim: "#3f3d3b",
    accent: "#e8612c",
    accentDim: "rgba(232, 97, 44, 0.15)",
    danger: "#e53e3e",
    dangerDim: "rgba(229, 62, 62, 0.12)",
    cardBg: "#111114",
    cardImgBg: "#1a1a20",
    navBlurBg: "rgba(10, 10, 11, 0.82)",
  },
  light: {
    mode: "light",
    brand: "#1568d3",
    brandDim: "rgba(21, 104, 211, 0.10)",
    brandGlow: "rgba(21, 104, 211, 0.25)",
    bg: "#e8f1fb",
    surface: "#ffffff",
    surface2: "#ddeaf8",
    surface3: "#cddff4",
    border: "rgba(21, 104, 211, 0.15)",
    borderHover: "rgba(21, 104, 211, 0.30)",
    text: "#0d1f3c",
    textMuted: "#4a6080",
    textDim: "#8aaacb",
    accent: "#e8612c",
    accentDim: "rgba(232, 97, 44, 0.12)",
    danger: "#c0392b",
    dangerDim: "rgba(192, 57, 43, 0.10)",
    cardBg: "#ffffff",
    cardImgBg: "#ddeaf8",
    navBlurBg: "rgba(232, 241, 251, 0.88)",
  },
};

// Theme-independent design tokens (radii, fonts, timing, etc.)
export const tokens = {
  radiusSm: "6px",
  radius: "12px",
  radiusLg: "20px",
  fontDisplay: "'Syne', sans-serif",
  fontBody: "'DM Sans', sans-serif",
  navH: "76px",
  transition: "0.18s cubic-bezier(0.4, 0, 0.2, 1)",
};

// Builds the full theme object handed to styled-components' ThemeProvider
export function buildTheme(mode) {
  return { ...tokens, ...(themes[mode] ?? themes.dark) };
}
