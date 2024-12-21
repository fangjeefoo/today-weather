import { fetchAPI } from "../utils/fetch.ts";
import { useState } from "react";

export interface Location {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
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
  dt: number;
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
  };
  rain: null;
  snow: null;
  clouds: {
    all: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    },
  ];
}

interface FindLocationResponse {
  message: string;
  cod: string;
  count: number;
  list: Location[];
}

export function useFindLocation() {
  const [success, setSuccess] = useState<FindLocationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const findLocation = async (location: string) => {
    setSuccess(null);
    setError(null);

    const endpoint = `https://api.openweathermap.org/data/2.5/find?q=${location}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`;
    const response = await fetchAPI<FindLocationResponse>(endpoint);

    if (typeof response !== "string") {
      setSuccess(response);
    } else {
      setError(response);
    }
  };

  return {
    success,
    error,
    findLocation,
  };
}
