import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Modal({ children, onClose = () => {}}) {
  return (
    <div className="Modal">
      <div className="Modal-layout">
        <div
          className="Modal-header"
          onClick={onClose}>
        </div>

        <div className="Modal-content">
          {children}
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func,
};

export default React.memo(Modal);
