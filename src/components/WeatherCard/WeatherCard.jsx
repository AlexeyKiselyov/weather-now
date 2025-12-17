import styles from "./WeatherCard.module.css";
import { getWeatherIcon } from "../../helpers/weatherHelpers";

const FLAG__URL = import.meta.env.VITE_FLAG_CDN_URL;

const WeatherCard = ({ data }) => {
  if (!data) return null;

  const { name, main, weather, wind, sys, state } = data;
  const weatherMain = weather[0].main;
  const description = weather[0].description;

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h2 className={styles.city}>{name}</h2>
        <div className={styles.locationInfo}>
          {state && <span className={styles.state}>{state}, </span>}
          <span className={styles.country}>{sys.country}</span>
          <img
            src={`${FLAG__URL}/w40/${sys.country.toLowerCase()}.png`}
            srcSet={`${FLAG__URL}/w80/${sys.country.toLowerCase()}.png 2x`}
            alt={sys.country}
            className={styles.flag}
          />
        </div>
      </header>
      <div className={styles.iconContainer}>{getWeatherIcon(weatherMain)}</div>
      <div className={styles.temp}>{Math.round(main.temp)}°C</div>
      <div className={styles.description}>{description}</div>

      <div className={styles.details}>
        <div className={styles.detailItem}>
          <span>Humidity</span>
          <span>{main.humidity}%</span>
        </div>
        <div className={styles.detailItem}>
          <span>Wind</span>
          <span>{wind.speed} m/s</span>
        </div>
      </div>
    </article>
  );
};

export default WeatherCard;
