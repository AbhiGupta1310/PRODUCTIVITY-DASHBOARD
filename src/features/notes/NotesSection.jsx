import React, { useState, useEffect } from "react";
import { FilePenLine, Plus } from "lucide-react";
import NoteEditor from "./NoteEditor";
import NotesList from "./NotesList";

const NotesSection = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [activeNoteId, setActiveNoteId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Load active note from localStorage if available
  useEffect(() => {
    const savedActiveNoteId = localStorage.getItem("activeNoteId");
    if (
      savedActiveNoteId &&
      notes.some((note) => note.id === savedActiveNoteId)
    ) {
      setActiveNoteId(savedActiveNoteId);
    } else if (notes.length > 0) {
      setActiveNoteId(notes[0].id);
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Save active note ID to localStorage whenever it changes
  useEffect(() => {
    if (activeNoteId) {
      localStorage.setItem("activeNoteId", activeNoteId);
    } else {
      localStorage.removeItem("activeNoteId");
    }
  }, [activeNoteId]);

  const createNewNote = () => {
    const newNote = {
      id: crypto.randomUUID(),
      title: "Untitled Note",
      content: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
    setIsEditing(true);
  };

  const updateNote = (updatedNote) => {
    setNotes(
      notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));

    if (activeNoteId === id) {
      if (notes.length > 1) {
        // Set the first remaining note as active
        const remainingNotes = notes.filter((note) => note.id !== id);
        setActiveNoteId(remainingNotes[0]?.id || null);
      } else {
        setActiveNoteId(null);
      }
    }
  };

  const activeNote = notes.find((note) => note.id === activeNoteId) || null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FilePenLine
            className="text-secondary-600 dark:text-secondary-400"
            size={24}
          />
          <h2 className="text-xl font-semibold">Notes</h2>
        </div>
        <button
          onClick={createNewNote}
          className="button-secondary flex h-8 w-8 items-center justify-center rounded-full p-0"
          aria-label="Create new note"
        >
          <Plus size={18} />
        </button>
      </div>

      {notes.length > 0 ? (
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="md:col-span-1">
            <NotesList
              notes={notes}
              activeNoteId={activeNoteId}
              onSelectNote={setActiveNoteId}
              onDeleteNote={deleteNote}
            />
          </div>
          <div className="md:col-span-2">
            {activeNote && (
              <NoteEditor
                note={activeNote}
                isEditing={isEditing}
                onUpdateNote={updateNote}
                onToggleEdit={() => setIsEditing(!isEditing)}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="mt-4 animate-fade-in rounded-lg bg-gray-50 p-6 text-center dark:bg-gray-700/30">
          <FilePenLine className="mx-auto mb-2 text-gray-400" size={24} />
          <p className="text-gray-500 dark:text-gray-400">
            No notes yet. Create a note to get started!
          </p>
          <button onClick={createNewNote} className="button-secondary mt-4">
            Create Note
          </button>
        </div>
      )}
    </div>
  );
};

export default NotesSection;
