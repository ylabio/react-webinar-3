import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item({ item, onAddToCart = () => {}  }) {
  const callbacks = {
    onAddToCart: e => {
      e.stopPropagation();
      onAddToCart(item.code);
    },
  };

  return (
    <div
      className={'Item' + (item.selected ? ' Item_selected' : '')}
      onClick={callbacks.onClick}
    >
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      <div className="Item-price">{item.price} ₽</div>
      <div className="Item-actions">
        <button onClick={callbacks.onAddToCart}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  onAddToCart: PropTypes.func,
};

Item.defaultProps = {
  onAddToCart: () => {},
};

export default React.memo(Item);
