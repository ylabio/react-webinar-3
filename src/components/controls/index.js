import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls({ inCart, onAddToCart, onDeleteFromCart, itemCode }) {
  return (
    <>
      {!inCart && (
        <button className="button-add" onClick={() => onAddToCart(itemCode)}>
          Добавить
        </button>
      )}
      {inCart && (
        <button className="button-delete" onClick={() => onDeleteFromCart(itemCode)}>
          Удалить
        </button>
      )}
    </>
  );
}

Controls.propTypes = {
  inCart: PropTypes.bool.isRequired,
  onAddToCart: PropTypes.func,
  onDeleteFromCart: PropTypes.func,
  itemCode: PropTypes.number.isRequired,
};

export default React.memo(Controls);
