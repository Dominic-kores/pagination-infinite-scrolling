
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { fetchProducts } from "../api/products";
import ProductGrid from "../components/ProductGrid";

const LIMIT = 10;

export default function InfiniteScrollPage() {
  // Accumulated products across pages.
  const [products, setProducts] = useState([]);

  // Latest successfully loaded page.
  const [page, setPage] = useState(0);

  // Whether another page is available.
  const [hasNext, setHasNext] = useState(true);

  // Loading and error states.
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Sentinel element at the bottom of the product list.
  const sentinelRef = useRef(null);

  // Prevent overlapping API requests.
  const loadingRef = useRef(false);

  // Track the last loaded page without stale closures.
  const pageRef = useRef(0);
  const hasNextRef = useRef(true);

  // Cancel requests during unmount.
  const controllerRef = useRef(null);

  // Load the next page of products.
  const loadNextPage = useCallback(async () => {
    if (loadingRef.current || !hasNextRef.current) {
      return;
    }

    loadingRef.current = true;
    setLoading(true);
    setError("");

    const nextPage = pageRef.current + 1;
    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      const result = await fetchProducts(
        {
          page: nextPage,
          limit: LIMIT,
        },
        controller.signal
      );

      if (controller.signal.aborted) return;

      // Append incoming products, avoiding duplicate IDs.
      setProducts((currentProducts) => {
        const existingIds = new Set(
          currentProducts.map((product) => product.id)
        );

        const newProducts = result.data.filter(
          (product) => !existingIds.has(product.id)
        );

        return [...currentProducts, ...newProducts];
      });

      // Update the successful page number.
      pageRef.current = nextPage;
      setPage(nextPage);

      // Stop requesting pages when we reach the end.
      hasNextRef.current = result.metadata.hasNext;
      setHasNext(result.metadata.hasNext);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
      }
    } finally {
      if (!controller.signal.aborted) {
        loadingRef.current = false;
        setLoading(false);
      }
    }
  }, []);

  // Fetch the first page on mount.
  useEffect(() => {
    loadNextPage();

    return () => {
      controllerRef.current?.abort();
      loadingRef.current = false;
    };
  }, [loadNextPage]);

  // Observe the sentinel at the bottom of the list.
  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel || !hasNext) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        // Fetch only when visible and not already loading.
        if (
          entry.isIntersecting &&
          !loadingRef.current &&
          hasNextRef.current &&
          !error
        ) {
          loadNextPage();
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [loadNextPage, hasNext, error]);

  return (
    <section>
      <h1>Infinite Scroll Products</h1>

      <p className="subtitle">
        Scroll down to automatically load more products.
      </p>

      {/* Keep previously loaded products visible. */}
      <ProductGrid products={products} />

      {/* Invisible element observed by IntersectionObserver. */}
      {hasNext && (
        <div
          ref={sentinelRef}
          className="scroll-sentinel"
          aria-hidden="true"
        />
      )}

      {/* Show loading feedback. */}
      {loading && (
        <p className="status">
          Loading more products...
        </p>
      )}

      {/* Allow retry after a failed request. */}
      {error && (
        <div className="error">
          <p>{error}</p>

          <button onClick={loadNextPage}>
            Retry
          </button>
        </div>
      )}

      {/* End-of-results indicator. */}
      {!hasNext && !loading && (
        <p className="end-message">
          You have reached the end.
        </p>
      )}

      <p className="results-summary">
        Loaded page {page} · {products.length} products
      </p>
    </section>
  );
}
