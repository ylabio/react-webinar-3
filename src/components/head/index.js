import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({title, changeLang, lang}) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
      <button className="ChangeLanguage" onClick={changeLang}>{lang=='Рус' ? 'Eng' : 'Рус'}</button>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  lang: PropTypes.string,
  changeLang: PropTypes.func.isRequired,
};

export default memo(Head);
