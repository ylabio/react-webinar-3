import {memo, useContext} from "react";
import PropTypes from "prop-types";
import {LanguageContext} from "../../contexts";
import './style.css';

function Head({title, onToggleLanguage}) {
  const translate = useContext(LanguageContext);
  return (
    <div className='Head'>
      <h1>{title}</h1>
      <button onClick={() => onToggleLanguage()}>{translate('English')}</button>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

Head.defaultProps = {
  onToggleLanguage: () => {},
}

export default memo(Head);
