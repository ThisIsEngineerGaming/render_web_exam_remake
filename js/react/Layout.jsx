import { Link, NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import ThemeToggle from "./components/ThemeToggle.jsx";
import { selectCartItemCount } from "../redux/cartSlice.js";

// Shared header/footer chrome for every routed page (Home, Products, Cart).
// The admin panel is intentionally NOT part of this router — it stays a
// separate static page at /html/admin.html.
export default function Layout() {
  const cartCount = useSelector(selectCartItemCount);

  return (
    <>
      <header>
        <Link to="/" className="brand-logo">
          <img src="/icon.png" alt="" className="brand-icon" aria-hidden="true" />
          <span>MailABom</span>
        </Link>

        <nav className="navigation">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
            Homepage
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => (isActive ? "active" : "")}>
            Products
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => (isActive ? "active" : "")}>
            Cart
          </NavLink>
        </nav>

        <div className="header-actions">
          <ThemeToggle />

          <Link to="/products" className="icon-btn" aria-label="Search products">
            <span aria-hidden="true">P</span>
          </Link>

          <Link to="/cart" className="icon-btn cart-btn" aria-label="View cart">
            <span aria-hidden="true">&#128722;</span>
            <span className="cart-badge">{cartCount}</span>
          </Link>
        </div>
      </header>

      <Outlet />

      <footer>
        <p>mailabom@gmail.gamer</p>
        <p>2026 &copy;</p>
      </footer>
    </>
  );
}
