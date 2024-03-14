import {memo} from "react";
import PropTypes from "prop-types";
import {languages} from './../../store/language/languages'
import './style.css';

function Head({title, lang, changeCurrentLanguage}) {

  return (
    <div className='Head'>
      <h1>{title}</h1>
      <button onClick={() => changeCurrentLanguage()}>{languages[lang].language}</button>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  lang: PropTypes.string,
  changeCurrentLanguage: PropTypes.func
};

export default memo(Head);
