import { Box } from "@mui/material";

function LayoutContainer({ children, sx = {} }) {
  return (
    <Box
      sx={{
        maxWidth: "1360px",
        width: "100%",
        margin: "0 auto",
        px: { xs: "20px", md: "40px" },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export default LayoutContainer;