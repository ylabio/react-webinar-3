import { memo } from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({ title, lang, languageNames, changeLang }) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
      <select value={lang} onChange={changeLang}>
        {Object.keys(languageNames).map(key =>
          <option key={key} value={key}>{languageNames[key]}</option>
        )}
      </select>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.string,
  lang: PropTypes.string,
  languageNames: PropTypes.object,
  changeLang: PropTypes.function
};

Head.defaultProps = {
  changeLang: (e) => { }
}

export default memo(Head);
