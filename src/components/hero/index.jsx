import { Box, Typography, Button } from "@mui/material";
import heroImg from "../../assets/images/hero.jpg";

function Hero() {
  return (
    <Box
      sx={{
        maxWidth: "1440px",
        width: "100%",
        margin: "0 auto",
      }}
    >
      <Box
        sx={{
          minHeight: { xs: 220, sm: 300, md: 420, lg: 600 },
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          alignItems: "flex-start",
          pt: { xs: "40px", md: "40px" },
          color: "#fff",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "relative",
            maxWidth: "1360px",
            py: "40px",
            pl: "40px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: { xs: "40px", sm: "56px", md: "72px", lg: "96px" },
              fontWeight: 700,
              lineHeight: "110%",
              textAlign: "left",
              mb: "40px",
            }}
          >
            Amazing Discounts
            <br />
            on Pets Products!
          </Typography>

          <Button
            component="a"
            href="#sale"
            variant="contained"
            sx={{
              backgroundColor: "#0D50FF",
              textTransform: "none",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 600,
              fontSize: "20px",
              lineHeight: "130%",
              px: "56px",
              py: "16px",
              borderRadius: "8px",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#0B44D0",
                boxShadow: "none",
              },
            }}
          >
            Check out
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Hero;