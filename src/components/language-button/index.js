import { memo } from 'react';
import { useTranslation } from '../../translation/translation-context';

function LanguageButton() {
  const { language, setLanguage } = useTranslation();

  const callbacks = {
    handleLanguageChange: () => (language === 'ru' ? setLanguage('en') : setLanguage('ru')),
  };

  return (
    <button onClick={callbacks.handleLanguageChange}>{language === 'ru' ? 'RU' : 'EN'}</button>
  );
}

export default memo(LanguageButton);
