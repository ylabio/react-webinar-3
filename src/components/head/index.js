import {memo, useContext} from "react";
import PropTypes from "prop-types";
import './style.css';
import LanguageSwitcher from "../language-switcher";
import { LanguageContext } from "../../store/language";
import translations from "../../store/language/translations.json"

function Head({title}){

  const ln = useContext(LanguageContext).ln

  return (
    <div className='Head'>
      <h1>{title}</h1>
      <div className='Head-language'>
        <LanguageSwitcher/>
      </div>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
