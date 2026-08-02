import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { getCookie, setCookie, deleteCookie } from '../entities/Cookies.js';
import cartReducer from './cartSlice.js';
import themeReducer from './themeSlice.js';

const CART_COOKIE = 'mailabom_cart';
const CART_DAYS = 7;
const THEME_COOKIE = 'theme';

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
  theme: themeReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: preloadedCart ? { cart: preloadedCart } : undefined,
});

// persist the cart to its cookie on every change, so the next page navigation picks up where this one left off
let lastCartSerialized = JSON.stringify(store.getState().cart);
let lastTheme = store.getState().theme.value;

// reflect theme onto <html data-theme="..."> so CSS custom properties pick it up
document.documentElement.setAttribute('data-theme', lastTheme);

store.subscribe(() => {
  const state = store.getState();

  const cartSerialized = JSON.stringify(state.cart);
  if (cartSerialized !== lastCartSerialized) {
    lastCartSerialized = cartSerialized;
    if (state.cart.items.length === 0) {
      deleteCookie(CART_COOKIE);
    } else {
      setCookie(CART_COOKIE, cartSerialized, CART_DAYS);
    }
  }

  if (state.theme.value !== lastTheme) {
    lastTheme = state.theme.value;
    setCookie(THEME_COOKIE, lastTheme, 365);
    document.documentElement.setAttribute('data-theme', lastTheme);
  }
});
