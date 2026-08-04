import styled from "styled-components";

export const PageContainer = styled.div`
  min-height: calc(100vh - ${({ theme }) => theme.navH});
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 48px 20px 60px;
`;

export const CheckoutForm = styled.form`
  width: max-content;
  max-width: 95vw;
  margin: 40px auto;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radiusLg};
  padding: 32px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.4);
`;

export const Grid = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 32px;
  flex-wrap: wrap;
`;

export const SectionTitle = styled.div`
  font-family: ${({ theme }) => theme.fontDisplay};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.textDim};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding-bottom: 10px;
  margin-bottom: 14px;
  margin-top: 0;
`;

export const Field = styled.div`
  margin-top: 10px;

  input,
  select {
    display: block;
    width: 100%;
    min-width: 200px;
    padding: 9px 14px;
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: ${({ theme }) => theme.radiusSm};
    background: ${({ theme }) => theme.surface2};
    color: ${({ theme }) => theme.text};
    font-family: ${({ theme }) => theme.fontBody};
    font-size: 0.9rem;
    transition: border-color ${({ theme }) => theme.transition}, box-shadow ${({ theme }) => theme.transition};
  }

  input::placeholder {
    color: ${({ theme }) => theme.textDim};
  }

  select option {
    background: ${({ theme }) => theme.surface2};
  }

  input:focus,
  select:focus {
    outline: none;
    border-color: ${({ theme }) => theme.brand};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.brandDim};
  }
`;

export const FieldLabel = styled.div`
  display: block;
  margin-bottom: 5px;
  font-size: 0.8rem;
  font-weight: 500;
  color: ${({ theme }) => theme.textMuted};
  letter-spacing: 0.02em;
`;

export const RadioRow = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  padding: 7px 0;
  font-size: 0.88rem;
  color: ${({ theme }) => theme.textMuted};
  cursor: pointer;
  transition: color ${({ theme }) => theme.transition};

  &:hover {
    color: ${({ theme }) => theme.text};
  }

  input {
    accent-color: ${({ theme }) => theme.brand};
    cursor: pointer;
  }
`;

export const CheckboxRow = styled(RadioRow)``;

export const SubmitBtn = styled.button`
  margin-top: 20px;
  padding: 11px 28px;
  border: none;
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.brand};
  color: #fff;
  font-family: ${({ theme }) => theme.fontBody};
  font-size: 0.88rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0 4px 14px ${({ theme }) => theme.brandGlow};
  transition: background ${({ theme }) => theme.transition}, transform ${({ theme }) => theme.transition},
    box-shadow ${({ theme }) => theme.transition};

  &:hover {
    background: #1567c8;
    transform: translateY(-1px);
    box-shadow: 0 8px 24px ${({ theme }) => theme.brandGlow};
  }
`;

export const CartPanel = styled.div`
  background: ${({ theme }) => theme.surface2};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radiusLg};
  padding: 20px;
  min-width: 230px;
  max-width: 280px;

  ${SectionTitle} {
    color: ${({ theme }) => theme.text};
    font-size: 0.72rem;
  }
`;

export const CartRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 0;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  font-size: 0.875rem;

  &:last-child {
    border-bottom: none;
  }
`;

export const CartName = styled.span`
  flex: 1;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  font-size: 0.84rem;
`;

export const CartPrice = styled.span`
  min-width: 52px;
  text-align: right;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  font-variant-numeric: tabular-nums;
  font-size: 0.84rem;
`;

export const CartQty = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  button {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: ${({ theme }) => theme.radiusSm};
    background: ${({ theme }) => theme.surface};
    color: ${({ theme }) => theme.textMuted};
    font-size: 0.8rem;
    font-weight: bold;
    line-height: 1;
    cursor: pointer;
    transition: background ${({ theme }) => theme.transition}, border-color ${({ theme }) => theme.transition},
      color ${({ theme }) => theme.transition};

    &:hover {
      background: ${({ theme }) => theme.brand};
      border-color: ${({ theme }) => theme.brand};
      color: #fff;
    }
  }
`;

export const CartRemoveBtn = styled.button`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
  border: 1px solid rgba(229, 62, 62, 0.25);
  border-radius: ${({ theme }) => theme.radiusSm};
  background: ${({ theme }) => theme.dangerDim};
  color: ${({ theme }) => theme.danger};
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.18s, border-color 0.18s, color 0.18s;

  &:hover {
    background: ${({ theme }) => theme.danger};
    border-color: ${({ theme }) => theme.danger};
    color: #fff;
  }
`;

export const CartTotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid ${({ theme }) => theme.border};
  font-family: ${({ theme }) => theme.fontDisplay};
  font-weight: 800;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.text};
`;

export const EmptyCart = styled.p`
  color: ${({ theme }) => theme.textDim};
  font-size: 0.82rem;
  text-align: center;
  padding: 20px 0;
  font-style: italic;
`;

export const ClearCartBtn = styled.button`
  display: block;
  width: 100%;
  margin-top: 12px;
  padding: 7px 14px;
  border: 1px solid rgba(229, 62, 62, 0.25);
  border-radius: ${({ theme }) => theme.radiusSm};
  background: ${({ theme }) => theme.dangerDim};
  color: ${({ theme }) => theme.danger};
  font-family: ${({ theme }) => theme.fontBody};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
  transition: background 0.18s, border-color 0.18s, color 0.18s;

  &:hover {
    background: ${({ theme }) => theme.danger};
    border-color: ${({ theme }) => theme.danger};
    color: #fff;
  }
`;
