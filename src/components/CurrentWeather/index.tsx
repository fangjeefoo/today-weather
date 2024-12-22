import styles from "./WeatherDetails.module.css";
import {
  useSearchHistory,
  WeatherHistory,
} from "../../store/useSearchHistory.ts";
import { useEffect, useState } from "react";
import { useGetWeather } from "../../hooks/useGetWeather.ts";
import { convertTimeToLocalTime } from "../../utils/convertTimeToLocalTime.ts";
import ErrorMessage from "../ErrorMessage";
import { UTCDateFormatting } from "../../constants/UTCDateFormatting.ts";

const CurrentWeather: React.FC = () => {
  const searchHistory = useSearchHistory((state) => state.weatherHistory);
  const { getWeather, success, error } = useGetWeather();
  const [currentWeather, setCurrentWeather] = useState<WeatherHistory>();
  const isCloudy = currentWeather?.weather?.[0]?.main === "Clouds";
  const isSunny = currentWeather?.weather?.[0]?.main === "Clear";

  useEffect(() => {
    if (searchHistory.length <= 0) {
      // Always fallback to Johor Bahru weather when search history is empty
      getWeather(1.4655, 103.7578, "Johor Bahru");
      setCurrentWeather(undefined);
    } else {
      setCurrentWeather(searchHistory[searchHistory.length - 1]);
    }
  }, [searchHistory]);

  useEffect(() => {
    if (success && searchHistory.length <= 0) {
      setCurrentWeather({ ...success, timestamp: Date.now() });
    }
  }, [success, searchHistory]);

  return (
    <div className={styles["current-weather-wrapper"]}>
      {isCloudy ? (
        <img src={"/src/assets/cloud.png"} alt="" />
      ) : isSunny ? (
        <img src={"/src/assets/sun.png"} alt="" />
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
              {convertTimeToLocalTime(
                currentWeather.timestamp,
                currentWeather.timezone,
              ).toLocaleString(undefined, UTCDateFormatting)}
            </div>
          </div>
        </div>
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default CurrentWeather;
