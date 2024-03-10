import {memo, useCallback} from "react";
import PropTypes from "prop-types";
import LocaleSwitcher from "../locale-switcher";
import './style.css';

function Head(props) {
  return (
    <div className='Head'>
      <h1>{props.title}</h1>
      <LocaleSwitcher
        locales={props.locales}
        locale={props.locale}
        setLocale={props.setLocale}/>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  locales: PropTypes.arrayOf(PropTypes.string).isRequired,
  locale: PropTypes.string.isRequired,
  setLocale: PropTypes.func,
};

Head.defaultProps = {
  setLocale: locale => {},
}

export default memo(Head);
