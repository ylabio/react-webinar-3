import { useCallback } from 'react';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

function LanguageSwitcher() {
  const store = useStore();
  const currentLanguage = useSelector(state => state.language?.currentLanguage || 'ru');

  const handleLanguageChange = useCallback(
    lang => {
      try {
        store.actions.language.setLanguage(lang);
      } catch (e) {
        console.error('Language switch error:', e);
        // Fallback
        localStorage.setItem('lang', lang);
        window.location.reload();
      }
    },
    [store],
  );

  return (
    <div className="language-switcher">
      <button
        className={currentLanguage === 'ru' ? 'active' : ''}
        onClick={() => handleLanguageChange('ru')}
      >
        RU
      </button>
      <button
        className={currentLanguage === 'en' ? 'active' : ''}
        onClick={() => handleLanguageChange('en')}
      >
        EN
      </button>
    </div>
  );
}

export default LanguageSwitcher;
