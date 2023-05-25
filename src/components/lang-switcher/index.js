import React from "react";
import { useTranslation } from "../../store/translation";

const LangSwitcher = () => {
  const { set } = useTranslation();

  return (
    <div>
      <button
        onClick={() => {
          set("ru");
        }}
      >
        ru
      </button>
      <button
        onClick={() => {
          set("en");
        }}
      >
        en
      </button>
    </div>
  );
};

export default LangSwitcher;
