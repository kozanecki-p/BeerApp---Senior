import { useState, useEffect } from "react";

function getStorageValue<T>(key: string, defaultValue: T) {
  const saved = localStorage.getItem(key);

  if(!saved) {
    return defaultValue;
  }

  const initial = JSON.parse(saved);
  return initial || defaultValue;
}

export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const [value, setValue] = useState(() => {
    return getStorageValue<T>(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};