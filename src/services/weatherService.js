const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const BASE_URL = "https://api.openweathermap.org/data/2.5/";
const GEO_BASE_URL = "https://api.openweathermap.org/geo/1.0/";

function getApiKey() {
  if (!API_KEY) {
    throw new Error(
      "Missing OpenWeather API key. Add VITE_OPENWEATHER_API_KEY to your .env file.",
    );
  }

  return API_KEY;
}

async function fetchWeatherByCity(city) {
  const apiKey = getApiKey();
  const response = await fetch(
    `${BASE_URL}weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`,
  );

  if (!response.ok) {
    throw new Error("City not found");
  }

  return response.json();
}

async function fetchWeatherByCoords(lat, lon) {
  const apiKey = getApiKey();
  const response = await fetch(
    `${BASE_URL}weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
  );

  if (!response.ok) {
    throw new Error("Unable to fetch weather data");
  }

  return response.json();
}

async function fetchForecastByCoords(lat, lon) {
  const apiKey = getApiKey();
  const response = await fetch(
    `${BASE_URL}forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
  );

  if (!response.ok) {
    throw new Error("Unable to fetch forecast data");
  }

  return response.json();
}

async function fetchAirQualityByCoords(lat, lon) {
  const apiKey = getApiKey();
  const response = await fetch(
    `${BASE_URL}air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`,
  );

  if (!response.ok) {
    throw new Error("Unable to fetch air quality data");
  }

  return response.json();
}

async function fetchCitySuggestions(query) {
  const apiKey = getApiKey();
  const response = await fetch(
    `${GEO_BASE_URL}direct?q=${encodeURIComponent(query)}&limit=5&appid=${apiKey}`,
  );

  if (!response.ok) {
    throw new Error("Unable to fetch city suggestions");
  }

  return response.json();
}

export {
  fetchAirQualityByCoords,
  fetchCitySuggestions,
  fetchForecastByCoords,
  fetchWeatherByCity,
  fetchWeatherByCoords,
};
