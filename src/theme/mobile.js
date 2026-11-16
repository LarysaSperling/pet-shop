/**
 * Shared size scale for phones (< 600px, MUI breakpoint "xs").
 *
 * Only the xs value comes from here. From "sm" (600px) up every component
 * keeps its own tablet/desktop values, so the desktop design is unchanged.
 *
 * clamp(min, preferred, max) scales smoothly between 320px and ~600px screens.
 */
export const MOBILE = {
  // Side padding of the page (same for every page, header and footer)
  gutter: "16px",

  // Typography
  h1: "clamp(28px, 8.5vw, 36px)", // page titles: "All products", "Shopping cart"
  h2: "clamp(24px, 7vw, 30px)", // section titles: "Categories", "Sale", "Contact"
  h3: "clamp(20px, 5.5vw, 24px)", // block titles: "Order details", contact values
  hero: "clamp(30px, 9.5vw, 40px)", // big title in the hero banner
  subtitle: "18px", // product title on product page, big secondary text
  body: "16px", // regular text, card titles, labels
  small: "14px", // hints, breadcrumbs, errors

  // Prices
  price: "clamp(20px, 6vw, 24px)", // price in product cards and cart rows
  priceLarge: "clamp(28px, 9vw, 40px)", // product page price, cart total
  oldPrice: "14px",

  // Controls
  controlHeight: "48px", // inputs and main buttons
  buttonFont: "16px",

  // Inner padding of cards and grey blocks
  cardPadding: "16px",
  blockPadding: "20px",

  // Vertical rhythm
  sectionGap: "40px", // space between home page sections
  pageTop: "24px", // space above page titles
  pageBottom: "48px", // space under page content (before the footer)
  titleGap: "24px", // space under page/section titles
};

/**
 * Responsive value: `mobileValue` below 600px, `fromSm` from 600px up.
 *
 * `fromSm` can be a plain value ("40px") or a breakpoint object
 * ({ xs: "40px", md: "64px" }). For an object the old xs value is moved
 * to sm, so screens >= 600px look exactly as before.
 *
 *   mobile(MOBILE.h1, { xs: "40px", md: "64px" })
 *   // -> { xs: "clamp(...)", sm: "40px", md: "64px" }
 */
export function mobile(mobileValue, fromSm) {
  if (fromSm !== null && typeof fromSm === "object") {
    // Keys in breakpoint order (xs, sm, md, lg, xl): MUI emits media
    // queries in this order, so a later key must not be overridden
    const result = { xs: mobileValue, sm: fromSm.sm ?? fromSm.xs };
    ["md", "lg", "xl"].forEach((key) => {
      if (fromSm[key] !== undefined) result[key] = fromSm[key];
    });
    return result;
  }

  return { xs: mobileValue, sm: fromSm };
}

// Space above and below the content of every page
export const PAGE_SPACING = {
  mt: mobile(MOBILE.pageTop, "40px"),
  mb: mobile(MOBILE.pageBottom, "80px"),
};
