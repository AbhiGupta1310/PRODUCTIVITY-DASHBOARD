import React from "react";
import { Check, Trash2 } from "lucide-react";
import { format } from "date-fns";

const TaskList = ({ tasks, onToggleComplete, onDeleteTask }) => {
  // Sort tasks: incomplete first, then by creation date (newest first)
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {sortedTasks.map((task) => (
        <li
          key={task.id}
          className={`animate-fade-in py-3 transition-colors duration-200 ${
            task.completed ? "bg-gray-50 dark:bg-gray-800/50" : ""
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <button
                onClick={() => onToggleComplete(task.id)}
                className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border ${
                  task.completed
                    ? "border-primary-500 bg-primary-500 text-white"
                    : "border-gray-300 dark:border-gray-600"
                }`}
                aria-label={
                  task.completed ? "Mark as incomplete" : "Mark as complete"
                }
              >
                {task.completed && <Check size={12} />}
              </button>
              <div>
                <p
                  className={`text-sm ${
                    task.completed
                      ? "text-gray-500 line-through dark:text-gray-400"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  {task.title}
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Added {format(new Date(task.createdAt), "MMM d, h:mm a")}
                </p>
              </div>
            </div>
            <button
              onClick={() => onDeleteTask(task.id)}
              className="group rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-error-500 dark:hover:bg-gray-700"
              aria-label="Delete task"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
