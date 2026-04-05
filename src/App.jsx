import Header from "./components/Header";
import SearchHistory from "./components/SearchHistory";
import SearchSection from "./components/SearchSection";
import WeatherContent from "./components/WeatherContent";

import useWeather from "./hooks/useWeather";

const mockHistory = ["Pune", "Mumbai", "Delhi", "Bengaluru", "Hyderabad"];

function App() {
  const { weather, forecast, isLoading, error } = useWeather();

  return (
    <div className="weather-theme-clear min-h-screen px-4 py-6 md:px-6 md:py-10">
      <main className="mx-auto w-full max-w-5xl">
        <Header />
        <SearchSection />
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
