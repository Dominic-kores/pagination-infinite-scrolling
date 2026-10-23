
export default function Pagination({
  page,
  totalPages,
  onPageChange,
}) {
  // No navigation buttons when there are no results.
  if (totalPages === 0) return null;

  // Display a maximum of five page numbers.
  const visiblePages = Math.min(5, totalPages);

  // Keep the current page near the center.
  const startPage = Math.max(
    1,
    Math.min(
      page - Math.floor(visiblePages / 2),
      totalPages - visiblePages + 1
    )
  );

  // Generate the page number buttons.
  const pageNumbers = Array.from(
    { length: visiblePages },
    (_, index) => startPage + index
  );

  return (
    <nav
      className="pagination"
      aria-label="Product pagination"
    >
      {/* Previous button */}
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </button>

      {/* Numbered buttons */}
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={
            page === number ? "active" : ""
          }
          aria-current={
            page === number ? "page" : undefined
          }
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}

      {/* Next button */}
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </nav>
  );
}
