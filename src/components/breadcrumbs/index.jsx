import { Box } from "@mui/material";
import { Link } from "react-router-dom";

function Breadcrumbs({ items, mb = "40px" }) {
  return (
    <Box
      sx={{
        overflowX: "auto",
        mb,
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
      }}
    >
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          minWidth: "max-content",
        }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {item.to && !isLast ? (
                <Box component={Link} to={item.to} sx={btnStyle}>
                  {item.label}
                </Box>
              ) : (
                <Box sx={activeStyle}>{item.label}</Box>
              )}

              {!isLast && <Box sx={separatorStyle} />}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

const commonStyle = {
  minHeight: { xs: "32px", sm: "36px" },
  px: { xs: "10px", sm: "16px" },
  borderRadius: "6px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Montserrat, sans-serif",
  fontSize: { xs: "14px", sm: "16px" },
  fontWeight: 500,
  lineHeight: "126%",
  whiteSpace: "nowrap",
  margin: 0,
  flexShrink: 0,
};

const btnStyle = {
  ...commonStyle,
  border: "1px solid #DDDDDD",
  textDecoration: "none",
  color: "#8B8B8B",
};

const activeStyle = {
  ...commonStyle,
  border: "1px solid #282828",
  color: "#282828",
};

const separatorStyle = {
  width: { xs: "12px", sm: "16px" },
  height: "1px",
  backgroundColor: "#DDDDDD",
  mx: "-1px",
  flexShrink: 0,
};

export default Breadcrumbs;