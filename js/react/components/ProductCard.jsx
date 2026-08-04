import { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice.js";

const Card = styled.div`
  background: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radiusLg};
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 200px;
  flex-shrink: 0;
  height: 380px;
  justify-content: space-between;
  overflow: hidden;
  transition: transform 0.18s, box-shadow 0.18s, border-color 0.18s, background 0.3s;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
    border-color: ${({ theme }) => theme.borderHover};
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: contain;
  background: ${({ theme }) => theme.cardImgBg};
  border-radius: 12px;
`;

const ProductName = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  text-align: center;
`;

const Stars = styled.div`
  color: gold;
  font-size: 22px;
`;

const OriginalPrice = styled.p`
  text-decoration: line-through;
  margin: 0;
  color: ${({ theme }) => theme.textMuted};
`;

const DiscountedPrice = styled.p`
  color: ${({ theme }) => theme.danger};
  font-weight: bold;
  margin: 0;
`;

const AddToCartBtn = styled.button`
  width: 100%;
  padding: 9px 16px;
  border: none;
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ $added, theme }) => ($added ? "#22a855" : theme.brand)};
  color: #fff;
  font-family: ${({ theme }) => theme.fontBody};
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  cursor: ${({ $added }) => ($added ? "default" : "pointer")};
  transform: scale(${({ $scale }) => $scale});
  transition: background 0.18s, color 0.18s, transform 0.18s;

  &:hover {
    background: ${({ $added, theme }) => ($added ? "#22a855" : theme.brandDim)};
    color: ${({ $added, theme }) => ($added ? "#fff" : theme.brand)};
  }
`;

// Port of js/entities/Product.js's createCard() method as a React component.
export default function ProductCard({ product }) {
  const [added, setAdded] = useState(false);
  const [scale, setScale] = useState(1);
  const dispatch = useDispatch();

  function handleAdd() {
    setScale(0.88);
    setTimeout(() => setScale(1.08), 100);
    setTimeout(() => setScale(1), 200);

    setAdded(true);
    setTimeout(() => setAdded(false), 1200);

    dispatch(
      addProduct({
        id: product.id,
        name: product.name,
        price: product.discountedPrice,
      })
    );
  }

  const stars = "\u2605".repeat(product.rating) + "\u2606".repeat(5 - product.rating);

  return (
    <Card>
      <CardImage src={product.imageUrl} alt={product.name} />
      <ProductName>{product.name}</ProductName>
      <Stars>{stars}</Stars>
      <OriginalPrice>{product.price} $</OriginalPrice>
      <DiscountedPrice>{product.discountedPrice} $</DiscountedPrice>
      <AddToCartBtn $added={added} $scale={scale} disabled={added} onClick={handleAdd}>
        {added ? "Added!" : "Add to cart"}
      </AddToCartBtn>
    </Card>
  );
}
