import React from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import CartItem from "../cart-item/index";
import { formatSum } from "../../utils";
import './style.css';

function Modal({ closeModal, cartItems, totalPrice, removeItemFromCart }) {

  const cn = bem('Modal');

  return (
    <div className={cn('background')}>
      <div className={cn()}>
        <div className={cn('head')}>
          <div className={cn('title')}>Корзина</div>
          <button className={cn('button')} onClick={() => closeModal()}>Закрыть</button>
        </div>
        {cartItems.map((item, index) => <CartItem item={item} removeItemFromCart={removeItemFromCart} key={index} />)}
        <div className={cn('total')}>
          <div className={cn('total-title')}>Итого</div>
          <div className={cn('total-price')}>{formatSum(totalPrice, { style: 'currency', currency: 'RUB' })}</div>
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  closeModal: PropTypes.func,
  cartItems: PropTypes.arrayOf(Object),
  totalPrice: PropTypes.number,
  removeItemFromCart: PropTypes.func
};

Modal.defaultProps = {
  closeModal: () => {
  },
  cartItems: [],
  totalPrice: 0,
  removeItemFromCart: () => {
  }
}

export default React.memo(Modal);
