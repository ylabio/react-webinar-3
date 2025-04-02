import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import Basket from '../basket';

function Modal({ modalOpen, setModalOpen, cartItems, onRemoveFromCart, cartTotal }) {
  return (
    modalOpen && (
      <div className="Modal-overlay">
        <div className="Modal-container">
          <Basket
            setModalOpen={setModalOpen}
            cartItems={cartItems}
            cartTotal={cartTotal}
            onRemoveFromCart={onRemoveFromCart}
          />
        </div>
      </div>
    )
  );
}

Modal.propTypes = {
  modalOpen: PropTypes.bool,
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
    }),
  ).isRequired,
  setModalOpen: PropTypes.func,
  onGetCartTotal: PropTypes.func,
  onRemoveFromCart: PropTypes.func,
};

export default React.memo(Modal);
