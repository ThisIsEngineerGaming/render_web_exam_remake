# Firestore rules review

## Application access pattern

- `products/{productId}` is the only Firestore collection accessed by the React storefront and routed admin page.
- Storefront reads use `getDocs(collection(db, "products"))` and `getDoc(doc(db, "products", id))` without authentication.
- The admin page creates or updates full product documents with `setDoc` and deletes product documents with `deleteDoc`.
- Product fields are: `id`, `imageUrl`, `name`, `rating`, `price`, `discountedPrice`, `categoryId`, and `manufacturerId`.
- Firebase Authentication email/password is used to identify administrators. The `admin` custom claim is assigned only by the Admin SDK script, never by browser code.

## Rules test cases

| Attempt | Expected result |
| --- | --- |
| Unauthenticated product read | Allowed; the public storefront needs the catalogue. |
| Unauthenticated create, update, or delete | Denied. |
| Authenticated user without `admin` claim writing a product | Denied. |
| Administrator writing extra fields, invalid types, oversized text, invalid rating, or negative/excessive prices | Denied by `isValidProduct`. |
| Administrator writing a valid product | Allowed. |
| Any access to collections other than `products` | Denied. |

## Security notes

- The public `products` collection must contain no customer or administrator data.
- A service-account key must remain outside the repository. `.gitignore` excludes common credential locations.
- Changes should be tested with the Firestore Emulator or Rules Playground before deployment.
