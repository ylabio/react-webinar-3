import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import { useState } from "react";
import translations from '../../utils/translations';
import { useLanguage } from "../../utils/languageContext";
function Head({ titleKey }) {
    const { lang, toggleLanguage } = useLanguage();
    const switchToText = translations[lang].switchTo;
    return (
        <div className='Head'>
            <h1>{titleKey}</h1>
            <button onClick={toggleLanguage} style={{ position: 'absolute', right: '10px' }}>
                {switchToText}
            </button>
        </div>
    );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
