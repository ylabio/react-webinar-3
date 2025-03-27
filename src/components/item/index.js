import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item({
  item,
  onAddToCart = () => {},
  onRemove = null,
  showQuantity = false,
  mode = 'catalog',
}) {
  // Счётчик выделений
  const [count, setCount] = useState(0);

  const callbacks = {
    onAddProduct: e => {
      e.stopPropagation();
      onAddToCart(item);
    },
  };

  return (
    <div className={`Item Item--${mode}`}>
      <div className="Item__info">
        <div className="Item-title">
        <span>{item.title}</span>
        {showQuantity && (
          <div className="Item__quantity">{item.quantity}</div>
        )}
        <span className="Item-price">{Number(item.price).toLocaleString('ru-RU')} &#8381;</span>
        </div>
      </div>
      {mode === 'catalog' ? (
        <button
          className="Item__action"
          onClick={() => onAddToCart?.(item)}
        >
          Добавить
        </button>
      ) : (
        <button
          className="Item__action Item__action--remove"
          onClick={() => onRemove?.(item.code)}
        >
          Удалить
        </button>
      )}
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
  }).isRequired,
  onAddToCart: PropTypes.func,
};

export default React.memo(Item);
