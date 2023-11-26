import { NavLink, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../components/UserContextProvider";

export default function Layout() {
  const { user, logOut } = useContext(UserContext);

  return (
    <>
      <header className="flex flex-col sm:flex-row justify-between items-center pt-8 pb-8 gap-8">
        <h5 className="flex-grow font-normal text-black text-2xl text-center sm:text-left">
          Hello, {user?.email}
        </h5>
        <div className="flex gap-8">
          <NavLink
            to="/"
            end={true}
            className={({ isActive }) =>
              isActive
                ? "font-medium text-black text-2xl text-center no-underline"
                : "font-medium text-gray-400 text-2xl text-center no-underline transition duration-300 ease-linear hover:text-gray-600"
            }
          >
            About
          </NavLink>
          <NavLink
            to={`/notes/${user.id}`}
            end={true}
            className={({ isActive }) =>
              isActive
                ? "font-medium text-black text-2xl text-center no-underline"
                : "font-medium text-gray-400 text-2xl text-center no-underline transition duration-300 ease-linear hover:text-gray-600"
            }
          >
            Notes
          </NavLink>
          <button
            className="font-medium text-gray-400 text-2xl text-center transition duration-300 ease-linear hover:text-gray-600"
            onClick={() => logOut()}
          >
            Log out
          </button>
        </div>
      </header>
      <main className="flex-grow h-4/5 py-5">
        <Outlet />
      </main>
    </>
  );
}
