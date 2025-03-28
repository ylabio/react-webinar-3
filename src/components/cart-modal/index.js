import React from 'react';
import PropTypes from 'prop-types';
import Controls from '../controls';
import './style.css';

function CartModal({ cart = {}, products = [], onRemove, onClose, totalSum = 0 }) {
  return (
    <div className="CartModal-overlay">
      <div className="CartModal">
        <div className="CartModal-header">
          <h4>Корзина</h4>
          <button className="CartModal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="CartModal-items">
          {Object.keys(cart).length === 0 ? (
            <div className="CartModal-empty">Добавить сначала продукты в корзину</div>
          ) : (
            Object.entries(cart).map(([code, quantity]) => {
              const product = products.find(p => p.code === Number(code));
              return product ? (
                <div key={code} className="CartModal-item">
                  <span className="CartModal-item-title">{product.title}</span>
                  <span className="CartModal-item-quantity">{quantity} шт</span>
                  <span className="CartModal-item-price">
                    {product.price.toLocaleString('ru-RU')} ₽
                  </span>
                  <Controls onClick={() => onRemove(code)} label="Удалить" variant="remove" />
                </div>
              ) : null;
            })
          )}
        </div>

        {Object.keys(cart).length > 0 && (
          <div className="CartModal-footer">
            <div className="CartModal-total">
              <span>Итого:</span>
              <span>{totalSum.toLocaleString('ru-RU')} ₽</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

CartModal.propTypes = {
  cart: PropTypes.object,
  products: PropTypes.array,
  onRemove: PropTypes.func,
  onClose: PropTypes.func,
  totalSum: PropTypes.number,
};

export default React.memo(CartModal);
