import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item({ 
  item, 
  onDeleteItem = () => {} 
}) {
  const callbacks = {
    onDeleteItem: e => {
      e.stopPropagation();
      onDeleteItem(item.id);
    },
  };

  return (
    <div className="CartItem">
      <div className="CartItem-title">
        <b>{item.title}</b>
      </div>
      <div className="CartItem-actions">
        <b className="CartItem-name">{item.name}</b>
        <span>{item.count} шт</span>
        <span>{item.price} ₽</span>
        <button onClick={callbacks.onDeleteItem}>Удалить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  onDeleteItem: PropTypes.func,
};

export default React.memo(Item);