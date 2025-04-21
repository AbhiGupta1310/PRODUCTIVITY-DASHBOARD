import React, { useState, useEffect } from "react";
import { CheckSquare, Plus } from "lucide-react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

const TaskManager = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckSquare
            className="text-primary-600 dark:text-primary-400"
            size={24}
          />
          <h2 className="text-xl font-semibold">Tasks</h2>
        </div>
        {totalTasks > 0 && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {completedTasks} of {totalTasks} completed
          </div>
        )}
      </div>

      <TaskForm onAddTask={addTask} />

      <TaskList
        tasks={tasks}
        onToggleComplete={toggleTaskCompletion}
        onDeleteTask={deleteTask}
      />

      {tasks.length === 0 && (
        <div className="mt-4 animate-fade-in rounded-lg bg-gray-50 p-6 text-center dark:bg-gray-700/30">
          <Plus className="mx-auto mb-2 text-gray-400" size={24} />
          <p className="text-gray-500 dark:text-gray-400">
            No tasks yet. Add a task to get started!
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskManager;
