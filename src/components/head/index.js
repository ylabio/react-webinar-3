import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import LanguageSwitch from '../language-switch';

function Head(props) {
  return (
    <div className='Head'>
      <h1>{props.title}</h1>
      <LanguageSwitch onSwitch={props.switchLanguage}/>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  switchLanguage: PropTypes.func,
};

Head.defaultProps = {
  switchLanguage: () => {
  }
}

export default memo(Head);
