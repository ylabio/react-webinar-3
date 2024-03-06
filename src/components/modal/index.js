import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Modal({isOpen, children}) {
  return (
    <div className={`Modal ${isOpen && 'Modal--opened'}`}>
      <div className='Modal-container'>
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.node
};

Modal.defaultProps = {
  isOpen: false
};

export default React.memo(Modal);
