import { Box, Typography, IconButton } from "@mui/material";
import Section from "../section";
import LayoutContainer from "../layoutContainer";
import instagramIcon from "../../assets/icons/instagram.svg";
import whatsappIcon from "../../assets/icons/whatsapp.svg";
import { MOBILE, mobile } from "../../theme/mobile";

function Footer() {
  return (
    <Section sx={{ mt: mobile("48px", "80px"), mb: mobile("24px", "40px") }}>
      <LayoutContainer>
        <Box>
          <Typography
            sx={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 700,
              fontSize: mobile(MOBILE.h2, { xs: "40px", md: "64px" }),
              lineHeight: "110%",
              color: "#282828",
              mb: mobile(MOBILE.titleGap, "40px"),
            }}
          >
            Contact
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
              gap: mobile("12px", "32px"),
              mb: mobile("12px", "32px"),
            }}
          >
            <Box
              sx={{
                backgroundColor: "#F1F3F4",
                borderRadius: "12px",
                p: mobile(MOBILE.blockPadding, "32px"),
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 500,
                  fontSize: mobile(MOBILE.body, "20px"),
                  lineHeight: "130%",
                  color: "#8B8B8B",
                  mb: mobile("8px", "16px"),
                }}
              >
                Phone
              </Typography>

              <Typography
                sx={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 600,
                  fontSize: mobile(MOBILE.h3, { sm: "32px", md: "32px", lg: "40px" }),
                  lineHeight: "110%",
                  color: "#282828",
                }}
              >
                {/* nowrap keeps "915-88492" together on narrow screens */}
                +49 30{" "}
                <Box component="span" sx={{ whiteSpace: "nowrap" }}>
                  915-88492
                </Box>
              </Typography>
            </Box>

            <Box
              sx={{
                backgroundColor: "#F1F3F4",
                borderRadius: "12px",
                p: mobile(MOBILE.blockPadding, "32px"),
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 500,
                  fontSize: mobile(MOBILE.body, "20px"),
                  lineHeight: "130%",
                  color: "#8B8B8B",
                  mb: mobile("8px", "16px"),
                }}
              >
                Socials
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <IconButton
                  component="a"
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ p: 0 }}
                >
                  <Box
                    component="img"
                    src={instagramIcon}
                    alt="Instagram"
                    sx={{ width: "43px", height: "44px" }}
                  />
                </IconButton>

                <IconButton
                  component="a"
                  href="https://www.whatsapp.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ p: 0 }}
                >
                  <Box
                    component="img"
                    src={whatsappIcon}
                    alt="WhatsApp"
                    sx={{ width: "43px", height: "43px" }}
                  />
                </IconButton>
              </Box>
            </Box>

            <Box
              sx={{
                backgroundColor: "#F1F3F4",
                borderRadius: "12px",
                p: mobile(MOBILE.blockPadding, "32px"),
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 500,
                  fontSize: mobile(MOBILE.body, "20px"),
                  lineHeight: "130%",
                  color: "#8B8B8B",
                  mb: mobile("8px", "16px"),
                }}
              >
                Address
              </Typography>

              <Typography
                sx={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 600,
                  fontSize: mobile(MOBILE.h3, { sm: "32px", md: "32px", lg: "40px" }),
                  lineHeight: "110%",
                  color: "#282828",
                }}
              >
                Wallstraße 9-13, 10179 Berlin, Deutschland
              </Typography>
            </Box>

            <Box
              sx={{
                backgroundColor: "#F1F3F4",
                borderRadius: "12px",
                p: mobile(MOBILE.blockPadding, "32px"),
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 500,
                  fontSize: mobile(MOBILE.body, "20px"),
                  lineHeight: "130%",
                  color: "#8B8B8B",
                  mb: mobile("8px", "16px"),
                }}
              >
                Working Hours
              </Typography>

              <Typography
                sx={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 600,
                  fontSize: mobile(MOBILE.h3, { sm: "32px", md: "32px", lg: "40px" }),
                  lineHeight: "110%",
                  color: "#282828",
                }}
              >
                24 hours a day
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              borderRadius: "12px",
              overflow: "hidden",
              height: mobile("240px", { xs: "300px", md: "350px" }),
            }}
          >
            <Box
              component="iframe"
              title="Map"
              src="https://www.google.com/maps?q=Wallstraße%209-13,%2010179%20Berlin,%20Deutschland&z=15&output=embed"
              width="100%"
              height="100%"
              sx={{
                border: 0,
                display: "block",
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Box>
        </Box>
      </LayoutContainer>
    </Section>
  );
}

export default Footer;