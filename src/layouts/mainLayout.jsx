import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import { Box } from "@mui/material";

function MainLayout() {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Box component="main" sx={{ flex: 1, width: "100%" }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

export default MainLayout;