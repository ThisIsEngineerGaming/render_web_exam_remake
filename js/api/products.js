const API_URL = "http://localhost:3001/api/products";

export async function getProducts() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("something went wrong");
  }

  return response.json();
}

export async function saveProducts(products) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(products),
  });

  if (!response.ok) {
    throw new Error("something went wrong");
  }

  return response.json();
}
