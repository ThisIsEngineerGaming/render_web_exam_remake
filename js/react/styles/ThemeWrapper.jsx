import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { selectTheme } from "../../redux/themeSlice.js";
import { buildTheme } from "./theme.js";
import { GlobalStyle } from "./GlobalStyle.jsx";

// Reads the current theme mode ("dark" | "light") from Redux and provides
// the matching styled-components theme object to the whole tree.
// (store.js still mirrors the mode onto <html data-theme="..."> for the
// cookie-persistence side effect; styled-components no longer reads that
// attribute, it reads the ThemeProvider context instead.)
export default function ThemeWrapper({ children }) {
  const mode = useSelector(selectTheme);
  const theme = buildTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
