import React from 'react';
import cross from '../../assets/images/cross.svg';
import List from '../list';
import { CartInfo } from '../cart_info';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Modal({ cart = [], totalPrice, onShowModal, onDeleteItem }) {
  const cn = bem('Modal');

  return (
    <div className={cn()}>
      <div className={cn('content')}>
        <header className={cn('header')}>
          <h2 className={cn('header_title')}>Корзина</h2>
          <button className={cn('header_button')} type="button" onClick={onShowModal}>
            <img src={cross} alt="Закрыть корзину" />
          </button>
        </header>
        {cart.length ? (
          <>
            <List list={cart} onButtonClick={onDeleteItem} isCartMode={true} />
            <CartInfo price={totalPrice} />
          </>
        ) : (
          <div className={cn('info')}>Пусто</div>
        )}
      </div>
    </div>
  );
}

Modal.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      count: PropTypes.number,
      quantity: PropTypes.number,
    }),
  ).isRequired,
  onShowModal: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

export { Modal };