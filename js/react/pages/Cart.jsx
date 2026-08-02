import { useDispatch, useSelector } from "react-redux";
import {
  removeProduct,
  updateQty,
  clearCart,
  selectCartItems,
  selectCartTotal,
} from "../../redux/cartSlice.js";

// Port of html/cart.html + js/entities/Cart.js's DOM-binding logic
export default function CartPage() {
  const cart = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty — add some items before ordering.");
      return;
    }

    const form  = e.target;
    const order = {
      name:         form.querySelector('input[type="text"]').value,
      phone:        form.querySelector('input[type="tel"]').value,
      instructions: form.querySelectorAll('input[type="text"]')[1]?.value || "",
      delivery:     form.querySelector("select").value,
      address:      form.querySelectorAll('input[type="text"]')[2]?.value || "",
      payment:      form.querySelector('input[name="payment"]:checked')?.value,
      register:     form.querySelector('input[name="register"]').checked,
      no_call:      form.querySelector('input[name="no_call"]').checked,
      items:        cart,
    };

    console.log("Order submitted:", order);
    alert("Order sent! Thank you.");
    dispatch(clearCart());
    form.reset();
  }

  return (
    <div className="container">
      <form
        onSubmit={handleSubmit}
        style={{ position: "static", transform: "none", margin: "40px auto", width: "max-content", maxWidth: "95vw" }}
      >
        <div className="grid">
          <div className="cart-panel">
            <div className="section-title">Your Items</div>
            <div id="cart-items">
              {cart.length === 0 ? (
                <p className="empty-cart">Your cart is empty.</p>
              ) : (
                cart.map(item => (
                  <div className="cart-row" key={item.id}>
                    <span className="cart-name">{item.name}</span>
                    <span className="cart-price">${((item.discountedPrice ?? item.price) * item.qty).toFixed(2)}</span>
                    <div className="cart-qty">
                      <button type="button" onClick={() => dispatch(updateQty({ productId: item.id, delta: -1 }))}>−</button>
                      <span>{item.qty}</span>
                      <button type="button" onClick={() => dispatch(updateQty({ productId: item.id, delta: 1 }))}>+</button>
                    </div>
                    <button type="button" className="cart-remove" onClick={() => dispatch(removeProduct(item.id))}>✕</button>
                  </div>
                ))
              )}
            </div>
            <div className="cart-total-row">
              <span>Total</span>
              <span>$<span id="cart-total">{total.toFixed(2)}</span></span>
            </div>
            <button type="button" className="clear-cart-btn" onClick={() => dispatch(clearCart())}>
              Clear cart
            </button>
          </div>

          <div>
            <div className="section-title">Info</div>
            <div className="field">
              <input type="text" placeholder="Name, Surname" minLength={3} maxLength={40} required />
            </div>
            <div className="field">
              <input type="tel" placeholder="+380XXXXXXXXX" pattern="^\+?[0-9]{10,15}$" required />
            </div>
            <div className="field">
              <input type="text" placeholder="Special Instructions" maxLength={120} />
            </div>
          </div>

          <div>
            <div className="section-title">Delivery</div>
            <div className="field">
              <div className="field-label">Way to deliver</div>
              <select required defaultValue="">
                <option value="">Choose delivery</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
            <div className="field">
              <div className="field-label">Address</div>
              <input type="text" placeholder="City, Street" minLength={5} maxLength={80} required />
            </div>
          </div>

          <div>
            <div className="section-title">Payment</div>
            <label className="radio-row">
              <input type="radio" name="payment" value="cod" required />
              On pick up
            </label>
            <label className="radio-row">
              <input type="radio" name="payment" value="card" />
              Card
            </label>
          </div>

          <div>
            <label className="checkbox-row">
              <input type="checkbox" name="register" />
              Register
            </label>
            <label className="checkbox-row">
              <input type="checkbox" name="no_call" defaultChecked />
              The decision is final, don't call me back.
            </label>
          </div>

          <button type="submit" className="submit-btn">Send</button>
        </div>
      </form>
    </div>
  );
}
