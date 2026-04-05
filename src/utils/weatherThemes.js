function getWeatherTheme(weather) {
  if (!weather?.condition) {
    return "weather-theme-default";
  }

  const condition = weather.condition.toLowerCase();

  if (weather.isNight) {
    if (condition === "clear") {
      return "weather-theme-night-clear";
    }

    if (condition === "clouds") {
      return "weather-theme-night-clouds";
    }

    if (condition === "rain" || condition === "drizzle") {
      return "weather-theme-night-rain";
    }

    if (condition === "thunderstorm") {
      return "weather-theme-thunderstorm";
    }
  }

  if (condition === "clear") {
    return "weather-theme-clear";
  }

  if (condition === "clouds") {
    return "weather-theme-clouds";
  }

  if (condition === "rain" || condition === "drizzle") {
    return "weather-theme-rain";
  }

  if (condition === "snow") {
    return "weather-theme-snow";
  }

  if (condition === "thunderstorm") {
    return "weather-theme-thunderstorm";
  }

  return "weather-theme-default";
}

export default getWeatherTheme;
