import React from 'react';
import PropTypes from 'prop-types';
import CartInfo from '../cart-info';
import './style.css';

function Cart({items, cart}) {

  const amount = Object.values(cart).length;
  const cost = items.reduce((prev, cur) => {
    return prev + cur.price * cart[cur.code]
  }, 0);

  return (
    <div className='Cart'>
      <CartInfo amount={amount} cost={cost} />
      <button className='Cart-btn'>
        Перейти
      </button>
    </div>
  )
}

Cart.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  })).isRequired,
  cart: PropTypes.object
};

export default React.memo(Cart);