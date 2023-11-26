import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./routes/Login";
import UserContextProvider from "./components/UserContextProvider";
import RequireAuth from "./components/RequireAuth";
import SignUp from "./routes/SignUp";
import Layout from "./routes/Layout";
import LayoutAuthorized from "./routes/LayoutAuthorized";
import About from "./routes/About";
import Notes, { loader as notesLoader } from "./routes/Notes";
import CreateNote from "./routes/CreateNote";
import EditNote, { loader as noteLoader } from "./routes/EditNote";
import ViewNote from "./routes/ViewNote";
import ErrorPage from "./routes/ErrorPage";
import FetchErrorPage from "./routes/FetchErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/",
        element: (
          <RequireAuth>
            <LayoutAuthorized />
          </RequireAuth>
        ),

        children: [
          {
            path: "/",
            element: <About />,
            errorElement: <FetchErrorPage />,
          },
          {
            path: "/notes/:id",
            element: <Notes />,
            loader: notesLoader,
            errorElement: <FetchErrorPage />,
          },
          {
            path: "/notes/:id/create-note",
            element: <CreateNote />,
            errorElement: <FetchErrorPage />,
          },
          {
            path: "/notes/:id/edit-note/:noteId",
            element: <EditNote />,
            loader: noteLoader,
            errorElement: <FetchErrorPage />,
          },
          {
            path: "/notes/:id/view-note/:noteId",
            element: <ViewNote />,
            loader: noteLoader,
            errorElement: <FetchErrorPage />,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}
