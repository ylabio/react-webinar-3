import React from "react";
import { useLanguage } from "../../localization/LanguageContext";

const DropdownMenu = () => {
  const { changeLanguage } = useLanguage();

  const handleLanguageChange = (event) => {
    changeLanguage(event.target.value);
  };

  return (
    <div>
      <select onChange={handleLanguageChange}>
        <option value="ru">RU</option>
        <option value="en">ENG</option>
      </select>
    </div>
  );
};

export default DropdownMenu;
