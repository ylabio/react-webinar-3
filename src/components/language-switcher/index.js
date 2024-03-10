import React, {useContext, useState} from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {useLanguage} from "../../language-provider";

function LanguageSwitcher() {

  const cn = bem('LanguageSwitcher')

  const { language, setLanguage } = useLanguage()

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <div className={cn()}>

      {
        language === 'ru'
        ?
          <button className={cn('btn')} onClick={() => handleLanguageChange('en')}>
            RU
          </button>
        :
          <button className={cn('btn')} onClick={() => handleLanguageChange('ru')}>
            EN
          </button>
      }
    </div>
  )
}

export default React.memo(LanguageSwitcher);