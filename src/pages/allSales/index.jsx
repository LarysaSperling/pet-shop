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
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productsSlice";
import LayoutContainer from "../../components/layoutContainer";
import Breadcrumbs from "../../components/breadcrumbs";
import ProductCard from "../../components/productCard";

function AllSales() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);

  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [sortType, setSortType] = useState("default");
  const [onlyDiscounted, setOnlyDiscounted] = useState(true);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const filteredProducts = useMemo(() => {
    let result = items.filter(
      (item) =>
        item.discont_price !== null &&
        item.discont_price !== undefined &&
        Number(item.discont_price) < Number(item.price)
    );

    if (!onlyDiscounted) {
      result = [...items];
    }

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

    if (sortType === "discount-desc") {
      result.sort((a, b) => {
        const aDiscount = Math.round(
          ((Number(a.price) - Number(a.discont_price)) / Number(a.price)) * 100
        );
        const bDiscount = Math.round(
          ((Number(b.price) - Number(b.discont_price)) / Number(b.price)) * 100
        );
        return bDiscount - aDiscount;
      });
    }

    return result;
  }, [items, priceFrom, priceTo, sortType, onlyDiscounted]);

  if (status === "loading") {
    return (
      <LayoutContainer sx={{ mt: "40px", mb: "80px" }}>
        <Typography>Loading sale products...</Typography>
      </LayoutContainer>
    );
  }

  if (status === "failed") {
    return (
      <LayoutContainer sx={{ mt: "40px", mb: "80px" }}>
        <Typography color="error">
          Failed to load sale products: {error}
        </Typography>
      </LayoutContainer>
    );
  }

  return (
    <LayoutContainer sx={{ mt: "40px", mb: "80px" }}>
      <Breadcrumbs
        items={[
          { label: "Main page", to: "/" },
          { label: "All sales" },
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
        Discounted items
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
            id="sales-price-from"
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
            id="sales-price-to"
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

        <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
            id="sales-only-discounted"
            name="onlyDiscounted"
            checked={onlyDiscounted}
            onChange={(e) => setOnlyDiscounted(e.target.checked)}
            slotProps={{
              input: {
                "aria-label": "Discounted items only",
              },
            }}
            sx={{
              p: 0,
              "& .MuiSvgIcon-root": {
                fontSize: 32,
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
              id="sales-sort"
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
              <MenuItem value="discount-desc">biggest discount</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {filteredProducts.length === 0 ? (
        <Typography
          sx={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 500,
            fontSize: "20px",
            lineHeight: "130%",
            color: "#8B8B8B",
          }}
        >
          No discounted products found.
        </Typography>
      ) : (
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
      )}
    </LayoutContainer>
  );
}

export default AllSales;