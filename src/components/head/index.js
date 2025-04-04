import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import { LanguageContext } from '../language-provider';
import './style.css';

const translations = {
  ru: {
    title: 'Магазин'
  },
  en: {
    title: 'Store'
  }
};

function Head({ title }) {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <div className="Head">
      <div className="Head-container">
        <h1>{ title || translations[language].title }</h1>
        <div className="language-switcher">
          <button
            className={`language-button ${language === 'ru' ? 'active-lang' : ''}`}
            onClick={() => setLanguage('ru')}
          >
            RU
          </button>
          <button
            className={`language-button ${language === 'en' ? 'active-lang' : ''}`}
            onClick={() => setLanguage('en')}
          >
            EN
          </button>
        </div>
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
