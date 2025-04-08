import {useLocation} from "react-router";
import {dictionary} from "./dictionary";

export const useDictionary = () => {
  const location = useLocation();
  const lang = location.pathname.split('/')[1] || 'ru';

  const t = (key) => {
    return dictionary[lang]?.[key] || key;
  };

  return {t, lang};
};
