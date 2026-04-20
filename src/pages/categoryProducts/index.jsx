import {
  Box,
  Typography,
  Checkbox,
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LayoutContainer from "../../components/layoutContainer";
import Breadcrumbs from "../../components/breadcrumbs";
import ProductCard from "../../components/productCard";
import { API_URL, API_ENDPOINTS } from "../../constants/api";

function CategoryProductsPage() {
  const { id } = useParams();

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("idle");

  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);
  const [sortType, setSortType] = useState("default");

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

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (priceFrom) {
      result = result.filter(
        (item) => Number(item.discont_price ?? item.price) >= Number(priceFrom)
      );
    }

    if (priceTo) {
      result = result.filter(
        (item) => Number(item.discont_price ?? item.price) <= Number(priceTo)
      );
    }

    if (onlyDiscounted) {
      result = result.filter(
        (item) =>
          item.discont_price !== null &&
          item.discont_price !== undefined &&
          Number(item.discont_price) < Number(item.price)
      );
    }

    if (sortType === "price-asc") {
      result.sort(
        (a, b) =>
          Number(a.discont_price ?? a.price) -
          Number(b.discont_price ?? b.price)
      );
    }

    if (sortType === "price-desc") {
      result.sort(
        (a, b) =>
          Number(b.discont_price ?? b.price) -
          Number(a.discont_price ?? a.price)
      );
    }

    if (sortType === "title") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [products, priceFrom, priceTo, onlyDiscounted, sortType]);

  if (status === "loading") {
    return (
      <LayoutContainer sx={{ mt: "40px", mb: "80px" }}>
        <Typography>Loading...</Typography>
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

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "24px",
          alignItems: "center",
          mb: "40px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Typography
            sx={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 600,
              fontSize: "20px",
              lineHeight: "130%",
              color: "#282828",
            }}
          >
            Price
          </Typography>

          <OutlinedInput
            id="category-price-from"
            name="priceFrom"
            placeholder="from"
            value={priceFrom}
            onChange={(e) => setPriceFrom(e.target.value)}
            autoComplete="off"
            sx={{
              width: "112px",
              height: "36px",
              borderRadius: "6px",
              fontFamily: "Montserrat, sans-serif",
              fontSize: "16px",
            }}
          />

          <OutlinedInput
            id="category-price-to"
            name="priceTo"
            placeholder="to"
            value={priceTo}
            onChange={(e) => setPriceTo(e.target.value)}
            autoComplete="off"
            sx={{
              width: "112px",
              height: "36px",
              borderRadius: "6px",
              fontFamily: "Montserrat, sans-serif",
              fontSize: "16px",
            }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Typography
            sx={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 600,
              fontSize: "20px",
              lineHeight: "130%",
              color: "#282828",
            }}
          >
            Discounted items
          </Typography>

          <Checkbox
            id="category-only-discounted"
            name="onlyDiscounted"
            checked={onlyDiscounted}
            onChange={(e) => setOnlyDiscounted(e.target.checked)}
            slotProps={{
              input: {
                "aria-label": "Discounted items only",
              },
            }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Typography
            sx={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 600,
              fontSize: "20px",
              lineHeight: "130%",
              color: "#282828",
            }}
          >
            Sorted
          </Typography>

          <FormControl sx={{ minWidth: "200px" }}>
            <Select
              id="category-sort"
              name="sortType"
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              size="small"
              sx={{
                height: "36px",
                borderRadius: "6px",
                fontFamily: "Montserrat, sans-serif",
                fontSize: "16px",
              }}
            >
              <MenuItem value="default">by default</MenuItem>
              <MenuItem value="price-asc">price: low to high</MenuItem>
              <MenuItem value="price-desc">price: high to low</MenuItem>
              <MenuItem value="title">alphabetically</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: "32px",
        }}
      >
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Box>
    </LayoutContainer>
  );
}

export default CategoryProductsPage;