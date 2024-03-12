import React, { useEffect } from "react";
import { useLanguage } from "../../localization/LanguageContext";

const DropdownMenu = () => {
  const { currentLanguage, changeLanguage } = useLanguage();

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage && storedLanguage !== currentLanguage) {
      changeLanguage(storedLanguage);
    }
  }, [currentLanguage, changeLanguage]);

  const handleLanguageChange = (event) => {
    changeLanguage(event.target.value);
  };

  return (
    <div>
      <select value={currentLanguage} onChange={handleLanguageChange}>
        <option value="ru">RU</option>
        <option value="en">EN</option>
      </select>
    </div>
  );
};

export default DropdownMenu;
