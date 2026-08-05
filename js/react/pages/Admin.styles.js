import styled from "styled-components";

export const AdminPage = styled.main`
  width: min(1180px, calc(100% - 40px));
  min-height: calc(100vh - ${({ theme }) => theme.navH});
  margin: 0 auto;
  padding: 52px 0 72px;
`;

export const AuthCard = styled.section`
  width: min(440px, 100%);
  margin: 48px auto;
  padding: 34px;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radiusLg};
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.24);
`;

export const Eyebrow = styled.p`
  color: ${({ theme }) => theme.brand};
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

export const Title = styled.h1`
  margin: 8px 0;
  color: ${({ theme }) => theme.text};
  font-size: clamp(2rem, 5vw, 3rem);
  text-align: left;
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.textMuted};
`;

export const Form = styled.form`
  display: grid;
  gap: 18px;
  margin-top: 30px;
`;

export const Field = styled.div`
  display: grid;
  gap: 7px;

  label { color: ${({ theme }) => theme.textMuted}; font-size: 0.78rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; }
  input, select { width: 100%; min-width: 0; padding: 11px 12px; border: 1px solid ${({ theme }) => theme.border}; border-radius: ${({ theme }) => theme.radiusSm}; background: ${({ theme }) => theme.surface2}; color: ${({ theme }) => theme.text}; font: inherit; }
  input:focus, select:focus { outline: none; border-color: ${({ theme }) => theme.brand}; box-shadow: 0 0 0 3px ${({ theme }) => theme.brandDim}; }
`;

export const InputGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  @media (max-width: 900px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media (max-width: 540px) { grid-template-columns: 1fr; }
`;

const Button = styled.button`
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radiusSm};
  padding: 10px 16px;
  font: 700 0.78rem ${({ theme }) => theme.fontBody};
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: transform ${({ theme }) => theme.transition}, background ${({ theme }) => theme.transition}, border-color ${({ theme }) => theme.transition};
  &:hover:not(:disabled) { transform: translateY(-1px); }
  &:disabled { cursor: not-allowed; opacity: 0.55; }
`;

export const PrimaryButton = styled(Button)`background: ${({ theme }) => theme.brand}; color: #fff; &:hover:not(:disabled) { background: ${({ theme }) => theme.brand}; filter: brightness(1.12); }`;
export const SecondaryButton = styled(Button)`background: ${({ theme }) => theme.surface2}; border-color: ${({ theme }) => theme.border}; color: ${({ theme }) => theme.text}; &:hover:not(:disabled) { background: ${({ theme }) => theme.surface3}; border-color: ${({ theme }) => theme.borderHover}; }`;
export const DangerButton = styled(Button)`background: ${({ theme }) => theme.danger}; color: #fff; &:hover:not(:disabled) { filter: brightness(1.1); }`;

export const Notice = styled.div`
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radiusSm};
  background: ${({ $kind, theme }) => ($kind === "error" ? theme.dangerDim : theme.brandDim)};
  border: 1px solid ${({ $kind, theme }) => ($kind === "error" ? theme.danger : theme.brand)};
  color: ${({ $kind, theme }) => ($kind === "error" ? theme.danger : theme.text)};
  font-size: 0.88rem;
`;

export const WorkspaceHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 24px;
  margin-bottom: 32px;
  @media (max-width: 540px) { flex-direction: column; }
`;

export const Panel = styled.section`
  margin-bottom: 22px;
  padding: 26px;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius};
`;

export const PanelHeader = styled.div`
  display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 20px;
  h2 { color: ${({ theme }) => theme.text}; font-size: 1.1rem; text-align: left; }
`;

export const ProductCount = styled.span`
  display: inline-grid; place-items: center; min-width: 24px; padding: 2px 7px; margin-left: 7px; border-radius: 999px; background: ${({ theme }) => theme.brandDim}; color: ${({ theme }) => theme.brand}; font-size: 0.72rem;
`;
export const TableWrap = styled.div`overflow-x: auto;`;
export const ProductTable = styled.table`
  width: 100%; min-width: 750px; border-collapse: collapse;
  th { padding: 10px 12px; color: ${({ theme }) => theme.textDim}; border-bottom: 1px solid ${({ theme }) => theme.border}; font-size: 0.7rem; letter-spacing: 0.08em; text-align: left; text-transform: uppercase; }
  td { padding: 13px 12px; color: ${({ theme }) => theme.text}; border-bottom: 1px solid ${({ theme }) => theme.border}; font-size: 0.86rem; vertical-align: middle; }
  td:first-child { display: flex; align-items: center; gap: 11px; min-width: 220px; }
  tr:last-child td { border-bottom: none; }
  small { display: block; margin-top: 2px; color: ${({ theme }) => theme.textDim}; font-size: 0.72rem; }
`;
export const ProductImage = styled.img`width: 42px; height: 42px; flex: 0 0 42px; border-radius: ${({ theme }) => theme.radiusSm}; object-fit: cover; background: ${({ theme }) => theme.surface2};`;
export const EmptyState = styled.p`padding: 34px 0; color: ${({ theme }) => theme.textMuted}; text-align: center;`;
export const LoadingState = styled(EmptyState)``;
export const Actions = styled.div`display: flex; justify-content: flex-end; gap: 10px; flex-wrap: wrap;`;
