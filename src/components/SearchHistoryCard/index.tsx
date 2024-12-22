import styles from "./SearchHistoryCard.module.css";
import SearchIcon from "../../assets/icons/SearchIcon.tsx";
import DeleteIcon from "../../assets/icons/DeleteIcon.tsx";
import {
  useSearchHistory,
  WeatherHistory,
} from "../../store/useSearchHistory.ts";
import { useGetWeather } from "../../hooks/useGetWeather.ts";
import { useEffect } from "react";
import { convertEpochToLocalTime } from "../../utils/convertEpochToLocalTime.ts";
import ErrorMessage from "../ErrorMessage";

interface SearchHistoryCardProps {
  history: WeatherHistory;
}

const SearchHistoryCard: React.FC<SearchHistoryCardProps> = ({ history }) => {
  const addSearchHistory = useSearchHistory((state) => state.addHistory);
  const removeSearchHistory = useSearchHistory((state) => state.removeHistory);
  const { getWeather, success, error } = useGetWeather();

  useEffect(() => {
    if (success) {
      addSearchHistory(success);
    }
  }, [success]);

  const onClickSearch = async () => {
    getWeather(history.coord.lat, history.coord.lon, history.name);
  };

  const onClickDelete = async () => {
    removeSearchHistory(history);
  };

  return (
    <>
      <div className={styles["transparent-container"]}>
        <div className={styles["history-details"]}>
          <div className={styles["location-details"]}>
            <p className={styles.location}>
              {history.name}, {history.sys.country}
            </p>
            <p className={styles["date-time"]}>
              {convertEpochToLocalTime(
                history.dt,
                history.timezone,
              ).toLocaleString()}
            </p>
          </div>
          <div className={styles.action}>
            <button onClick={onClickSearch} className={styles["search-button"]}>
              <SearchIcon />
            </button>
            <button onClick={onClickDelete}>
              <DeleteIcon />
            </button>
          </div>
        </div>
        {error ? <ErrorMessage message={error} /> : null}
      </div>
    </>
  );
};

export default SearchHistoryCard;
