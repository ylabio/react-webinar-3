import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function CartItem({ item, onDelete }) {
  return (
    <div className="Item">
      <h3 className="Item-title">{item.title}</h3>
      <p className="Item-count">{item.count} шт</p>
      <p className="Item-price">{item.price.toLocaleString('ru-RU')} ₽</p>
      <button type="button" className="Item-delete" onClick={() => onDelete(item.code)}>
        Удалить
      </button>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default React.memo(CartItem);
