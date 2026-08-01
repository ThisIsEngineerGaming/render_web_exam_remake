import { useTheme } from "../ThemeContext.jsx";

// Dark/light theme toggle button. Theme state itself now lives in ThemeContext
// (see ../ThemeContext.jsx) — this component is just a consumer of it.
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button id="themeToggle" className="theme-toggle" onClick={toggleTheme}>
      {theme === "light" ? "Dark" : "Light"}
    </button>
  );
}
