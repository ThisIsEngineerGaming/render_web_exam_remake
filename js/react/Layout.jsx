import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import ThemeToggle from "./components/ThemeToggle.jsx";
import LanguageToggle from "./components/LanguageToggle.jsx";
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

export default function Layout() {
  const { t } = useTranslation();
  const cartCount = useSelector(selectCartItemCount);

  return (
    <>
      <Header>
        <BrandLogo to="/">
          <BrandIcon src="/icon.png" alt="" aria-hidden="true" />
          <span>MailABom</span>
        </BrandLogo>

        <Nav>
          <NavItem to="/" end>{t("nav.homepage")}</NavItem>
          <NavItem to="/products">{t("nav.products")}</NavItem>
          <NavItem to="/cart">{t("nav.cart")}</NavItem>
          <NavItem to="/admin">{t("nav.admin")}</NavItem>
        </Nav>

        <HeaderActions>
          <LanguageToggle />
          <ThemeToggle />

          <IconLink to="/products" aria-label={t("nav.searchProducts")}>
            <span aria-hidden="true">P</span>
          </IconLink>

          <CartLink to="/cart" aria-label={t("nav.viewCart")}>
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
