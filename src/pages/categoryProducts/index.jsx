import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingMessage from "../../components/loadingMessage";
import LayoutContainer from "../../components/layoutContainer";
import Breadcrumbs from "../../components/breadcrumbs";
import ProductFilters from "../../components/productFilters";
import ProductGrid from "../../components/productGrid";
import { API_URL, API_ENDPOINTS } from "../../constants/api";
import useProductFilters from "../../hooks/useProductFilters";

function CategoryProductsPage() {
  const { id } = useParams();

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("idle");

  const {
    filters,
    filteredProducts,
    priceError,
    setFilter,
    setPrice,
    resetFilters,
  } = useProductFilters(products, "categoryFilters");

  useEffect(() => {
    async function loadCategoryProducts() {
      try {
        setStatus("loading");

        const response = await axios.get(
          `${API_URL}${API_ENDPOINTS.CATEGORIES}/${id}`
        );

        setCategory(response.data.category);
        setProducts(response.data.data || []);
        setStatus("succeeded");
      } catch (error) {
        console.error("Failed to load category products:", error);
        setStatus("failed");
      }
    }

    loadCategoryProducts();
  }, [id]);

  if (status === "loading") {
    return (
      <LayoutContainer sx={{ mt: "40px", mb: "80px" }}>
        <LoadingMessage />
      </LayoutContainer>
    );
  }

  if (status === "failed") {
    return (
      <LayoutContainer sx={{ mt: "40px", mb: "80px" }}>
        <Typography color="error">Failed to load category products.</Typography>
      </LayoutContainer>
    );
  }

  return (
    <LayoutContainer sx={{ mt: "40px", mb: "80px" }}>
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
          fontSize: { xs: "40px", md: "64px" },
          lineHeight: "110%",
          color: "#282828",
          mb: "40px",
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
