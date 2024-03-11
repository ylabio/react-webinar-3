import { memo } from "react";
import PropTypes from "prop-types";
import './style.css';
import Language from "../language";

function Head({ title, setLanguage, language }) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
      <Language setLanguage={setLanguage} language={language} />
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  language: PropTypes.string.isRequired,
  setLanguage: PropTypes.func.isRequired,
};

export default memo(Head);
