import {memo, useCallback} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

function LanguageSwitch() {

  const cn = bem('LanguageSwitch');

  const store = useStore();

  const callbacks = {
    switchLanguage: useCallback((lang) => store.actions.language.switchLanguage(lang), [store])
  }

  const select = useSelector(state => ({
    ...state,
    language: state.language.language,
  }));

  return (
    <div className={cn()}>
      <button className={cn('button')} onClick={() => callbacks.switchLanguage('ru')}>Русский</button>
      <button className={cn('button')} onClick={() => callbacks.switchLanguage('en')}>English</button>
    </div>
  )
}

export default memo(LanguageSwitch);