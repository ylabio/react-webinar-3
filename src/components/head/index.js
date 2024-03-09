import {memo, useContext} from "react";
import PropTypes from "prop-types";
import {LanguageContext} from "../../contexts";
import './style.css';

function Head({title, onToggleLanguage}) {
  const tralslate = useContext(LanguageContext)
  return (
    <div className='Head'>
      <h1>{title}</h1>
      <button onClick={() => onToggleLanguage()}>{tralslate('English')}</button>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
