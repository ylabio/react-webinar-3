import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import ButtonCart from '../button-cart';
import Modal from '../modal';

function Controls({ cart, onRemoveFromCart }) {
  const [isOpen, setIsOpen] = useState(false);

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.count), 0);

  return (
    <>
      <div>
        <ButtonCart
          setIsOpen={setIsOpen}
          totalCount={cart.reduce((sum, item) => sum + item.count, 0)}
          totalPrice={totalPrice}
        />
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        cart={cart}
        totalPrice={totalPrice}
        onRemoveFromCart={onRemoveFromCart}
      />
    </>
  );
}

Controls.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired
    })
  ).isRequired,
  onRemoveFromCart: PropTypes.func.isRequired
};

export default React.memo(Controls);
