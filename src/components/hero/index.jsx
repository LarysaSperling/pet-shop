import { Box, Typography, Button } from "@mui/material";
import heroImg from "../../assets/images/hero.jpg";
import { MOBILE, mobile } from "../../theme/mobile";

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
          pt: mobile("8px", "40px"),
          color: "#fff",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "relative",
            maxWidth: "1360px",
            py: mobile("24px", "40px"),
            // phones: same side padding as the rest of the page
            px: mobile(MOBILE.gutter, 0),
            pl: mobile(MOBILE.gutter, "40px"),
          }}
        >
          <Typography
            sx={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: mobile(MOBILE.hero, { sm: "56px", md: "72px", lg: "96px" }),
              fontWeight: 700,
              lineHeight: "110%",
              textAlign: "left",
              mb: mobile("24px", "40px"),
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
              fontSize: mobile(MOBILE.buttonFont, "20px"),
              lineHeight: "130%",
              px: mobile("32px", "56px"),
              py: mobile("12px", "16px"),
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