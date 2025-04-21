import React from "react";
import { MoonStar, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import Clock from "./Clock";
import SideNav from "./SideNav";

const Layout = ({ children }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm dark:bg-gray-800/80 md:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-semibold text-primary-600 dark:text-primary-400 md:text-2xl">
              ProductivityHub
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Clock />
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <MoonStar size={20} />}
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        <SideNav />
        <main className="flex-1 px-4 py-6 md:px-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
