const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const BASE_URL = "https://api.openweathermap.org/data/2.5/";

async function fetchWeatherByCity(city) {
  const response = await fetch(
    `${BASE_URL}weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`,
  );

  if (!response.ok) {
    throw new Error("City not found");
  }

  return response.json();
}

async function fetchWeatherByCoords(lat, lon) {
  const response = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
  );

  if (!response.ok) {
    throw new Error("Unable to fetch weather data");
  }

  return response.json();
}

async function fetchForecastByCoords(lat, lon) {
  const response = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
  );

  if (!response.ok) {
    throw new Error("Unable to fetch forecast data");
  }

  return response.json();
}

export { fetchWeatherByCity, fetchWeatherByCoords, fetchForecastByCoords };
