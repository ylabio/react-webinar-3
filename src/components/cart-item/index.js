import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

function CartItem({item, onClearItem}) {
  const callbacks = {
    onClearItem: (e) => {
      e.stopPropagation();
      onClearItem(item);
    },
  };

  return (
    <div className="Cart-item">
      <div className="Item-code">{item.code}</div>
      <div className="Item-title">{item.title}</div>
      <div className="Item-price">
        {item.price.toLocaleString('ru')} &#x20bd;
      </div>
      <div className="Item-quantity">{item.quantity} шт.</div>
      <div className="Item-actions">
        <button onClick={callbacks.onClearItem}>Удалить</button>
      </div>
    </div>
  );
}

CartItem.PropTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    price: PropTypes.number,
    title: PropTypes.string,
    quantity: PropTypes.number,
  }).isRequired,
  onClearItem: PropTypes.func.isRequired,
};

CartItem.defaultProps = {
  onClearItem: () => {},
};

export default React.memo(CartItem);
