import React, { useState } from "react";
import { Plus } from "lucide-react";

const TaskForm = ({ onAddTask }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newTaskTitle.trim() === "") return;

    const newTask = {
      id: crypto.randomUUID(),
      title: newTaskTitle.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    onAddTask(newTask);
    setNewTaskTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        className="input"
        placeholder="Add a new task..."
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        aria-label="New task"
      />
      <button
        type="submit"
        className="button-primary flex h-10 w-10 items-center justify-center rounded-full p-0"
        aria-label="Add task"
        disabled={newTaskTitle.trim() === ""}
      >
        <Plus size={20} />
      </button>
    </form>
  );
};

export default TaskForm;
