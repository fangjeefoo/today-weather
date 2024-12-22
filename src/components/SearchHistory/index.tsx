import styles from "./SearchHistory.module.css";
import SearchHistoryCard from "../SearchHistoryCard";
import { useSearchHistory } from "../../store/useSearchHistory.ts";

const SearchHistory: React.FC = () => {
  const searchHistory = useSearchHistory((state) => state.weatherHistory);

  return (
    <div className={styles["transparent-container"]}>
      <h2 className={styles.title}>Search history</h2>
      {searchHistory.length > 0 ? (
        <div className={styles["history-list"]}>
          {searchHistory.toReversed().map((history) => (
            <SearchHistoryCard key={history.timestamp} history={history} />
          ))}
        </div>
      ) : (
        <div className={styles["no-record"]}>No records found</div>
      )}
    </div>
  );
};

export default SearchHistory;
