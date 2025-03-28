import React from 'react';
import './style.css';
import CloseIcon from '../cart-close-icon';
import { formatNumber } from '../../utils';
import { cn as bem } from '@bem-react/classname';

function CartModal({ cart, items, onRemoveFromCart, onClose }) {
  const cn = bem('CartModal');
  const cartEntries = Object.entries(cart);
  const totalSum = cartEntries.reduce((sum, [code, quantity]) => {
    const item = items.find(i => i.code === Number(code));
    return sum + (item.price * quantity);
  }, 0);

  const isCartEmpty = cartEntries.length === 0;

  return (
    <div className={cn('overlay')}>
      <div className={cn()}>        
        <button className={cn('close')} onClick={onClose}><CloseIcon/></button>
        <div className={cn('header')}>
          <h4>Корзина</h4>
        </div>
        <div className={cn('content')}>
          {isCartEmpty ? (
            <div className={cn('empty')}>
              Корзина пуста
            </div>
          ) : (
            cartEntries.map(([code, quantity]) => {
              const item = items.find(i => i.code === Number(code));
              return (
                <div key={code} className={cn('item')}>
                  <div className={cn('name')}>{item.title}</div>
                  <div className={cn('right')}>
                    <span className={cn('quantity')}>{quantity} шт</span>
                    <span className={cn('price')}>{formatNumber(item.price)} ₽</span>
                    <button className={cn('remove')} onClick={() => onRemoveFromCart(code)}>Удалить</button>
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
      </div>
    </div>
  );
}
export default React.memo(CartModal);