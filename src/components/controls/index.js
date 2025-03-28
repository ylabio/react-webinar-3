import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls({ totalItems, totalPrice, onToggleCartModal }) {
  let buttonText;
  if (totalItems === 0) {
    buttonText = 'В корзине пусто'
  } else if (totalItems === 1) {
    buttonText = buttonText = `${totalItems} товар / ${totalPrice.toFixed(2)} ₽`
  } else if (totalItems > 0 && totalItems >= 2 && totalItems <= 4) {
    buttonText = `${totalItems} товара / ${totalPrice.toFixed(2)} ₽`
  } else buttonText = `${totalItems} товаров / ${totalPrice.toFixed(2)} ₽`
    
  return (
    <div className="Controls">
      <button onClick={onToggleCartModal}>
        {buttonText}
      </button>
    </div>
  );
}

Controls.propTypes = {
  totalItems: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  onToggleCartModal: PropTypes.func.isRequired,
};


export default React.memo(Controls);