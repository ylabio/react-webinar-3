import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { useLang } from '../../store/lang/language-context';

function Head({ title }) {
  const { setLang } = useLang();
  const [isActive, setIsActive] = useState(true);
  const handleClick = lang => {
    setLang(lang);
    setIsActive(prev => !prev);
  };

  return (
    <div className="Head">
      <div className="Head-container">
        <h1>{title}</h1>
        <div className="Header-lang">
          <button
            disabled={isActive}
            onClick={() => {
              handleClick('ru');
            }}
          >
            RU
          </button>
          <span>/</span>
          <button
            disabled={!isActive}
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
