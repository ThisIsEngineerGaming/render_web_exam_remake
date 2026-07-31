import { Link, Outlet } from "react-router-dom";
import ThemeToggle from "./components/ThemeToggle.jsx";

// Shared header/footer chrome for every routed page (Home, Products, Cart).
// The admin panel is intentionally NOT part of this router — it stays a
// separate static page at /html/admin.html.
export default function Layout() {
  return (
    <>
      <header>
        <div className="navigation">
          <Link to="/products">
            <button id="productsnav">Products</button>
          </Link>
          <Link to="/">
            <button id="homepagenav">Homepage</button>
          </Link>
          <Link to="/cart">
            <button id="cartnav">Cart</button>
          </Link>
          <ThemeToggle />
        </div>
        <Link to="/">
          <p className="brand-logo">
            <img src="/icon.png" alt="" className="brand-icon" aria-hidden="true" />
            MailABom
          </p>
        </Link>
      </header>

      <Outlet />

      <footer>
        <p>mailabom@gmail.gamer</p>
        <p>2026 &copy;</p>
      </footer>
    </>
  );
}
