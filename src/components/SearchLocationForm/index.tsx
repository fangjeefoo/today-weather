import {Input} from "../Input/Input.tsx";
import {FormEvent, useEffect, useState} from "react";
import {useSearchHistory} from "../../store/useSearchHistory.ts";
import {useFindLocation, Location} from "../../hooks/useFindLocation.ts";
import {useGetWeather} from "../../hooks/useGetWeather.ts";

const SearchLocationForm: React.FC = () => {
  const [locationList, setLocationList] = useState<Location[]>([]);
  const addSearchHistory = useSearchHistory((state) => state.addHistory);
  const { findLocation, success: findLocationSuccess, error: findLocationError} = useFindLocation()
  const { getWeather, success: getWeatherSuccess, error: getWeatherError} = useGetWeather()

  useEffect(() => {
    if (findLocationSuccess) {
      setLocationList(findLocationSuccess.list)
    }
  }, [findLocationSuccess]);

  useEffect(() => {
    if (getWeatherSuccess) {
      addSearchHistory(getWeatherSuccess)
    }
  }, [getWeatherSuccess]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocationList([]);
    const formData = new FormData(event.target as HTMLFormElement);

    for (const [_, value] of formData.entries()) {
      findLocation(value as string);
    }
  };

  const onClick = async (location: Location) => {
    getWeather(location.coord.lat, location.coord.lon);
  }

  return (
      <div>
        {findLocationError || getWeatherError ? <div>{findLocationError || getWeatherError}</div> : null}
        <form onSubmit={onSubmit}>
          <Input/>
          <button type={"submit"}>Search</button>
        </form>
        <div>
        {/*  dropdown here*/}
          {locationList.map((location) => (
              <div onClick={() => onClick(location)}>{location.name}, {location.sys.country}</div>
          ))}
        </div>
      </div>
  );
};

export default SearchLocationForm;
