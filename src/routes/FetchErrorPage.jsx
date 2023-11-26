import { Box, Typography } from "@mui/material";
import { useRouteError } from "react-router-dom";

export default function FetchErrorPage() {
  const error = useRouteError();
  return (
    <Box className="prose max-w-full h-screen flex flex-col justify-center items-center gap-4 text-center">
      <Typography variant="h3">Oops!</Typography>
      <Typography variant="h2" sx={{ fontWeight: 500 }}>
        {error.statusText || error.message}
      </Typography>
    </Box>
  );
}
