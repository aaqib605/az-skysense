import CurrentWeatherCard from "./CurrentWeatherCard";
import ErrorState from "./ErrorState";
import ForecastSection from "./ForecastSection";
import LoadingState from "./LoadingState";

function WeatherContent({ isLoading, error, weather, forecast }) {
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
      <CurrentWeatherCard weather={weather} />
      <ForecastSection forecast={forecast} />
    </div>
  );
}

export default WeatherContent;
