import React, { useCallback } from "react";
import useStore from "../../store/use-store";
import languages from "../../store/languageList";
import "./style.css";
import useTranslate from "../../store/use-translate";

function LanguageSwitch() {
  const store = useStore();

  const callbacks = {
    setLanguage: useCallback(
      (language) => store.actions.language.setLanguage(language),
      [store]
    ),
  };

  return (
    <div className="Language-switch">
      {useTranslate('languageSwitchTitle')}
      {languages.map((language) => {
        return (
          <div
            className="Language-switch__item"
            key={language}
            onClick={() => callbacks.setLanguage(language)}
          >
            {language}
          </div>
        );
      })}
    </div>
  );
}

export default LanguageSwitch;
