import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { CloseIcon } from '../icons';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className='modal-overlay'>
      <div className='modal-container'>
        <div className='modal-content'>
          <button className='modal-close-button' onClick={onClose}>
            <CloseIcon/>
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default React.memo(Modal);
