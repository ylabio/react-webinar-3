import PropTypes from 'prop-types';

import './style.css';

export default function LanguageToggler({ currentLanguage, onToggleLanguage }) {

  const languageButtontitle = currentLanguage === 'ru'? 'Русский' : 'English'

  return <button onClick={onToggleLanguage} className="LanguageToggler">{languageButtontitle}</button>
}

LanguageToggler.propTypes = {
  currentLanguage: PropTypes.string,
  onToggleLanguage: PropTypes.func,
}