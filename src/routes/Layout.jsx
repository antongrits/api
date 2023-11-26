import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Divider from "@mui/material/Divider";

export default function Layout() {
  return (
    <Container
      sx={{ display: "flex" }}
      className="prose max-w-full h-screen flex-col justify-between"
    >
      <div className="flex-grow pt-3 pb-3">
        <Outlet />
      </div>
      <Divider />
      <footer className="flex justify-between pt-8 pb-8">
        <span className="text-gray-400 text-lg">Created by: Anton Grits</span>
        <span className="text-gray-400 text-lg">BSU: 2023</span>
      </footer>
    </Container>
  );
}
