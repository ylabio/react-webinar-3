import { memo, useContext } from 'react';
import { LanguageContext } from '../../translation/context';
import './style.css';

function LanguageSwitcher() {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <div className="LanguageSwitcher">
      <button
        className={`LanguageSwitcher-button ${language === 'ru' ? 'active' : ''}`}
        onClick={() => setLanguage('ru')}
      >
        RU
      </button>
      <button
        className={`LanguageSwitcher-button ${language === 'en' ? 'active' : ''}`}
        onClick={() => setLanguage('en')}
      >
        EN
      </button>
    </div>
  );
}

export default memo(LanguageSwitcher);
