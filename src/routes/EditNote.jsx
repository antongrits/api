import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Note } from "../utils/validation";
import API from "../utils/API";
import NoteForm from "../components/NoteForm";

export const loader = async ({ params: { id, noteId } }) => {
  await API.getUserByParams({ id });
  const note = await API.getNoteById(noteId);
  return { note };
};

export default function EditNote() {
  const { note } = useLoaderData();
  const navigate = useNavigate();

  const [name, setName] = useState(note.name);
  const [text, setText] = useState(note.text);
  const [errors, setErrors] = useState(null);

  async function handleEditNote() {
    try {
      const updatedNote = Note.parse({
        name,
        date: Date.now(),
        text,
      });
      setErrors(null);
      await API.updateNote(note.id, updatedNote);
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
      title="Edit note"
      buttonName="Save"
      OnSetName={setName}
      OnSetText={setText}
      errors={errors}
      name={name}
      text={text}
      OnNoteSubmit={handleEditNote}
    />
  );
}
