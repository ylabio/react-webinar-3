import {memo, useContext} from "react";
import PropTypes from "prop-types";
import './style.css';
import { LanguageContext } from "../../languageContext";

function Head({title}) {

  const [language, setLanguage] = useContext(LanguageContext)

  const changeLanguage = (event) => {
    setLanguage(event.currentTarget.value);
  }

  return (
    <div className='Head'>
      <h1>{title}</h1>
      <select value={language} onChange={changeLanguage}>
        <option value="ru">Русский</option>
        <option value="eng">English</option>
      </select>	
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
