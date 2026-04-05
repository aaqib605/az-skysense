import { useEffect, useState } from "react";

import {
  fetchForecastByCoords,
  fetchWeatherByCity,
  fetchWeatherByCoords,
} from "../services/weatherService";
import {
  formatCurrentWeather,
  formatForecastData,
} from "../utils/formatWeatherData";

function useWeather() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function searchByCity(city) {
    try {
      setIsLoading(true);
      setError("");

      const weatherData = await fetchWeatherByCity(city);
      const forecastData = await fetchForecastByCoords(
        weatherData.coord.lat,
        weatherData.coord.lon,
      );

      setWeather(formatCurrentWeather(weatherData));
      setForecast(formatForecastData(forecastData));
    } catch (err) {
      setWeather(null);
      setForecast([]);
      setError(err.message || "Unable to fetch weather data.");
    } finally {
      setIsLoading(false);
    }
  }

  async function searchByCoords(lat, lon) {
    try {
      setIsLoading(true);
      setError("");

      const weatherData = await fetchWeatherByCoords(lat, lon);
      const forecastData = await fetchForecastByCoords(lat, lon);

      setWeather(formatCurrentWeather(weatherData));
      setForecast(formatForecastData(forecastData));
    } catch (err) {
      setWeather(null);
      setForecast([]);
      setError(err.message || "Unable to fetch weather data.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    searchByCity("Srinagar");
  }, []);

  return {
    weather,
    forecast,
    isLoading,
    error,
    searchByCity,
    searchByCoords,
  };
}

export default useWeather;
