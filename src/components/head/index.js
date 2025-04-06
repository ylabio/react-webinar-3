import PropTypes from 'prop-types';
import { memo } from 'react';
import LanguageSwitcher from '../language-switcher';
import './style.css';

function Head({ title, lang = 'ru', onLanguageChange = () => {} }) {
  return (
    <div className="Head">
      <div className="Head-container">
        <h1>{title}</h1>
        <LanguageSwitcher lang={lang} onLanguageChange={onLanguageChange} />
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  lang: PropTypes.string,
  onLanguageChange: PropTypes.func,
};

export default memo(Head);
