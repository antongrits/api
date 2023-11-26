import { Link, useLoaderData, useNavigate } from "react-router-dom";
import API from "../utils/API";
import Note from "../components/Note";

export const loader = async ({ params: { id } }) => {
  await API.getUserByParams({ id });
  const userNotes = await API.getUserNotes(id);
  return { userNotes };
};

export default function Notes() {
  const { userNotes } = useLoaderData();
  const navigate = useNavigate();

  const handleDelNote = async (id) => {
    await API.deleteNote(id);
    navigate(".", { replace: true });
  };

  return (
    <div className="h-full flex flex-col justify-start items-center gap-7">
      <h1 className="text-5xl text-center m-0 mb-2">Notes</h1>
      <Link
        className="w-2/4 max-w-xs p-3 flex justify-center items-center outline-none no-underline bg-gray-200 transition duration-300 ease-linear hover:bg-gray-400 hover:text-white"
        to="./create-note"
      >
        Add new note
      </Link>
      <div className="w-full flex flex-col gap-3">
        {userNotes?.length > 0 ? (
          userNotes
            .sort((a, b) => b.date - a.date)
            .map((userNote) => (
              <Note
                key={userNote.id}
                note={userNote}
                onDelNote={handleDelNote}
              />
            ))
        ) : (
          <div className="flex justify-center text-2xl">No notes yet</div>
        )}
      </div>
    </div>
  );
}
