import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice.js";
import { fetchProductById, createProductInstance } from "../data.js";
import {
  DetailWrapper,
  BackLink,
  DetailGrid,
  ImageBox,
  InfoPanel,
  Title,
  Stars,
  PriceRow,
  OriginalPrice,
  DiscountedPrice,
  DiscountBadge,
  MetaList,
  BuyBtn,
  StatusText,
} from "./ProductDetail.styles.js";

// Basic single-product page: image, name, rating, price/discount, category/manufacturer,
// and a buy button — reached by clicking a ProductCard on Home or Products.
export default function ProductDetail() {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading"); // "loading" | "ready" | "not-found" | "error"
  const [added, setAdded] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");

    fetchProductById(productId)
      .then((data) => {
        if (cancelled) return;
        if (!data) {
          setStatus("not-found");
          return;
        }
        setProduct(createProductInstance(data));
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [productId]);

  function handleBuy() {
    setScale(0.9);
    setTimeout(() => setScale(1.05), 100);
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

  if (status === "loading") {
    return (
      <DetailWrapper>
        <StatusText>Loading product...</StatusText>
      </DetailWrapper>
    );
  }

  if (status === "not-found") {
    return (
      <DetailWrapper>
        <BackLink to="/products">&larr; Back to products</BackLink>
        <StatusText>No product found with ID "{productId}".</StatusText>
      </DetailWrapper>
    );
  }

  if (status === "error") {
    return (
      <DetailWrapper>
        <BackLink to="/products">&larr; Back to products</BackLink>
        <StatusText>Something went wrong loading this product. Please try again.</StatusText>
      </DetailWrapper>
    );
  }

  const stars = "\u2605".repeat(product.rating) + "\u2606".repeat(5 - product.rating);

  return (
    <DetailWrapper>
      <BackLink to="/products">&larr; Back to products</BackLink>

      <DetailGrid>
        <ImageBox>
          <img src={product.imageUrl} alt={product.name} />
        </ImageBox>

        <InfoPanel>
          <Title>{product.name}</Title>
          <Stars>{stars}</Stars>

          <PriceRow>
            <DiscountedPrice>{product.discountedPrice} $</DiscountedPrice>
            <OriginalPrice>{product.price} $</OriginalPrice>
            <DiscountBadge>-{product.getDiscountPercent()}%</DiscountBadge>
          </PriceRow>

          <MetaList>
            <dt>Category</dt>
            <dd>{product.category?.name ?? "—"}</dd>
            <dt>Manufacturer</dt>
            <dd>{product.manufacturer?.name ?? "—"}</dd>
            <dt>Product ID</dt>
            <dd>{product.id}</dd>
          </MetaList>

          <BuyBtn $added={added} $scale={scale} disabled={added} onClick={handleBuy}>
            {added ? "Added to cart!" : "Buy"}
          </BuyBtn>
        </InfoPanel>
      </DetailGrid>
    </DetailWrapper>
  );
}
