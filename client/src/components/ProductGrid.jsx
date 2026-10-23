
import ProductCard from "./ProductCard";

// Display all products in a responsive grid.
export default function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <p className="empty-state">
        No products match your search.
      </p>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}
