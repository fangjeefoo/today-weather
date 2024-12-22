import { Input } from "../Input/Input.tsx";
import { FormEvent, useEffect, useState } from "react";
import { useSearchHistory } from "../../store/useSearchHistory.ts";
import { useFindLocation, Location } from "../../hooks/useFindLocation.ts";
import { useGetWeather } from "../../hooks/useGetWeather.ts";
import SearchIcon from "../../assets/icons/SearchIcon.tsx";
import styles from "./SearchLocationForm.module.css";
import ErrorMessage from "../ErrorMessage";

const SearchLocationForm: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [locationList, setLocationList] = useState<Location[] | null>(null);
  const addSearchHistory = useSearchHistory((state) => state.addHistory);
  const {
    findLocation,
    success: findLocationSuccess,
    error: findLocationError,
    reset: resetFindLocation,
  } = useFindLocation();
  const {
    getWeather,
    success: getWeatherSuccess,
    error: getWeatherError,
    reset: resetGetWeather,
  } = useGetWeather();

  useEffect(() => {
    if (findLocationSuccess) {
      setLocationList(findLocationSuccess.list);
    }
  }, [findLocationSuccess]);

  useEffect(() => {
    if (getWeatherSuccess) {
      addSearchHistory(getWeatherSuccess);
    }
  }, [getWeatherSuccess]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    findLocation(inputValue);
    setLocationList(null);
    setInputValue("");
  };

  const onClick = async (location: Location) => {
    setLocationList(null);
    getWeather(location.coord.lat, location.coord.lon, location.name);
  };

  return (
    <div className={styles["search-location-form-wrapper"]}>
      <form onSubmit={onSubmit} className={styles.form}>
        <Input
          className={styles.input}
          inputName={"city"}
          label={"City/Country"}
          value={inputValue}
          setValue={(value) => {
            resetGetWeather();
            resetFindLocation();
            setLocationList(null);
            setInputValue(value);
          }}
        />
        <button className={styles["submit-button"]} type={"submit"}>
          <SearchIcon />
        </button>
      </form>
      {findLocationError || getWeatherError ? (
        <ErrorMessage message={(findLocationError || getWeatherError)!} />
      ) : null}
      {locationList && locationList.length > 0 ? (
        <div className={styles.dropdown}>
          {/*  dropdown here*/}
          {locationList.map((location) => (
            <button onClick={() => onClick(location)}>
              {location.name}, {location.sys.country}
            </button>
          ))}
        </div>
      ) : locationList && locationList.length === 0 ? (
        <ErrorMessage
          message={
            "No matching result. Please enter city followed by comma and country code (eg. Johor Bahru,MY) for better result."
          }
        ></ErrorMessage>
      ) : null}
    </div>
  );
};

export default SearchLocationForm;
