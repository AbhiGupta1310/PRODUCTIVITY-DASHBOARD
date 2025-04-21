import React, { useState, useEffect } from "react";
import { Cloud, CloudRainWind, Search, Sun, Wind } from "lucide-react";
import { useWeather } from "./useWeather";

const WeatherWidget = () => {
  const [city, setCity] = useState(() => {
    return localStorage.getItem("weatherCity") || "San Francisco";
  });

  const [searchQuery, setSearchQuery] = useState(city);

  const { weather, loading, error, fetchWeather } = useWeather();

  useEffect(() => {
    fetchWeather(city);
  }, []);

  useEffect(() => {
    if (city) {
      localStorage.setItem("weatherCity", city);
    }
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCity(searchQuery.trim());
      fetchWeather(searchQuery.trim());
    }
  };

  const getWeatherIcon = (condition) => {
    const conditionLower = condition.toLowerCase();

    if (conditionLower.includes("clear") || conditionLower.includes("sun")) {
      return <Sun size={36} className="text-accent-500" />;
    } else if (
      conditionLower.includes("rain") ||
      conditionLower.includes("drizzle") ||
      conditionLower.includes("shower")
    ) {
      return <CloudRainWind size={36} className="text-primary-500" />;
    } else if (conditionLower.includes("cloud")) {
      return <Cloud size={36} className="text-gray-500" />;
    } else {
      return <Wind size={36} className="text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cloud className="text-accent-500" size={24} />
          <h2 className="text-xl font-semibold">Weather</h2>
        </div>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter city name..."
          className="input"
          aria-label="City name"
        />
        <button
          type="submit"
          className="button-accent flex h-10 w-10 items-center justify-center rounded-full p-0"
          aria-label="Search weather"
        >
          <Search size={20} />
        </button>
      </form>

      <div className="mt-4">
        {loading ? (
          <div className="flex h-32 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-primary-600"></div>
          </div>
        ) : error ? (
          <div className="flex h-32 flex-col items-center justify-center space-y-2 rounded-lg bg-red-50 p-4 text-center dark:bg-red-900/20">
            <p className="text-error-500">{error}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Try another city name or check your connection.
            </p>
          </div>
        ) : weather ? (
          <div className="animate-fade-in rounded-lg bg-gradient-to-br from-primary-50 to-accent-50 p-6 dark:from-gray-800 dark:to-gray-700">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <div>
                <h3 className="text-2xl font-semibold">{weather.city}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {weather.description}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {getWeatherIcon(weather.description)}
                <span className="text-3xl font-bold">
                  {weather.temperature}°
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Feels Like
                </p>
                <p className="font-semibold">{weather.feelsLike}°</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Humidity
                </p>
                <p className="font-semibold">{weather.humidity}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Wind</p>
                <p className="font-semibold">{weather.windSpeed} mph</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-32 items-center justify-center">
            <p>Enter a city to see the weather.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;
