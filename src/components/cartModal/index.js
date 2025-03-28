import React from 'react';
import './style.css'
import PropTypes from 'prop-types';
import { CartList } from '../cartList';

export const CartModal = React.memo(({
  cart = {},
  onToggleCart = () => {},
  onRemoveFromCart = () => {},
  totalSum = 0
}) => {

  return (
      <div className='Modal'>
        <div className='Modal-header'>
          <h2>Корзина</h2>
          <button
            className='Modal-close'
            aria-label='Закрыть'
            onClick={onToggleCart}
          >
            &times;
          </button>
        </div>
        {totalSum > 0 ? (
          <CartList
            cart={cart}
            onRemoveFromCart={onRemoveFromCart}
          />
        ) : (
          <div className='Empty-basket'>В вашей корзине ничего нет</div>
        )}
        <div className='Cart-item-bold Modal-footer'>
          <div>Итого: </div>
          <div className='Modal-total'>{totalSum} ₽</div>
        </div>
      </div>
  )
})

CartModal.propTypes = {
  cart: PropTypes.objectOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ),
  onToggleCart: PropTypes.func,
  onRemoveFromCart: PropTypes.func,
  totalSum: PropTypes.number,
};
