import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item({ item, onAddToCart = code => {}, onRemoveFromCart = code => {}, isCart = false }) {
  const callbacks = {
    onAdd: e => {
      e.stopPropagation();
      onAddToCart(item.code);
    },
    onRemove: e => {
      e.stopPropagation();
      onRemoveFromCart(item.code);
    },
  };

  return (
    <div className={'Item'}>
      <div className="Item-title">
        <b className="Item-name">{item.title}</b>
        <div className="Item-details">
          {isCart && item.quantity && <span className="Item-quantity">{item.quantity} шт</span>}
          <span className="Item-price">{item.price} ₽</span>
        </div>
      </div>
      <div className="Item-actions">
        {isCart ? (
          <button onClick={callbacks.onRemove}>Удалить</button>
        ) : (
          <button className="add" onClick={callbacks.onAdd}>
            Добавить
          </button>
        )}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  onAddToCart: PropTypes.func,
  onRemoveFromCart: PropTypes.func,
  isCart: PropTypes.bool,
};

export default React.memo(Item);
