// js/redux/cartSlice.test.js
//
// Unit tests for the cart Redux slice (js/redux/cartSlice.js).
// Run with: npx jest
//
// Setup needed (see jest.config.js / babel.config.js / package.json
// snippets provided alongside this file) — this project has no test
// runner configured yet, so these devDependencies must be added first:
//   npm install --save-dev jest babel-jest @babel/core @babel/preset-env

import cartReducer, {
  addProduct,
  removeProduct,
  updateQty,
  clearCart,
  checkout,
  selectCartItems,
  selectIsCheckedOut,
  selectCartItemCount,
  selectCartTotal,
} from './cartSlice';

// sample products used across tests
const shirt = { id: 1, name: 'Shirt', price: 20 };
const shoes = { id: 2, name: 'Shoes', price: 50, discountedPrice: 40 };

const initialState = { items: [], isCheckedOut: false };

describe('cartSlice reducer', () => {
  test('returns the initial state', () => {
    expect(cartReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  describe('addProduct', () => {
    test('adds a new product with default qty of 1', () => {
      const state = cartReducer(initialState, addProduct(shirt));
      expect(state.items).toEqual([{ ...shirt, qty: 1 }]);
    });

    test('adds a new product with an explicit qty', () => {
      const state = cartReducer(initialState, addProduct(shirt, 3));
      expect(state.items).toEqual([{ ...shirt, qty: 3 }]);
    });

    test('increments qty when the same product is added again', () => {
      let state = cartReducer(initialState, addProduct(shirt));
      state = cartReducer(state, addProduct(shirt, 2));
      expect(state.items).toHaveLength(1);
      expect(state.items[0].qty).toBe(3);
    });

    test('keeps separate entries for different products', () => {
      let state = cartReducer(initialState, addProduct(shirt));
      state = cartReducer(state, addProduct(shoes));
      expect(state.items).toHaveLength(2);
    });
  });

  describe('removeProduct', () => {
    test('removes the matching product entirely, regardless of qty', () => {
      let state = cartReducer(initialState, addProduct(shirt, 5));
      state = cartReducer(state, removeProduct(shirt.id));
      expect(state.items).toEqual([]);
    });

    test('leaves other products untouched', () => {
      let state = cartReducer(initialState, addProduct(shirt));
      state = cartReducer(state, addProduct(shoes));
      state = cartReducer(state, removeProduct(shirt.id));
      expect(state.items).toEqual([{ ...shoes, qty: 1 }]);
    });

    test('is a no-op when the product is not in the cart', () => {
      const state = cartReducer(initialState, removeProduct(999));
      expect(state.items).toEqual([]);
    });
  });

  describe('updateQty', () => {
    test('increases qty by a positive delta', () => {
      let state = cartReducer(initialState, addProduct(shirt));
      state = cartReducer(state, updateQty({ productId: shirt.id, delta: 1 }));
      expect(state.items[0].qty).toBe(2);
    });

    test('decreases qty by a negative delta', () => {
      let state = cartReducer(initialState, addProduct(shirt, 3));
      state = cartReducer(state, updateQty({ productId: shirt.id, delta: -1 }));
      expect(state.items[0].qty).toBe(2);
    });

    test('removes the item once qty drops to zero', () => {
      let state = cartReducer(initialState, addProduct(shirt, 1));
      state = cartReducer(state, updateQty({ productId: shirt.id, delta: -1 }));
      expect(state.items).toEqual([]);
    });

    test('removes the item if delta pushes qty below zero', () => {
      let state = cartReducer(initialState, addProduct(shirt, 1));
      state = cartReducer(state, updateQty({ productId: shirt.id, delta: -5 }));
      expect(state.items).toEqual([]);
    });

    test('is a no-op when the product is not in the cart', () => {
      const state = cartReducer(initialState, updateQty({ productId: 999, delta: 1 }));
      expect(state.items).toEqual([]);
    });
  });

  describe('clearCart', () => {
    test('empties the items array and resets isCheckedOut', () => {
      let state = cartReducer(initialState, addProduct(shirt));
      state = cartReducer(state, checkout());
      state = cartReducer(state, clearCart());
      expect(state).toEqual(initialState);
    });
  });

  describe('checkout', () => {
    test('sets isCheckedOut to true without touching items', () => {
      let state = cartReducer(initialState, addProduct(shirt));
      state = cartReducer(state, checkout());
      expect(state.isCheckedOut).toBe(true);
      expect(state.items).toEqual([{ ...shirt, qty: 1 }]);
    });
  });
});

describe('cartSlice selectors', () => {
  const filledState = {
    cart: {
      items: [
        { ...shirt, qty: 2 },       // 20 * 2 = 40
        { ...shoes, qty: 1 },       // discountedPrice 40 * 1 = 40
      ],
      isCheckedOut: false,
    },
  };

  test('selectCartItems returns the items array', () => {
    expect(selectCartItems(filledState)).toBe(filledState.cart.items);
  });

  test('selectIsCheckedOut returns the checkout flag', () => {
    expect(selectIsCheckedOut(filledState)).toBe(false);
  });

  test('selectCartItemCount sums quantities, not distinct products', () => {
    expect(selectCartItemCount(filledState)).toBe(3);
  });

  test('selectCartItemCount is 0 for an empty cart', () => {
    expect(selectCartItemCount({ cart: initialState })).toBe(0);
  });

  test('selectCartTotal uses discountedPrice when present, price otherwise', () => {
    // shirt: no discount -> 20 * 2 = 40
    // shoes: discounted  -> 40 * 1 = 40
    expect(selectCartTotal(filledState)).toBe(80);
  });

  test('selectCartTotal is 0 for an empty cart', () => {
    expect(selectCartTotal({ cart: initialState })).toBe(0);
  });
});
