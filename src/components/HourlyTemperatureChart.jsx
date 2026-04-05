import { formatTemperature } from "../utils/formatWeatherData";

function HourlyTemperatureChart({ hourlyForecast, temperatureUnit }) {
  if (!hourlyForecast.length) {
    return null;
  }

  const temperatures = hourlyForecast.map((item) => item.tempCelsius);
  const maxTemp = Math.max(...temperatures);
  const minTemp = Math.min(...temperatures);
  const range = Math.max(maxTemp - minTemp, 1);

  const points = hourlyForecast.map((item, index) => {
    const x = (index / Math.max(hourlyForecast.length - 1, 1)) * 100;
    const y = 100 - ((item.tempCelsius - minTemp) / range) * 100;
    return `${x},${y}`;
  });

  return (
    <section className="app-glass-panel mb-6 rounded-[28px] p-5 shadow-xl backdrop-blur-md md:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h3 className="app-text-main text-lg font-semibold">
            Next 24 Hours
          </h3>
          <p className="app-text-muted mt-1 text-sm">
            Temperature trend in 3-hour steps
          </p>
        </div>
        <p className="app-text-soft text-xs">
          High {formatTemperature(maxTemp, temperatureUnit)}
        </p>
      </div>

      <div className="app-surface-muted rounded-3xl p-4">
        <div className="relative h-44">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="h-full w-full overflow-visible"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="hourly-temperature-fill"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgba(56, 189, 248, 0.35)" />
                <stop offset="100%" stopColor="rgba(56, 189, 248, 0.03)" />
              </linearGradient>
            </defs>
            <polyline
              points={`0,100 ${points.join(" ")} 100,100`}
              fill="url(#hourly-temperature-fill)"
              stroke="none"
            />
            <polyline
              points={points.join(" ")}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              vectorEffect="non-scaling-stroke"
              className="app-chart-line"
            />
          </svg>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-8">
          {hourlyForecast.map((item) => (
            <div
              key={`${item.timeLabel}-${item.iconUrl}`}
              className="rounded-2xl border border-white/8 px-3 py-3 text-center"
            >
              <p className="app-text-soft text-xs">{item.timeLabel}</p>
              <img
                src={item.iconUrl}
                alt={item.description}
                className="mx-auto my-2 h-9 w-9 object-contain"
              />
              <p className="app-text-main text-sm font-semibold">
                {formatTemperature(item.tempCelsius, temperatureUnit)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HourlyTemperatureChart;
