import { useState } from 'react';
import { LanguageContext } from '../store/context';
import { i18n } from '../utils';

const useLanguage = () => {
  const [language, setLanguage] = useState(navigator.language);

  const translate = key => i18n(language, key);

  return { language, setLanguage, translate };
};

export const LanguageProvider = props => {
  const { language, setLanguage, translate } = useLanguage();
  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {props.children}
    </LanguageContext.Provider>
  );
};
