import React from 'react';
import { cn as bem } from '@bem-react/classname';
import { useLanguage } from '../../language-context';
import translations from '../../locales';
import './style.css';

function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];
  const cn = bem('LanguageToggle');

  return (
    <button className={cn()} onClick={toggleLanguage}>
      {language === 'ru' ? 'EN' : 'RU'}
    </button>
  );
}

export default React.memo(LanguageToggle);
