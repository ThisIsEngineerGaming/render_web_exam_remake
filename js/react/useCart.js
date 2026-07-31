import { useEffect, useState } from "react";
import { loadCart } from "./cartStore.js";

// Keeps a component's state in sync with the cookie-backed cart,
// refreshing whenever any component fires a "cartchange" event.
export function useCart() {
  const [cart, setCart] = useState(() => loadCart());

  useEffect(() => {
    const refresh = () => setCart(loadCart());
    window.addEventListener("cartchange", refresh);
    return () => window.removeEventListener("cartchange", refresh);
  }, []);

  return cart;
}
