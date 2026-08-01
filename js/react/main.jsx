import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./ThemeContext.jsx";
import Layout from "./Layout.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import CartPage from "./pages/Cart.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<CartPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
