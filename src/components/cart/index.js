import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import { formatNumber } from '../../utils';
import { cn as bem } from '@bem-react/classname';

function Cart({ cart, items, onRemoveFromCart }) {
  const cn = bem('Cart');
  const totalSum = cart.reduce((sum, item) => {
    const product = items.find(p => p.code === item.code);
    return sum + (product.price * item.quantity);
  }, 0);

  const isCartEmpty = cart.length === 0;

  return (
    <>
        <div className={cn('header')}>
          <h4>Корзина</h4>
        </div>
        <div className={cn('content')}>
          {isCartEmpty ? (
            <div className={cn('empty')}>Корзина пуста</div>
          ) : (
            cart.map(item => {
              const product = items.find(p => p.code === item.code);
              return (
                <div key={item.code} className={cn('item')}>
                  <div className={cn('name')}>{product.title}</div>
                  <div className={cn('right')}>
                    <span className={cn('quantity')}>{item.quantity} шт</span>
                    <span className={cn('price')}>{formatNumber(product.price)} ₽</span>
                    <button className={cn('remove')} onClick={() => onRemoveFromCart(item.code)}>Удалить</button>
                  </div>
                </div>
              );
            })
          )}
        </div>
        {!isCartEmpty && (
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
  cart: PropTypes.array.isRequired,
  items: PropTypes.array.isRequired,
  onRemoveFromCart: PropTypes.func.isRequired,
};

export default React.memo(Cart);