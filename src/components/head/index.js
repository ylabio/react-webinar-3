import {memo, useCallback} from "react";
import PropTypes from "prop-types";
import './style.css';
import Translation from "../translation";

function Head({translation, currentLang, onChangeLang}) {
  const handleOnChangeLang = useCallback((lang) => {
    onChangeLang(lang);
  }, []);
  return (
    <div className='Head'>
      <h1>{translation}</h1>
      <Translation currentLang={currentLang} onChangeLang={handleOnChangeLang}/>
    </div>
  )
}

Head.propTypes = {
  translation: PropTypes.string.isRequired,
  currentLang: PropTypes.string.isRequired,
  onChangeLang: PropTypes.func.isRequired
};

export default memo(Head);
