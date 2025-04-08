import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Head({ title, setLang, lang }) {
  const handleClick = lang => {
    setLang(lang);
  };

  return (
    <div className="Head">
      <div className="Head-container">
        <h1>{title}</h1>
        <div className="Header-lang">
          <button
            disabled={lang === 'ru'}
            onClick={() => {
              handleClick('ru');
            }}
          >
            RU
          </button>
          <span>/</span>
          <button
            disabled={lang === 'en'}
            onClick={() => {
              handleClick('en');
            }}
          >
            EN
          </button>
        </div>
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
