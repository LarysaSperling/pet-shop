import { useState } from "react";
import { Box } from "@mui/material";
import { API_URL } from "../../constants/api";
import placeholderImg from "../../assets/images/image-placeholder.svg";

// Builds a full URL for an image path from the API ("/product_img/1.jpeg").
// Returns null when there is no image.
function getImageUrl(path) {
  if (typeof path !== "string" || path.trim() === "") return null;

  return `${API_URL}/${path.replace(/^\/+/, "")}`;
}

/**
 * Image from the backend with a placeholder when the path is empty
 * or the file fails to load (onError).
 * Accepts the same `sx` as MUI Box.
 */
function FallbackImage({ path, alt, sx, ...props }) {
  const src = getImageUrl(path);

  // Remember which URL failed, so a new path is tried again
  const [failedSrc, setFailedSrc] = useState(null);
  const showPlaceholder = !src || failedSrc === src;

  return (
    <Box
      component="img"
      src={showPlaceholder ? placeholderImg : src}
      alt={alt}
      onError={() => {
        if (!showPlaceholder) setFailedSrc(src);
      }}
      sx={sx}
      {...props}
    />
  );
}

export default FallbackImage;
