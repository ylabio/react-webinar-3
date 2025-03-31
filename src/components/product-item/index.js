import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ProductItem({ item, onAddToCart }) {
  return (
    <div className="Item">
      <div className="Item-code">{item.code}</div>
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      <p>{item.price.toLocaleString('ru-RU')} ₽</p>
      <div className="Item-actions">
        <button onClick={() => onAddToCart(item.code)}>Добавить</button>
      </div>
    </div>
  );
}

ProductItem.propTypes = {
  item: PropTypes.object.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default React.memo(ProductItem);
