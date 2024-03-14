import React from "react";
import { useLanguage } from "../../languageContext";

function LanguageSwitch() {


  const { setLanguage, Language, tr } = useLanguage();

  return (
    <div >
      {Language === 'en'
      ?
      <button onClick={() => setLanguage('ru')}>EN</button>
      :
      <button onClick={() => setLanguage('en')}>RU</button>}
    </div>
  )
}

export default React.memo(LanguageSwitch);