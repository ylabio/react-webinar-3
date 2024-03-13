import { useCallback } from 'react';
import { translateDictionary } from "../utils";
import useSelector from '../store/use-selector';

export const useTranslate = () => {

  const currentLanguage = useSelector(state => state.language.currentLanguage);

  return useCallback(
    (key) => {
      // Проверяем, есть ли ключ в словаре
      if (translateDictionary[currentLanguage] && translateDictionary[currentLanguage][key]) {
        return translateDictionary[currentLanguage][key];
      }
      // Если ключа нет, возвращаем сам ключ
      return key;
    },
    [currentLanguage, translateDictionary]
  );
};
