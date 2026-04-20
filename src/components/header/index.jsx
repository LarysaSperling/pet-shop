import { AppBar, Toolbar, Box, IconButton } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import basketIcon from "../../assets/icons/basket.svg";
import logoImg from "../../assets/icons/logo.svg";

function Header() {
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

  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: "#FFFFFF", boxShadow: "none" }}>
      <Box sx={{ maxWidth: "1440px", width: "100%", margin: "0 auto" }}>
        <Box sx={{ borderBottom: "1px solid #DDDDDD" }}>
          <Toolbar
            disableGutters
            sx={{
              minHeight: "128px",
              py: "20px",
              display: "grid",
              gridTemplateColumns: "70px 1fr 48px",
              alignItems: "center",
              columnGap: "24px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", pl: "40px" }}>
              <Link to="/" style={{ display: "flex" }}>
                <Box component="img" src={logoImg} alt="logo" sx={{ width: "70px", height: "70px", display: "block" }} />
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

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", pr: "40px", position: "relative" }}>
              <IconButton component={Link} to="/cart" sx={{ p: 0, position: "relative" }}>
                <Box component="img" src={basketIcon} alt="cart" sx={{ width: "48px", height: "48px", display: "block" }} />

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
  );
}

export default Header;