import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../components/UserContextProvider";

export default function ErrorPage() {
  const { user } = useContext(UserContext);

  return (
    <Box className="prose max-w-full h-screen flex flex-col justify-center items-center gap-4 text-center">
      <Typography variant="h3">404</Typography>
      <Typography variant="h2" sx={{ fontWeight: 500 }}>
        Page not found
      </Typography>
      <Typography variant="h4">
        Go to page{" "}
        {user?.id ? (
          <Link to="/" replace>
            Home
          </Link>
        ) : (
          <Link to="/login" replace>
            Login
          </Link>
        )}
      </Typography>
    </Box>
  );
}
