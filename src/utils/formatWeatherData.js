function formatCurrentWeather(weatherData) {
  const currentTimestamp = Date.now();

  return {
    city: weatherData.name,
    dateLabel: new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }),
    condition: weatherData.weather[0].main,
    description: weatherData.weather[0].description,
    tempCelsius: weatherData.main.temp,
    feelsLikeCelsius: weatherData.main.feels_like,
    humidity: weatherData.main.humidity,
    windKph: weatherData.wind.speed * 3.6,
    visibilityKm: weatherData.visibility / 1000,
    pressure: weatherData.main.pressure,
    lastUpdated: new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    }),
    fetchedAt: currentTimestamp,
    isNight:
      currentTimestamp < weatherData.sys.sunrise * 1000 ||
      currentTimestamp > weatherData.sys.sunset * 1000,
    iconUrl: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
  };
}

function formatForecastData(forecastData) {
  const dailyForecast = new Map();

  forecastData.list.forEach((item) => {
    const dateKey = item.dt_txt.split(" ")[0];

    if (!dailyForecast.has(dateKey)) {
      dailyForecast.set(dateKey, {
        dateKey,
        day: new Date(item.dt_txt).toLocaleDateString("en-US", {
          weekday: "short",
        }),
        dateLabel: new Date(item.dt_txt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        minTempCelsius: item.main.temp_min,
        maxTempCelsius: item.main.temp_max,
        description: item.weather[0].description,
        iconCode: item.weather[0].icon,
        rainChance: item.pop ?? 0,
        selectedHourDistance: Math.abs(Number(item.dt_txt.slice(11, 13)) - 12),
      });

      return;
    }

    const dayEntry = dailyForecast.get(dateKey);
    const currentHourDistance = Math.abs(Number(item.dt_txt.slice(11, 13)) - 12);
    const isCloserToMidday = currentHourDistance < dayEntry.selectedHourDistance;

    dayEntry.minTempCelsius = Math.min(dayEntry.minTempCelsius, item.main.temp_min);
    dayEntry.maxTempCelsius = Math.max(dayEntry.maxTempCelsius, item.main.temp_max);
    dayEntry.rainChance = Math.max(dayEntry.rainChance, item.pop ?? 0);

    if (item.dt_txt.includes("12:00:00") || isCloserToMidday) {
      dayEntry.description = item.weather[0].description;
      dayEntry.iconCode = item.weather[0].icon;
      dayEntry.selectedHourDistance = currentHourDistance;
    }
  });

  return Array.from(dailyForecast.values())
    .slice(0, 5)
    .map((item) => ({
      day: item.day,
      dateLabel: item.dateLabel,
      minTempCelsius: item.minTempCelsius,
      maxTempCelsius: item.maxTempCelsius,
      description: item.description,
      rainChance: Math.round(item.rainChance * 100),
      iconUrl: `https://openweathermap.org/img/wn/${item.iconCode}@2x.png`,
    }));
}

function formatHourlyForecastData(forecastData) {
  return forecastData.list.slice(0, 8).map((item) => ({
    timeLabel: new Date(item.dt_txt).toLocaleTimeString([], {
      hour: "numeric",
    }),
    tempCelsius: item.main.temp,
    description: item.weather[0].description,
    iconUrl: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
  }));
}

function formatAirQualityData(aqiData) {
  const aqiIndex = aqiData.list?.[0]?.main?.aqi;

  const aqiLevels = {
    1: {
      label: "Good",
      accentClassName: "app-aqi-good",
      description: "Air quality is fresh and poses little to no risk.",
    },
    2: {
      label: "Fair",
      accentClassName: "app-aqi-fair",
      description: "Acceptable for most people with minor pollution.",
    },
    3: {
      label: "Moderate",
      accentClassName: "app-aqi-moderate",
      description: "Sensitive groups may notice mild breathing discomfort.",
    },
    4: {
      label: "Poor",
      accentClassName: "app-aqi-poor",
      description: "Air quality is unhealthy for sensitive groups.",
    },
    5: {
      label: "Very Poor",
      accentClassName: "app-aqi-very-poor",
      description: "Limit time outdoors when possible.",
    },
  };

  return {
    index: aqiIndex,
    ...(aqiLevels[aqiIndex] || {
      label: "Unknown",
      accentClassName: "app-aqi-fair",
      description: "Air quality data is currently unavailable.",
    }),
  };
}

function formatCitySuggestions(suggestions) {
  return suggestions.map((item) => ({
    id: `${item.name}-${item.lat}-${item.lon}`,
    name: item.name,
    state: item.state || "",
    country: item.country,
    lat: item.lat,
    lon: item.lon,
    label: [item.name, item.state, item.country].filter(Boolean).join(", "),
  }));
}

function formatTemperature(valueInCelsius, unit) {
  if (unit === "fahrenheit") {
    return `${Math.round((valueInCelsius * 9) / 5 + 32)}°F`;
  }

  return `${Math.round(valueInCelsius)}°C`;
}

function formatSpeed(valueInKph) {
  return `${Math.round(valueInKph)} km/h`;
}

function formatVisibility(valueInKm) {
  return `${Math.round(valueInKm)} km`;
}

export {
  formatCurrentWeather,
  formatForecastData,
  formatHourlyForecastData,
  formatAirQualityData,
  formatCitySuggestions,
  formatSpeed,
  formatTemperature,
  formatVisibility,
};
