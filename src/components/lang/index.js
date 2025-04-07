import { memo, useCallback, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';

function Lang({}) {
  const store = useStore();

  const cn = bem('Lang');

  const callbacks = {
    setLanguage: useCallback(lang => store.actions.lang.setLanguage(lang), [store]),
  };

  const select = useSelector(state => ({
    language: state.lang.language,
  }));

  const languages = ['ru', 'en'];

  return (
    <div className={cn()}>
      {languages.map(lang => (
        <button
          key={lang}
          onClick={() => callbacks.setLanguage({ lang })}
          className={cn('Button', { active: lang == select.language })}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default memo(Lang);
