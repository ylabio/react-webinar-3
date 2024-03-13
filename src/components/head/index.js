import { memo, useState } from "react";
import PropTypes from "prop-types";
import propTypes from 'prop-types';
import './style.css';
import LanguageBtn from '../head-language-btn';

function Head({title, languageState, onChangeLang}) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)

  return (
    <div className='Head'>
      <h1>{title}</h1>
      <LanguageBtn
        isDropdownVisible={isDropdownVisible}
        languageState={languageState}
        onChangeLang={onChangeLang}
        handleDropDownOpen={setIsDropdownVisible}
      />
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  languageState: PropTypes.shape({
    currentLanguage: PropTypes.string,
    languages: PropTypes.shape({
      ru: PropTypes.string,
      en: PropTypes.string,
    })
  }),
  onChangeLang: PropTypes.func
};

export default memo(Head);
