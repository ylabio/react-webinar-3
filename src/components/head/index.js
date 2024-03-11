import { memo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import LanguageSelectButton from "../language-select-button";
import { cn as bem } from '@bem-react/classname';
import './style.css';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Head({title}) {
  const cn = bem('Item');

  const store = useStore();

  const location = useLocation();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    languages: state.localization.languages,
    currentLanguage: state.localization.currentLanguage,
  }));

  const onLanguageChange = useCallback((lang) => {
    store.actions.localization.setCurrentLanguage(lang);    
  }, [store]);
  
  return (
    <div className={cn()}>
      <h1 className={cn("title")}>{title}</h1>
      <div className={cn("language")}>
        {select.languages.map((lang) => {
          return  <LanguageSelectButton 
                    key={lang.code} 
                    lang={lang.title}
                    active={lang.code === select.currentLanguage}
                    onClick={() => onLanguageChange(lang.code)}
                  />
        })}
      </div>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
