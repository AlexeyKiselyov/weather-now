import { useState, useEffect, useRef } from "react";
import styles from "./SearchBar.module.css";
import { searchCities } from "../../services/weatherService";
import { FaSearch, FaSpinner } from "react-icons/fa";
import { useClickOutside } from "../../hooks/useClickOutside";

const SearchBar = ({ onSearch, loading }) => {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

  useClickOutside(wrapperRef, () => setShowSuggestions(false));

  useEffect(() => {
    const fetchCities = async () => {
      if (city.length < 2) {
        setSuggestions([]);
        return;
      }

      const results = await searchCities(city);
      if (results.length > 0) {
        setSuggestions(results);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
      }
    };

    const timeoutId = setTimeout(() => {
      if (city.length >= 2) {
        fetchCities();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (city.trim()) {
      onSearch(city);
      setCity("");
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    onSearch(suggestion);
    setCity("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className={styles.searchWrapper} ref={wrapperRef}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          type="text"
          name="city"
          id="city-search"
          className={styles.searchInput}
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onFocus={() => city.length >= 2 && setShowSuggestions(true)}
        />
        <button
          type="submit"
          className={styles.searchButton}
          disabled={loading}
          aria-label="Search city"
        >
          {loading ? <FaSpinner className={styles.spinning} /> : <FaSearch />}
        </button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <ul className={styles.suggestionsList}>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className={styles.suggestionItem}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className={styles.suggestionInfo}>
                <span className={styles.cityName}>{suggestion.name}</span>
                <span className={styles.cityLocation}>
                  {suggestion.state ? `${suggestion.state}, ` : ""}
                  {suggestion.country_code}
                </span>
              </div>
              <img
                src={`${
                  import.meta.env.VITE_FLAG_CDN_URL
                }/20x15/${suggestion.country_code.toLowerCase()}.png`}
                alt={suggestion.country_code}
                className={styles.flagIcon}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
