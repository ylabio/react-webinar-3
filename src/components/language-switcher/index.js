import { cn as bem } from '@bem-react/classname';
import { memo, useCallback } from 'react';
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';
import './style.css';

function LanguageSwitcher() {
  const cn = bem('LanguageSwitcher');
  const lang = useSelector(state => state.language.language);
  const store = useStore();

  const callbacks = {
    switchLang: useCallback(lang => store.actions.language.switchLanguage(lang), [store]),
  };

  return (
    <div className={cn()}>
      <button
        className={lang === 'ru' ? cn('active') : ''}
        onClick={() => callbacks.switchLang('ru')}
      >
        RU
      </button>
      <button
        className={lang === 'en' ? cn('active') : ''}
        onClick={() => callbacks.switchLang('en')}
      >
        EN
      </button>
    </div>
  );
}

export default memo(LanguageSwitcher);
