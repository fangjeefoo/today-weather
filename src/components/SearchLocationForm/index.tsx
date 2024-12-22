import { Input } from "../Input/Input.tsx";
import { FormEvent, useEffect, useState } from "react";
import { useSearchHistory } from "../../store/useSearchHistory.ts";
import { useFindLocation, Location } from "../../hooks/useFindLocation.ts";
import { useGetWeather } from "../../hooks/useGetWeather.ts";
import SearchIcon from "../../assets/icons/SearchIcon.tsx";
import styles from "./SearchLocationForm.module.css";

const SearchLocationForm: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [locationList, setLocationList] = useState<Location[]>([]);
  const addSearchHistory = useSearchHistory((state) => state.addHistory);
  const {
    findLocation,
    success: findLocationSuccess,
    error: findLocationError,
  } = useFindLocation();
  const {
    getWeather,
    success: getWeatherSuccess,
    error: getWeatherError,
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
    findLocation(inputValue)
    setLocationList([]);
    setInputValue("")
  };

  const onClick = async (location: Location) => {
    setLocationList([]);
    getWeather(location.coord.lat, location.coord.lon, location.name);
  };

  return (
    <div className={styles["search-location-form-wrapper"]}>
      {findLocationError || getWeatherError ? (
        <div>{findLocationError || getWeatherError}</div>
      ) : null}
      <form onSubmit={onSubmit} className={styles.form}>
        <Input
            className={styles.input}
            inputName={"city"}
            label={"City/Country"}
            clearInput={() => {
              setLocationList([]);
            }}
            value={inputValue}
            setValue={(value) => setInputValue(value)}
/>
        <button className={styles["submit-button"]} type={"submit"}>
          <SearchIcon />
        </button>
      </form>
      {locationList.length > 0 ? (
          <div className={styles.dropdown}>
            {/*  dropdown here*/}
            {locationList.map((location) => (
                <button onClick={() => onClick(location)}>
                  {location.name}, {location.sys.country}
                </button>
            ))}
          </div>
      ) : null}
    </div>
  );
};

export default SearchLocationForm;
