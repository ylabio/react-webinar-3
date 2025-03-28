import React from 'react';
import './style.css';

function CartModal({ items = [], onClose, onRemoveCart }) {
  const totalPrice = items.reduce((total, item) => total + item.price * item.count, 0);

  const handleBackgroundClick = (e) => {
    if (e.target.classList.contains('CartModal')) {
      onClose();
    }
  };

  return (
    <div className="CartModal" onClick={handleBackgroundClick}>
      <div className="CartModal-content">
        <span className="close" onClick={onClose}></span>
        <h2 className='cart-title'>Корзина</h2>
        {items.length === 0 ? (
          <p>Корзина пуста</p>
        ) : (
          <div>
            <div className="cart-items">
              {items.map(item => (
                <div className="cart-item" key={item.code}>
                  <span className="item-name">{item.title}</span>
                  <span className="item-quantity">{item.count} шт</span>
                  <span className="item-price">{item.price * item.count} ₽</span>
                  <button className="remove-btn" onClick={() => onRemoveCart(item.code)}>Удалить</button>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <div className="cart-total-container">
                <span className="item-total-label">Итого:</span>
                <span className="item-total-value">{totalPrice} ₽</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(CartModal);
