import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productsSlice";
import LoadingMessage from "../../components/loadingMessage";
import LayoutContainer from "../../components/layoutContainer";
import Breadcrumbs from "../../components/breadcrumbs";
import ProductFilters from "../../components/productFilters";
import ProductGrid from "../../components/productGrid";
import useProductFilters, {
  SORT_OPTIONS,
  DISCOUNT_SORT_OPTION,
} from "../../hooks/useProductFilters";
import { MOBILE, PAGE_SPACING, mobile } from "../../theme/mobile";

const SALES_SORT_OPTIONS = [...SORT_OPTIONS, DISCOUNT_SORT_OPTION];

function AllSales() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);

  const {
    filters,
    filteredProducts,
    priceError,
    setFilter,
    setPrice,
    resetFilters,
  } = useProductFilters(
    items,
    "salesFilters",
    { onlyDiscounted: true },
    SALES_SORT_OPTIONS
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return (
      <LayoutContainer sx={PAGE_SPACING}>
        <LoadingMessage text="Loading sale products..." />
      </LayoutContainer>
    );
  }

  if (status === "failed") {
    return (
      <LayoutContainer sx={PAGE_SPACING}>
        <Typography color="error">
          Failed to load sale products: {error}
        </Typography>
      </LayoutContainer>
    );
  }

  return (
    <LayoutContainer sx={PAGE_SPACING}>
      <Breadcrumbs
        items={[
          { label: "Main page", to: "/" },
          { label: "All sales" },
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
        Discounted items
      </Typography>

      <ProductFilters
        idPrefix="sales"
        filters={filters}
        priceError={priceError}
        onPriceChange={setPrice}
        onFilterChange={setFilter}
        sortOptions={SALES_SORT_OPTIONS}
      />

      <ProductGrid products={filteredProducts} onResetFilters={resetFilters} />
    </LayoutContainer>
  );
}

export default AllSales;
