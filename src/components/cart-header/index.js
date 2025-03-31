import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '../close-icon';
import './style.css';

function CartHeader({ onClose }) {
  return (
    <div className="Cart-header">
      <h2>Корзина</h2>
      <button onClick={onClose} className="Close-button">
        <CloseIcon />
      </button>
    </div>
  );
}

CartHeader.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default React.memo(CartHeader);
