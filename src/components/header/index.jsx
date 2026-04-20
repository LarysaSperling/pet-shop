import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Drawer,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import basketIcon from "../../assets/icons/basket.svg";
import logoImg from "../../assets/icons/logo.svg";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { title: "Main Page", path: "/" },
    { title: "Categories", path: "/categories" },
    { title: "All products", path: "/products" },
    { title: "All sales", path: "/sales" },
  ];

  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.count, 0);

  const navLinkStyle = ({ isActive }) => ({
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 500,
    fontSize: "20px",
    lineHeight: "130%",
    color: isActive ? "#0D50FF" : "#282828",
    textDecoration: "none",
    transition: "0.2s ease",
  });

  const mobileNavLinkStyle = ({ isActive }) => ({
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 500,
    fontSize: "20px",
    lineHeight: "130%",
    color: isActive ? "#0D50FF" : "#282828",
    textDecoration: "none",
    transition: "0.2s ease",
    padding: "12px 0",
  });

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "#FFFFFF",
          boxShadow: "none",
        }}
      >
        <Box
          sx={{
            maxWidth: "1440px",
            width: "100%",
            margin: "0 auto",
          }}
        >
          <Box sx={{ borderBottom: "1px solid #DDDDDD" }}>
            <Toolbar
              disableGutters
              sx={{
                minHeight: { xs: "72px", md: "128px" },
                py: { xs: "12px", md: "20px" },
                display: "grid",
                gridTemplateColumns: { xs: "44px 1fr 44px 48px", md: "70px 1fr 48px" },
                alignItems: "center",
                columnGap: { xs: "12px", md: "24px" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  pl: { xs: "20px", md: "40px" },
                }}
              >
                <Link to="/" style={{ display: "flex" }}>
                  <Box
                    component="img"
                    src={logoImg}
                    alt="logo"
                    sx={{
                      width: { xs: "44px", md: "70px" },
                      height: { xs: "44px", md: "70px" },
                      display: "block",
                    }}
                  />
                </Link>
              </Box>

              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "32px",
                }}
              >
                {navItems.map((item) => (
                  <Box
                    key={item.path}
                    component={NavLink}
                    to={item.path}
                    end={item.path === "/"}
                    style={navLinkStyle}
                    sx={{ "&:hover": { color: "#0D50FF" } }}
                  >
                    {item.title}
                  </Box>
                ))}
              </Box>

              <Box
                sx={{
                  display: { xs: "flex", md: "none" },
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconButton
                  onClick={() => setMenuOpen(true)}
                  sx={{
                    p: 0,
                    color: "#282828",
                  }}
                >
                  <MenuIcon sx={{ fontSize: 32 }} />
                </IconButton>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  pr: { xs: "20px", md: "40px" },
                  position: "relative",
                }}
              >
                <IconButton
                  component={Link}
                  to="/cart"
                  sx={{ p: 0, position: "relative" }}
                >
                  <Box
                    component="img"
                    src={basketIcon}
                    alt="cart"
                    sx={{
                      width: { xs: "44px", md: "48px" },
                      height: { xs: "44px", md: "48px" },
                      display: "block",
                    }}
                  />

                  {cartCount > 0 && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: "-4px",
                        left: "-8px",
                        minWidth: "26px",
                        height: "26px",
                        px: "6px",
                        borderRadius: "50%",
                        backgroundColor: "#0D50FF",
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      {cartCount}
                    </Box>
                  )}
                </IconButton>
              </Box>
            </Toolbar>
          </Box>
        </Box>
      </AppBar>

      <Drawer
        anchor="right"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        PaperProps={{
          sx: {
            width: "280px",
            p: "20px",
            backgroundColor: "#FFFFFF",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mb: "24px",
          }}
        >
          <IconButton onClick={() => setMenuOpen(false)} sx={{ p: 0 }}>
            <CloseIcon sx={{ fontSize: 32, color: "#282828" }} />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {navItems.map((item) => (
            <Box
              key={item.path}
              component={NavLink}
              to={item.path}
              end={item.path === "/"}
              style={mobileNavLinkStyle}
              onClick={() => setMenuOpen(false)}
              sx={{
                "&:hover": { color: "#0D50FF" },
                borderBottom: "1px solid #EEEEEE",
              }}
            >
              {item.title}
            </Box>
          ))}
        </Box>
      </Drawer>
    </>
  );
}

export default Header;