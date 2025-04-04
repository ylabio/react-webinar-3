import { useContext } from 'react';
import { LanguageContext } from './context';
import { translationWords } from './translationWords';

export function useTranslation() {
  const { language } = useContext(LanguageContext);

  const t = key => {
    return translationWords[language][key] || key;
  };

  return { t, language };
}
