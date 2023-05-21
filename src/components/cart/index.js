import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import { plural, formatPrice } from '../../utils';
import Modal from '../modal';
import List from '../list';
import Item from '../item';
import './style.css';

function Cart({count, price, onClick}){
  const cn = bem('Cart');

  return (
    <>
      <div className={cn()}>
        <div className={cn('preview')}>
          В корзине: 
          <b>{count ? `${count} ${plural(count, {one: 'товар', few: 'товара', many: 'товаров'})} / ${formatPrice(price)} ₽` : 'пусто'}</b>
        </div>
        <button className={cn('btn')} onClick={onClick}>Перейти</button>
      </div>
    </>
  )
}

Cart.propTypes = {
  count: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  onClick: PropTypes.func
};

List.defaultProps = {
  onClick: () => {},
}

export default React.memo(Cart);
