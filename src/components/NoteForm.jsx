import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContextProvider";

function NoteForm({
  title,
  buttonName,
  OnSetName,
  OnSetText,
  errors,
  name,
  text,
  OnNoteSubmit,
}) {
  const { user } = useContext(UserContext);
  return (
    <div className="flex flex-col gap-10">
      <div className="relative flex flex-col sm:flex-row items-center gap-4 sm:gap-4">
        <Link
          className="z-10 p-3 px-9 flex justify-center items-center outline-none no-underline bg-gray-200 transition duration-300 ease-linear hover:bg-gray-400 hover:text-white"
          to={`/notes/${user.id}`}
        >
          Back
        </Link>
        <h1 className="w-full relative sm:absolute left-0 mb-0 text-5xl text-center">
          {title}
        </h1>
      </div>
      <div className="flex flex-col items-center gap-4">
        <input
          type="text"
          className="w-full p-2 text-xl outline-none bg-gray-200"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => OnSetName(e.target.value)}
        />
        {errors?.name && (
          <div className="text-red-500">{errors?.name?._errors}</div>
        )}
        <textarea
          placeholder="Note text..."
          rows={10}
          className="w-full p-2 text-xl outline-none bg-gray-200 resize-none"
          value={text}
          onChange={(e) => OnSetText(e.target.value)}
        />
        <button
          className="w-2/4 max-w-xs p-3 outline-none bg-gray-200 transition duration-300 ease-linear hover:bg-gray-400 hover:text-white"
          onClick={OnNoteSubmit}
        >
          {buttonName}
        </button>
      </div>
    </div>
  );
}

export default React.memo(NoteForm);
