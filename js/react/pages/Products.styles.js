import styled from "styled-components";

export const SearchBarWrapper = styled.div`
  background: ${({ theme }) => theme.surface};
  padding: 14px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

export const SearchBarInner = styled.div`
  max-width: 640px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${({ theme }) => theme.surface2};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius};
  padding: 10px 16px;
  transition: border-color ${({ theme }) => theme.transition}, box-shadow ${({ theme }) => theme.transition};

  &:focus-within {
    border-color: ${({ theme }) => theme.brand};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.brandDim};
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.text};
  font-family: ${({ theme }) => theme.fontBody};
  font-size: 15px;

  &::placeholder {
    color: ${({ theme }) => theme.textDim};
  }
`;

export const ClearSearchBtn = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textMuted};
  font-size: 13px;
  cursor: pointer;
  display: ${({ $visible }) => ($visible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: ${({ theme }) => theme.radiusSm};
  transition: color ${({ theme }) => theme.transition}, background ${({ theme }) => theme.transition};

  &:hover {
    color: ${({ theme }) => theme.text};
    background: rgba(255, 255, 255, 0.08);
  }
`;

export const PageLayout = styled.div`
  display: flex;
  align-items: flex-start;
  min-height: calc(100vh - ${({ theme }) => theme.navH} - 60px);
`;

export const FilterSidebar = styled.aside`
  width: 210px;
  flex-shrink: 0;
  background: ${({ theme }) => theme.surface};
  border-right: 1px solid ${({ theme }) => theme.border};
  padding: 24px 14px;
  min-height: calc(100vh - ${({ theme }) => theme.navH} - 60px);
  position: sticky;
  top: ${({ theme }) => theme.navH};
`;

export const SidebarSection = styled.div`
  margin-bottom: 28px;

  h3 {
    text-align: left;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.textDim};
    margin-bottom: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid ${({ theme }) => theme.border};
  }
`;

export const FilterList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const FilterItem = styled.li`
  padding: 7px 12px;
  border-radius: ${({ theme }) => theme.radiusSm};
  cursor: pointer;
  font-size: 13.5px;
  color: ${({ theme }) => theme.textMuted};
  transition: background ${({ theme }) => theme.transition}, color ${({ theme }) => theme.transition};
  user-select: none;

  &:hover {
    background: ${({ theme }) => theme.surface2};
    color: ${({ theme }) => theme.text};
  }

  ${({ $active, theme }) =>
    $active &&
    `
    background: ${theme.brandDim};
    color: #5aabff;
    font-weight: 600;
    border-left: 2px solid ${theme.brand};
    padding-left: 10px;
  `}
`;

export const ProductsMain = styled.div`
  flex: 1;
  padding: 24px;
  min-width: 0;
`;

export const ResultsInfo = styled.div`
  margin-bottom: 16px;
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.textDim};
  min-height: 20px;
`;

export const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: flex-start;
`;

export const NoResults = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.textDim};
  font-size: 15px;
  padding: 80px 20px;
  width: 100%;
`;
