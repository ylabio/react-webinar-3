import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Button from '../button';

function Item({ item, onDelete = () => {}, onAdd = () => {}, isCartItem = false }) {
  const callbacks = {
    onDelete: () => {
      onDelete(item.code);
    },
    onAdd: () => {
      onAdd(item.code);
    },
  };

  return (
    <div className="Item">
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      <div className="Item-content">
        <div className="Item-quantity">{isCartItem && `${item.quantity} шт`}</div>
        <div className="Item-price">{item.price} ₽</div>
        <div className="Item-actions">
          <Button
            type={isCartItem ? 'delete' : 'add'}
            onClick={isCartItem ? callbacks.onDelete : callbacks.onAdd}
          />
        </div>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func,
  onAdd: PropTypes.func,
  isCartItem: PropTypes.bool,
};

export default React.memo(Item);
