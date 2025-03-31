import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls({ onAddToCart, onDeleteFromCart, itemCode }) {
  return (
    <>
      {onAddToCart && (
        <button className="button-add" onClick={() => onAddToCart(itemCode)}>
          Добавить
        </button>
      )}
      {onDeleteFromCart && (
        <button className="button-delete" onClick={() => onDeleteFromCart(itemCode)}>
          Удалить
        </button>
      )}
    </>
  );
}

Controls.propTypes = {
  onAddToCart: PropTypes.func,
  onDeleteFromCart: PropTypes.func,
  itemCode: PropTypes.number.isRequired,
};

export default React.memo(Controls);
