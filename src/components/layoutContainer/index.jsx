import { Box } from "@mui/material";
import { MOBILE, mobile } from "../../theme/mobile";

// Centers page content and gives every page the same side padding
function LayoutContainer({ children, sx = {} }) {
  return (
    <Box
      sx={{
        maxWidth: "1360px",
        width: "100%",
        margin: "0 auto",
        px: mobile(MOBILE.gutter, { xs: "20px", md: "40px" }),
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export default LayoutContainer;
