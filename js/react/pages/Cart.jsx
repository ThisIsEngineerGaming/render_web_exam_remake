import {
  removeProduct,
  updateQty,
  clearCart,
  selectCartItems,
  selectCartTotal,
} from "../../redux/cartSlice.js";
import { useDispatch, useSelector } from "react-redux";
import {
  PageContainer,
  CheckoutForm,
  Grid,
  SectionTitle,
  Field,
  FieldLabel,
  RadioRow,
  CheckboxRow,
  SubmitBtn,
  CartPanel,
  CartRow,
  CartName,
  CartPrice,
  CartQty,
  CartRemoveBtn,
  CartTotalRow,
  EmptyCart,
  ClearCartBtn,
} from "./Cart.styles.js";

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

    const form = e.target;
    const order = {
      name: form.querySelector('input[type="text"]').value,
      phone: form.querySelector('input[type="tel"]').value,
      instructions: form.querySelectorAll('input[type="text"]')[1]?.value || "",
      delivery: form.querySelector("select").value,
      address: form.querySelectorAll('input[type="text"]')[2]?.value || "",
      payment: form.querySelector('input[name="payment"]:checked')?.value,
      register: form.querySelector('input[name="register"]').checked,
      no_call: form.querySelector('input[name="no_call"]').checked,
      items: cart,
    };

    console.log("Order submitted:", order);
    alert("Order sent! Thank you.");
    dispatch(clearCart());
    form.reset();
  }

  return (
    <PageContainer>
      <CheckoutForm onSubmit={handleSubmit}>
        <Grid>
          <CartPanel>
            <SectionTitle>Your Items</SectionTitle>
            <div>
              {cart.length === 0 ? (
                <EmptyCart>Your cart is empty.</EmptyCart>
              ) : (
                cart.map((item) => (
                  <CartRow key={item.id}>
                    <CartName>{item.name}</CartName>
                    <CartPrice>${((item.discountedPrice ?? item.price) * item.qty).toFixed(2)}</CartPrice>
                    <CartQty>
                      <button
                        type="button"
                        onClick={() => dispatch(updateQty({ productId: item.id, delta: -1 }))}
                      >
                        &minus;
                      </button>
                      <span>{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => dispatch(updateQty({ productId: item.id, delta: 1 }))}
                      >
                        +
                      </button>
                    </CartQty>
                    <CartRemoveBtn type="button" onClick={() => dispatch(removeProduct(item.id))}>
                      &#10005;
                    </CartRemoveBtn>
                  </CartRow>
                ))
              )}
            </div>
            <CartTotalRow>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </CartTotalRow>
            <ClearCartBtn type="button" onClick={() => dispatch(clearCart())}>
              Clear cart
            </ClearCartBtn>
          </CartPanel>

          <div>
            <SectionTitle>Info</SectionTitle>
            <Field>
              <input type="text" placeholder="Name, Surname" minLength={3} maxLength={40} required />
            </Field>
            <Field>
              <input type="tel" placeholder="+380XXXXXXXXX" pattern="^\+?[0-9]{10,15}$" required />
            </Field>
            <Field>
              <input type="text" placeholder="Special Instructions" maxLength={120} />
            </Field>
          </div>

          <div>
            <SectionTitle>Delivery</SectionTitle>
            <Field>
              <FieldLabel>Way to deliver</FieldLabel>
              <select required defaultValue="">
                <option value="">Choose delivery</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </Field>
            <Field>
              <FieldLabel>Address</FieldLabel>
              <input type="text" placeholder="City, Street" minLength={5} maxLength={80} required />
            </Field>
          </div>

          <div>
            <SectionTitle>Payment</SectionTitle>
            <RadioRow>
              <input type="radio" name="payment" value="cod" required />
              On pick up
            </RadioRow>
            <RadioRow>
              <input type="radio" name="payment" value="card" />
              Card
            </RadioRow>
          </div>

          <div>
            <CheckboxRow>
              <input type="checkbox" name="register" />
              Register
            </CheckboxRow>
            <CheckboxRow>
              <input type="checkbox" name="no_call" defaultChecked />
              The decision is final, don't call me back.
            </CheckboxRow>
          </div>

          <SubmitBtn type="submit">Send</SubmitBtn>
        </Grid>
      </CheckoutForm>
    </PageContainer>
  );
}
