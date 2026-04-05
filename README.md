# SkySense

A React + Vite weather app powered by the OpenWeather API.

## API setup

1. Create an OpenWeather API key from https://openweathermap.org/api
2. Copy `.env.example` to `.env`
3. Add your key:

```env
VITE_OPENWEATHER_API_KEY=your_openweather_api_key_here
```

`.env` is already listed in `.gitignore`, so your real API key file stays private and should not be pushed.

## Run locally

```bash
npm install
npm run dev
```

## Features by Ayush Patel

- Current weather by city search
- Current location weather lookup
- Debounced city autocomplete with OpenWeather geocoding
- 5-day forecast strip with high/low temperatures
- Next 24 hours temperature chart
- Air Quality Index card with color-coded status
- `°C / °F` temperature unit switcher
- Dark / light mode toggle with saved preference
- Dynamic weather background themes, including night variants
- Last updated timestamp
- Favourite cities list with local persistence
- Recent search history with clear/remove actions

## Current API integration

- City weather search uses `fetchWeatherByCity()` in `src/services/weatherService.js`
- Current-location weather uses `fetchWeatherByCoords()`
- Forecast, hourly trend, and 5-day strip use `fetchForecastByCoords()`
- AQI uses `fetchAirQualityByCoords()`
- Autocomplete uses `fetchCitySuggestions()`

If the API key is missing, the app shows a clear setup error message instead of failing silently.
