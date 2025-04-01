import React from 'react';
import PropTypes from 'prop-types';
import Controls from '../controls';
import './style.css';

function Item({ item, onAction, isCart }) {
  return (
    <div className="Item">
      <div className="Item-title">{item.title}</div>
      {isCart && <div className="Item-quantity">{item.quantity} шт</div>}
      <div className="Item-price">{item.price.toLocaleString('ru-RU')} ₽</div>
      <Controls
        onClick={onAction}
        label={isCart ? 'Удалить' : 'Добавить'}
        variant={isCart ? 'remove' : 'add'}
      />
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number,
  }).isRequired,
  onAction: PropTypes.func.isRequired,
  isCart: PropTypes.bool,
};

export default React.memo(Item);
