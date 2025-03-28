import React from 'react';
import './style.css';
import CloseIcon from '../cart-close-icon';

function CartModal({ cart, items, onRemoveFromCart, onClose }) {
  const cartEntries = Object.entries(cart);
  const totalSum = cartEntries.reduce((sum, [code, quantity]) => {
    const item = items.find(i => i.code === Number(code));
    return sum + (item.price * quantity);
  }, 0);

  return (
    <div className="CartModal-overlay">
      <div className="CartModal">        
        <button className="CartModal-close" onClick={onClose}><CloseIcon/></button>
        <div className="CartModal-header">
          <h4>Корзина</h4>
        </div>
        <div className="CartModal-content">
          {cartEntries.map(([code, quantity]) => {
            const item = items.find(i => i.code === Number(code));
            return (
              <div key={code} className="CartModal-item">
                <div className="CartModal-name">{item.title}</div>
                <div className="CartModal-right">
                  <span className="CartModal-quantity">{quantity} шт</span>
                  <span className="CartModal-price">{item.price} ₽</span>
                  <button className="CartModal-remove" onClick={() => onRemoveFromCart(code)}>Удалить</button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="CartModal-footer">
          <div className="CartModal-footer-container">
            <div className="CartModal-footer-total">Итого:</div> 
            <div className="CartModal-footer-sum">{totalSum} ₽</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default React.memo(CartModal);