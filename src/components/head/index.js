import {memo} from "react";
import PropTypes from "prop-types";
import {useLanguage} from '../../localization/language-context'
import texts from '../../localization/texts';
import './style.css';

function Head({title}) {
  const {language, toggleLanguage} = useLanguage();

  return (
    <div className='Head'>
      <h1>{title}</h1>
      <button onClick={toggleLanguage}>{texts[language].toggler}</button>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
