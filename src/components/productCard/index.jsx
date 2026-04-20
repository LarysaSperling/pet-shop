import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { API_URL } from "../../constants/api";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const isAdded = cartItems.some((item) => item.id === product.id);

  const currentPrice = Number(product.discont_price ?? product.price);
  const oldPrice = Number(product.price);

  const discountPercent =
    product.discont_price &&
    Number(product.discont_price) < Number(product.price)
      ? Math.round(
          ((Number(product.price) - Number(product.discont_price)) /
            Number(product.price)) *
            100
        )
      : 0;

  const handleAddToCart = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!isAdded) {
      dispatch(addToCart(product));
    }
  };

  return (
    <Box
      component={Link}
      to={`/products/${product.id}`}
      sx={{
        textDecoration: "none",
        color: "inherit",
        border: "1px solid #DDDDDD",
        borderRadius: "12px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        backgroundColor: "#FFFFFF",
        height: "100%",
        transition: "0.2s ease",
        "&:hover": {
          boxShadow: "0 4px 18px rgba(0, 0, 0, 0.08)",
          transform: "translateY(-2px)",
        },
        "&:hover .card-button": {
          opacity: { xs: 1, md: 1 },
          transform: "translateY(0)",
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Box
          component="img"
          src={`${API_URL}/${product.image}`}
          alt={product.title}
          sx={{
            width: "100%",
            height: {
              xs: "240px",
              sm: "250px",
              md: "260px",
              lg: "284px",
            },
            objectFit: "cover",
            display: "block",
          }}
        />

        {discountPercent > 0 && (
          <Box
            sx={{
              position: "absolute",
              top: { xs: "12px", sm: "16px" },
              right: { xs: "12px", sm: "16px" },
              backgroundColor: "#0D50FF",
              color: "#FFFFFF",
              borderRadius: "6px",
              px: { xs: "6px", sm: "8px" },
              py: "4px",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 600,
              fontSize: { xs: "16px", sm: "20px" },
              lineHeight: "130%",
            }}
          >
            -{discountPercent}%
          </Box>
        )}

        <Button
          className="card-button"
          onClick={handleAddToCart}
          disabled={isAdded}
          sx={{
            position: "absolute",
            left: { xs: "12px", sm: "16px" },
            right: { xs: "12px", sm: "16px" },
            bottom: { xs: "12px", sm: "16px" },
            height: { xs: "44px", sm: "48px", md: "58px" },
            borderRadius: "8px",
            opacity: { xs: 1, md: 0 },
            transform: { xs: "translateY(0)", md: "translateY(10px)" },
            transition: "0.2s ease",
            textTransform: "none",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 600,
            fontSize: { xs: "16px", sm: "18px", md: "20px" },
            lineHeight: "130%",
            backgroundColor: isAdded ? "#FFFFFF" : "#0D50FF",
            color: isAdded ? "#282828" : "#FFFFFF",
            border: isAdded ? "1px solid #282828" : "none",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: isAdded ? "#FFFFFF" : "#282828",
              color: isAdded ? "#282828" : "#FFFFFF",
              boxShadow: "none",
            },
            "&.Mui-disabled": {
              opacity: 1,
              backgroundColor: "#FFFFFF",
              color: "#282828",
              border: "1px solid #282828",
            },
          }}
        >
          {isAdded ? "Added" : "Add to cart"}
        </Button>
      </Box>

      <Box
        sx={{
          p: { xs: "16px", sm: "20px" },
          display: "flex",
          flexDirection: "column",
          gap: { xs: "12px", sm: "16px" },
          flexGrow: 1,
        }}
      >
        <Typography
          sx={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 500,
            fontSize: { xs: "18px", sm: "20px" },
            lineHeight: "130%",
            color: "#282828",
            minHeight: { xs: "46px", sm: "52px" },
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
            gap: { xs: "10px", sm: "16px" },
            flexWrap: "wrap",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 600,
              fontSize: { xs: "32px", sm: "36px", lg: "40px" },
              lineHeight: "110%",
              color: "#282828",
            }}
          >
            ${currentPrice}
          </Typography>

          {discountPercent > 0 && (
            <Typography
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 500,
                fontSize: { xs: "18px", sm: "20px" },
                lineHeight: "130%",
                color: "#8B8B8B",
                textDecoration: "line-through",
              }}
            >
              ${oldPrice}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default ProductCard;