// Cookie-backed cart store shared by every React page.
// This is a DOM-free port of the logic that used to live in js/entities/Cart.js —
// components subscribe to the "cartchange" window event to stay in sync.

const CART_COOKIE = "mailabom_cart";
const CART_DAYS   = 7;

function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function getCookie(name) {
  return document.cookie.split("; ").reduce((r, v) => {
    const [key, ...val] = v.split("=");
    return key === name ? decodeURIComponent(val.join("=")) : r;
  }, "");
}

function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

// Reads and parses the cart array from the cookie; returns [] if missing or malformed
export function loadCart() {
  try {
    const raw = getCookie(CART_COOKIE);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Serializes the cart array, writes it to the cookie, and notifies subscribers
function saveCart(cart) {
  setCookie(CART_COOKIE, JSON.stringify(cart), CART_DAYS);
  window.dispatchEvent(new CustomEvent("cartchange"));
}

// Adds an item to the cart; increments qty if the same ID already exists
export function addToCart(item) {
  const cart     = loadCart();
  const existing = cart.find(i => i.id === item.id);
  if (existing) {
    existing.qty += item.qty ?? 1;
  } else {
    cart.push({ qty: 1, ...item });
  }
  saveCart(cart);
}

// Removes an item from the cart entirely by its ID
export function removeFromCart(id) {
  saveCart(loadCart().filter(i => i.id !== id));
}

// Changes a cart item's quantity by delta (+1 or -1); removes it if quantity drops to 0 or below
export function updateQty(id, delta) {
  const cart = loadCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) return removeFromCart(id);
  saveCart(cart);
}

// Empties the entire cart
export function clearCart() {
  deleteCookie(CART_COOKIE);
  window.dispatchEvent(new CustomEvent("cartchange"));
}
