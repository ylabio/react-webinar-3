import React from 'react';
import PropTypes from 'prop-types';
import List from '../list';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Cart({ cart, totalPrice, onRemoveFromCart }) {
  const cn = bem('Cart');

  if (cart.length === 0) {
    return <div className={cn('empty')}>Корзина пуста</div>;
  }

  return (
    <div className={cn()}>
      <List list={cart} onRemoveFromCart={onRemoveFromCart} />
      <div className={cn('total')}>
        <span>Итого</span><span>{totalPrice}</span>
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
  totalPrice: PropTypes.string.isRequired,
  onRemoveFromCart: PropTypes.func.isRequired,
};

export default React.memo(Cart);
