import { memo } from "react";
import PropTypes from 'prop-types';
import './style.css';
import { Link } from "react-router-dom";

function Navigation({ localeDict }) {
  return (
    <div className='Navigation'>
      <Link to={'/'}>{localeDict.main}</Link>
    </div>
  )
}

Navigation.propTypes = {
  local: PropTypes.object,
};

export default memo(Navigation);