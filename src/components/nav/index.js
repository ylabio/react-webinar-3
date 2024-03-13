import React from "react"
import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
import './style.css';

function Nav({translations, path}) {
  return (
    <Link className='Nav' to={path}>{translations.navTitle}</Link>
  )
}

Nav.propTypes = {
  translations: PropTypes.object,
  path: PropTypes.string
};


export default React.memo(Nav)
