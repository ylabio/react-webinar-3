import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import LocalizationSelect from "../localization-select";

function Head({title, onChangeLanguage, languages, currentLanguage}){
  return (
    <div className='Head'>
      <h1>{title}</h1>

      <LocalizationSelect onChangeLanguage={onChangeLanguage} languages={languages} currentLanguage={currentLanguage} />
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
