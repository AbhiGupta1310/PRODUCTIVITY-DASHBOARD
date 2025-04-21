import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Dashboard from "./components/Dashboard";
import TaskManager from "./features/tasks/TaskManager";
import NotesSection from "./features/notes/NotesSection";
import WeatherWidget from "./features/weather/WeatherWidget";
import CalendarView from "./features/calendar/CalendarView";
import PomodoroTimer from "./features/pomodoro/PomodoroTimer";
import Layout from "./components/Layout";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<TaskManager />} />
            <Route path="/notes" element={<NotesSection />} />
            <Route path="/weather" element={<WeatherWidget />} />
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="/pomodoro" element={<PomodoroTimer />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
