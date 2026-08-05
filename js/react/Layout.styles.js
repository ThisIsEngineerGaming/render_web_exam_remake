import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";

export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  height: 76px;
  background: ${({ theme }) => theme.surface};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  gap: 24px;
  transition: background 0.3s, border-color 0.3s;
`;

export const BrandLogo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  white-space: nowrap;
  flex-shrink: 0;

  span {
    font-family: ${({ theme }) => theme.fontDisplay};
    font-weight: 800;
    font-size: 1.05rem;
    letter-spacing: 0.02em;
  }
`;

export const BrandIcon = styled.img`
  width: 30px;
  height: 30px;
  object-fit: contain;
`;

export const Nav = styled.nav`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(20px, 3vw, 40px);
  margin: 0;
`;

// NavLink auto-appends an "active" class when its route matches, as long as we don't pass our own className prop — so `&.active` below just works.
export const NavItem = styled(NavLink)`
  display: inline-flex;
  align-items: center;
  position: relative;
  padding: 4px 0;
  color: ${({ theme }) => theme.textMuted};
  font-family: ${({ theme }) => theme.fontBody};
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
  transition: color 0.18s;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -3px;
    height: 1.5px;
    background: ${({ theme }) => theme.text};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.18s;
  }

  &:hover {
    color: ${({ theme }) => theme.text};
  }
  &:hover::after {
    transform: scaleX(1);
  }

  &.active {
    color: ${({ theme }) => theme.text};
    font-weight: 700;
  }
  &.active::after {
    transform: scaleX(1);
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

// Shared "icon button" look for the search/cart links in the header.
export const IconLink = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text};
  font-size: 1.15rem;
  line-height: 1;
  cursor: pointer;
  transition: color 0.18s, opacity 0.18s;

  &:hover {
    color: ${({ theme }) => theme.brand};
  }
`;

export const CartLink = styled(IconLink)`
  overflow: visible;
`;

export const CartBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -10px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 999px;
  background: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.surface};
  font-family: ${({ theme }) => theme.fontBody};
  font-size: 0.62rem;
  font-weight: 700;
  line-height: 16px;
  text-align: center;
`;

export const Footer = styled.footer`
  background: ${({ theme }) => theme.surface};
  border-top: 1px solid ${({ theme }) => theme.border};
  text-align: center;
  padding: 48px 20px;
  color: ${({ theme }) => theme.textDim};
  transition: background 0.3s;

  p {
    margin: 4px 0;
    font-size: 0.85rem;
    letter-spacing: 0.03em;
  }
`;
