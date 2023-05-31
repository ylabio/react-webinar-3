import React, { memo } from 'react'
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import './style.css'

function Navigation (props) {
  return (
    <>
        <Link className='Navigation' to={props.address}>{props.name}</Link>
    </>
  )
}

Navigation.propTypes = {
    name: PropTypes.string,
    address: PropTypes.string,
  };

export default memo(Navigation);