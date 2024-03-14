import { memo } from "react";
import PropTypes from "prop-types";
import './style.css';

function Language({ setLanguage, language }) {
  return (
    <div className="Language">{language === 'ru' ?
      <>
        <p className="Language-paragraph">Изменить язык:</p>
        <button className="Language-button"
          onClick={() => setLanguage('en')}>en
        </button></> :
      <>
        <p className="Language-paragraph">Change the language:</p>
        <button className="Language-button"
          onClick={() => setLanguage('ru')}>ru</button>
      </>}</div>
  )
}

Language.propTypes = {
  language: PropTypes.string,
  setLanguage: PropTypes.func.isRequired,
};


Language.defaultProps = {
  setLanguage: () => { },
}

export default memo(Language);
