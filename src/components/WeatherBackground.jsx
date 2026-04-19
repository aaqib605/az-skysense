const CLOUD_COUNT = 10;
const RAIN_DROP_COUNT = 28;
const SNOWFLAKE_COUNT = 34;
const LIGHTNING_BOLT_COUNT = 3;
const STORM_RAIN_STREAK_COUNT = 70;

function getCloudStyle(index) {
  return {
    "--delay": `${-index * 6.2}s`,
    "--duration": `${52 + (index % 5) * 10}s`,
    "--height": `${11 + (index % 4) * 2.8}rem`,
    "--opacity": `${0.24 + (index % 5) * 0.08}`,
    "--scale": `${0.78 + (index % 6) * 0.1}`,
    "--top": `${5 + ((index * 13) % 72)}%`,
    "--width": `${36 + (index % 5) * 8}rem`,
  };
}

function getRainDropStyle(index) {
  return {
    "--delay": `${-(index % 9) * 0.18}s`,
    "--duration": `${0.7 + (index % 5) * 0.12}s`,
    "--left": `${(index * 37) % 100}%`,
    "--length": `${70 + (index % 6) * 12}px`,
    "--opacity": `${0.28 + (index % 4) * 0.08}`,
  };
}

function getSnowflakeStyle(index) {
  return {
    "--delay": `${-(index % 12) * 0.45}s`,
    "--duration": `${7 + (index % 6) * 1.5}s`,
    "--drift": `${-18 + (index % 7) * 6}vw`,
    "--left": `${(index * 29) % 100}%`,
    "--opacity": `${0.34 + (index % 5) * 0.1}`,
    "--size": `${3 + (index % 5)}px`,
  };
}

function getLightningBoltStyle(index) {
  return {
    "--delay": `${-index * 2.15}s`,
    "--duration": `${6.2 + index * 0.6}s`,
    "--left": `${14 + index * 28}%`,
    "--scale": `${0.84 + (index % 2) * 0.22}`,
    "--top": `${8 + (index % 3) * 3}%`,
  };
}

function getStormRainStreakStyle(index) {
  return {
    "--delay": `${-(index % 16) * 0.08}s`,
    "--duration": `${0.48 + (index % 5) * 0.05}s`,
    "--height": `${7 + (index % 6) * 2.2}rem`,
    "--left": `${(index * 17) % 100}%`,
    "--opacity": `${0.28 + (index % 5) * 0.08}`,
  };
}

function CloudBackground() {
  return (
    <div className="cloud-animation-layer" aria-hidden="true">
      <span className="cloud-haze" />
      {Array.from({ length: CLOUD_COUNT }, (_, index) => (
        <span className="cloud" key={`cloud-${index}`} style={getCloudStyle(index)} />
      ))}
    </div>
  );
}

function RainBackground() {
  return (
    <div className="rain-animation-layer" aria-hidden="true">
      {Array.from({ length: RAIN_DROP_COUNT }, (_, index) => (
        <span
          className="rain-drop"
          key={`rain-drop-${index}`}
          style={getRainDropStyle(index)}
        />
      ))}
      <span className="rain-mist" />
      <span className="rain-splashes" />
    </div>
  );
}

function SnowBackground() {
  return (
    <div className="snow-animation-layer" aria-hidden="true">
      <span className="snow-haze" />
      {Array.from({ length: SNOWFLAKE_COUNT }, (_, index) => (
        <span
          className="snowflake"
          key={`snowflake-${index}`}
          style={getSnowflakeStyle(index)}
        />
      ))}
    </div>
  );
}

function ThunderstormBackground() {
  return (
    <div className="thunder-animation-layer" aria-hidden="true">
      <span className="storm-vignette" />
      <span className="storm-cloud storm-cloud-one" />
      <span className="storm-cloud storm-cloud-two" />
      <span className="storm-rain" />
      {Array.from({ length: STORM_RAIN_STREAK_COUNT }, (_, index) => (
        <span
          className="storm-rain-streak"
          key={`storm-rain-streak-${index}`}
          style={getStormRainStreakStyle(index)}
        />
      ))}
      <span className="storm-splashes" />
      <span className="storm-flash" />
      {Array.from({ length: LIGHTNING_BOLT_COUNT }, (_, index) => (
        <span
          className="lightning-bolt"
          key={`lightning-bolt-${index}`}
          style={getLightningBoltStyle(index)}
        />
      ))}
    </div>
  );
}

function WeatherBackground({ themeClassName }) {
  if (themeClassName === "weather-theme-clouds") {
    return <CloudBackground />;
  }

  if (themeClassName === "weather-theme-rain") {
    return <RainBackground />;
  }

  if (themeClassName === "weather-theme-snow") {
    return <SnowBackground />;
  }

  if (themeClassName === "weather-theme-thunderstorm") {
    return <ThunderstormBackground />;
  }

  return null;
}

export default WeatherBackground;
