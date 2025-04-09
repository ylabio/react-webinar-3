import { memo, useCallback, useEffect, useContext } from 'react';
import LanguageToggle from '../../components/language-toggle';
import useStore from '../../store/use-store';
import { LanguageContext } from '../../contexts/LanguageContext';
import { translations } from '../../locales';
import './style.css';

function Head() {
  const store = useStore();
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  return (
    <div className="Head">
      <div className="Head-container">
        <h1>{translations[language].title}</h1>
        <LanguageToggle />
      </div>
    </div>
  );
}

export default memo(Head);
