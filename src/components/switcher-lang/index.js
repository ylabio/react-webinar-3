import {memo, useContext, useState} from "react";
import './style.css';
import {cn as bem} from "@bem-react/classname";
import {LanguageContext} from "../../language-provider.js";

function SwitcherLang() {

  const cn = bem('SwitcherLang');

  const { language, changeLanguage } = useContext(LanguageContext);

  const handleLanguageChange = (newLanguage) => {
    changeLanguage(newLanguage)
  }

  return (
    <div className={cn()}>
      <button onClick={() => handleLanguageChange('ru')} disabled={language === 'ru'}>RU</button>
      <button onClick={() => handleLanguageChange('en')} disabled={language === 'en'}>EN</button>
    </div>
  )
}

export default SwitcherLang;