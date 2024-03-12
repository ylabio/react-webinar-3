import React from "react"
import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
import { lang } from "../../data/lang";
import './style.css';

function Navigation({language}) {
  return (
    <Link className={'Navigation'} to='/'>{lang[language].main}</Link>
  )
}

Navigation.propTypes = {
  language: PropTypes.string
};

Navigation.defaultProps = {
  language: 'ru'
}

export default React.memo(Navigation)