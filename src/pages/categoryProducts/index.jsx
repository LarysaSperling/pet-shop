import { Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productsSlice";
import { fetchCategories } from "../../redux/slices/categoriesSlice";
import axios from "axios";
import LoadingMessage from "../../components/loadingMessage";
import LayoutContainer from "../../components/layoutContainer";
import Breadcrumbs from "../../components/breadcrumbs";
import ProductFilters from "../../components/productFilters";
import ProductGrid from "../../components/productGrid";
import { API_URL, API_ENDPOINTS } from "../../constants/api";
import useProductFilters from "../../hooks/useProductFilters";
import { MOBILE, PAGE_SPACING, mobile } from "../../theme/mobile";

// Stable empty array, so filters do not recalculate on every render
const EMPTY = [];

function CategoryProductsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  // If products and categories are already in Redux, show the page right away.
  // Then the page has its full height at once, so the browser "Back" button
  // can restore the scroll position (and there is no "Loading..." flash).
  const allProducts = useSelector((state) => state.products.items);
  const productsStatus = useSelector((state) => state.products.status);
  const cachedCategory = useSelector((state) =>
    state.categories.items.find((item) => String(item.id) === String(id))
  );
  const cachedProducts = useMemo(
    () =>
      productsStatus === "succeeded"
        ? allProducts.filter((item) => String(item.categoryId) === String(id))
        : null,
    [allProducts, productsStatus, id]
  );

  // Fill the shared lists once (the thunks skip the request if data is already there)
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  // Result of the last request: { id, category, products, failed }
  const [loaded, setLoaded] = useState({
    id: null,
    category: null,
    products: [],
    failed: false,
  });

  useEffect(() => {
    // Ignore an old response if the user already opened another category
    let ignore = false;

    async function loadCategoryProducts() {
      try {
        const response = await axios.get(
          `${API_URL}${API_ENDPOINTS.CATEGORIES}/${id}`
        );

        if (!ignore) {
          setLoaded({
            id,
            category: response.data.category,
            products: response.data.data || [],
            failed: false,
          });
        }
      } catch (error) {
        console.error("Failed to load category products:", error);
        if (!ignore) setLoaded({ id, category: null, products: [], failed: true });
      }
    }

    loadCategoryProducts();

    return () => {
      ignore = true;
    };
  }, [id]);

  const isLoadedForThisId = loaded.id === id && !loaded.failed;
  const hasCache = Boolean(cachedCategory && cachedProducts);

  const category = isLoadedForThisId ? loaded.category : cachedCategory;
  const products = isLoadedForThisId ? loaded.products : cachedProducts || EMPTY;

  const {
    filters,
    filteredProducts,
    priceError,
    setFilter,
    setPrice,
    resetFilters,
  } = useProductFilters(products, "categoryFilters");

  if (!isLoadedForThisId && !hasCache && !(loaded.id === id && loaded.failed)) {
    return (
      <LayoutContainer sx={PAGE_SPACING}>
        <LoadingMessage />
      </LayoutContainer>
    );
  }

  if (!isLoadedForThisId && !hasCache) {
    return (
      <LayoutContainer sx={PAGE_SPACING}>
        <Typography color="error">Failed to load category products.</Typography>
      </LayoutContainer>
    );
  }

  return (
    <LayoutContainer sx={PAGE_SPACING}>
      <Breadcrumbs
        items={[
          { label: "Main page", to: "/" },
          { label: "Categories", to: "/categories" },
          { label: category?.title || "Category" },
        ]}
      />

      <Typography
        component="h1"
        sx={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 700,
          fontSize: mobile(MOBILE.h1, { xs: "40px", md: "64px" }),
          lineHeight: "110%",
          color: "#282828",
          mb: mobile(MOBILE.titleGap, "40px"),
        }}
      >
        {category?.title}
      </Typography>

      <ProductFilters
        idPrefix="category"
        filters={filters}
        priceError={priceError}
        onPriceChange={setPrice}
        onFilterChange={setFilter}
      />

      <ProductGrid products={filteredProducts} onResetFilters={resetFilters} />
    </LayoutContainer>
  );
}

export default CategoryProductsPage;
