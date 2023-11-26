import { useContext } from "react";
import { UserContext } from "../components/UserContextProvider";
import { Link } from "react-router-dom";

export default function About() {
  const { user } = useContext(UserContext);

  return (
    <div className="h-full flex flex-col justify-center items-center gap-20">
      <h1 className="text-5xl text-center m-0">About me</h1>
      <div className="flex flex-col items-center text-2xl">
        <p className="m-0 text-gray-400">
          <span className="font-medium text-black">Email: </span>
          {user.email}
        </p>
        <p className="m-0 text-gray-400">
          <span className="font-medium text-black">Date sign up: </span>
          {new Date(user.date).toLocaleString()}
        </p>
      </div>
      <Link
        className="w-2/4 max-w-xs p-3 flex justify-center items-center outline-none no-underline bg-gray-200 transition duration-300 ease-linear hover:bg-gray-400 hover:text-white"
        to={`/notes/${user.id}`}
      >
        Go to notes
      </Link>
    </div>
  );
}
