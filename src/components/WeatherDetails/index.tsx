import SearchHistory from "../SearchHistory";
import CurrentWeather from "../CurrentWeather";
import styles from "./WeatherDetails.module.css"

const WeatherDetails: React.FC = () => {
  return (
      <div className={styles["transparent-container"]}>
        <CurrentWeather />
        <SearchHistory />
      </div>
  );
};

export default WeatherDetails;
