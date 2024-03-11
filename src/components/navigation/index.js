import { memo } from "react";
import PropTypes from 'prop-types';
import './style.css';
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div className='Navigation'>
      <Link to={'/'}>Главная</Link>
    </div>
  )
}

Navigation.propTypes = {
  local: PropTypes.object,
};

export default memo(Navigation);