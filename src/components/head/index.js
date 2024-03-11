import {memo} from "react";
import PropTypes from "prop-types";
import LanguageToggler from "../language-toggler";
import './style.css';

function Head({title}) {

  return (
    <div className='Head'>
      <h1>{title}</h1>
      <LanguageToggler/>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
