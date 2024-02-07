import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserContextProvider";
import { z } from "zod";
import { Note } from "../utils/validation";
import API from "../utils/API";
import NoteForm from "../components/NoteForm";

export default function CreateNote() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [errors, setErrors] = useState(null);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  async function handleCreateNote() {
    try {
      const note = Note.parse({
        userId: user.id,
        id: uuid(),
        name,
        date: Date.now(),
        text,
      });
      setErrors(null);
      await API.sendNote(note);
      navigate(`/notes/${note.userId}/view-note/${note.id}`);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.format());
        return;
      }
    }
  }

  return (
    <NoteForm
      title="Create new note"
      buttonName="Create"
      OnSetName={setName}
      OnSetText={setText}
      errors={errors}
      name={name}
      text={text}
      OnNoteSubmit={handleCreateNote}
    />
  );
}
