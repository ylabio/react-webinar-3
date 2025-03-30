import React from 'react';
import PropTypes from 'prop-types';
import List from '../list';
import CartItem from '../cart-item';
import './style.css';

function Cart({
  cart = [],
  cartTotalPrice,
  onVisibleCart = () => { },
  handlerItem = () => { }
}) {

  function closeCartPopup() {
    onVisibleCart();
  }

  return (
    <div className='Cart-popup'>
      <h2 className='Cart-popup__title'>Корзина</h2>

      <List list={cart} ItemComponent={CartItem} handlerItem={handlerItem} />

      <div className='Cart-popup__total-price'>
        <div className='Cart-popup__total-price-box'>
          <span className='Cart-popup__total-price-title'>Итого:</span>
          <span className='Cart-popup__total-price-sum'>{` ${cartTotalPrice.toLocaleString()} ₽`}</span>
        </div>
      </div>
      <button className='Cart-popup__close-btn' onClick={closeCartPopup}>&#10006;</button>
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      count: PropTypes.number,
    })
  ).isRequired,
  cartTotalPrice: PropTypes.number.isRequired,
  onVisibleCart: PropTypes.func,
  handlerItem: PropTypes.func,
};

export default React.memo(Cart);
