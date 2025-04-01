import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import { formatNumber } from '../../utils';
import List from '../list';
import { cn as bem } from '@bem-react/classname';

function Cart({ cart, items, onRemoveFromCart }) {
  const cn = bem('Cart');
  const totalSum = cart.reduce((sum, item) => {
    const product = items.find(p => p.code === item.code);
    return sum + (product.price * item.quantity);
  }, 0);

  const renderCartItem = (item) => {
    const product = items.find(p => p.code === item.code);
    return (
      <div className={cn('item')}>
        <div className={cn('name')}>{product.title}</div>
        <div className={cn('right')}>
          <span className={cn('quantity')}>{item.quantity} шт</span>
          <span className={cn('price')}>{formatNumber(product.price)} ₽</span>
          <button className={cn('remove')} onClick={() => onRemoveFromCart(item.code)}>
            Удалить
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={cn('header')}>
        <h4>Корзина</h4>
      </div>
      <div className={cn('content')}>
        {cart.length === 0 ? (
          <div className={cn('empty')}>Корзина пуста</div>
        ) : (
          <List 
            items={cart} 
            renderItem={renderCartItem}
            className="List_theme_cart"
          />
        )}
      </div>
      {cart.length > 0 && (
        <div className={cn('footer')}>
          <div className={cn('footer-container')}>
            <div className={cn('footer-total')}>Итого:</div> 
            <div className={cn('footer-sum')}>{formatNumber(totalSum)} ₽</div>
          </div>
        </div>
      )}
    </>
  );
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired
    })
  ).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    })
  ).isRequired,
  onRemoveFromCart: PropTypes.func.isRequired,
};

export default React.memo(Cart);