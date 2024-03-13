import {memo} from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Loader({ children, isLoading }) {
  return (
    <div className='Loader'>
      {isLoading ? 
      <div className='Loader-sheet'>
        <div className='Loader-spinner'></div>
      </div> 
      : children}
    </div>
  )
}

Loader.PropTypes = {
  children: PropTypes.node,
  isLoading: PropTypes.bool
}

export default memo(Loader);
