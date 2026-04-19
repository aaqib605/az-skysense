// Third-party libraries
import { useState, useEffect } from "react";
// Local components
import Header from "./components/Header";
import SearchHistory from "./components/SearchHistory";
import SearchSection from "./components/SearchSection";
import WeatherContent from "./components/WeatherContent";
// Local hooks
import useWeather from "./hooks/useWeather";
// Local utils
import getWeatherTheme from "./utils/weatherThemes";

function App() {
  const {
    query,
    setQuery,
    weather,
    forecast,
    isLoading,
    error,
    searchByCity,
    searchByCoords,
  } = useWeather();

  const [history, setHistory] = useState(() => {
    const stored = localStorage.getItem("searchHistory");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(history));
  }, [history]);

  function clearHistory() {
    setHistory([]);
  }

  const themeClassName = getWeatherTheme(weather);

  async function handleSearch(cityToSearch) {

    const trimmedCity = cityToSearch.trim();
    if (!trimmedCity) return;
    await searchByCity(trimmedCity);
    setQuery("");
    setHistory((prev) => {
      const updated = [trimmedCity, ...prev.filter((city) => city !== trimmedCity)].slice(0, 5);
      return updated;
    });
  }

  function handleHistorySelect(city) {
    handleSearch(city);
  }

  function handleHistoryDelete(city) {
    setHistory((prev) => prev.filter((item) => item !== city));
  }

  async function handleCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await searchByCoords(latitude, longitude);
      },
      (geoError) => {
        console.error(geoError.message);
      },
    );
  }
  
  return (
    <div
      className={`${themeClassName} min-h-screen px-4 py-6 md:px-6 md:py-10`}
    >
      <main className="mx-auto w-full max-w-5xl">
        <Header />

        <SearchSection
          query={query}
          setQuery={setQuery}
          onSearch={handleSearch}
          onUseCurrentLocation={handleCurrentLocation}
          isLoading={isLoading}
        />
        <SearchHistory history={history} onClear={clearHistory} onSelect={handleHistorySelect} onDelete={handleHistoryDelete} />
        <WeatherContent
          isLoading={isLoading}
          error={error}
          weather={weather}
          forecast={forecast}
        />
      </main>
    </div>
  );
}

export default App;
