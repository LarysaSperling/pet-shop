import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slices/categoriesSlice";
import LayoutContainer from "../../components/layoutContainer";
import Breadcrumbs from "../../components/breadcrumbs";
import { API_URL } from "../../constants/api";

function CategoriesPage() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.categories);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  return (
    <LayoutContainer sx={{ mt: "40px", mb: "80px" }}>
      <Box sx={{ mb: "40px" }}>
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
            fontSize: { xs: "40px", md: "64px" },
            lineHeight: "110%",
            color: "#282828",
            mb: "40px",
          }}
        >
          Categories
        </Typography>

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
              <Box
                component="img"
                src={`${API_URL}/${category.image}`}
                alt={category.title}
                sx={{
                  width: "100%",
                  height: "350px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  display: "block",
                  mb: "16px",
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
                  fontSize: "20px",
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