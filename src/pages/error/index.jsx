import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import errorImg from "../../assets/images/404.png";
import LayoutContainer from "../../components/layoutContainer";

function ErrorPage() {
  return (
    <LayoutContainer sx={{ mt: { xs: "24px", md: "40px" }, mb: "80px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
   
        <Box
          component="img"
          src={errorImg}
          alt="404"
          sx={{
            width: "100%",
            maxWidth: { xs: "320px", sm: "500px", md: "700px" },
            mb: { xs: "24px", md: "32px" },
          }}
        />

        <Typography
          sx={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 700,
            fontSize: { xs: "28px", sm: "40px", md: "64px" },
            lineHeight: "110%",
            color: "#282828",
            mb: { xs: "12px", md: "16px" },
          }}
        >
          Page Not Found
        </Typography>

        <Typography
          sx={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 500,
            fontSize: { xs: "14px", sm: "16px", md: "20px" },
            lineHeight: "130%",
            color: "#8B8B8B",
            mb: { xs: "24px", md: "32px" },
            maxWidth: { xs: "300px", sm: "500px", md: "600px" },
          }}
        >
          We’re sorry, the page you requested could not be found. Please go back to the homepage.
        </Typography>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            component={Link}
            to="/"
            variant="contained"
            sx={{
              height: { xs: "48px", sm: "52px", md: "58px" },
              width: { xs: "100%", sm: "auto" },
              px: { xs: "16px", sm: "32px", md: "56px" },

              borderRadius: "8px",
              backgroundColor: "#0D50FF",
              color: "#FFFFFF",

              textTransform: "none",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 600,
              fontSize: { xs: "16px", sm: "18px", md: "20px" },
              lineHeight: "130%",

              boxShadow: "none",

              "&:hover": {
                backgroundColor: "#282828",
                color: "#FFFFFF",
                boxShadow: "none",
              },
            }}
          >
            Go Home
          </Button>
        </Box>
      </Box>
    </LayoutContainer>
  );
}

export default ErrorPage;