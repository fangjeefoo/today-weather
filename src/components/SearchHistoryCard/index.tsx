import styles from "./SearchHistoryCard.module.css";
import SearchIcon from "../../assets/icons/SearchIcon.tsx";
import DeleteIcon from "../../assets/icons/DeleteIcon.tsx";
import {
  useSearchHistory,
  WeatherHistory,
} from "../../store/useSearchHistory.ts";
import { useGetWeather } from "../../hooks/useGetWeather.ts";
import { useEffect } from "react";

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
    getWeather(history.coord.lat, history.coord.lon);
  };

  const onClickDelete = async () => {
    removeSearchHistory(history);
  };

  return (
    <div className={styles["transparent-container"]}>
      <div>
        {error ? <div>{error}</div> : null}
        <p className={styles.location}>
          {history.name}, {history.sys.country}
        </p>
        <p className={styles["date-time"]}>{history.dt}</p>
      </div>
      <div className={styles.action}>
        <button onClick={onClickSearch}>
          <SearchIcon />
        </button>
        <button onClick={onClickDelete}>
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default SearchHistoryCard;
