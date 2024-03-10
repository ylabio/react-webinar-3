import PropTypes from "prop-types";
import './style.css';

import React, { useContext } from 'react';
import { LanguageContext } from '../../languages/languagesContext';


function LanguageSelector() {
  const {userLanguage,userLanguageChange } = useContext(LanguageContext);

  return (
    <div className="Language">
      <span className={userLanguage=='ru'?"Language-current":""} onClick={()=>userLanguageChange("ru")}>ru</span>|
      <span className={userLanguage=='en'?"Language-current":""} onClick={()=>userLanguageChange("en")}>en</span>
    </div>
  )
}
export default LanguageSelector