import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { toggleLanguage } from "../i18n";

const ToggleBtn = styled.button`
  position: relative;
  border: none;
  background: transparent;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text};
  font-size: 0.75rem;
  line-height: 1;
  font-weight: 700;
  cursor: pointer;
  transition: color 0.18s, opacity 0.18s;

  &:hover {
    color: ${({ theme }) => theme.brand};
  }
`;

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const isAlbanian = i18n.language === "sq";

  return (
    <ToggleBtn
      type="button"
      onClick={toggleLanguage}
      aria-label={isAlbanian ? "Kalo në anglisht" : "Kalo në shqip"}
      title={isAlbanian ? "English" : "Shqip"}
    >
      {isAlbanian ? "EN" : "SQ"}
    </ToggleBtn>
  );
}
