import { useState } from "react";
import { addToCart } from "../cartStore.js";

// Port of js/entities/Product.js's createCard() method as a React component.
// Keeps the same brief scale-bounce + "Added!" feedback on click.
export default function ProductCard({ product }) {
  const [added, setAdded] = useState(false);
  const [scale, setScale] = useState(1);

  function handleAdd() {
    setScale(0.88);
    setTimeout(() => setScale(1.08), 100);
    setTimeout(() => setScale(1), 200);

    setAdded(true);
    setTimeout(() => setAdded(false), 1200);

    addToCart({
      id:    product.id,
      name:  product.name,
      price: product.discountedPrice,
    });
  }

  const stars = "\u2605".repeat(product.rating) + "\u2606".repeat(5 - product.rating);

  return (
    <div className="product-card">
      <img
        src={product.imageUrl}
        alt={product.name}
        style={{ width: "100%", height: "120px", objectFit: "contain" }}
      />
      <p style={{ fontSize: "20px", fontWeight: "bold", margin: 0 }}>{product.name}</p>
      <div style={{ color: "gold", fontSize: "22px" }}>{stars}</div>
      <p style={{ textDecoration: "line-through", margin: 0 }}>{product.price} $</p>
      <p style={{ color: "red", fontWeight: "bold", margin: 0 }}>{product.discountedPrice} $</p>
      <button
        className={`add-to-cart-btn${added ? " add-to-cart-btn--added" : ""}`}
        style={{ transform: `scale(${scale})` }}
        disabled={added}
        onClick={handleAdd}
      >
        {added ? "Added!" : "Add to cart"}
      </button>
    </div>
  );
}
