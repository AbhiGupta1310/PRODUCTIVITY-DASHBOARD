import React from "react";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";
// import { Note } from "./types";

const NotesList = ({ notes, activeNoteId, onSelectNote, onDeleteNote }) => {
  // Sort notes by last updated (newest first)
  const sortedNotes = [...notes].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <div className="h-[300px] overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {sortedNotes.map((note) => (
          <li
            key={note.id}
            className={`group cursor-pointer transition-colors ${
              note.id === activeNoteId
                ? "bg-primary-50 dark:bg-gray-700/50"
                : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
            }`}
          >
            <div
              className="flex items-start justify-between p-3"
              onClick={() => onSelectNote(note.id)}
            >
              <div className="min-w-0 flex-1">
                <h3
                  className={`truncate text-sm font-medium ${
                    note.id === activeNoteId
                      ? "text-primary-700 dark:text-primary-400"
                      : "text-gray-900 dark:text-gray-200"
                  }`}
                >
                  {note.title}
                </h3>
                <p className="mt-1 truncate text-xs text-gray-500">
                  {format(new Date(note.updatedAt), "MMM d, h:mm a")}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteNote(note.id);
                }}
                className="opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Delete note"
              >
                <Trash2
                  size={16}
                  className="text-gray-400 hover:text-error-500"
                />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesList;
