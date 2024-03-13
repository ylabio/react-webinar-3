import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import LanguageSwitch from "../languageSwitch";
import { useLanguage } from "../../languageContext";

function Head({title}) {
  const {tr} = useLanguage() 
  return (
    <div className='Head'>
      <h1>{tr('store')}</h1>
      <LanguageSwitch />
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
