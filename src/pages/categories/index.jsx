import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slices/categoriesSlice";
import LayoutContainer from "../../components/layoutContainer";
import Breadcrumbs from "../../components/breadcrumbs";
import LoadingMessage from "../../components/loadingMessage";
import FallbackImage from "../../components/fallbackImage";
import { MOBILE, PAGE_SPACING, mobile } from "../../theme/mobile";

function CategoriesPage() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.categories);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  return (
    <LayoutContainer sx={PAGE_SPACING}>
      <Box sx={{ mb: mobile("0px", "40px") }}>
        <Breadcrumbs
          items={[
            { label: "Main page", to: "/" },
            { label: "Categories" },
          ]}
        />

        <Typography
          sx={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 700,
            fontSize: mobile(MOBILE.h1, { xs: "40px", md: "64px" }),
            lineHeight: "110%",
            color: "#282828",
            mb: mobile(MOBILE.titleGap, "40px"),
          }}
        >
          Categories
        </Typography>

        {status === "loading" && (
          <LoadingMessage text="Loading categories..." />
        )}

        {status === "failed" && (
          <Typography color="error">
            Failed to load categories: {error}
          </Typography>
        )}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              // phones: 2 small cards per row instead of 1 huge card
              xs: "repeat(2, minmax(0, 1fr))",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: mobile("16px 12px", "32px"),
          }}
        >
          {items.map((category) => (
            <Box
              key={category.id}
              component={Link}
              to={`/categories/${category.id}`}
              sx={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <FallbackImage
                path={category.image}
                alt={category.title}
                sx={{
                  width: "100%",
                  height: mobile("auto", "350px"),
                  aspectRatio: mobile("316 / 350", "auto"),
                  objectFit: "cover",
                  borderRadius: "12px",
                  display: "block",
                  mb: mobile("8px", "16px"),
                  transition: "0.3s ease",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              />

              <Typography
                sx={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 500,
                  fontSize: mobile(MOBILE.small, "20px"),
                  lineHeight: "130%",
                  color: "#282828",
                  textAlign: "center",
                }}
              >
                {category.title}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </LayoutContainer>
  );
}

export default CategoriesPage;