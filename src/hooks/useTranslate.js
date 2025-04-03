import { useCallback } from 'react';
import useSelector from '../store/use-selector';
import ru from '../locales/ru';
import en from '../locales/en';

const translations = { ru, en };

/**
 * Хук для работы с переводами
 * @returns {Function} Функция перевода
 */
export default function useTranslate() {
    const lang = useSelector(state => state.locale.lang);
    
    return useCallback((key) => {
      // Если запрашиваем весь объект (например, для items)
      if (key in translations[lang] && typeof translations[lang][key] === 'object') {
        return translations[lang][key];
      }
      
      const keys = key.split('.');
      let result = translations[lang];
      
      for (const k of keys) {
        if (result && result[k] !== undefined) {
          result = result[k];
        } else {
          console.warn(`Translation missing for key: ${key}`);
          return key;
        }
      }
      
      return result;
    }, [lang]);
  }