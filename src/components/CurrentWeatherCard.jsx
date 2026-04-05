import { Droplets, Eye, Heart, Thermometer, Wind } from "lucide-react";

import {
  formatSpeed,
  formatTemperature,
  formatVisibility,
} from "../utils/formatWeatherData";

function DetailItem({ icon, label, value }) {
  return (
    <div className="app-surface-muted rounded-2xl p-4 backdrop-blur-md">
      <div className="app-text-muted mb-2 flex items-center gap-2">
        {icon}
        <span className="text-xs font-medium">{label}</span>
      </div>
      <p className="app-text-main text-sm font-semibold">{value}</p>
    </div>
  );
}

function CurrentWeatherCard({
  weather,
  temperatureUnit,
  isFavourite,
  onToggleFavourite,
}) {
  return (
    <section className="app-glass-panel mb-6 rounded-[28px] p-5 shadow-xl backdrop-blur-md md:p-6">
      <div className="mb-6 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="app-text-muted mb-1 text-sm">{weather.dateLabel}</p>
          <div className="flex items-center gap-3">
            <h2 className="app-text-main text-2xl font-bold md:text-3xl">
              {weather.city}
            </h2>
            <button
              type="button"
              onClick={() => onToggleFavourite(weather.city)}
              aria-label={
                isFavourite
                  ? `Remove ${weather.city} from favourites`
                  : `Add ${weather.city} to favourites`
              }
              className={`rounded-full p-2 transition ${
                isFavourite ? "app-favourite-active" : "app-favourite-idle"
              }`}
            >
              <Heart size={18} className={isFavourite ? "fill-current" : ""} />
            </button>
          </div>
          <p className="app-text-muted mt-1 text-sm capitalize">
            {weather.description}
          </p>
          <p className="app-text-soft mt-2 text-xs">
            Updated at {weather.lastUpdated}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <img
            src={weather.iconUrl}
            alt={weather.description}
            className="h-20 w-20 object-contain md:h-24 md:w-24"
          />
          <div className="text-right">
            <p className="app-text-main text-4xl font-bold md:text-5xl">
              {formatTemperature(weather.tempCelsius, temperatureUnit)}
            </p>
            <p className="app-text-muted text-sm">
              Feels like{" "}
              {formatTemperature(weather.feelsLikeCelsius, temperatureUnit)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <DetailItem
          icon={<Droplets size={16} />}
          label="Humidity"
          value={`${weather.humidity}%`}
        />
        <DetailItem
          icon={<Wind size={16} />}
          label="Wind Speed"
          value={formatSpeed(weather.windKph)}
        />
        <DetailItem
          icon={<Eye size={16} />}
          label="Visibility"
          value={formatVisibility(weather.visibilityKm)}
        />
        <DetailItem
          icon={<Thermometer size={16} />}
          label="Pressure"
          value={`${weather.pressure} hPa`}
        />
      </div>
    </section>
  );
}

export default CurrentWeatherCard;
