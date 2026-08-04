// Shared static lookups + Firestore access used by the Home, Products, and Cart routes.
import Product from "../entities/Product.js";
import Category from "../entities/Category.js";
import Manufacturer from "../entities/Manufacturer.js";
import Customer from "../entities/Customer.js";
import { db } from "../firebase.js";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

// Static data — category and manufacturer lookup maps keyed by ID
export const categories = {
  1: new Category(1, "Food",      "Food products",  100, true),
  2: new Category(2, "Dairy",     "Dairy products",  40, true),
  3: new Category(3, "Beverages", "Drinks & juices", 30, false),
  4: new Category(4, "Snacks",    "Snacks & sweets", 50, false),
};

export const manufacturers = {
  1: new Manufacturer(1, "Oil Company",     "USA",     2000, "https://oil.com"),
  2: new Manufacturer(2, "Dairy Fresh Co.", "Germany", 1995, "https://dairyfresh.com"),
  3: new Manufacturer(3, "Nature's Best",   "France",  2005, "https://naturesbest.com"),
  4: new Manufacturer(4, "Pantry Staples",  "Italy",   1988, "https://pantrystaples.com"),
  5: new Manufacturer(5, "Gourmet Picks",   "Belgium", 2010, "https://gourmetpicks.com"),
};

export const customer = new Customer(1, "Jonkler", "Carlick", "john@gmail.com", "+123456789");

// Converts a raw product data object into a full Product,
// resolving its category and manufacturer from the lookup maps
export function createProductInstance(item) {
  const category     = categories[item.categoryId]        ?? categories[1];
  const manufacturer = manufacturers[item.manufacturerId] ?? manufacturers[1];
  return new Product(
    item.id, item.imageUrl, item.name, item.rating,
    item.price, item.discountedPrice, category, manufacturer
  );
}

// Fetches all products from the Firestore "products" collection and returns them as plain objects
export function fetchProducts() {
  return getDocs(collection(db, "products")).then(snapshot => snapshot.docs.map(d => d.data()));
}

// Fetches a single product by ID directly (Firestore doc ID == product's numeric id, stringified
// — see js/admin.js's setDoc/deleteDoc calls). Returns null if no such product exists.
export function fetchProductById(id) {
  return getDoc(doc(db, "products", String(id))).then(snap => (snap.exists() ? snap.data() : null));
}
