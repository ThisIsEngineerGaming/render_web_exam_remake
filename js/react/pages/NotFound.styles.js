import styled from "styled-components";

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 200px);
  text-align: center;
  padding: 2rem;
  gap: 1.5rem;
`;

export const ErrorCode = styled.h1`
  font-size: 6rem;
  font-weight: 900;
  margin: 0;
  color: ${(props) => props.theme.colors.primary};
  letter-spacing: -2px;
  opacity: 0.9;
`;

export const ErrorTitle = styled.h2`
  font-size: 2.5rem;
  margin: 0;
  color: ${(props) => props.theme.colors.text};
  font-weight: 700;
`;

export const ErrorDescription = styled.p`
  font-size: 1.1rem;
  color: ${(props) => props.theme.colors.textSecondary};
  max-width: 500px;
  margin: 0;
  line-height: 1.6;
`;

export const BackLink = styled.button`
  padding: 0.75rem 2rem;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.background};
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryHover};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;
