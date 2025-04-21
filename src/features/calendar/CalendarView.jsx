import React, { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
} from "date-fns";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const previousMonth = () => {
    setCurrentDate((prev) => subMonths(prev, 1));
  };

  const nextMonth = () => {
    setCurrentDate((prev) => addMonths(prev, 1));
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarIcon
            className="text-primary-600 dark:text-primary-400"
            size={24}
          />
          <h2 className="text-xl font-semibold">Calendar</h2>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={previousMonth}
            className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ChevronLeft size={20} />
          </button>
          <h3 className="text-lg font-semibold">
            {format(currentDate, "MMMM yyyy")}
          </h3>
          <button
            onClick={nextMonth}
            className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-sm font-semibold text-gray-500">
              {day}
            </div>
          ))}
          {daysInMonth.map((day) => (
            <div
              key={day.toISOString()}
              className={`rounded-full p-2 text-sm ${
                isToday(day)
                  ? "bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400"
                  : isSameMonth(day, currentDate)
                  ? "hover:bg-gray-100 dark:hover:bg-gray-700"
                  : "text-gray-400 dark:text-gray-600"
              }`}
            >
              {format(day, "d")}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
