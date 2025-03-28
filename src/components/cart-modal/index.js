import React from 'react';
import './style.css';
import CloseIcon from '../cart-close-icon';
import { formatNumber } from '../../utils';

function CartModal({ cart, items, onRemoveFromCart, onClose }) {
  const cartEntries = Object.entries(cart);
  const totalSum = cartEntries.reduce((sum, [code, quantity]) => {
    const item = items.find(i => i.code === Number(code));
    return sum + (item.price * quantity);
  }, 0);

  const isCartEmpty = cartEntries.length === 0;

  return (
    <div className="CartModal-overlay">
      <div className="CartModal">        
        <button className="CartModal-close" onClick={onClose}><CloseIcon/></button>
        <div className="CartModal-header">
          <h4>Корзина</h4>
        </div>
        <div className="CartModal-content">
          {isCartEmpty ? (
            <div className="CartModal-empty">
              Корзина пуста
            </div>
          ) : (
            cartEntries.map(([code, quantity]) => {
              const item = items.find(i => i.code === Number(code));
              return (
                <div key={code} className="CartModal-item">
                  <div className="CartModal-name">{item.title}</div>
                  <div className="CartModal-right">
                    <span className="CartModal-quantity">{quantity} шт</span>
                    <span className="CartModal-price">{formatNumber(item.price)} ₽</span>
                    <button className="CartModal-remove" onClick={() => onRemoveFromCart(code)}>Удалить</button>
                  </div>
                </div>
              );
            })
          )}
        </div>
        {!isCartEmpty && (
          <div className="CartModal-footer">
            <div className="CartModal-footer-container">
              <div className="CartModal-footer-total">Итого:</div> 
              <div className="CartModal-footer-sum">{formatNumber(totalSum)} ₽</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default React.memo(CartModal);