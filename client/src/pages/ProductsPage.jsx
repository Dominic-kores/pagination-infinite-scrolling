
import { useEffect, useState } from "react";

import {
  fetchProducts,
  fetchCategories,
} from "../api/products";

import ProductGrid from "../components/ProductGrid";
import Pagination from "../components/Pagination";
import ProductFilters from "../components/ProductFilters";

const LIMIT = 10;

export default function ProductsPage() {
  // Pagination state.
  const [page, setPage] = useState(1);

  // Product data and metadata.
  const [products, setProducts] = useState([]);
  const [metadata, setMetadata] = useState(null);

  // Filters.
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("createdAt:desc");

  // Distinct product categories.
  const [categories, setCategories] = useState([]);

  // Request states.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch categories once on mount.
  useEffect(() => {
    fetchCategories()
      .then((result) => setCategories(result.data))
      .catch(console.error);
  }, []);

  // Split selected sorting option.
  const [sortField, sortOrder] = sort.split(":");

  // Request products whenever page or filters change.
  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      setLoading(true);
      setError("");

      try {
        const result = await fetchProducts(
          {
            page,
            limit: LIMIT,
            category,
            search,
            sort: sortField,
            order: sortOrder,
          },
          controller.signal
        );

        // Replace products for normal pagination.
        setProducts(result.data);
        setMetadata(result.metadata);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    // Cancel outdated requests on page/filter change.
    return () => controller.abort();
  }, [page, category, search, sortField, sortOrder]);

  // Reset to page 1 when filters change.
  function updateSearch(value) {
    setSearch(value);
    setPage(1);
  }

  function updateCategory(value) {
    setCategory(value);
    setPage(1);
  }

  function updateSort(value) {
    setSort(value);
    setPage(1);
  }

  return (
    <section>
      <h1>Kenyan Product Catalogue</h1>

      <p className="subtitle">
        Browse products using server-side pagination.
      </p>

      <ProductFilters
        search={search}
        setSearch={updateSearch}
        category={category}
        setCategory={updateCategory}
        sort={sort}
        setSort={updateSort}
        categories={categories}
      />

      {/* Loading indicator */}
      {loading && (
        <p className="status">Loading products...</p>
      )}

      {/* API error */}
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}

      {/* Render the fetched page */}
      {!loading && !error && (
        <>
          <ProductGrid products={products} />

          {metadata && (
            <>
              <p className="results-summary">
                Page {metadata.page} of{" "}
                {metadata.totalPages}
                {" | "}
                Showing {products.length} of{" "}
                {metadata.total} total products
              </p>

              <Pagination
                page={page}
                totalPages={metadata.totalPages}
                onPageChange={setPage}
              />
            </>
          )}
        </>
      )}
    </section>
  );
}
