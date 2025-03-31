
import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ModalWindow({ children, onClose }) {
  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal">
        <div className="modal-content">
          {children}
        </div>
      </div>
    </>
  );
}

ModalWindow.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func
};

export default React.memo(ModalWindow);
