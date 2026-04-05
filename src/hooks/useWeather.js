import { useCallback, useEffect, useState } from "react";

import {
  fetchAirQualityByCoords,
  fetchCitySuggestions,
  fetchForecastByCoords,
  fetchWeatherByCity,
  fetchWeatherByCoords,
} from "../services/weatherService";

import {
  formatAirQualityData,
  formatCitySuggestions,
  formatCurrentWeather,
  formatForecastData,
  formatHourlyForecastData,
} from "../utils/formatWeatherData";

function useWeather() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [airQuality, setAirQuality] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState(() => {
    try {
      const savedHistory = localStorage.getItem("skysense-search-history");
      return savedHistory ? JSON.parse(savedHistory) : [];
    } catch {
      return [];
    }
  });

  const updateSearchHistory = useCallback((city) => {
    setSearchHistory((currentHistory) => {
      const nextHistory = [
        city,
        ...currentHistory.filter(
          (historyItem) =>
            historyItem.toLowerCase() !== city.toLowerCase(),
        ),
      ].slice(0, 6);

      localStorage.setItem(
        "skysense-search-history",
        JSON.stringify(nextHistory),
      );

      return nextHistory;
    });
  }, []);

  const removeHistoryItem = useCallback((city) => {
    setSearchHistory((currentHistory) => {
      const nextHistory = currentHistory.filter(
        (historyItem) => historyItem.toLowerCase() !== city.toLowerCase(),
      );

      localStorage.setItem(
        "skysense-search-history",
        JSON.stringify(nextHistory),
      );

      return nextHistory;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setSearchHistory([]);
    localStorage.removeItem("skysense-search-history");
  }, []);

  const applyWeatherPayload = useCallback(
    (weatherData, forecastData, airQualityData) => {
      setWeather(formatCurrentWeather(weatherData));
      setForecast(formatForecastData(forecastData));
      setHourlyForecast(formatHourlyForecastData(forecastData));
      setAirQuality(formatAirQualityData(airQualityData));
      updateSearchHistory(weatherData.name);
      setSuggestions([]);
    },
    [updateSearchHistory],
  );

  const resetWeatherState = useCallback(() => {
    setWeather(null);
    setForecast([]);
    setHourlyForecast([]);
    setAirQuality(null);
  }, []);

  const searchByCity = useCallback(async (city) => {
    try {
      setIsLoading(true);
      setError("");

      const weatherData = await fetchWeatherByCity(city);
      const [forecastData, airQualityData] = await Promise.all([
        fetchForecastByCoords(weatherData.coord.lat, weatherData.coord.lon),
        fetchAirQualityByCoords(weatherData.coord.lat, weatherData.coord.lon),
      ]);

      applyWeatherPayload(weatherData, forecastData, airQualityData);
    } catch (err) {
      resetWeatherState();
      setError(err.message || "Unable to fetch weather data.");
    } finally {
      setIsLoading(false);
    }
  }, [applyWeatherPayload, resetWeatherState]);

  const searchByCoords = useCallback(async (lat, lon) => {
    try {
      setIsLoading(true);
      setError("");

      const [weatherData, forecastData, airQualityData] = await Promise.all([
        fetchWeatherByCoords(lat, lon),
        fetchForecastByCoords(lat, lon),
        fetchAirQualityByCoords(lat, lon),
      ]);

      applyWeatherPayload(weatherData, forecastData, airQualityData);
    } catch (err) {
      resetWeatherState();
      setError(err.message || "Unable to fetch weather data.");
    } finally {
      setIsLoading(false);
    }
  }, [applyWeatherPayload, resetWeatherState]);

  const searchBySuggestion = useCallback(
    async (suggestion) => {
      setQuery(suggestion.label);
      await searchByCoords(suggestion.lat, suggestion.lon);
      setQuery("");
    },
    [searchByCoords],
  );

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length < 2) {
      setSuggestions([]);
      setIsSuggestionsLoading(false);
      return undefined;
    }

    const timeoutId = window.setTimeout(async () => {
      try {
        setIsSuggestionsLoading(true);
        const results = await fetchCitySuggestions(trimmedQuery);
        setSuggestions(formatCitySuggestions(results));
      } catch {
        setSuggestions([]);
      } finally {
        setIsSuggestionsLoading(false);
      }
    }, 300);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [query]);

  useEffect(() => {
    void searchByCity("Srinagar");
  }, [searchByCity]);

  return {
    query,
    setQuery,
    weather,
    forecast,
    hourlyForecast,
    airQuality,
    isLoading,
    error,
    suggestions,
    isSuggestionsLoading,
    searchHistory,
    searchByCity,
    searchByCoords,
    searchBySuggestion,
    removeHistoryItem,
    clearHistory,
  };
}

export default useWeather;
