import { store } from '../redux/store.js';
import {
  addProduct,
  removeProduct as removeProductAction,
  updateQty as updateQtyAction,
  clearCart as clearCartAction,
  selectCartItems,
  selectCartTotal,
} from '../redux/cartSlice.js';

// cart operations

// adds an item to the cart; increments qty if the same ID already exists, otherwise pushes a new entry
function addToCart(item) {
  store.dispatch(addProduct(item, item.qty ?? 1));
}

// removes an item from the cart entirely by its ID
function removeFromCart(id) {
  store.dispatch(removeProductAction(id));
}

// changes a cart item's quantity by delta (+1 or -1); removes the item if quantity drops to 0 or below
function updateQty(id, delta) {
  store.dispatch(updateQtyAction({ productId: id, delta }));
}

// empties the entire cart by deleting its cookie
function clearCart() {
  store.dispatch(clearCartAction());
}

// rendering

// renders the current cart into #cart-items and updates the #cart-total span
// shows an empty-cart message if there are no items
function renderCart() {
  const list  = document.getElementById('cart-items');
  const total = document.getElementById('cart-total');
  if (!list) return;

  const state = store.getState();
  const cart  = selectCartItems(state);
  list.innerHTML = '';

  if (cart.length === 0) {
    list.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    if (total) total.textContent = '0.00';
    return;
  }

  cart.forEach(item => {
    const unitPrice = item.discountedPrice ?? item.price;
    const row = document.createElement('div');
    row.className = 'cart-row';
    row.innerHTML = `
      <span class="cart-name">${item.name}</span>
      <span class="cart-price">$${(unitPrice * item.qty).toFixed(2)}</span>
      <div class="cart-qty">
        <button onclick="window.updateQty(${item.id}, -1)">−</button>
        <span>${item.qty}</span>
        <button onclick="window.updateQty(${item.id}, +1)">+</button>
      </div>
      <button class="cart-remove" onclick="window.removeFromCart(${item.id})">✕</button>
    `;
    list.appendChild(row);
  });

  if (total) total.textContent = selectCartTotal(state).toFixed(2);
}

store.subscribe(renderCart);

// order submission
// handles the order form submit: validates the cart is non-empty, collects all form field values into an order object, logs it, clears the cart, and resets the form
function handleOrder(e) {
  e.preventDefault();

  const cart = selectCartItems(store.getState());
  if (cart.length === 0) {
    alert('Your cart is empty — add some items before ordering.');
    return;
  }

  const form  = e.target;
  const order = {
    name:         form.querySelector('input[type="text"]').value,
    phone:        form.querySelector('input[type="tel"]').value,
    instructions: form.querySelectorAll('input[type="text"]')[1]?.value || '',
    delivery:     form.querySelector('select').value,
    address:      form.querySelectorAll('input[type="text"]')[2]?.value || '',
    payment:      form.querySelector('input[name="payment"]:checked')?.value,
    register:     form.querySelector('input[name="register"]').checked,
    no_call:      form.querySelector('input[name="no_call"]').checked,
    items:        cart,
  };

  console.log('Order submitted:', order);
  alert('Order sent! Thank you.');
  clearCart();
  form.reset();
}

// bootstrap — runs on DOMContentLoaded to do the initial cart render and attach the order form handler
document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  const form = document.querySelector('form');
  if (form) form.addEventListener('submit', handleOrder);
});

// expose cart functions on window so buttons in the rendered HTML can reach them
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQty = updateQty;
window.clearCart = clearCart;

export default { addToCart, removeFromCart, updateQty, clearCart, renderCart };
