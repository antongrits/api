import { Link, useLoaderData, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useContext } from "react";
import { UserContext } from "../components/UserContextProvider";
import API from "../utils/API";

export default function ViewNote() {
  const { note } = useLoaderData();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleDelNote = async () => {
    await API.deleteNote(note.id);
    navigate(`/notes/${user.id}`, { replace: true });
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-4">
        <Link
          className="p-3 px-9 flex justify-center items-center outline-none no-underline bg-gray-200 transition duration-300 ease-linear hover:bg-gray-400 hover:text-white"
          to={`/notes/${user?.id}`}
        >
          Back
        </Link>
        <h1 className="text-5xl text-center m-0 mb-2 break-all">
          {note?.name}
        </h1>
        <div className="flex gap-3">
          <Link
            className="transition duration-300 ease-linear text-black hover:text-blue-600"
            to={`/notes/${user?.id}/edit-note/${note?.id}`}
          >
            <EditIcon sx={{ fontSize: "28px" }} />
          </Link>
          <button
            className="transition duration-300 ease-linear text-black hover:text-red-500"
            onClick={handleDelNote}
          >
            <DeleteIcon sx={{ fontSize: "28px" }} />
          </button>
        </div>
      </div>
      <pre
        style={{ height: "23rem", fontFamily: "Roboto" }}
        className="h-40rem m-0 overflow-y-auto whitespace-break-spaces bg-gray-200 text-black text-xl"
      >
        {note?.text}
      </pre>
    </div>
  );
}
