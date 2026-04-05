import ForecastCard from "./ForecastCard";

function ForecastSection({ forecast, temperatureUnit }) {
  return (
    <section className="app-glass-panel rounded-[28px] p-5 shadow-xl backdrop-blur-md md:p-6">
      <h3 className="app-text-main mb-4 text-lg font-semibold">
        5-Day Forecast
      </h3>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {forecast.map((item) => (
          <ForecastCard
            key={`${item.day}-${item.dateLabel}`}
            item={item}
            temperatureUnit={temperatureUnit}
          />
        ))}
      </div>
    </section>
  );
}

export default ForecastSection;
