import React from 'react';
import Head from '../head';
import List from '../list';
import './style.css';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

const Cart = ({ cart, onDeleteCartItem, onCloseCart, totalCost }) => {
  const cn = bem('Cart');

  return (
    <div className={cn()}>
      <div className={cn('content')}>
        <Head title={'Корзина'}>
          <button className={cn('closeButton')} onClick={onCloseCart}>
            Закрыть
          </button>
        </Head>
        <div className={cn('emptySpace')}></div>
        <List list={cart} onClick={onDeleteCartItem} buttonTitle={'Удалить'} />
        <div className={cn('totalCost')}>
          <span>Итого</span>
          <span>{totalCost} ₽</span>
        </div>
      </div>
    </div>
  );
};

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      count: PropTypes.number,
    })
  ),
  onDeleteCartItem: PropTypes.func,
  onCloseCart: PropTypes.func,
  totalCost: PropTypes.number,
};

export default React.memo(Cart);
