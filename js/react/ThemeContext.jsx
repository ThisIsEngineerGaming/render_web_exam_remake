import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

// Sets a browser cookie with the given name, value, and lifetime in days (default 365)
function setCookie(name, value, days = 365) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

// Returns the value of a cookie by name, or null if it doesn't exist
function getCookie(name) {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

// Provides the current theme ("dark" | "light") and a toggle function to the whole
// component tree, backed by a cookie. This is the single source of truth for theme —
// any component can read it via useTheme() without prop-drilling, not just the toggle button.
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => getCookie("theme") || "dark");

  // Reflects the current theme onto <html data-theme="..."> so CSS custom properties pick it up
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(prev => {
      const next = prev === "dark" ? "light" : "dark";
      setCookie("theme", next);
      return next;
    });
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Reads { theme, toggleTheme } from context. Must be called from a component
// rendered inside <ThemeProvider> (main.jsx wraps the whole router in one).
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme() must be called within a <ThemeProvider>");
  }
  return ctx;
}
