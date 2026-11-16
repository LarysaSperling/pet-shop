import { useMemo } from "react";
import useLocalStorage from "./useLocalStorage";

const BASE_FILTERS = {
  priceFrom: "",
  priceTo: "",
  onlyDiscounted: false,
  sortType: "default",
};

export const SORT_OPTIONS = [
  { value: "default", label: "by default" },
  { value: "price-asc", label: "price: low to high" },
  { value: "price-desc", label: "price: high to low" },
  { value: "title", label: "alphabetically" },
];

export const DISCOUNT_SORT_OPTION = {
  value: "discount-desc",
  label: "biggest discount",
};

export const getCurrentPrice = (product) =>
  Number(product.discont_price ?? product.price);

export const hasDiscount = (product) =>
  product.discont_price !== null &&
  product.discont_price !== undefined &&
  Number(product.discont_price) < Number(product.price);

export const getDiscountPercent = (product) =>
  hasDiscount(product)
    ? Math.round(
        ((Number(product.price) - Number(product.discont_price)) /
          Number(product.price)) *
          100
      )
    : 0;

// Keeps only digits and one decimal point (comma is turned into a point,
// max 2 decimals). Works the same for typing, pasting and mobile keyboards.
// Examples: "-12abc" -> "12", "007" -> "7", ".25" -> "0.25", ",5" -> "0.5"
export function sanitizePriceInput(value) {
  const cleaned = value.replace(/,/g, ".").replace(/[^\d.]/g, "");
  const [rawInteger, ...decimalParts] = cleaned.split(".");

  // Remove leading zeros, but keep a single "0" ("007" -> "7", "00" -> "0")
  let integerPart = rawInteger.replace(/^0+(?=\d)/, "").slice(0, 7);

  if (decimalParts.length === 0) {
    return integerPart;
  }

  // A price can't start with a point: ".25" -> "0.25"
  if (integerPart === "") {
    integerPart = "0";
  }

  return `${integerPart}.${decimalParts.join("").slice(0, 2)}`;
}

// Returns a number, or null when the field is empty
function parsePrice(value) {
  if (value === "" || value === ".") return null;

  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function sortProducts(products, sortType) {
  const sorted = [...products];

  switch (sortType) {
    case "price-asc":
      return sorted.sort((a, b) => getCurrentPrice(a) - getCurrentPrice(b));
    case "price-desc":
      return sorted.sort((a, b) => getCurrentPrice(b) - getCurrentPrice(a));
    case "title":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "discount-desc":
      return sorted.sort(
        (a, b) => getDiscountPercent(b) - getDiscountPercent(a)
      );
    default:
      return sorted;
  }
}

/**
 * Shared filter + sort logic for product list pages.
 * Filters are saved in localStorage under `storageKey`.
 */
function useProductFilters(
  products,
  storageKey,
  initialFilters = {},
  sortOptions = SORT_OPTIONS
) {
  const defaultFilters = { ...BASE_FILTERS, ...initialFilters };

  const [storedFilters, setStoredFilters] = useLocalStorage(
    storageKey,
    defaultFilters
  );

  // Old or broken values from localStorage are cleaned up here
  const merged = { ...defaultFilters, ...storedFilters };
  const filters = {
    priceFrom: sanitizePriceInput(String(merged.priceFrom ?? "")),
    priceTo: sanitizePriceInput(String(merged.priceTo ?? "")),
    onlyDiscounted: Boolean(merged.onlyDiscounted),
    sortType: sortOptions.some((option) => option.value === merged.sortType)
      ? merged.sortType
      : "default",
  };
  const { priceFrom, priceTo, onlyDiscounted, sortType } = filters;

  const minPrice = parsePrice(priceFrom);
  const maxPrice = parsePrice(priceTo);

  const priceError =
    minPrice !== null && maxPrice !== null && minPrice > maxPrice
      ? "“From” price can’t be higher than “to” price."
      : "";

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      const price = getCurrentPrice(product);

      // While the range is invalid, the price filter is not applied
      if (!priceError) {
        if (minPrice !== null && price < minPrice) return false;
        if (maxPrice !== null && price > maxPrice) return false;
      }

      if (onlyDiscounted && !hasDiscount(product)) return false;

      return true;
    });

    return sortProducts(result, sortType);
  }, [products, minPrice, maxPrice, priceError, onlyDiscounted, sortType]);

  const setFilter = (name, value) => {
    setStoredFilters((prev) => ({ ...defaultFilters, ...prev, [name]: value }));
  };

  const setPrice = (name, rawValue) => {
    setFilter(name, sanitizePriceInput(rawValue));
  };

  const resetFilters = () => {
    setStoredFilters(defaultFilters);
  };

  return {
    filters,
    filteredProducts,
    priceError,
    setFilter,
    setPrice,
    resetFilters,
  };
}

export default useProductFilters;
