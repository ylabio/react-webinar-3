import React from 'react'
import './style.css';
import PropTypes from 'prop-types';

function Overlay(props) {
  const handleOutsideClick = (event) => {
    if (event.target === document.querySelector('.Overlay')) {
        props.onClose();
    }
  };
  return (
    <div className='Overlay' onClick={handleOutsideClick}>
        {props.children}
    </div>
  )
}

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired
};

Overlay.defaultProps = {
  onClose : () => {
  }
}

export default Overlay