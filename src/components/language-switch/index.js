import React from 'react';
import PropTypes from "prop-types";
import './style.css';

const LanguageSwitch = ({ onLangChange }) => {
  return (
    <div className={'LanguageSwitch'}>
      <button type={"button"} onClick={() => onLangChange('en')}>EN</button>
      <button type={"button"} onClick={() => onLangChange('ru')}>RU</button>
    </div>
  );
};

LanguageSwitch.propTypes = {
  onLangChange: PropTypes.func
}

export default LanguageSwitch;