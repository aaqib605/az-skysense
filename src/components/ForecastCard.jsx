import { CloudRain } from "lucide-react";

import { formatTemperature } from "../utils/formatWeatherData";

function ForecastCard({ item, temperatureUnit }) {
  return (
    <article className="app-surface-muted rounded-2xl p-4 text-center backdrop-blur-md">
      <p className="app-text-main text-sm font-semibold">{item.day}</p>
      <p className="app-text-soft mt-1 text-xs">{item.dateLabel}</p>
      <img
        src={item.iconUrl}
        alt={item.description}
        className="mx-auto my-3 h-14 w-14 object-contain"
      />
      <p className="app-text-main text-lg font-bold">
        {formatTemperature(item.maxTempCelsius, temperatureUnit)}
      </p>
      <p className="app-text-muted mt-1 text-xs">
        Low {formatTemperature(item.minTempCelsius, temperatureUnit)}
      </p>
      <p className="app-text-muted mt-1 text-xs capitalize">
        {item.description}
      </p>
      <div className="app-text-muted mt-3 flex items-center justify-center gap-1 text-xs">
        <CloudRain size={14} />
        <span>{item.rainChance}% rain</span>
      </div>
    </article>
  );
}

export default ForecastCard;
