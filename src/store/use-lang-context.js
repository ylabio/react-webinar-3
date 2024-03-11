import { useContext } from 'react';
import { createContext } from 'react';

export const LangContext = createContext(null);

export const useLangContext = () => {
  const data = useContext(LangContext);
  return data;
};
