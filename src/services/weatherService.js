const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL;
const GEO_URL = import.meta.env.VITE_GEO_BASE_URL;

import { CACHE_DURATION } from "../helpers/constants";

export const searchCities = async (query) => {
  if (!query || query.length < 2) return [];

  try {
    const response = await fetch(
      `${GEO_URL}?q=${query}&limit=5&appid=${API_KEY}`
    );

    if (!response.ok) return [];

    const data = await response.json();

    return data.map((item) => ({
      id: `${item.lat}-${item.lon}`,
      name: item.name,
      country_code: item.country,
      state: item.state,
      lat: item.lat,
      lon: item.lon,
    }));
  } catch (error) {
    console.error("Error searching cities:", error);
    return [];
  }
};

export const getWeather = async (query) => {
  let url;
  let cacheKey;

  if (typeof query === "object" && query.lat && query.lon) {
    url = `${BASE_URL}?lat=${query.lat}&lon=${query.lon}&units=metric&lang=en&appid=${API_KEY}`;
    cacheKey = `weather_${query.lat}_${query.lon}`;
  } else {
    url = `${BASE_URL}?q=${query}&units=metric&lang=en&appid=${API_KEY}`;
    cacheKey = `weather_${String(query).toLowerCase()}`;
  }

  const cachedData = localStorage.getItem(cacheKey);

  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`City not found or API error: ${response.statusText}`);
    }

    const data = await response.json();

    const cacheEntry = {
      data,
      timestamp: Date.now(),
    };

    localStorage.setItem(cacheKey, JSON.stringify(cacheEntry));

    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error;
  }
};
