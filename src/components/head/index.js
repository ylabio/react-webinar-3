import {memo} from "react";
import PropTypes from "prop-types";
import LanguageSwitch from "../language-switch";
import './style.css';

function Head({title}){
  return (
    <div className='Head'>
      <h1>{title}</h1>
      <LanguageSwitch />
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
