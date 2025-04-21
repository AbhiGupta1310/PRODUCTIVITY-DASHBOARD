import { useState, useCallback } from "react";

/**
 * @typedef {Object} Weather
 * @property {string} city - The name of the city.
 * @property {number} temperature - The current temperature.
 * @property {number} feelsLike - The "feels like" temperature.
 * @property {number} humidity - The humidity percentage.
 * @property {string} description - The weather description.
 * @property {number} windSpeed - The wind speed.
 * @property {string} icon - The weather icon code.
 */

export const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "1c624509f4165d6d100b9c3ea849eb89"; // This is a my api key

  const fetchWeather = useCallback(async (city) => {
    if (!city) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(
            "City not found. Please check the spelling and try again."
          );
        } else {
          throw new Error(
            "Failed to fetch weather data. Please try again later."
          );
        }
      }

      const data = await response.json();

      setWeather({
        city: data.name,
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        description: data.weather[0].description,
        windSpeed: Math.round(data.wind.speed),
        icon: data.weather[0].icon,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return { weather, loading, error, fetchWeather };
};
