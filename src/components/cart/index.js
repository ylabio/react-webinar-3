import React from 'react';
import PropTypes from 'prop-types';
import List from '../list';
import './style.css';

function Cart({
  cart = [],
  isVisible = false,
  onVisibleCart = () => { },
  nameButton = '',
  classActionButton = '',
  handlerListItem = () => { }
}) {
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  function closeCartPopup() {
    onVisibleCart();
  }

  return (
    isVisible &&
    <div className='Cart-wrap'>
      <div className='Cart-popup'>
        <h2 className='Cart-popup__title'>Корзина</h2>
        <List
          list={cart}
          nameButton={nameButton}
          handlerListItem={handlerListItem}
          classActionButton={classActionButton}
        />
        <div className='Cart-popup__total-price'>
          <div className='Cart-popup__total-price-box'>
            <span className='Cart-popup__total-price-title'>Итого:</span>
            <span className='Cart-popup__total-price-sum'>{` ${totalPrice.toLocaleString()} ₽`}</span>
          </div>
        </div>
        <button className='Cart-popup__close-btn' onClick={closeCartPopup}>&#10006;</button>
      </div>
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
  isVisible: PropTypes.bool,
  onVisibleCart:PropTypes.func,
  nameButton: PropTypes.string.isRequired,
  classActionButton: PropTypes.string,
  handlerListItem: PropTypes.func,
};

export default React.memo(Cart);
