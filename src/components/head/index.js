import {memo} from "react";
import PropTypes from "prop-types";
import { lang } from "../../data/lang";
import './style.css';

function Head({title, language, onToggleLang}) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
      <button className="Head-lang" onClick={onToggleLang}>{lang[language].language}</button>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  language: PropTypes.string,
  onToggleLang: PropTypes.func
};

export default memo(Head);
