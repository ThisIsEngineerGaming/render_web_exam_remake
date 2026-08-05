import styled from "styled-components";
import { Link } from "react-router-dom";

export const DetailWrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 24px 80px;
  min-height: calc(100vh - ${({ theme }) => theme.navH} - 60px);
`;

export const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.textMuted};
  font-family: ${({ theme }) => theme.fontBody};
  font-size: 0.8rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: 28px;
  transition: color ${({ theme }) => theme.transition};

  &:hover {
    color: ${({ theme }) => theme.brand};
  }
`;

export const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 380px) 1fr;
  gap: 48px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const ImageBox = styled.div`
  background: ${({ theme }) => theme.cardImgBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radiusLg};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  height: fit-content;

  img {
    width: 100%;
    max-height: 320px;
    object-fit: contain;
  }
`;

export const InfoPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fontDisplay};
  font-size: 1.8rem;
  font-weight: 800;
  color: ${({ theme }) => theme.text};
  margin: 0;
`;

export const Stars = styled.div`
  color: gold;
  font-size: 20px;
`;

export const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin: 4px 0;
`;

export const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: ${({ theme }) => theme.textMuted};
  font-size: 1rem;
`;

export const DiscountedPrice = styled.span`
  color: ${({ theme }) => theme.danger};
  font-weight: 800;
  font-size: 1.6rem;
`;

export const DiscountBadge = styled.span`
  background: ${({ theme }) => theme.dangerDim};
  color: ${({ theme }) => theme.danger};
  font-size: 0.75rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.radiusSm};
`;

export const MetaList = styled.dl`
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 6px 16px;
  margin: 16px 0 8px;
  padding-top: 16px;
  border-top: 1px solid ${({ theme }) => theme.border};

  dt {
    color: ${({ theme }) => theme.textDim};
    font-size: 0.78rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  dd {
    margin: 0;
    color: ${({ theme }) => theme.text};
    font-size: 0.92rem;
  }
`;

export const BuyBtn = styled.button`
  align-self: flex-start;
  margin-top: 12px;
  padding: 13px 32px;
  border: none;
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ $added, theme }) => ($added ? "#22a855" : theme.brand)};
  color: #fff;
  font-family: ${({ theme }) => theme.fontBody};
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  cursor: ${({ $added }) => ($added ? "default" : "pointer")};
  transform: scale(${({ $scale }) => $scale});
  transition: background 0.18s, color 0.18s, transform 0.18s;

  &:hover {
    background: ${({ $added, theme }) => ($added ? "#22a855" : theme.brandDim)};
    color: ${({ $added, theme }) => ($added ? "#fff" : theme.brand)};
  }
`;

export const StatusText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.textDim};
  padding: 100px 20px;
  font-size: 15px;
`;
