import {Link} from "react-router-dom";
import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css'

function Navigation({link, title}) {
  return (
    <div className='Navigation'>
      <Link to={link}>{title}</Link>
    </div>
  )
}

Navigation.PropTypes = {
  link: PropTypes.string,
  title: PropTypes.string
}

export default memo(Navigation);
