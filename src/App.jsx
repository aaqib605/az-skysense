import { useEffect, useState } from "react";

import FavouriteCities from "./components/FavouriteCities";
import Header from "./components/Header";
import SearchHistory from "./components/SearchHistory";
import SearchSection from "./components/SearchSection";
import WeatherContent from "./components/WeatherContent";

import useWeather from "./hooks/useWeather";

import getWeatherTheme from "./utils/weatherThemes";

function App() {
  const [temperatureUnit, setTemperatureUnit] = useState("celsius");
  const [themeMode, setThemeMode] = useState(() => {
    try {
      return localStorage.getItem("skysense-theme-mode") || "dark";
    } catch {
      return "dark";
    }
  });
  const [locationError, setLocationError] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const [favouriteCities, setFavouriteCities] = useState(() => {
    try {
      const savedCities = localStorage.getItem("skysense-favourite-cities");
      return savedCities ? JSON.parse(savedCities) : [];
    } catch {
      return [];
    }
  });
  const {
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
  } = useWeather();

  const themeClassName = getWeatherTheme(weather);

  useEffect(() => {
    localStorage.setItem("skysense-theme-mode", themeMode);
  }, [themeMode]);

  useEffect(() => {
    localStorage.setItem(
      "skysense-favourite-cities",
      JSON.stringify(favouriteCities),
    );
  }, [favouriteCities]);

  async function handleSearch(cityToSearch) {
    const trimmedCity = cityToSearch.trim();

    if (!trimmedCity) return;

    setLocationError("");
    await searchByCity(trimmedCity);
    setQuery("");
  }

  async function handleCurrentLocation() {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported in this browser.");
      return;
    }

    setLocationError("");
    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await searchByCoords(latitude, longitude);
        setIsLocating(false);
      },
      (geoError) => {
        setIsLocating(false);

        if (geoError.code === geoError.PERMISSION_DENIED) {
          setLocationError("Location access was denied. Please allow it and try again.");
          return;
        }

        if (geoError.code === geoError.POSITION_UNAVAILABLE) {
          setLocationError("Your location could not be determined right now.");
          return;
        }

        if (geoError.code === geoError.TIMEOUT) {
          setLocationError("Location request timed out. Please try again.");
          return;
        }

        setLocationError("Unable to access your location right now.");
      },
    );
  }

  function handleToggleFavourite(city) {
    setFavouriteCities((currentCities) => {
      const alreadySaved = currentCities.some(
        (savedCity) => savedCity.toLowerCase() === city.toLowerCase(),
      );

      if (alreadySaved) {
        return currentCities.filter(
          (savedCity) => savedCity.toLowerCase() !== city.toLowerCase(),
        );
      }

      return [city, ...currentCities].slice(0, 6);
    });
  }

  function handleRemoveFavourite(city) {
    setFavouriteCities((currentCities) =>
      currentCities.filter(
        (savedCity) => savedCity.toLowerCase() !== city.toLowerCase(),
      ),
    );
  }

  const combinedError = error || locationError;
  const isCurrentCityFavourite = weather
    ? favouriteCities.some(
        (savedCity) => savedCity.toLowerCase() === weather.city.toLowerCase(),
      )
    : false;

  return (
    <div
      className={`app-shell ${themeMode} ${themeClassName} min-h-screen px-4 py-6 md:px-6 md:py-10`}
    >
      <main className="mx-auto w-full max-w-5xl">
        <Header
          temperatureUnit={temperatureUnit}
          onToggleUnit={setTemperatureUnit}
          themeMode={themeMode}
          onToggleTheme={() =>
            setThemeMode((currentTheme) =>
              currentTheme === "dark" ? "light" : "dark",
            )
          }
        />

        <SearchSection
          query={query}
          setQuery={setQuery}
          onSearch={handleSearch}
          onSelectSuggestion={searchBySuggestion}
          onUseCurrentLocation={handleCurrentLocation}
          isLoading={isLoading || isLocating}
          isLocating={isLocating}
          suggestions={suggestions}
          isSuggestionsLoading={isSuggestionsLoading}
        />

        <FavouriteCities
          cities={favouriteCities}
          onSelectCity={handleSearch}
          onDeleteCity={handleRemoveFavourite}
        />

        <SearchHistory
          history={searchHistory}
          onSelectCity={handleSearch}
          onDeleteCity={removeHistoryItem}
          onClearHistory={clearHistory}
        />

        <WeatherContent
          isLoading={isLoading}
          error={combinedError}
          weather={weather}
          forecast={forecast}
          hourlyForecast={hourlyForecast}
          airQuality={airQuality}
          temperatureUnit={temperatureUnit}
          isCurrentCityFavourite={isCurrentCityFavourite}
          onToggleFavourite={handleToggleFavourite}
        />
      </main>
    </div>
  );
}

export default App;
