import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { getCookie, setCookie, deleteCookie } from '../entities/Cookies.js';
import cartReducer from './cartSlice.js';

const CART_COOKIE = 'mailabom_cart';
const CART_DAYS = 7;
function loadCartState() {
  const raw = getCookie(CART_COOKIE);
  if (!raw) return undefined;

  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return { items: parsed, isCheckedOut: false };
    }
    return { items: parsed.items ?? [], isCheckedOut: parsed.isCheckedOut ?? false };
  } catch {
    return undefined;
  }
}

const preloadedCart = loadCartState();

const rootReducer = combineReducers({
  cart: cartReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: preloadedCart ? { cart: preloadedCart } : undefined,
});

// persist the cart to its cookie on every change, so the next page
// navigation picks up where this one left off
let lastSerialized = JSON.stringify(store.getState().cart);
store.subscribe(() => {
  const cartState = store.getState().cart;
  const serialized = JSON.stringify(cartState);
  if (serialized === lastSerialized) return;
  lastSerialized = serialized;

  if (cartState.items.length === 0) {
    deleteCookie(CART_COOKIE);
  } else {
    setCookie(CART_COOKIE, serialized, CART_DAYS);
  }
});
