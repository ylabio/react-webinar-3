import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import cartIcon from '../../assets/images/cart.png';

function Controls({ cart = [], onCartClick = () => {}, cartPrice = 0 }) {
  return (
    <div className="Controls">
      <button onClick={onCartClick}>
        <img src={cartIcon} /> {cart.length ? `${cart.length} товара / ${cartPrice} ₽ ` : 'Пусто'}
      </button>
    </div>
  );
}

Controls.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      count: PropTypes.number,
    }),
  ),
  cartPrice: PropTypes.number.isRequired,
  onCartClick: PropTypes.func.isRequired,
};

export default React.memo(Controls);
