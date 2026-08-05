import { useEffect, useState } from "react";
import {
  getIdTokenResult,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase.js";
import { categories, fetchProducts, manufacturers } from "../data.js";
import Modal from "../components/Modal.jsx";
import {
  AdminPage,
  AuthCard,
  Eyebrow,
  Title,
  Subtitle,
  Form,
  Field,
  InputGrid,
  PrimaryButton,
  SecondaryButton,
  DangerButton,
  Notice,
  WorkspaceHeader,
  ProductCount,
  Panel,
  PanelHeader,
  TableWrap,
  ProductTable,
  ProductImage,
  EmptyState,
  LoadingState,
  Actions,
} from "./Admin.styles.js";

const emptyProduct = {
  name: "",
  imageUrl: "",
  price: "",
  discountedPrice: "",
  rating: "5",
  categoryId: "1",
  manufacturerId: "1",
};

function StatusNotice({ status }) {
  if (!status) return null;
  return <Notice $kind={status.kind}>{status.message}</Notice>;
}

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [form, setForm] = useState(emptyProduct);
  const [saving, setSaving] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  async function loadProducts() {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts([...data].sort((a, b) => Number(a.id) - Number(b.id)));
      setStatus(null);
    } catch (error) {
      setStatus({ kind: "error", message: `Could not load products: ${error.message}` });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (authenticated) loadProducts();
  }, [authenticated]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setAuthenticated(false);
        setAuthLoading(false);
        return;
      }

      try {
        const token = await getIdTokenResult(user);
        if (token.claims.admin === true) {
          setAuthenticated(true);
          setLoginError("");
        } else {
          await signOut(auth);
          setAuthenticated(false);
          setLoginError("This account is not authorized to manage products.");
        }
      } catch {
        setAuthenticated(false);
        setLoginError("Could not verify administrator access. Please try again.");
      } finally {
        setAuthLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  async function handleLogin(event) {
    event.preventDefault();
    setLoginError("");
    setAuthLoading(true);

    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        credentials.email.trim(),
        credentials.password
      );
      const token = await getIdTokenResult(credential.user, true);

      if (token.claims.admin !== true) {
        await signOut(auth);
        setLoginError("This account is not authorized to manage products.");
        return;
      }

      setAuthenticated(true);
      setCredentials((current) => ({ ...current, password: "" }));
    } catch {
      setLoginError("Invalid email or password.");
      setCredentials((current) => ({ ...current, password: "" }));
    } finally {
      setAuthLoading(false);
    }
  }

  async function handleLogout() {
    await signOut(auth);
    setAuthenticated(false);
    setCredentials({ email: "", password: "" });
    setProducts([]);
    setStatus(null);
    setForm(emptyProduct);
  }

  function updateForm(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleAddProduct(event) {
    event.preventDefault();
    const price = Number(form.price);
    const discountedPrice = Number(form.discountedPrice);
    const rating = Number(form.rating);

    if (!form.name.trim() || !form.imageUrl.trim()) {
      setStatus({ kind: "error", message: "Name and image URL are required." });
      return;
    }
    if (!Number.isFinite(price) || !Number.isFinite(discountedPrice) || !Number.isFinite(rating)) {
      setStatus({ kind: "error", message: "Enter valid prices and a rating." });
      return;
    }
    if (discountedPrice > price) {
      setStatus({ kind: "error", message: "The sale price cannot exceed the regular price." });
      return;
    }

    const nextId = products.reduce((highest, item) => Math.max(highest, Number(item.id) || 0), 0) + 1;
    const product = {
      id: nextId,
      name: form.name.trim(),
      imageUrl: form.imageUrl.trim(),
      price,
      discountedPrice,
      rating,
      categoryId: Number(form.categoryId),
      manufacturerId: Number(form.manufacturerId),
    };

    setSaving(true);
    try {
      await setDoc(doc(db, "products", String(product.id)), product);
      setProducts((current) => [...current, product].sort((a, b) => a.id - b.id));
      setForm(emptyProduct);
      setStatus({ kind: "success", message: `“${product.name}” was added.` });
    } catch (error) {
      setStatus({ kind: "error", message: `Could not add the product: ${error.message}` });
    } finally {
      setSaving(false);
    }
  }

  async function confirmDelete() {
    if (!productToDelete) return;
    setDeleting(true);
    try {
      await deleteDoc(doc(db, "products", String(productToDelete.id)));
      setProducts((current) => current.filter((item) => item.id !== productToDelete.id));
      setStatus({ kind: "success", message: `“${productToDelete.name}” was removed.` });
      setProductToDelete(null);
    } catch (error) {
      setStatus({ kind: "error", message: `Could not remove the product: ${error.message}` });
    } finally {
      setDeleting(false);
    }
  }

  if (authLoading) {
    return <AdminPage><LoadingState>Checking administrator access…</LoadingState></AdminPage>;
  }

  if (!authenticated) {
    return (
      <AdminPage>
        <AuthCard>
          <Eyebrow>Administration</Eyebrow>
          <Title>Product control</Title>
          <Subtitle>Sign in to manage the product catalogue.</Subtitle>
          <Form onSubmit={handleLogin}>
            <Field>
              <label htmlFor="admin-email">Email</label>
              <input id="admin-email" name="email" type="email" autoComplete="username" value={credentials.email} onChange={(event) => setCredentials((current) => ({ ...current, email: event.target.value }))} required />
            </Field>
            <Field>
              <label htmlFor="admin-password">Password</label>
              <input id="admin-password" name="password" type="password" autoComplete="current-password" value={credentials.password} onChange={(event) => setCredentials((current) => ({ ...current, password: event.target.value }))} required />
            </Field>
            {loginError && <StatusNotice status={{ kind: "error", message: loginError }} />}
            <PrimaryButton type="submit">Sign in</PrimaryButton>
          </Form>
        </AuthCard>
      </AdminPage>
    );
  }

  return (
    <AdminPage>
      <WorkspaceHeader>
        <div>
          <Eyebrow>Administration</Eyebrow>
          <Title>Product control</Title>
          <Subtitle>Add, review, and remove catalogue items.</Subtitle>
        </div>
        <SecondaryButton type="button" onClick={handleLogout}>Sign out</SecondaryButton>
      </WorkspaceHeader>

      <Panel>
        <PanelHeader><h2>Add a product</h2></PanelHeader>
        <Form onSubmit={handleAddProduct}>
          <InputGrid>
            <Field><label htmlFor="product-name">Name</label><input id="product-name" name="name" value={form.name} onChange={updateForm} required /></Field>
            <Field><label htmlFor="product-image">Image URL</label><input id="product-image" name="imageUrl" type="url" value={form.imageUrl} onChange={updateForm} required /></Field>
            <Field><label htmlFor="product-price">Regular price</label><input id="product-price" name="price" type="number" min="0" step="0.01" value={form.price} onChange={updateForm} required /></Field>
            <Field><label htmlFor="product-sale-price">Sale price</label><input id="product-sale-price" name="discountedPrice" type="number" min="0" step="0.01" value={form.discountedPrice} onChange={updateForm} required /></Field>
            <Field><label htmlFor="product-rating">Rating</label><input id="product-rating" name="rating" type="number" min="1" max="5" step="1" value={form.rating} onChange={updateForm} required /></Field>
            <Field><label htmlFor="product-category">Category</label><select id="product-category" name="categoryId" value={form.categoryId} onChange={updateForm}>{Object.values(categories).map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></Field>
            <Field><label htmlFor="product-manufacturer">Manufacturer</label><select id="product-manufacturer" name="manufacturerId" value={form.manufacturerId} onChange={updateForm}>{Object.values(manufacturers).map((manufacturer) => <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>)}</select></Field>
          </InputGrid>
          <Actions><PrimaryButton type="submit" disabled={saving}>{saving ? "Adding…" : "Add product"}</PrimaryButton></Actions>
        </Form>
      </Panel>

      <Panel>
        <PanelHeader>
          <h2>Catalogue <ProductCount>{products.length}</ProductCount></h2>
          <SecondaryButton type="button" onClick={loadProducts} disabled={loading}>{loading ? "Refreshing…" : "Refresh"}</SecondaryButton>
        </PanelHeader>
        <StatusNotice status={status} />
        {loading ? <LoadingState>Loading products…</LoadingState> : products.length === 0 ? <EmptyState>No products found.</EmptyState> : (
          <TableWrap><ProductTable><thead><tr><th>Product</th><th>Price</th><th>Rating</th><th>Category</th><th>Manufacturer</th><th aria-label="Actions" /></tr></thead><tbody>{products.map((product) => (
            <tr key={product.id}><td><ProductImage src={product.imageUrl} alt="" onError={(event) => { event.currentTarget.style.visibility = "hidden"; }} /><div><strong>{product.name}</strong><small>ID {product.id}</small></div></td><td>${Number(product.discountedPrice ?? product.price).toFixed(2)}<small>{Number(product.discountedPrice) < Number(product.price) ? `$${Number(product.price).toFixed(2)}` : ""}</small></td><td>{"★".repeat(product.rating)}{"☆".repeat(5 - product.rating)}</td><td>{categories[product.categoryId]?.name ?? "Unassigned"}</td><td>{manufacturers[product.manufacturerId]?.name ?? "Unassigned"}</td><td><DangerButton type="button" onClick={() => setProductToDelete(product)}>Remove</DangerButton></td></tr>
          ))}</tbody></ProductTable></TableWrap>
        )}
      </Panel>

      <Modal isOpen={Boolean(productToDelete)} onClose={() => !deleting && setProductToDelete(null)} title="Remove product" closeOnOverlayClick={false} footer={<Actions><SecondaryButton type="button" onClick={() => setProductToDelete(null)} disabled={deleting}>Cancel</SecondaryButton><DangerButton type="button" onClick={confirmDelete} disabled={deleting}>{deleting ? "Removing…" : "Remove"}</DangerButton></Actions>}>
        <p>Remove <strong>{productToDelete?.name}</strong> from the catalogue? This cannot be undone.</p>
      </Modal>
    </AdminPage>
  );
}
