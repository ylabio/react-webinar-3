import React from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {useLanguage} from "../../LanguageContext";

function LanguageSwitcher() {

  const cn = bem('LanguageSwitcher')

  const { setLanguage, language, tr } = useLanguage();

  return (
    <div className={cn()}>
      {tr('language')}: {language === 'en'
      ?
      <button onClick={() => setLanguage('ru')}>EN</button>
      :
      <button onClick={() => setLanguage('en')}>RU</button>}
    </div>
  )
}

export default React.memo(LanguageSwitcher);