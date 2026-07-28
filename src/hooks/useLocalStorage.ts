import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

// LocalStorage bilan sinxronlashgan holat (state) uchun qayta ishlatiluvchi hook
export function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? { ...initialValue, ...JSON.parse(stored) } : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // localStorage mavjud bo'lmasa (masalan, xususiy rejim), sokin o'tkazib yuboramiz
    }
  }, [key, value]);

  return [value, setValue];
}
