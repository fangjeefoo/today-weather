import styles from "./WeatherDetails.module.css";
import { useSearchHistory } from "../../store/useSearchHistory.ts";
import { useEffect, useState } from "react";
import { useGetWeather, WeatherResponse } from "../../hooks/useGetWeather.ts";
import { convertEpochToLocalTime } from "../../utils/convertEpochToLocalTime.ts";

const CurrentWeather: React.FC = () => {
  const searchHistory = useSearchHistory((state) => state.weatherHistory);
  const { getWeather, success, error } = useGetWeather();
  const [currentWeather, setCurrentWeather] = useState<WeatherResponse>();
  const isCloudy = currentWeather?.weather?.[0]?.main === "Clouds";
  const isSunny = currentWeather?.weather?.[0]?.main === "Clear";

  useEffect(() => {
    if (searchHistory.length <= 0) {
      // Always fallback to Johor Bahru weather when search history is empty
      getWeather(1.4655, 103.7578, "Johor Bahru");
    } else {
      setCurrentWeather(searchHistory[searchHistory.length - 1]);
    }
  }, [searchHistory]);

  useEffect(() => {
    if (success && searchHistory.length <= 0) {
      setCurrentWeather(success);
    }
  }, [success]);

  return (
    <div className={styles["current-weather-wrapper"]}>
      {isCloudy ? (
        <img src={"/src/assets/cloud.png"} />
      ) : isSunny ? (
        <img src={"/src/assets/sun.png"} />
      ) : null}
      <h1 className={styles.title}>Today's Weather</h1>
      {currentWeather ? (
        <div className={styles["weather-details"]}>
          <div>
            <div className={styles["current-temperature"]}>
              {Math.round(currentWeather.main.temp)}&deg;
            </div>
            <div className={styles["min-max-temperature"]}>
              H:{Math.round(currentWeather.main.temp_max)}&deg; L:
              {Math.round(currentWeather.main.temp_min)}&deg;
            </div>
            <div className={styles.location}>
              {currentWeather.name}, {currentWeather.sys.country}
            </div>
          </div>
          <div className={styles["right-content"]}>
            <div>{currentWeather.weather?.[0]?.main}</div>
            <div>Humidity: {currentWeather.main.humidity}%</div>
            <div>
              {convertEpochToLocalTime(
                currentWeather.dt,
                currentWeather.timezone,
              ).toLocaleString()}
            </div>
          </div>
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default CurrentWeather;
