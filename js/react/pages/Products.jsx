import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
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

export default function Products() {
  const { t } = useTranslation();
  const { data: allProducts = [], isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const [activeCategory, setActiveCategory] = useState("all");
  const [activeManufacturer, setActiveManufacturer] = useState("all");
  const [activeRating, setActiveRating] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

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

  if (isLoading) {
    return <PageLayout><div>{t("common.loading")}</div></PageLayout>;
  }

  if (error) {
    return <PageLayout><div>{t("common.error")}: {error.message}</div></PageLayout>;
  }

  return (
    <>
      <SearchBarWrapper>
        <SearchBarInner>
          <SearchInput
            type="text"
            placeholder={t("productsPage.searchPlaceholder")}
            autoComplete="off"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label={t("productsPage.searchPlaceholder")}
          />
          <ClearSearchBtn
            $visible={Boolean(searchQuery)}
            title={t("productsPage.clearSearch")}
            aria-label={t("productsPage.clearSearch")}
            onClick={() => setSearchQuery("")}
          >
            &#10005;
          </ClearSearchBtn>
        </SearchBarInner>
      </SearchBarWrapper>

      <PageLayout>
        <FilterSidebar>
          <SidebarSection>
            <h3>{t("productsPage.category")}</h3>
            <FilterList>
              <FilterItem $active={activeCategory === "all"} onClick={() => setActiveCategory("all")}>
                {t("common.all")}
              </FilterItem>
              {categoryIds.map((id) => (
                <FilterItem
                  key={id}
                  $active={String(activeCategory) === String(id)}
                  onClick={() => setActiveCategory(id)}
                >
                  {t(`categories.${id}`)}
                </FilterItem>
              ))}
            </FilterList>
          </SidebarSection>

          <SidebarSection>
            <h3>{t("productsPage.manufacturer")}</h3>
            <FilterList>
              <FilterItem
                $active={activeManufacturer === "all"}
                onClick={() => setActiveManufacturer("all")}
              >
                {t("common.all")}
              </FilterItem>
              {manufacturerIds.map((id) => (
                <FilterItem
                  key={id}
                  $active={String(activeManufacturer) === String(id)}
                  onClick={() => setActiveManufacturer(id)}
                >
                  {t(`manufacturers.${id}`)}
                </FilterItem>
              ))}
            </FilterList>
          </SidebarSection>

          <SidebarSection>
            <h3>{t("productsPage.rating")}</h3>
            <FilterList>
              <FilterItem $active={activeRating === "all"} onClick={() => setActiveRating("all")}>
                {t("common.all")}
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
              ? t("productsPage.found", { count: filtered.length })
              : ""}
          </ResultsInfo>

          <ProductsContainer>
            {filtered.map((item) => (
              <ProductCard key={item.id} product={createProductInstance(item)} />
            ))}
          </ProductsContainer>

          {filtered.length === 0 && (
            <NoResults>{t("productsPage.noResults")}</NoResults>
          )}
        </ProductsMain>
      </PageLayout>
    </>
  );
}
