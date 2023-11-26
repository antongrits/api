import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useCallback } from "react";

function Notes({ note, onDelNote }) {
  const navigate = useNavigate();

  const handleDel = useCallback(() => {
    onDelNote(note.id);
  }, [note.id, onDelNote]);

  return (
    <div className="w-full flex justify-between items-center gap-3 p-3 bg-gray-200 transition duration-300 ease-linear hover:bg-gray-400 hover:text-white">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate(`./view-note/${note.id}`)}
      >
        <span className="font-medium break-all text-xl">{note.name}</span>
        <span className="text-xl">
          {new Date(note.date).toLocaleDateString()}
        </span>
      </div>
      <div className="flex gap-3">
        <Link
          className="transition duration-300 ease-linear text-black hover:text-blue-600"
          to={`./edit-note/${note.id}`}
        >
          <EditIcon sx={{ fontSize: "28px" }} />
        </Link>
        <button
          className="transition duration-300 ease-linear text-black hover:text-red-500"
          onClick={handleDel}
        >
          <DeleteIcon sx={{ fontSize: "28px" }} />
        </button>
      </div>
    </div>
  );
}

export default React.memo(Notes);
