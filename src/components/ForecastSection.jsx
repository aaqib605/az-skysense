import ForecastCard from "./ForecastCard";

function ForecastSection({ forecast }) {
  return (
    <section className="rounded-[28px] border border-white/20 bg-white/10 p-5 text-white shadow-xl backdrop-blur-md md:p-6">
      <h3 className="mb-4 text-lg font-semibold">5-Day Forecast</h3>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {forecast.map((item) => (
          <ForecastCard key={item.day} item={item} />
        ))}
      </div>
    </section>
  );
}

export default ForecastSection;
