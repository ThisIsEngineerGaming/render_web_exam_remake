import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import ThemeToggle from "./components/ThemeToggle.jsx";
import { selectCartItemCount } from "../redux/cartSlice.js";
import {
  Header,
  BrandLogo,
  BrandIcon,
  Nav,
  NavItem,
  HeaderActions,
  IconLink,
  CartLink,
  CartBadge,
  Footer,
} from "./Layout.styles.js";

// Shared header/footer chrome for every routed page (Home, Products, Cart).
// The admin panel is intentionally NOT part of this router — it stays a
// separate static page at /html/admin.html.
export default function Layout() {
  const cartCount = useSelector(selectCartItemCount);

  return (
    <>
      <Header>
        <BrandLogo to="/">
          <BrandIcon src="/icon.png" alt="" aria-hidden="true" />
          <span>MailABom</span>
        </BrandLogo>

        <Nav>
          <NavItem to="/" end>
            Homepage
          </NavItem>
          <NavItem to="/products">Products</NavItem>
          <NavItem to="/cart">Cart</NavItem>
        </Nav>

        <HeaderActions>
          <ThemeToggle />

          <IconLink to="/products" aria-label="Search products">
            <span aria-hidden="true">P</span>
          </IconLink>

          <CartLink to="/cart" aria-label="View cart">
            <span aria-hidden="true">&#128722;</span>
            <CartBadge>{cartCount}</CartBadge>
          </CartLink>
        </HeaderActions>
      </Header>

      <Outlet />

      <Footer>
        <p>mailabom@gmail.gamer</p>
        <p>2026 &copy;</p>
      </Footer>
    </>
  );
}
