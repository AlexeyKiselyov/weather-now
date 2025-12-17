import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./App.module.css";

import { getWeather } from "../services/weatherService";
import { DEFAULT_CITY } from "../helpers/constants";

import SearchBar from "./SearchBar/SearchBar";
import WeatherCard from "./WeatherCard/WeatherCard";
import WeatherCardSkeleton from "./WeatherCardSkeleton/WeatherCardSkeleton";
import Logo from "./Logo/Logo";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lastCity = localStorage.getItem("lastCity");

    if (lastCity) {
      try {
        const parsed = JSON.parse(lastCity);
        handleSearch(parsed);
      } catch {
        handleSearch(lastCity);
      }
    } else {
      handleSearch(DEFAULT_CITY);
    }
  }, []);

  const handleSearch = async (query) => {
    setLoading(true);

    try {
      const data = await getWeather(query);

      if (typeof query === "object") {
        if (query.state) {
          data.state = query.state;
        }
        if (query.name) {
          data.name = query.name;
        }
      }

      setWeatherData(data);
      localStorage.setItem(
        "lastCity",
        typeof query === "object" ? JSON.stringify(query) : query
      );
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.appContainer}>
      <header className={styles.appHeader}>
        <h1>Weather Now</h1>
        <Logo />
      </header>

      <main className={styles.mainContent}>
        <SearchBar onSearch={handleSearch} loading={loading} />

        {loading && !weatherData && <WeatherCardSkeleton />}

        {weatherData && <WeatherCard data={weatherData} />}
      </main>

      <ToastContainer theme="colored" />
    </div>
  );
}

export default App;
