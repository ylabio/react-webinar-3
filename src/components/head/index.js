import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({title, language, toggleLanguage}) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
      <button onClick={toggleLanguage}>{language.toggler}</button>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
