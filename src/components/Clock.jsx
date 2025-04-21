import React, { useState, useEffect } from "react";
import { format } from "date-fns";

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timerId);
  }, []);

  const formattedTime = format(currentTime, "h:mm a");
  const formattedDate = format(currentTime, "EEEE, MMMM d");

  return (
    <div className="text-right">
      <p className="text-lg font-semibold leading-tight text-gray-900 dark:text-gray-100">
        {formattedTime}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {formattedDate}
      </p>
    </div>
  );
};

export default Clock;
