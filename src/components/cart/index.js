import React from 'react';
import PropTypes from 'prop-types';
import List from '../list';
import './style.css';

function Cart({ cart, totalPrice, onRemoveFromCart }) {
  return (
    <>
      <div className='items-list'>
        <List
          items={cart}
          mode='cart'
          onRemoveFromCart={onRemoveFromCart} 
        />
      </div>
      <div className='modal-footer'>
        <span className='total-label'>Итого:</span>
        <span className='total-value'>{totalPrice} ₽</span>
      </div>
    </>
  );
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired
    })
  ).isRequired,
  totalPrice: PropTypes.number.isRequired,
  onRemoveFromCart: PropTypes.func.isRequired
};

export default React.memo(Cart);
