import {memo, useCallback} from "react";
import PropTypes from "prop-types";
import {translateWord} from "../../utils";
import './style.css';

function Head({title, selectedLanguage, changeLanguageTo}){

  const callbacks = {
    changeLanguage: useCallback((lang) => changeLanguageTo(lang))
  }

  return (
    <div className='Head'>
      <h1>{translateWord(title, selectedLanguage)}</h1>
      <div className='Head-languages'>
        <p onClick={() => callbacks.changeLanguage("ru-RU")}>RU</p>
        <p onClick={() => callbacks.changeLanguage("en-US")}>EN</p>
      </div>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  selectedLanguage: PropTypes.string,
  changeLanguageTo: PropTypes.func,
};

Head.defaultProps = {
  changeLanguageTo: () => {},
  selectedLanguage: "ru-RU",
};

export default memo(Head);
