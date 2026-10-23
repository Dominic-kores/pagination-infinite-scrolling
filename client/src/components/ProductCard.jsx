
// Reusable component for displaying one product.
export default function ProductCard({ product }) {
  // Format prices using Kenyan currency.
  const formattedPrice = new Intl.NumberFormat(
    "en-KE",
    {
      style: "currency",
      currency: "KES",
      maximumFractionDigits: 0,
    }
  ).format(product.price);

  return (
    <article className="product-card">
      <span className="category-tag">
        {product.category}
      </span>

      <h3>{product.name}</h3>

      <p>{product.description}</p>

      <strong className="product-price">
        {formattedPrice}
      </strong>
    </article>
  );
}
