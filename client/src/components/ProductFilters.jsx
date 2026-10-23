
export default function ProductFilters({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
  categories,
}) {
  return (
    <div className="filters">
      {/* Server-side product name search */}
      <input
        type="search"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Category filter */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All Categories</option>

        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      {/* Sorting dropdown */}
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="createdAt:desc">
          Newest first
        </option>

        <option value="createdAt:asc">
          Oldest first
        </option>

        <option value="price:asc">
          Price: Low to High
        </option>

        <option value="price:desc">
          Price: High to Low
        </option>

        <option value="name:asc">
          Name: A-Z
        </option>
      </select>
    </div>
  );
}
