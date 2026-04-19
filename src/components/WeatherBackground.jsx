const CLOUD_COUNT = 10;
const RAIN_DROP_COUNT = 28;

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

function WeatherBackground({ themeClassName }) {
  if (themeClassName === "weather-theme-clouds") {
    return <CloudBackground />;
  }

  if (themeClassName === "weather-theme-rain") {
    return <RainBackground />;
  }

  return null;
}

export default WeatherBackground;
