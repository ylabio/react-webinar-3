import React from 'react';
import PropTypes from 'prop-types';
import List from '../list';
import './style.css';
import { formatPrice } from '../../utils';
import Item from '../item';

function Cart({cart, onDeleteFromCart}) {
  return (
    <div className='Cart'>
        {/* {cart.cartQuantity ? <List list={cart.cartList} isCart={true} onDeleteFromCart={onDeleteFromCart}/> : <span className='Cart-empty'>Корзина пуста</span>} */}
        {cart.cartQuantity ? <List list={cart.cartList} isCart={true} onDeleteFromCart={onDeleteFromCart}><Item /></List> : <span className='Cart-empty'>Корзина пуста</span>}
        {cart.cartQuantity ? <span className='Cart-total'><span>Итого</span><span>{formatPrice(cart.cartSum)}</span></span> : null}
    </div>
  )
}

Cart.propTypes = {
    cart: PropTypes.shape({
      cartList: PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.number,
        title: PropTypes.string,
        price: PropTypes.number
      })),
      cartSum: PropTypes.number,
      cartQuantity: PropTypes.number
    }).isRequired,
};

export default React.memo(Cart)