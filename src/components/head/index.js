import { memo } from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({ title, changeLang, lang }) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
      <div className='Head-buttons'>
        <button className={lang === 'ru' ? 'Head-button active' : 'Head-button'} onClick={() => changeLang('ru')}>RU</button>
        <button className={lang === 'en' ? 'Head-button active' : 'Head-button'} onClick={() => changeLang('en')}>EN</button>
      </div>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
