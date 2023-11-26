import { useContext } from "react";
import { UserContext } from "./UserContextProvider";
import { Navigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export default function RequireAuth({ children }) {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return (
      <div className="h-full flex justify-center items-center">
        <CircularProgress size={100} />
      </div>
    );
  }

  if (!user?.id) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
