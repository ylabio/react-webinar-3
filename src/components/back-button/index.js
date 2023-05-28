import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import './style.css';

function BackButton({localize}) {
  const location = useLocation();
  const navigate = useNavigate();

  const content = location.pathname.split('/')[1] == 'good' && location.pathname.split('/')[2] ? 
    <Link className='Back-button' onClick={() => navigate(-1)}>{localize('back')}</Link> 
  : null;

  return content
}

BackButton.propTypes = {
  localize: PropTypes.func
}

BackButton.defaultProps = {
  localize: () => {}
}

export default React.memo(BackButton)