import React from "react";
import TaskManager from "../features/tasks/TaskManager";
import NotesSection from "../features/notes/NotesSection";
import WeatherWidget from "../features/weather/WeatherWidget";
import QuoteWidget from "../features/quote/QuoteWidget";

const Dashboard = () => {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="card col-span-1 animate-fade-in md:col-span-2">
          <WeatherWidget />
        </div>
        <div className="card animate-fade-in">
          <QuoteWidget />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="card animate-fade-in">
          <TaskManager />
        </div>
        <div className="card animate-fade-in">
          <NotesSection />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
