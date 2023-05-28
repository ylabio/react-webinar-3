import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import LanguageToggle from "../languageToggle";

function Head({title}){
  return (
    <div className='Head'>
      <h1>{title}</h1>
      <LanguageToggle />
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
