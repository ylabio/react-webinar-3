import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ModalLayout({ isOpen = false, onClose = () => {}, children }) {
  if (!isOpen) return null;

  return (
    <div className="ModalLayout" onClick={onClose}>
      <div className="ModalLayout-container" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

ModalLayout.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

export default React.memo(ModalLayout);
