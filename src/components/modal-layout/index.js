import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ModalLayout({ children, title, onClose }) {
  return (
    <div className="ModalLayout">
      <div className="ModalLayout-header">
        <span className="ModalLayout-title">{title}</span>
        <button onClick={onClose} className="ModalLayout-close">
          <img
            src={new URL('src/assets/images/cross-icon.png', import.meta.url).href}
            alt="Крестик"
          />
        </button>
      </div>

      <div className="ModalLayout-content">{children}</div>
    </div>
  );
}

ModalLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default React.memo(ModalLayout);
