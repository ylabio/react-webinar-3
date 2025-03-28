import React from 'react';
import PropTypes from 'prop-types';
import Cart from './assets/icons/Cart.jsx';
import './style.css';

const pluralize = count => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastDigit === 1 && lastTwoDigits !== 11) return 'товар';
  if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) return 'товара';
  return 'товаров';
};

function Controls({ onAdd, cartCount = 0, cartPrice = 0, onCartClick }) {
  const isCartEmpty = cartCount === 0;

  return (
    <div className="Controls">
      <button onClick={onCartClick}>
        <Cart className="controls-icon" color="#878787" />
        {isCartEmpty ? (
          <span>Пусто</span>
        ) : (
          <span>
            {cartCount} {pluralize(cartCount)} / {cartPrice} ₽
          </span>
        )}
      </button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
  cartCount: PropTypes.number,
  cartPrice: PropTypes.number,
  onCartClick: PropTypes.func.isRequired,
};

Controls.defaultProps = {
  onAdd: () => {},
  cartCount: 0,
  cartPrice: 0,
};

export default React.memo(Controls);
