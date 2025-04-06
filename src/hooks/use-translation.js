import { useContext } from 'react';
import { LanguageContext } from '../context/language-context';
import { translations } from '../locales';

function useTranslation() {
  const { language } = useContext(LanguageContext);

  const t = (key) => {
    return translations[language][key] || key;
  };

  return { t };
}

export default useTranslation;
