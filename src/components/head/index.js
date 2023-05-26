import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import LangSwitcher from "../lang-switcher";

function Head({title, changeLang, lang}){
  return (
    <div className='Head'>
      <LangSwitcher/>
      <h1>{title}</h1>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  changeLang: PropTypes.func,
};

export default memo(Head);
