import { memo } from "react";
import PropTypes from "prop-types";
import LanguageSelectButton from "../language-select-button";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Head({title, languages, currentLanguage, onLanguageChange}) {
  const cn = bem('Item');

  return (
    <div className={cn()}>
      <h1 className={cn("title")}>{title}</h1>
      <div className={cn("language")}>
        {languages.map((lang) => {
          return  <LanguageSelectButton 
                    key={lang.code} 
                    lang={lang.title}
                    active={lang.code === currentLanguage}
                    onClick={() => onLanguageChange(lang.code)}
                  />
        })}
      </div>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  languages: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    title: PropTypes.string,
  })),
  currentLanguage: PropTypes.string,
};

export default memo(Head);
