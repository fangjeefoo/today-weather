import { fetchAPI } from "../utils/fetch.ts";
import { useState } from "react";

export interface WeatherResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    },
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export function useGetWeather() {
  const [success, setSuccess] = useState<WeatherResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setSuccess(null);
    setError(null);
  };

  const getWeather = async (
    latitude: number,
    longitude: number,
    locationName: string,
  ) => {
    setError(null);
    setSuccess(null);
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`;
    const response = await fetchAPI<WeatherResponse>(endpoint);

    if (typeof response !== "string") {
      setSuccess({ ...response, name: locationName });
    } else {
      setError(response);
    }
  };

  return {
    success,
    error,
    getWeather,
    reset,
  };
}
