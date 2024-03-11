import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import LangSwitcher from '../lang-switcher'

function Head({title, lang, supportedLangs, onLangChange}) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
      <LangSwitcher lang={lang} supportedLangs={supportedLangs} onChange={onLangChange}/>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
