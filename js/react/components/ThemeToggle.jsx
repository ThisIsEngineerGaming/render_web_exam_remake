import { useEffect, useState } from "react";

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

// Dark/light theme toggle button — persists the choice to a cookie and
// applies it as a data-theme attribute on the document root.
export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => getCookie("theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function handleClick() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    setCookie("theme", next);
  }

  return (
    <button id="themeToggle" className="theme-toggle" onClick={handleClick}>
      {theme === "light" ? "Dark" : "Light"}
    </button>
  );
}
