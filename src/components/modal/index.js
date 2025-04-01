import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import close from '../../assets/close-cart.png';

function Modal({
  isOpen = false,
  onClose = () => {},
  title = '',
  children
}) {
  if (!isOpen) return null;

  return (
    <div className="Modal-overlay" onClick={onClose}>
      <div className="Modal" onClick={e => e.stopPropagation()}>
        <h3>{title}</h3>
        <button className="Modal-close" onClick={onClose}>
          <img src={close} alt="Закрыть" />
        </button>
        <div className="Cart-items">
          {children}
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default React.memo(Modal);
