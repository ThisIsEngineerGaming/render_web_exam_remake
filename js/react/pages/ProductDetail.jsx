import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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

export default function ProductDetail() {
  const { t } = useTranslation();
  const { productId } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
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
        <StatusText>{t("common.loading")}</StatusText>
      </DetailWrapper>
    );
  }

  if (status === "not-found") {
    return (
      <DetailWrapper>
        <BackLink to="/products">&larr; {t("productDetail.back")}</BackLink>
        <StatusText>{t("productDetail.noProduct", { id: productId })}</StatusText>
      </DetailWrapper>
    );
  }

  if (status === "error") {
    return (
      <DetailWrapper>
        <BackLink to="/products">&larr; {t("productDetail.back")}</BackLink>
        <StatusText>{t("productDetail.loadError")}</StatusText>
      </DetailWrapper>
    );
  }

  const stars = "\u2605".repeat(product.rating) + "\u2606".repeat(5 - product.rating);

  return (
    <DetailWrapper>
      <BackLink to="/products">&larr; {t("productDetail.back")}</BackLink>

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
            <dt>{t("productDetail.category")}</dt>
            <dd>{product.category ? t(`categories.${product.category.id}`) : "—"}</dd>
            <dt>{t("productDetail.manufacturer")}</dt>
            <dd>{product.manufacturer ? t(`manufacturers.${product.manufacturer.id}`) : "—"}</dd>
            <dt>{t("productDetail.productId")}</dt>
            <dd>{product.id}</dd>
          </MetaList>

          <BuyBtn $added={added} $scale={scale} disabled={added} onClick={handleBuy}>
            {added ? t("productDetail.added") : t("productDetail.buy")}
          </BuyBtn>
        </InfoPanel>
      </DetailGrid>
    </DetailWrapper>
  );
}
