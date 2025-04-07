import { memo } from 'react';
import useLanguage from '../../store/use-language';
import './style.css';

function LanguageSwitcher() {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="LanguageSwitcher">
      <button onClick={() => changeLanguage('ru')} disabled={language === 'ru'}>
        RU
      </button>
      <button onClick={() => changeLanguage('en')} disabled={language === 'en'}>
        EN
      </button>
    </div>
  );
}

export default memo(LanguageSwitcher);
