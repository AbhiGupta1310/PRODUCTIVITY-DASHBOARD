import React, { useState, useEffect } from "react";
import { Edit2, Save } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const NoteEditor = ({ note, isEditing, onUpdateNote, onToggleEdit }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  // Update local state when note changes
  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
  }, [note.id, note.title, note.content]);

  const handleSave = () => {
    const updatedNote = {
      ...note,
      title: title.trim() === "" ? "Untitled Note" : title,
      content,
      updatedAt: new Date().toISOString(),
    };

    onUpdateNote(updatedNote);
    onToggleEdit();
  };

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between border-b border-gray-200 p-3 dark:border-gray-700">
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border-none bg-transparent p-0 text-base font-medium focus:outline-none focus:ring-0 dark:text-white"
            placeholder="Note title"
          />
        ) : (
          <h3 className="text-base font-medium">{title}</h3>
        )}
        <button
          onClick={isEditing ? handleSave : onToggleEdit}
          className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label={isEditing ? "Save note" : "Edit note"}
        >
          {isEditing ? (
            <Save size={18} className="text-success-500" />
          ) : (
            <Edit2 size={18} className="text-gray-500" />
          )}
        </button>
      </div>
      <div className="p-3">
        {isEditing ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="h-[250px] w-full resize-none border-none bg-transparent p-0 text-sm focus:outline-none focus:ring-0 dark:text-gray-200"
            placeholder="Write your note here... Markdown is supported!"
          />
        ) : (
          <div className="prose prose-sm h-[250px] max-w-none overflow-y-auto dark:prose-invert">
            {content ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            ) : (
              <p className="text-gray-400">This note is empty.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteEditor;
