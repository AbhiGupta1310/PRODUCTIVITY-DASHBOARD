import React, { useState, useEffect } from "react";
import { Clock, Play, Pause, RotateCcw } from "lucide-react";

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("work"); // 'work' or 'break'

  useEffect(() => {
    let interval;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (mode === "work") {
        setMode("break");
        setTimeLeft(5 * 60); // 5-minute break
      } else {
        setMode("work");
        setTimeLeft(25 * 60);
      }
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMode("work");
    setTimeLeft(25 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="text-accent-500" size={24} />
          <h2 className="text-xl font-semibold">Pomodoro Timer</h2>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400">
            {mode === "work" ? "Work Time" : "Break Time"}
          </h3>
          <div className="mt-2 text-6xl font-bold text-accent-500">
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={toggleTimer}
            className="flex items-center gap-2 rounded-lg bg-accent-500 px-6 py-2 text-white transition-colors hover:bg-accent-600"
          >
            {isRunning ? <Pause size={20} /> : <Play size={20} />}
            <span>{isRunning ? "Pause" : "Start"}</span>
          </button>
          <button
            onClick={resetTimer}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-2 text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <RotateCcw size={20} />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
