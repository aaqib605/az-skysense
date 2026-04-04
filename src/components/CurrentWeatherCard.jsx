import { Droplets, Eye, Thermometer, Wind } from "lucide-react";

function DetailItem({ icon, label, value }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-md">
      <div className="mb-2 flex items-center gap-2 text-white/75">
        {icon}
        <span className="text-xs font-medium">{label}</span>
      </div>
      <p className="text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

function CurrentWeatherCard({ weather }) {
  return (
    <section className="mb-6 rounded-[28px] border border-white/20 bg-white/10 p-5 text-white shadow-xl backdrop-blur-md md:p-6">
      <div className="mb-6 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-1 text-sm text-white/75">{weather.dateLabel}</p>
          <h2 className="text-2xl font-bold md:text-3xl">{weather.city}</h2>
          <p className="mt-1 text-sm text-white/80 capitalize">
            {weather.description}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <img
            src={weather.iconUrl}
            alt={weather.description}
            className="h-20 w-20 object-contain md:h-24 md:w-24"
          />
          <div className="text-right">
            <p className="text-4xl font-bold md:text-5xl">{weather.temp}</p>
            <p className="text-sm text-white/80">
              Feels like {weather.feelsLike}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <DetailItem
          icon={<Droplets size={16} />}
          label="Humidity"
          value={weather.humidity}
        />
        <DetailItem
          icon={<Wind size={16} />}
          label="Wind Speed"
          value={weather.wind}
        />
        <DetailItem
          icon={<Eye size={16} />}
          label="Visibility"
          value={weather.visibility}
        />
        <DetailItem
          icon={<Thermometer size={16} />}
          label="Pressure"
          value={weather.pressure}
        />
      </div>
    </section>
  );
}

export default CurrentWeatherCard;
