import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

// After this many milliseconds we assume the free Render server is waking up
const SLOW_LOADING_DELAY = 4000;

function LoadingMessage({ text = "Loading..." }) {
  const [isSlow, setIsSlow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsSlow(true), SLOW_LOADING_DELAY);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      role="status"
      aria-live="polite"
      sx={{ display: "flex", alignItems: "flex-start", gap: "16px", py: "16px" }}
    >
      <CircularProgress size={24} sx={{ color: "#0D50FF", flexShrink: 0 }} />

      <Box>
        <Typography sx={{ fontFamily: "Montserrat, sans-serif", color: "#282828" }}>
          {text}
        </Typography>

        {isSlow && (
          <Typography
            sx={{
              mt: "8px",
              fontFamily: "Montserrat, sans-serif",
              fontSize: "14px",
              color: "#8B8B8B",
              maxWidth: "520px",
            }}
          >
            Server is waking up. The backend runs on a free hosting plan and
            sleeps when nobody uses it, so the first load can take up to a
            minute. Thanks for waiting!
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default LoadingMessage;
