import { Box } from "@mui/material";

function Section({ children, sx = {}, ...props }) {
  return (
    <Box
      sx={{
        width: "100%",
        mt: { xs: "40px", md: "80px" },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}

export default Section;