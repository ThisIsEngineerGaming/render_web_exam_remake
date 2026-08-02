import { useDispatch, useSelector } from "react-redux";
import { selectTheme, toggleTheme } from "../../redux/themeSlice.js";

export default function ThemeToggle() {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();

  return (
    <button
      id="themeToggle"
      className="icon-btn theme-toggle"
      onClick={() => dispatch(toggleTheme())}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      <span aria-hidden="true">{theme === "light" ? "L" : "D"}</span>
    </button>
  );
}
