function AirQualityCard({ airQuality }) {
  if (!airQuality) {
    return null;
  }

  return (
    <section className="app-glass-panel mb-6 rounded-[28px] p-5 shadow-xl backdrop-blur-md md:p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h3 className="app-text-main text-lg font-semibold">Air Quality</h3>
          <p className="app-text-muted mt-1 text-sm">
            Current outdoor air conditions
          </p>
        </div>

        <div className={`app-aqi-badge ${airQuality.accentClassName}`}>
          {airQuality.label}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-[auto_1fr] md:items-center">
        <div className={`app-aqi-index ${airQuality.accentClassName}`}>
          AQI {airQuality.index}
        </div>
        <p className="app-text-muted text-sm">{airQuality.description}</p>
      </div>
    </section>
  );
}

export default AirQualityCard;
