import { createGlobalStyle } from "styled-components";

// Replaces the shared reset/typography rules that used to sit at the top of public/css/style.css, products.css and cart.css.
export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
    font-family: ${({ theme }) => theme.fontBody};
    font-weight: 400;
    line-height: 1.6;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    transition: background 0.3s, color 0.3s;
  }

  h1, h2, h3, h4 {
    font-family: ${({ theme }) => theme.fontDisplay};
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.02em;
  }

  h1, h3 {
    text-align: center;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
