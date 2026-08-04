import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme, toggleTheme } from "../../redux/themeSlice.js";

const ToggleBtn = styled.button`
  position: relative;
  border: none;
  background: transparent;
  padding: 0;
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

export default function ThemeToggle() {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();

  return (
    <ToggleBtn
      onClick={() => dispatch(toggleTheme())}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      <span aria-hidden="true">{theme === "light" ? "L" : "D"}</span>
    </ToggleBtn>
  );
}
