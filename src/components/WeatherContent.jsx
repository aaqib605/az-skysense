import AirQualityCard from "./AirQualityCard";
import CurrentWeatherCard from "./CurrentWeatherCard";
import ErrorState from "./ErrorState";
import ForecastSection from "./ForecastSection";
import HourlyTemperatureChart from "./HourlyTemperatureChart";
import LoadingState from "./LoadingState";

function WeatherContent({
  isLoading,
  error,
  weather,
  forecast,
  hourlyForecast,
  airQuality,
  temperatureUnit,
  isCurrentCityFavourite,
  onToggleFavourite,
}) {
  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!weather) {
    return null;
  }

  return (
    <div>
      <CurrentWeatherCard
        weather={weather}
        temperatureUnit={temperatureUnit}
        isFavourite={isCurrentCityFavourite}
        onToggleFavourite={onToggleFavourite}
      />
      <AirQualityCard airQuality={airQuality} />
      <HourlyTemperatureChart
        hourlyForecast={hourlyForecast}
        temperatureUnit={temperatureUnit}
      />
      <ForecastSection forecast={forecast} temperatureUnit={temperatureUnit} />
    </div>
  );
}

export default WeatherContent;
