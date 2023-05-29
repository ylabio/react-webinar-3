import {memo, useEffect, useState} from "react";
import "./style.css";
import useStore from "../../store/use-store";

function languageToggle() {
  const [language, setLanguage] = useState('RU');
  
  const store = useStore();

  const onChange = (lang) => {
    setLanguage(lang);
  }

  useEffect(() => {
    store.actions.language.toggleLanguage(language);
  }, [language])

  return (
    <div className=''>
      <button className={language === "EN" ? `Language-button--active` :  `Language-button`} onClick={() => onChange("EN")}>
        EN
      </button>
      <button className={language === "RU" ? `Language-button--active` :  `Language-button`}  onClick={() => onChange("RU")}>
        RU
      </button>
    </div>
  );
}

export default memo(languageToggle);
