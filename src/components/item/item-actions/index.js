import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ItemActions({ onAddToCart, onRemoveFromCart }) {
  return (
    <div className="ItemActions">
      {onRemoveFromCart ? (
        <button onClick={onRemoveFromCart}>Удалить</button>
      ) : (
        <button onClick={onAddToCart}>Добавить</button>
      )}
    </div>
  );
}

ItemActions.propTypes = {
  onAddToCart: PropTypes.func,
  onRemoveFromCart: PropTypes.func,
};

export default React.memo(ItemActions);
