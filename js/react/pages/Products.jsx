import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { fetchProducts, createProductInstance, categories, manufacturers } from "../data.js";

// Port of the "PRODUCTS PAGE" block from the old js/app.js
export default function Products() {
  const [allProducts, setAllProducts]           = useState([]);
  const [activeCategory, setActiveCategory]     = useState("all");
  const [activeManufacturer, setActiveManufacturer] = useState("all");
  const [activeRating, setActiveRating]         = useState("all");
  const [searchQuery, setSearchQuery]           = useState("");

  useEffect(() => {
    fetchProducts().then(setAllProducts);
  }, []);

  // Unique category / manufacturer IDs present in the data, for the sidebar lists
  const categoryIds = useMemo(
    () => [...new Set(allProducts.map(p => p.categoryId))].filter(id => categories[id]),
    [allProducts]
  );
  const manufacturerIds = useMemo(
    () => [...new Set(allProducts.map(p => p.manufacturerId))].filter(id => manufacturers[id]),
    [allProducts]
  );

  const filtered = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return allProducts.filter(item => {
      const matchSearch = !query || item.name.toLowerCase().includes(query);
      const matchCat    = activeCategory     === "all" || String(item.categoryId)     === String(activeCategory);
      const matchMfr    = activeManufacturer === "all" || String(item.manufacturerId) === String(activeManufacturer);
      const matchRating = activeRating       === "all" || item.rating >= Number(activeRating);
      return matchSearch && matchCat && matchMfr && matchRating;
    });
  }, [allProducts, searchQuery, activeCategory, activeManufacturer, activeRating]);

  return (
    <>
      <div className="search-bar-wrapper">
        <div className="search-bar-inner">
          <input
            type="text"
            id="searchInput"
            placeholder="Search products..."
            autoComplete="off"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <button
            id="clearSearch"
            title="Clear"
            style={{ display: searchQuery ? "flex" : "none" }}
            onClick={() => setSearchQuery("")}
          >
            &#10005;
          </button>
        </div>
      </div>

      <div className="products-page-layout">
        <aside className="filter-sidebar">
          <div className="sidebar-section">
            <h3>Category</h3>
            <ul id="categoryList">
              <li
                className={`filter-item${activeCategory === "all" ? " active" : ""}`}
                onClick={() => setActiveCategory("all")}
              >
                All
              </li>
              {categoryIds.map(id => (
                <li
                  key={id}
                  className={`filter-item${String(activeCategory) === String(id) ? " active" : ""}`}
                  onClick={() => setActiveCategory(id)}
                >
                  {categories[id].name}
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-section">
            <h3>Manufacturer</h3>
            <ul id="manufacturerList">
              <li
                className={`filter-item${activeManufacturer === "all" ? " active" : ""}`}
                onClick={() => setActiveManufacturer("all")}
              >
                All
              </li>
              {manufacturerIds.map(id => (
                <li
                  key={id}
                  className={`filter-item${String(activeManufacturer) === String(id) ? " active" : ""}`}
                  onClick={() => setActiveManufacturer(id)}
                >
                  {manufacturers[id].name}
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-section">
            <h3>Rating</h3>
            <ul id="ratingList">
              <li
                className={`filter-item${activeRating === "all" ? " active" : ""}`}
                onClick={() => setActiveRating("all")}
              >
                All
              </li>
              <li
                className={`filter-item${activeRating === "5" ? " active" : ""}`}
                onClick={() => setActiveRating("5")}
              >
                &#9733;&#9733;&#9733;&#9733;&#9733;
              </li>
              <li
                className={`filter-item${activeRating === "4" ? " active" : ""}`}
                onClick={() => setActiveRating("4")}
              >
                &#9733;&#9733;&#9733;&#9733;+
              </li>
              <li
                className={`filter-item${activeRating === "3" ? " active" : ""}`}
                onClick={() => setActiveRating("3")}
              >
                &#9733;&#9733;&#9733;+
              </li>
            </ul>
          </div>
        </aside>

        <div className="products-main">
          <div className="results-info">
            <span id="resultsCount">
              {filtered.length > 0
                ? `${filtered.length} product${filtered.length !== 1 ? "s" : ""} found`
                : ""}
            </span>
          </div>

          <div id="products">
            <div id="productsContainer">
              {filtered.map(item => (
                <ProductCard key={item.id} product={createProductInstance(item)} />
              ))}
            </div>
          </div>

          {filtered.length === 0 && (
            <div id="noResults" className="no-results">
              No products found matching your search.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
