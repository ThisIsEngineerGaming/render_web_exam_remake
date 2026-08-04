import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { fetchProducts, createProductInstance, categories, manufacturers } from "../data.js";
import {
  SearchBarWrapper,
  SearchBarInner,
  SearchInput,
  ClearSearchBtn,
  PageLayout,
  FilterSidebar,
  SidebarSection,
  FilterList,
  FilterItem,
  ProductsMain,
  ResultsInfo,
  ProductsContainer,
  NoResults,
} from "./Products.styles.js";

// Port of the "PRODUCTS PAGE" block from the old js/app.js
export default function Products() {
  const [allProducts, setAllProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeManufacturer, setActiveManufacturer] = useState("all");
  const [activeRating, setActiveRating] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProducts().then(setAllProducts);
  }, []);

  // Unique category / manufacturer IDs present in the data, for the sidebar lists
  const categoryIds = useMemo(
    () => [...new Set(allProducts.map((p) => p.categoryId))].filter((id) => categories[id]),
    [allProducts]
  );
  const manufacturerIds = useMemo(
    () => [...new Set(allProducts.map((p) => p.manufacturerId))].filter((id) => manufacturers[id]),
    [allProducts]
  );

  const filtered = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return allProducts.filter((item) => {
      const matchSearch = !query || item.name.toLowerCase().includes(query);
      const matchCat = activeCategory === "all" || String(item.categoryId) === String(activeCategory);
      const matchMfr =
        activeManufacturer === "all" || String(item.manufacturerId) === String(activeManufacturer);
      const matchRating = activeRating === "all" || item.rating >= Number(activeRating);
      return matchSearch && matchCat && matchMfr && matchRating;
    });
  }, [allProducts, searchQuery, activeCategory, activeManufacturer, activeRating]);

  return (
    <>
      <SearchBarWrapper>
        <SearchBarInner>
          <SearchInput
            type="text"
            placeholder="Search products..."
            autoComplete="off"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <ClearSearchBtn $visible={Boolean(searchQuery)} title="Clear" onClick={() => setSearchQuery("")}>
            &#10005;
          </ClearSearchBtn>
        </SearchBarInner>
      </SearchBarWrapper>

      <PageLayout>
        <FilterSidebar>
          <SidebarSection>
            <h3>Category</h3>
            <FilterList>
              <FilterItem $active={activeCategory === "all"} onClick={() => setActiveCategory("all")}>
                All
              </FilterItem>
              {categoryIds.map((id) => (
                <FilterItem
                  key={id}
                  $active={String(activeCategory) === String(id)}
                  onClick={() => setActiveCategory(id)}
                >
                  {categories[id].name}
                </FilterItem>
              ))}
            </FilterList>
          </SidebarSection>

          <SidebarSection>
            <h3>Manufacturer</h3>
            <FilterList>
              <FilterItem
                $active={activeManufacturer === "all"}
                onClick={() => setActiveManufacturer("all")}
              >
                All
              </FilterItem>
              {manufacturerIds.map((id) => (
                <FilterItem
                  key={id}
                  $active={String(activeManufacturer) === String(id)}
                  onClick={() => setActiveManufacturer(id)}
                >
                  {manufacturers[id].name}
                </FilterItem>
              ))}
            </FilterList>
          </SidebarSection>

          <SidebarSection>
            <h3>Rating</h3>
            <FilterList>
              <FilterItem $active={activeRating === "all"} onClick={() => setActiveRating("all")}>
                All
              </FilterItem>
              <FilterItem $active={activeRating === "5"} onClick={() => setActiveRating("5")}>
                &#9733;&#9733;&#9733;&#9733;&#9733;
              </FilterItem>
              <FilterItem $active={activeRating === "4"} onClick={() => setActiveRating("4")}>
                &#9733;&#9733;&#9733;&#9733;+
              </FilterItem>
              <FilterItem $active={activeRating === "3"} onClick={() => setActiveRating("3")}>
                &#9733;&#9733;&#9733;+
              </FilterItem>
            </FilterList>
          </SidebarSection>
        </FilterSidebar>

        <ProductsMain>
          <ResultsInfo>
            {filtered.length > 0
              ? `${filtered.length} product${filtered.length !== 1 ? "s" : ""} found`
              : ""}
          </ResultsInfo>

          <ProductsContainer>
            {filtered.map((item) => (
              <ProductCard key={item.id} product={createProductInstance(item)} />
            ))}
          </ProductsContainer>

          {filtered.length === 0 && <NoResults>No products found matching your search.</NoResults>}
        </ProductsMain>
      </PageLayout>
    </>
  );
}
