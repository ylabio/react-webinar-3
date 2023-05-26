import React from "react";
import { useTranslation } from "../../store/translation";
import "./style.css";

const LangSwitcher = () => {
  const { set } = useTranslation();

  return (
    <div className="LangSwitcher">
      <button
        className="LangSwitcher-item"
        onClick={() => {
          set("ru");
        }}
      >
        ru
      </button>
      <button
        className="LangSwitcher-item"
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
