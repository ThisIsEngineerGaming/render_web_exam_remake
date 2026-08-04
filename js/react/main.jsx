import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "../redux/store.js";
import Layout from "./Layout.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import CartPage from "./pages/Cart.jsx";
import ThemeWrapper from "./styles/ThemeWrapper.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeWrapper>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<CartPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeWrapper>
    </Provider>
  </React.StrictMode>
);
