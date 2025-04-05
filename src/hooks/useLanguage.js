import { useState } from 'react';
import { LanguageContext } from '../store/context';
import { i18n } from '../utils';

export const LanguageProvider = props => {
  const [language, setLanguage] = useState(navigator.language);

  const translate = key => i18n(language, key);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {props.children}
    </LanguageContext.Provider>
  );
};
