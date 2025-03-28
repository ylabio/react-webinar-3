import React from 'react';
import './style.css';

function CartModal({ cart, items, onRemoveFromCart, onClose }) {
  const cartEntries = Object.entries(cart);
  const totalSum = cartEntries.reduce((sum, [code, quantity]) => {
    const item = items.find(i => i.code === Number(code));
    return sum + (item.price * quantity);
  }, 0);

  return (
    <div className="CartModal-overlay">
      <div className="CartModal">
        <div className="CartModal-header">
          <h4>Корзина</h4>
          <button onClick={onClose}>×</button>
        </div>
        <div className="CartModal-content">
          {cartEntries.map(([code, quantity]) => {
            const item = items.find(i => i.code === Number(code));
            return (
              <div key={code} className="CartModal-item">
                <span>{item.title} - {quantity} шт. × {item.price} руб.</span>
                <button className="CartModal-remove" onClick={() => onRemoveFromCart(code)}>Удалить</button>
              </div>
            );
          })}
        </div>
        <div className="CartModal-footer">
          Итого: {totalSum} руб.
        </div>
      </div>
    </div>
  );
}
export default React.memo(CartModal);