import React, { useContext } from 'react';
import { LanguageContext } from '../../language-provider';
import { cn as bem } from "@bem-react/classname";
import './style.css';

const LanguageSwitcher = () => {
  const cn = bem('LanguageSwitcher');
  const { language, changeLanguage } = useContext(LanguageContext);

  const handleLanguageChange = (newLanguage) => {
    changeLanguage(newLanguage);
  };

  return (
    <div className={cn()}>
      <button onClick={() => handleLanguageChange('ru')} disabled={language === 'ru'}>RU</button>
      <button onClick={() => handleLanguageChange('en')} disabled={language === 'en'}>EN</button>
    </div>
  );
};

export default LanguageSwitcher;
