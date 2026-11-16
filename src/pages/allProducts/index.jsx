import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productsSlice";
import LoadingMessage from "../../components/loadingMessage";
import LayoutContainer from "../../components/layoutContainer";
import Breadcrumbs from "../../components/breadcrumbs";
import ProductFilters from "../../components/productFilters";
import ProductGrid from "../../components/productGrid";
import useProductFilters from "../../hooks/useProductFilters";
import { MOBILE, PAGE_SPACING, mobile } from "../../theme/mobile";

function AllProducts() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);

  const {
    filters,
    filteredProducts,
    priceError,
    setFilter,
    setPrice,
    resetFilters,
  } = useProductFilters(items, "allProductsFilters");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return (
      <LayoutContainer sx={PAGE_SPACING}>
        <LoadingMessage />
      </LayoutContainer>
    );
  }

  if (status === "failed") {
    return (
      <LayoutContainer sx={PAGE_SPACING}>
        <Typography color="error">{error}</Typography>
      </LayoutContainer>
    );
  }

  return (
    <LayoutContainer sx={PAGE_SPACING}>
      <Breadcrumbs
        items={[
          { label: "Main page", to: "/" },
          { label: "All products" },
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
        All products
      </Typography>

      <ProductFilters
        idPrefix="products"
        filters={filters}
        priceError={priceError}
        onPriceChange={setPrice}
        onFilterChange={setFilter}
      />

      <ProductGrid products={filteredProducts} onResetFilters={resetFilters} />
    </LayoutContainer>
  );
}

export default AllProducts;
