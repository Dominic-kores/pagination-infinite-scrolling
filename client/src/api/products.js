
// Use the local Vite proxy by default.
// Set VITE_API_BASE_URL for a separately hosted backend.
const API_BASE = (
  import.meta.env.VITE_API_BASE_URL || ""
).replace(/\/$/, "");

// Fetch paginated, filtered and sorted products.
export async function fetchProducts(
  params = {},
  signal
) {
  const query = new URLSearchParams(params);

  const response = await fetch(
    `${API_BASE}/api/products?${query.toString()}`,
    { signal }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products.");
  }

  return response.json();
}

// Fetch unique product categories.
export async function fetchCategories() {
  const response = await fetch(
    `${API_BASE}/api/products/categories`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch categories.");
  }

  return response.json();
}
