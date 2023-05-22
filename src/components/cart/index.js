import React from "react";
import './style.css';
import Head from "../head";
import List from "../list";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

function Cart({cart, onCloseCart, onDeleteItemFromCart, totalPrice}){

  const cn = bem('Cart')

  return (
    <div className={cn()}>
      <div className={cn('content')}>
        <Head title={'Корзина'}>
          <button className={cn('closeButton')} onClick={onCloseCart}>
            Закрыть
          </button>
        </Head>
        <div className={cn('emptySpace')}></div>
        <List list={cart} onClick={onDeleteItemFromCart} btnTitle={'Удалить'} />
        <div className={cn('totalPrice')}>
          <span>Итого</span>
          <span>{totalPrice} ₽</span>
        </div>
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
  ),
  onDeleteItemFromCart: PropTypes.func,
  onCloseCart: PropTypes.func,
  totalPrice: PropTypes.number,
};

export default React.memo(Cart);