import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiShowers,
  WiFog,
} from "react-icons/wi";

export const getWeatherIcon = (main, size = 100) => {
  switch (main) {
    case "Clear":
      return <WiDaySunny size={size} />;
    case "Clouds":
      return <WiCloudy size={size} />;
    case "Rain":
      return <WiRain size={size} />;
    case "Snow":
      return <WiSnow size={size} />;
    case "Thunderstorm":
      return <WiThunderstorm size={size} />;
    case "Drizzle":
      return <WiShowers size={size} />;
    case "Mist":
    case "Fog":
      return <WiFog size={size} />;
    default:
      return <WiDaySunny size={size} />;
  }
};
