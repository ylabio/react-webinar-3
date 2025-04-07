import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { useContext } from 'react';
import { LanguageContext } from '../../contexts/language-context';
import { translations } from '../../locales';

function Head({ title }) {
  const { language, setLanguage } = useContext(LanguageContext);
  const handleLanguageSwitch = () => {
    setLanguage(prevLang => (prevLang === 'en' ? 'ru' : 'en'));
  };

  return (
    <div className="Head">
      <div className="Head-container">
        {/* <h1>{title}</h1> */}
        <h1>{translations[language].shopTitle}</h1>
        <button onClick={handleLanguageSwitch} className="Head-languageSwitch">
          {translations[language].languageSwitch}
        </button>
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
