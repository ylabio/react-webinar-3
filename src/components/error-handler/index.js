import {memo} from 'react';
import PropTypes from "prop-types";
import './style.css';

function ErrorHandler({error}) {
  return error ? <span className='Error-handler'>{error}</span> : null;
}

ErrorHandler.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ])
}

export default memo(ErrorHandler)