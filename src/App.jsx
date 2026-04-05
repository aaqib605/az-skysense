import Header from "./components/Header";
import SearchHistory from "./components/SearchHistory";
import SearchSection from "./components/SearchSection";
import WeatherContent from "./components/WeatherContent";

import useWeather from "./hooks/useWeather";

import getWeatherTheme from "./utils/weatherThemes";

const mockHistory = ["Pune", "Mumbai", "Delhi", "Bengaluru", "Hyderabad"];

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

  const themeClassName = getWeatherTheme(weather);

  async function handleSearch(cityToSearch) {
    const trimmedCity = cityToSearch.trim();

    if (!trimmedCity) return;

    await searchByCity(trimmedCity);
    setQuery("");
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

        <SearchHistory history={mockHistory} />

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
