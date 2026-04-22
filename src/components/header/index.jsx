import { useState } from "react";
import { AppBar, Toolbar, Box, IconButton, Drawer } from "@mui/material";
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

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          top: 0,
          zIndex: 1300,
          backgroundColor: "#FFFFFF",
          boxShadow: "none",
        }}
      >
        <Box sx={{ maxWidth: "1440px", width: "100%", margin: "0 auto" }}>
          <Box sx={{ borderBottom: "1px solid #DDDDDD" }}>
            <Toolbar
              disableGutters
              sx={{
                minHeight: { xs: "72px", md: "128px" },
                py: { xs: "12px", md: "20px" },
                px: { xs: "20px", md: 0 },
                display: "grid",
                gridTemplateColumns: {
                  xs: "52px 1fr 52px",
                  sm: "56px 1fr 48px",
                  md: "70px 1fr 48px",
                },
                alignItems: "center",
                columnGap: { xs: "12px", md: "24px" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  pl: { xs: 0, md: "40px" },
                }}
              >
                <Box sx={{ display: { xs: "flex", sm: "none" } }}>
                  <IconButton
                    onClick={() => setMenuOpen(true)}
                    sx={{ p: 0, display: "flex", alignItems: "center" }}
                  >
                    <MenuIcon
                      sx={{
                        fontSize: { xs: 38, sm: 42 },
                        color: "#282828",
                      }}
                    />
                  </IconButton>
                </Box>

                <Box sx={{ display: { xs: "none", sm: "flex" } }}>
                  <Link to="/" style={{ display: "flex" }}>
                    <Box
                      component="img"
                      src={logoImg}
                      alt="logo"
                      sx={{
                        width: { sm: "56px", md: "70px" },
                        height: { sm: "56px", md: "70px" },
                      }}
                    />
                  </Link>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: { xs: "flex", sm: "none" } }}>
                  <Link to="/" style={{ display: "flex" }}>
                    <Box
                      component="img"
                      src={logoImg}
                      alt="logo"
                      sx={{
                        width: "56px",
                        height: "56px",
                      }}
                    />
                  </Link>
                </Box>

                <Box
                  sx={{
                    display: { xs: "none", sm: "flex" },
                    justifyContent: "center",
                    alignItems: "center",
                    gap: { sm: "16px", md: "24px", lg: "32px" },
                  }}
                >
                  {navItems.map((item) => (
                    <Box
                      key={item.path}
                      component={NavLink}
                      to={item.path}
                      end={item.path === "/"}
                      sx={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 500,
                        lineHeight: "130%",
                        textDecoration: "none",
                        transition: "0.2s ease",
                        fontSize: {
                          sm: "14px",
                          md: "20px",
                        },
                        color: "#282828",
                        "&.active": {
                          color: "#0D50FF",
                        },
                        "&:hover": {
                          color: "#0D50FF",
                        },
                      }}
                    >
                      {item.title}
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  pr: { xs: 0, md: "40px" },
                  position: "relative",
                }}
              >
                <IconButton
                  component={Link}
                  to="/cart"
                  sx={{ p: 0, display: "flex", alignItems: "center" }}
                >
                  <Box
                    component="img"
                    src={basketIcon}
                    alt="cart"
                    sx={{
                      width: { xs: "46px", md: "48px" },
                      height: { xs: "46px", md: "48px" },
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
        anchor="left"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: "280px",
              p: "20px",
              backgroundColor: "#FFFFFF",
            },
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: "24px" }}>
          <IconButton onClick={() => setMenuOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {navItems.map((item) => (
            <Box
              key={item.path}
              component={NavLink}
              to={item.path}
              end={item.path === "/"}
              onClick={() => setMenuOpen(false)}
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "20px",
                textDecoration: "none",
                color: "#282828",
                py: "12px",
                borderBottom: "1px solid #EEEEEE",
                "&.active": {
                  color: "#0D50FF",
                },
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