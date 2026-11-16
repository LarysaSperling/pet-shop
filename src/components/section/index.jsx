import { Box } from "@mui/material";
import { MOBILE, mobile } from "../../theme/mobile";

function Section({ children, sx = {}, ...props }) {
  return (
    <Box
      sx={{
        width: "100%",
        mt: mobile(MOBILE.sectionGap, { xs: "40px", md: "80px" }),
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}

export default Section;
