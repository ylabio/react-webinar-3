import { memo, useState } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function LanguageTool({ setLanguage }) {
  const cn = bem('LanguageTool');
  const [ lang, setLang]= useState('ru');

  const callbacks = {
    languageHandler: (e) => {
      setLanguage(e.target.id);
      setLang(e.target.id)
    }
  };
  return (
    <div className={cn()}>
      <button id={'ru'} onClick={callbacks.languageHandler}
        className={lang === 'ru'
          ? cn('btn', { active: true })
          : cn('btn')}>
        RU</button>
      <button id={'en'} onClick={callbacks.languageHandler}
        className={lang === 'en'
          ? cn('btn', { active: true })
          : cn('btn')}>
        EN</button>
    </div>
  );
}

LanguageTool.propTypes = {
  setLanguage: PropTypes.func.isRequired
};

LanguageTool.defaultProps = {
  setLanguage: () => { },
}

export default memo(LanguageTool);
