// function getWeatherTheme(weather) {
//   if (!weather?.condition) {
//     return "weather-theme-default";
//   }

//   const condition = weather.condition.toLowerCase();

//   if (condition === "clear") {
//     return "weather-theme-clear";
//   }

//   if (condition === "clouds") {
//     return "weather-theme-clouds";
//   }

//   if (condition === "rain" || condition === "drizzle") {
//     return "weather-theme-rain";
//   }

//   if (condition === "snow") {
//     return "weather-theme-snow";
//   }

//   if (condition === "thunderstorm") {
//     return "weather-theme-thunderstorm";
//   }

//   return "weather-theme-default";
// }
function getWeatherTheme(weather) {
  return "weather-theme-thunderstorm";  
}
export default getWeatherTheme;
