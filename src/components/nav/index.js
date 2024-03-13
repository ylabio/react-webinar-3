import React from "react"
import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
import './style.css';

function Nav({translations}) {
  return (
    <Link className='Nav' to='/'>{translations.navTitle}</Link>
  )
}

Nav.propTypes = {
  translations: PropTypes.object
};


export default React.memo(Nav)