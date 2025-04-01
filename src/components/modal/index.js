import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Modal({ children = [], onClose = () => {}, icon: Icon = null }) {
  return (
    <div className="Modal-overlay" onClick={onClose}>
      <div className="Modal-content" onClick={e => e.stopPropagation()}>
        <button className="Modal-close" onClick={onClose} aria-label="Закрыть">
          {Icon && <Icon className="Icon" />}
        </button>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
