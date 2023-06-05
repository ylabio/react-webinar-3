import {memo} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import './style.css';

function AuthButton({url, t, value, isLink = false}) {
  return (
    <Link className={isLink ? 'Auth-button-link' : 'Auth-button'} to={url}>{t(value)}</Link>
  )
}

AuthButton.propTypes = {
    url: PropTypes.string,
    value: PropTypes.string,
    t: PropTypes.func
}

AuthButton.defaultProps = {
    t: (text) => text
}

export default memo(AuthButton)