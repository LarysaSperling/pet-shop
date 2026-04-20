import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productsSlice";
import LayoutContainer from "../layoutContainer";
import Section from "../section";
import ProductCard from "../productCard";

function Discounts() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const discountedProducts = useMemo(() => {
    return items
      .filter(
        (product) =>
          product.discont_price !== null &&
          product.discont_price !== undefined &&
          Number(product.discont_price) < Number(product.price)
      )
      .slice(0, 4);
  }, [items]);

  if (status === "loading") {
    return (
      <Section>
        <LayoutContainer>
          <Typography>Loading sale products...</Typography>
        </LayoutContainer>
      </Section>
    );
  }

  if (status === "failed") {
    return (
      <Section >
        <LayoutContainer>
          <Typography color="error">
            Failed to load products: {error}
          </Typography>
        </LayoutContainer>
      </Section>
    );
  }

  return (
    <Section id="sale">
      <LayoutContainer>
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "32px",
              mb: "40px",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 700,
                fontSize: { xs: "40px", md: "64px" },
                lineHeight: "110%",
                color: "#282828",
                whiteSpace: "nowrap",
              }}
            >
              Sale
            </Typography>

            <Box
              sx={{
                flex: 1,
                height: "1px",
                backgroundColor: "#DDDDDD",
              }}
            />

            <Button
              component={Link}
              to="/sales"
              variant="outlined"
              sx={{
                minWidth: "126px",
                height: "36px",
                px: "16px",
                borderRadius: "6px",
                borderColor: "#DDDDDD",
                color: "#8B8B8B",
                textTransform: "none",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "126%",
                "&:hover": {
                  borderColor: "#282828",
                  color: "#282828",
                  backgroundColor: "transparent",
                },
              }}
            >
              All sales
            </Button>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              },
              gap: "20px",
            }}
          >
            {discountedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Box>
        </Box>
      </LayoutContainer>
    </Section>
  );
}

export default Discounts;