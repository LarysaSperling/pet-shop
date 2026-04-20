import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slices/categoriesSlice";
import LayoutContainer from "../layoutContainer";
import Section from "../section";
import { API_URL } from "../../constants/api";

function Categories() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.categories);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return (
      <Section>
        <LayoutContainer>
          <Typography>Loading categories...</Typography>
        </LayoutContainer>
      </Section>
    );
  }

  if (status === "failed") {
    return (
      <Section>
        <LayoutContainer>
          <Typography color="error">
            Failed to load categories: {error}
          </Typography>
        </LayoutContainer>
      </Section>
    );
  }

  if (status === "succeeded" && items.length === 0) {
    return (
      <Section>
        <LayoutContainer>
          <Typography>No categories found.</Typography>
        </LayoutContainer>
      </Section>
    );
  }

  return (
    <Section>
      <LayoutContainer>
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "stretch", sm: "center" },
              gap: { xs: "16px", sm: "20px", md: "32px" },
              mb: { xs: "24px", sm: "32px", md: "40px" },
            }}
          >
            <Typography
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 700,
                fontSize: { xs: "32px", sm: "40px", md: "64px" },
                lineHeight: "110%",
                color: "#282828",
                whiteSpace: { xs: "normal", sm: "nowrap" },
              }}
            >
              Categories
            </Typography>

            <Box
              sx={{
                display: { xs: "none", sm: "block" },
                flex: 1,
                height: "1px",
                backgroundColor: "#DDDDDD",
              }}
            />

            <Button
              component={Link}
              to="/categories"
              variant="outlined"
              sx={{
                width: "fit-content",
                minWidth: { xs: "140px", sm: "142px" },
                height: { xs: "32px", sm: "36px" },
                px: { xs: "14px", sm: "16px" },
                alignSelf: { xs: "flex-start", sm: "center" },
                borderRadius: "6px",
                borderColor: "#DDDDDD",
                color: "#8B8B8B",
                textTransform: "none",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 500,
                fontSize: { xs: "14px", sm: "16px" },
                lineHeight: "126%",
                "&:hover": {
                  borderColor: "#282828",
                  color: "#282828",
                  backgroundColor: "transparent",
                },
              }}
            >
              All categories
            </Button>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: { xs: "20px", sm: "24px", lg: "32px" },
            }}
          >
            {items.slice(0, 4).map((category) => (
              <Box
                key={category.id}
                component={Link}
                to={`/categories/${category.id}`}
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "block",
                  transition: "0.3s ease",
                  "&:hover img": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                <Box
                  component="img"
                  src={`${API_URL}/${category.image}`}
                  alt={category.title}
                  sx={{
                    width: "100%",
                    aspectRatio: "316 / 350",
                    objectFit: "cover",
                    borderRadius: "12px",
                    display: "block",
                    mb: { xs: "12px", sm: "16px" },
                    transition: "0.3s ease",
                  }}
                />

                <Typography
                  sx={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 500,
                    fontSize: { xs: "18px", sm: "20px" },
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
    </Section>
  );
}

export default Categories;