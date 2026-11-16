import {
  Box,
  Typography,
  Checkbox,
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import { SORT_OPTIONS } from "../../hooks/useProductFilters";

const labelSx = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 600,
  fontSize: "20px",
  lineHeight: "130%",
  color: "#282828",
};

const fieldSx = {
  height: "36px",
  borderRadius: "6px",
  fontFamily: "Montserrat, sans-serif",
  fontSize: "16px",
};

/**
 * Filter bar for product lists: price range, "discounted only" and sorting.
 * `idPrefix` keeps element ids unique per page.
 */
function ProductFilters({
  idPrefix,
  filters,
  priceError,
  onPriceChange,
  onFilterChange,
  sortOptions = SORT_OPTIONS,
}) {
  const priceLabelId = `${idPrefix}-price-label`;
  const priceErrorId = `${idPrefix}-price-error`;
  const sortLabelId = `${idPrefix}-sort-label`;
  const discountedId = `${idPrefix}-only-discounted`;

  const priceInputProps = (name, ariaLabel) => ({
    id: `${idPrefix}-${name === "priceFrom" ? "price-from" : "price-to"}`,
    name,
    value: filters[name],
    onChange: (event) => onPriceChange(name, event.target.value),
    placeholder: name === "priceFrom" ? "from" : "to",
    autoComplete: "off",
    error: Boolean(priceError),
    inputProps: {
      // Shows a numeric keyboard with a decimal point on phones
      inputMode: "decimal",
      "aria-label": ariaLabel,
      "aria-invalid": Boolean(priceError),
      "aria-describedby": priceError ? priceErrorId : undefined,
    },
    // On phones both fields share the row equally, from 600px they are 112px
    sx: {
      ...fieldSx,
      width: { xs: "auto", sm: "112px" },
      flex: { xs: "1 1 0", sm: "0 0 auto" },
      minWidth: 0,
    },
  });

  // On phones each filter group takes a full row
  const groupSx = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    width: { xs: "100%", sm: "auto" },
  };

  return (
    <Box sx={{ mb: "40px" }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: { xs: "16px", md: "24px 40px" },
          alignItems: "center",
        }}
      >
        <Box
          role="group"
          aria-labelledby={priceLabelId}
          sx={groupSx}
        >
          <Typography id={priceLabelId} sx={labelSx}>
            Price
          </Typography>

          <OutlinedInput {...priceInputProps("priceFrom", "Minimum price")} />
          <OutlinedInput {...priceInputProps("priceTo", "Maximum price")} />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Typography component="label" htmlFor={discountedId} sx={labelSx}>
            Discounted items
          </Typography>

          <Checkbox
            id={discountedId}
            name="onlyDiscounted"
            checked={filters.onlyDiscounted}
            onChange={(event) =>
              onFilterChange("onlyDiscounted", event.target.checked)
            }
            sx={{ p: 0, "& .MuiSvgIcon-root": { fontSize: 32 } }}
          />
        </Box>

        <Box sx={groupSx}>
          <Typography id={sortLabelId} sx={labelSx}>
            Sorted
          </Typography>

          <FormControl
            sx={{
              minWidth: { xs: 0, sm: "200px" },
              flex: { xs: "1 1 auto", sm: "0 0 auto" },
            }}
          >
            <Select
              id={`${idPrefix}-sort`}
              labelId={sortLabelId}
              name="sortType"
              value={filters.sortType}
              onChange={(event) =>
                onFilterChange("sortType", event.target.value)
              }
              size="small"
              sx={fieldSx}
            >
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {priceError && (
        <Typography
          id={priceErrorId}
          role="alert"
          sx={{
            mt: "12px",
            fontFamily: "Montserrat, sans-serif",
            fontSize: "14px",
            color: "error.main",
          }}
        >
          {priceError}
        </Typography>
      )}
    </Box>
  );
}

export default ProductFilters;
