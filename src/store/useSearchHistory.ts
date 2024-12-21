import { create } from "zustand";
import { WeatherResponse } from "../hooks/useGetWeather.ts";

export interface WeatherHistory extends WeatherResponse {
  timestamp: number;
}

interface SearchHistoryStore {
  weatherHistory: WeatherHistory[];
  addHistory: (history: WeatherResponse) => void;
  removeHistory: (history: WeatherHistory) => void;
}

export const useSearchHistory = create<SearchHistoryStore>((set) => ({
  weatherHistory: [],
  addHistory: (history) =>
    set((state) => {
      const historyCopy = [...state.weatherHistory];
      historyCopy.push({ ...history, timestamp: Date.now() });
      return { weatherHistory: historyCopy };
    }),
  removeHistory: (history) =>
    set((state) => {
      const historyCopy = [...state.weatherHistory];
      const index = historyCopy.findIndex(
        (historyItem) => history.timestamp === historyItem.timestamp,
      );
      if (index !== -1) {
        historyCopy.splice(index, 1);
      }
      return { weatherHistory: historyCopy };
    }),
}));
