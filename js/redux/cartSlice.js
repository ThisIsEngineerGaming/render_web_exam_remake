import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  items: [],          // { id, name, price, discountedPrice?, qty }
  isCheckedOut: false,
};

// price to charge for one unit of an item — mirrors the original
// `product.discountedPrice ?? product.price` fallback used by both
// the Cart class and Product#createCard
const unitPrice = (item) => item.discountedPrice ?? item.price;

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // adds a product; increments qty if it's already in the cart,
    // otherwise inserts it — same behavior as the old addToCart()
    addProduct: {
      reducer(state, action) {
        const { product, qty } = action.payload;
        const existing = state.items.find((i) => i.id === product.id);
        if (existing) {
          existing.qty += qty;
        } else {
          state.items.push({ qty, ...product });
        }
      },
      prepare(product, qty = product.qty ?? 1) {
        return { payload: { product, qty } };
      },
    },

    // removes a product entirely, regardless of quantity
    removeProduct(state, action) {
      const productId = action.payload;
      state.items = state.items.filter((i) => i.id !== productId);
    },

    // changes quantity by +1/-1 (or any delta); drops the item once
    // quantity reaches zero — same as the old updateQty()
    updateQty(state, action) {
      const { productId, delta } = action.payload;
      const item = state.items.find((i) => i.id === productId);
      if (!item) return;
      item.qty += delta;
      if (item.qty <= 0) {
        state.items = state.items.filter((i) => i.id !== productId);
      }
    },

    clearCart(state) {
      state.items = [];
      state.isCheckedOut = false;
    },

    checkout(state) {
      state.isCheckedOut = true;
    },
  },
});

export const { addProduct, removeProduct, updateQty, clearCart, checkout } =
  cartSlice.actions;

export default cartSlice.reducer;

// selectors
export const selectCartItems = (state) => state.cart.items;
export const selectIsCheckedOut = (state) => state.cart.isCheckedOut;

export const selectCartItemCount = createSelector(selectCartItems, (items) =>
  items.reduce((sum, item) => sum + item.qty, 0)
);

export const selectCartTotal = createSelector(selectCartItems, (items) =>
  items.reduce((sum, item) => sum + unitPrice(item) * item.qty, 0)
);
