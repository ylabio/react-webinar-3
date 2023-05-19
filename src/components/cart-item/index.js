import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function CartItem({ item, onDeleteItem }) {
  const callbacks = {
    deleteItem: () => {
      onDeleteItem(item.code);
    },
  };

  return (
    <div className={'CartItem'}>
      <div className="CartItem-code">{item.code}</div>
      <div className="CartItem-title">{item.title}</div>
      <p className="CartItem-price">{item.price} ₽</p>
      <div className="CartItem-actions">
        <div className="CartItem-count">{item.quantity} шт</div>
        <button onClick={callbacks.deleteItem}>Удалить</button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  onDeleteItem: PropTypes.func.isRequired,
};

CartItem.defaultProps = {
  onDeleteItem: () => {},
};

export default React.memo(CartItem);
