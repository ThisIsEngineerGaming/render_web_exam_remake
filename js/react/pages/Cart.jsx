import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  removeProduct,
  updateQty,
  clearCart,
  selectCartItems,
  selectCartTotal,
} from "../../redux/cartSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "styled-components";
import Modal from "../components/Modal.jsx";
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

export default function CartPage() {
  const { t } = useTranslation();
  const cart = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const theme = useTheme();

  const cancelButtonStyle = {
    padding: "0.5rem 1rem",
    border: `1px solid ${theme.border}`,
    borderRadius: theme.radiusSm,
    cursor: "pointer",
    backgroundColor: theme.mode === "dark" ? "#2a2a33" : theme.surface2,
    color: theme.mode === "dark" ? "#ffffff" : theme.text,
    fontFamily: theme.fontBody,
  };

  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [clearCartModalOpen, setClearCartModalOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  function handleRemoveClick(item) {
    setItemToRemove(item);
    setRemoveModalOpen(true);
  }

  function confirmRemoveItem() {
    if (itemToRemove) {
      dispatch(removeProduct(itemToRemove.id));
      setRemoveModalOpen(false);
      setItemToRemove(null);
    }
  }

  function confirmClearCart() {
    if (cart.length === 0) {
      setClearCartModalOpen(false);
      return;
    }

    dispatch(clearCart());
    setClearCartModalOpen(false);
  }

  function openClearCartModal() {
    if (cart.length > 0) setClearCartModalOpen(true);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (cart.length === 0) {
      alert(t("cart.emptyAlert"));
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
    alert(t("cart.orderSent"));
    dispatch(clearCart());
    form.reset();
  }

  return (
    <PageContainer>
      <CheckoutForm onSubmit={handleSubmit}>
        <Grid>
          <CartPanel>
            <SectionTitle>{t("cart.yourItems")}</SectionTitle>
            <div>
              {cart.length === 0 ? (
                <EmptyCart>{t("cart.empty")}</EmptyCart>
              ) : (
                cart.map((item) => (
                  <CartRow key={item.id}>
                    <CartName>{item.name}</CartName>
                    <CartPrice>${((item.discountedPrice ?? item.price) * item.qty).toFixed(2)}</CartPrice>
                    <CartQty>
                      <button type="button" onClick={() => dispatch(updateQty({ productId: item.id, delta: -1 }))}>
                        &minus;
                      </button>
                      <span>{item.qty}</span>
                      <button type="button" onClick={() => dispatch(updateQty({ productId: item.id, delta: 1 }))}>
                        +
                      </button>
                    </CartQty>
                    <CartRemoveBtn type="button" onClick={() => handleRemoveClick(item)}>
                      &#10005;
                    </CartRemoveBtn>
                  </CartRow>
                ))
              )}
            </div>
            <CartTotalRow>
              <span>{t("cart.total")}</span>
              <span>${total.toFixed(2)}</span>
            </CartTotalRow>
            <ClearCartBtn type="button" onClick={openClearCartModal} disabled={cart.length === 0}>
              {t("cart.clearCart")}
            </ClearCartBtn>
          </CartPanel>

          <div>
            <SectionTitle>{t("cart.info")}</SectionTitle>
            <Field>
              <input type="text" placeholder={t("cart.nameSurname")} minLength={3} maxLength={40} required />
            </Field>
            <Field>
              <input type="tel" placeholder="+380XXXXXXXXX" pattern="^\+?[0-9]{10,15}$" required />
            </Field>
            <Field>
              <input type="text" placeholder={t("cart.specialInstructions")} maxLength={120} />
            </Field>
          </div>

          <div>
            <SectionTitle>{t("cart.delivery")}</SectionTitle>
            <Field>
              <FieldLabel>{t("cart.wayToDeliver")}</FieldLabel>
              <select required defaultValue="">
                <option value="">{t("cart.chooseDelivery")}</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </Field>
            <Field>
              <FieldLabel>{t("cart.address")}</FieldLabel>
              <input type="text" placeholder={t("cart.cityStreet")} minLength={5} maxLength={80} required />
            </Field>
          </div>

          <div>
            <SectionTitle>{t("cart.payment")}</SectionTitle>
            <RadioRow>
              <input type="radio" name="payment" value="cod" required />
              {t("cart.onPickup")}
            </RadioRow>
            <RadioRow>
              <input type="radio" name="payment" value="card" />
              {t("cart.card")}
            </RadioRow>
          </div>

          <div>
            <CheckboxRow>
              <input type="checkbox" name="register" />
              {t("cart.register")}
            </CheckboxRow>
            <CheckboxRow>
              <input type="checkbox" name="no_call" defaultChecked />
              {t("cart.noCall")}
            </CheckboxRow>
          </div>

          <SubmitBtn type="submit">{t("cart.send")}</SubmitBtn>
        </Grid>
      </CheckoutForm>

      <Modal
        isOpen={removeModalOpen}
        onClose={() => setRemoveModalOpen(false)}
        title={t("cart.removeItem")}
        closeOnOverlayClick={false}
        footer={
          <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
            <button type="button" onClick={() => setRemoveModalOpen(false)} style={cancelButtonStyle}>
              {t("common.cancel")}
            </button>
            <button
              type="button"
              onClick={confirmRemoveItem}
              style={{
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                backgroundColor: "#ff4444",
                color: "white",
              }}
            >
              {t("common.remove")}
            </button>
          </div>
        }
      >
        <p>
          {t("cart.removeConfirm", { name: itemToRemove?.name })}
        </p>
      </Modal>

      <Modal
        isOpen={clearCartModalOpen}
        onClose={() => setClearCartModalOpen(false)}
        title={t("cart.clearCartTitle")}
        closeOnOverlayClick={false}
        footer={
          <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
            <button type="button" onClick={() => setClearCartModalOpen(false)} style={cancelButtonStyle}>
              {t("common.cancel")}
            </button>
            <button
              type="button"
              onClick={confirmClearCart}
              style={{
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                backgroundColor: "#ff4444",
                color: "white",
              }}
            >
              {t("common.clearAll")}
            </button>
          </div>
        }
      >
        <p>{t("cart.clearConfirm")}</p>
      </Modal>
    </PageContainer>
  );
}
