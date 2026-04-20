import { Box, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import LayoutContainer from "../../components/layoutContainer";
import Breadcrumbs from "../../components/breadcrumbs";
import { API_URL, API_ENDPOINTS } from "../../constants/api";

function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    async function loadProduct() {
      try {
        setStatus("loading");

        const response = await axios.get(
          `${API_URL}${API_ENDPOINTS.PRODUCTS}/${id}`
        );

        const productData = Array.isArray(response.data)
          ? response.data[0]
          : response.data;

        setProduct(productData);
        setStatus("succeeded");
      } catch (error) {
        console.error("Failed to load product:", error);
        setStatus("failed");
      }
    }

    loadProduct();
  }, [id]);

  if (status === "loading") {
    return (
      <LayoutContainer sx={{ mt: "40px", mb: "80px" }}>
        <Typography>Loading...</Typography>
      </LayoutContainer>
    );
  }

  if (status === "failed" || !product) {
    return (
      <LayoutContainer sx={{ mt: "40px", mb: "80px" }}>
        <Typography color="error">Product not found.</Typography>
      </LayoutContainer>
    );
  }

  const isAdded = cartItems.some((item) => item.id === product.id);

  const handleAdd = () => {
    if (!isAdded) {
      dispatch(addToCart(product));
    }
  };

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

  return (
    <LayoutContainer sx={{ mt: "40px", mb: "80px" }}>
      <Breadcrumbs
        items={[
          { label: "Main page", to: "/" },
          { label: "All products", to: "/products" },
          { label: product.title },
        ]}
      />

      <Box
        sx={{
          display: "flex",
          gap: { xs: "24px", md: "32px" },
          alignItems: "flex-start",
          flexWrap: { xs: "wrap", md: "nowrap" },
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            maxWidth: { md: "780px" },
            borderRadius: "12px",
            overflow: "hidden",
            backgroundColor: "#F6F7F8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: { xs: "320px", sm: "420px", md: "520px" },
          }}
        >
          <Box
            component="img"
            src={`${API_URL}/${product.image}`}
            alt={product.title}
            sx={{
              width: "100%",
              height: "100%",
              maxHeight: { xs: "420px", md: "520px" },
              objectFit: "contain",
              display: "block",
            }}
          />
        </Box>

        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            minWidth: 0,
          }}
        >
          <Typography
            sx={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 700,
              fontSize: { xs: "32px", md: "40px" },
              lineHeight: "110%",
              color: "#282828",
              mb: "32px",
              wordBreak: "break-word",
            }}
          >
            {product.title}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              flexWrap: "wrap",
              mb: "32px",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 700,
                fontSize: { xs: "48px", md: "64px" },
                lineHeight: "110%",
                color: "#282828",
              }}
            >
              ${currentPrice}
            </Typography>

            {discountPercent > 0 && (
              <>
                <Typography
                  sx={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 500,
                    fontSize: { xs: "28px", md: "40px" },
                    lineHeight: "130%",
                    color: "#8B8B8B",
                    textDecoration: "line-through",
                  }}
                >
                  ${oldPrice}
                </Typography>

                <Box
                  sx={{
                    backgroundColor: "#0D50FF",
                    color: "#FFFFFF",
                    borderRadius: "6px",
                    px: "8px",
                    py: "4px",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 600,
                    fontSize: "20px",
                    lineHeight: "130%",
                  }}
                >
                  -{discountPercent}%
                </Box>
              </>
            )}
          </Box>

          <Box sx={{ mb: "32px" }}>
            {!isAdded ? (
              <Button
                onClick={handleAdd}
                sx={{
                  width: { xs: "100%", sm: "316px" },
                  height: "58px",
                  borderRadius: "8px",
                  backgroundColor: "#0D50FF",
                  color: "#FFFFFF",
                  textTransform: "none",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 600,
                  fontSize: "20px",
                  lineHeight: "130%",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#282828",
                    boxShadow: "none",
                  },
                }}
              >
                Add to cart
              </Button>
            ) : (
              <Button
                disabled
                sx={{
                  width: { xs: "100%", sm: "316px" },
                  height: "58px",
                  borderRadius: "8px",
                  backgroundColor: "#FFFFFF",
                  color: "#282828",
                  border: "1px solid #282828",
                  textTransform: "none",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 600,
                  fontSize: "20px",
                  lineHeight: "130%",
                  "&.Mui-disabled": {
                    backgroundColor: "#FFFFFF",
                    color: "#282828",
                    border: "1px solid #282828",
                  },
                }}
              >
                Added
              </Button>
            )}
          </Box>

          <Typography
            sx={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 600,
              fontSize: "20px",
              lineHeight: "130%",
              color: "#282828",
              mb: "16px",
            }}
          >
            Description
          </Typography>

          <Typography
            sx={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "130%",
              color: "#282828",
              wordBreak: "break-word",
            }}
          >
            {product.description}
          </Typography>
        </Box>
      </Box>
    </LayoutContainer>
  );
}

export default ProductPage;