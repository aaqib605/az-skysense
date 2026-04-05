function formatCurrentWeather(weatherData) {
  return {
    city: weatherData.name,
    dateLabel: new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }),
    condition: weatherData.weather[0].main,
    description: weatherData.weather[0].description,
    temp: `${Math.round(weatherData.main.temp)}°C`,
    feelsLike: `${Math.round(weatherData.main.feels_like)}°C`,
    humidity: `${weatherData.main.humidity}%`,
    wind: `${Math.round(weatherData.wind.speed * 3.6)} km/h`,
    visibility: `${Math.round(weatherData.visibility / 1000)} km`,
    pressure: `${weatherData.main.pressure} hPa`,
    iconUrl: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
  };
}

function formatForecastData(forecastData) {
  return forecastData.list
    .filter((item) => item.dt_txt.includes("12:00:00"))
    .map((item) => ({
      day: new Date(item.dt_txt).toLocaleDateString("en-US", {
        weekday: "short",
      }),
      temp: `${Math.round(item.main.temp)}°C`,
      description: item.weather[0].description,
      iconUrl: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
    }));
}

export { formatCurrentWeather, formatForecastData };
