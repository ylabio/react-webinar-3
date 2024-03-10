import { cn as bem } from "@bem-react/classname";
import './style.css';
import PropTypes from "prop-types";
import { memo } from "react";

function LanguageTool({toggleLanguage, language}) {

  const cn = bem('LanguageTool');

  let buttonText = ''
  if (language === 'rus') {
    buttonText = 'eng'
  } else {
    buttonText = 'rus'
  }

  return (
    <div className={cn()}>
      <button className={cn('button')} onClick={() => toggleLanguage()}>{buttonText}</button>
    </div>
  )
}

LanguageTool.propTypes = {
  language: PropTypes.string,
  toggleLanguage: PropTypes.func,
};

LanguageTool.defaultProps = {
  toggleLanguage: () => {}
};

export default memo(LanguageTool);