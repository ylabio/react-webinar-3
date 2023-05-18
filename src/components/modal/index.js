import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Modal({isOpen, onClose, children, title}){
  return (
    <div className={`Modal ${isOpen && 'opened'}`}>
      <div className='Modal-content'>
        <div className='Modal-head'>
          <h2>{title}</h2>
          <button onClick={onClose}>Закрыть</button>
        </div>
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

Modal.defaultProps = {
  isOpen: false,
  onClose: () => {},
}

export default Modal;
