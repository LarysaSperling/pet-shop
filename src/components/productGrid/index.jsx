import { Box, Button, Typography } from "@mui/material";
import ProductCard from "../productCard";

/**
 * Grid of product cards. When the list is empty it shows a message
 * and a "Reset filters" button.
 */
function ProductGrid({ products, onResetFilters }) {
  if (products.length === 0) {
    return (
      <Box
        role="status"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "24px",
          py: "24px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 500,
            fontSize: "20px",
            lineHeight: "130%",
            color: "#8B8B8B",
          }}
        >
          No products match your filters.
        </Typography>

        {onResetFilters && (
          <Button
            onClick={onResetFilters}
            sx={{
              height: "48px",
              px: "32px",
              borderRadius: "8px",
              backgroundColor: "#0D50FF",
              color: "#FFFFFF",
              textTransform: "none",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 600,
              fontSize: "18px",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#282828",
                boxShadow: "none",
              },
            }}
          >
            Reset filters
          </Button>
        )}
      </Box>
    );
  }

  return (
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
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Box>
  );
}

export default ProductGrid;
