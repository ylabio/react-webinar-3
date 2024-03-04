import React from "react";
import PropTypes, { object } from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import { formatSum } from "../../utils";

function CartItem({ item, removeItemFromCart }) {

  const cn = bem('Cart-item');

  return (
    <div className={cn()}>
      <div className={cn('code')}>{item.code}</div>
      <div className={cn('title')}>
        {item.title}
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{formatSum(item.price, { style: 'currency', currency: 'RUB' })}</div>
        <div className={cn('count')}>{item.counter + ' шт.'}</div>
        <button onClick={() => {
          removeItemFromCart(item.code)
        }}>
          Удалить
        </button>
      </div>
    </div>
  )
}
CartItem.propTypes = {
  item: PropTypes.object.isRequired,
  removeItemFromCart: PropTypes.func
};

CartItem.defaultProps = {
  item: {},
  removeItemFromCart: () => {

  }
}

export default React.memo(CartItem);
