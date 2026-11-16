import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { mobile } from "../../theme/mobile";

// Crumbs wrap to a new line on narrow screens.
// A very long last crumb (e.g. product title) is shortened with "…".
function Breadcrumbs({ items, mb = mobile("20px", "40px") }) {
  return (
    <Box
      component="nav"
      aria-label="Breadcrumb"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        rowGap: "8px",
        mb,
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
              minWidth: 0,
              maxWidth: "100%",
            }}
          >
            {index > 0 && <Box sx={separatorStyle} />}

            {item.to && !isLast ? (
              <Box component={Link} to={item.to} sx={btnStyle}>
                <Box component="span" sx={textStyle}>
                  {item.label}
                </Box>
              </Box>
            ) : (
              <Box
                sx={activeStyle}
                aria-current={isLast ? "page" : undefined}
                title={item.label}
              >
                <Box component="span" sx={textStyle}>
                  {item.label}
                </Box>
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
}

const commonStyle = {
  minHeight: { xs: "32px", sm: "36px" },
  px: { xs: "10px", sm: "16px" },
  borderRadius: "6px",
  display: "flex",
  alignItems: "center",
  fontFamily: "Montserrat, sans-serif",
  fontSize: { xs: "14px", sm: "16px" },
  fontWeight: 500,
  lineHeight: "126%",
  margin: 0,
  minWidth: 0,
  maxWidth: "100%",
  boxSizing: "border-box",
};

const textStyle = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
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
