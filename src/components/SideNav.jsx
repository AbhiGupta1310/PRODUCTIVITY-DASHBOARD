import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Calendar,
  CheckSquare,
  Clock,
  FilePenLine,
  Home,
  Menu,
  X,
  Cloud,
} from "lucide-react";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const menuItems = [
    { icon: <Home size={20} />, label: "Dashboard", path: "/" },
    { icon: <CheckSquare size={20} />, label: "Tasks", path: "/tasks" },
    { icon: <FilePenLine size={20} />, label: "Notes", path: "/notes" },
    { icon: <Cloud size={20} />, label: "Weather", path: "/weather" },
    { icon: <Calendar size={20} />, label: "Calendar", path: "/calendar" },
    { icon: <Clock size={20} />, label: "Pomodoro", path: "/pomodoro" },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleNav}
        className="fixed left-4 top-4 z-30 rounded-full bg-primary-600 p-3 text-white shadow-lg md:hidden"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay when menu is open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={toggleNav}
          aria-hidden="true"
        />
      )}

      {/* Sidebar navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-20 w-64 transform bg-white transition-transform duration-300 ease-in-out dark:bg-gray-800 md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col p-4">
          <div className="mb-8 flex items-center justify-center py-4">
            <h2 className="text-xl font-semibold text-primary-600 dark:text-primary-400">
              ProductivityHub
            </h2>
          </div>

          <nav className="flex-1 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex w-full items-center space-x-3 rounded-lg px-4 py-3 transition hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  location.pathname === item.path
                    ? "bg-primary-50 text-primary-600 dark:bg-gray-700/50 dark:text-primary-400"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="pt-6">
            <div className="card text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ProductivityHub v1.0
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideNav;
