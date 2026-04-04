import Header from "./components/Header";
import SearchHistory from "./components/SearchHistory";
import SearchSection from "./components/SearchSection";
import WeatherContent from "./components/WeatherContent";

const mockWeather = {
  city: "Pune",
  dateLabel: "Monday, March 30",
  description: "clear sky",
  temp: "28°C",
  feelsLike: "31°C",
  humidity: "42%",
  wind: "14 km/h",
  visibility: "10 km",
  pressure: "1012 hPa",
  iconUrl: "https://openweathermap.org/img/wn/01d@2x.png",
};

const mockForecast = [
  {
    day: "Tue",
    temp: "29°C",
    description: "few clouds",
    iconUrl: "https://openweathermap.org/img/wn/02d@2x.png",
  },
  {
    day: "Wed",
    temp: "27°C",
    description: "scattered clouds",
    iconUrl: "https://openweathermap.org/img/wn/03d@2x.png",
  },
  {
    day: "Thu",
    temp: "26°C",
    description: "light rain",
    iconUrl: "https://openweathermap.org/img/wn/10d@2x.png",
  },
  {
    day: "Fri",
    temp: "28°C",
    description: "broken clouds",
    iconUrl: "https://openweathermap.org/img/wn/04d@2x.png",
  },
  {
    day: "Sat",
    temp: "30°C",
    description: "clear sky",
    iconUrl: "https://openweathermap.org/img/wn/01d@2x.png",
  },
];

const mockHistory = ["Pune", "Mumbai", "Delhi", "Bengaluru", "Hyderabad"];

function App() {
  return (
    <div className="weather-theme-clear min-h-screen px-4 py-6 md:px-6 md:py-10">
      <main className="mx-auto w-full max-w-5xl">
        <Header />
        <SearchSection />
        <SearchHistory history={mockHistory} />
        <WeatherContent
          isLoading={false}
          error=""
          weather={mockWeather}
          forecast={mockForecast}
        />
      </main>
    </div>
  );
}

export default App;
