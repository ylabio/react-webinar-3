import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import cartIcon from '../../assets/images/cart.png';

function Controls({ onCartClick, cartTotalCount, cartTotalPrice = 0 }) {
  function getProductWord(count) {
    const mod10 = count % 10;
    const mod100 = count % 100;

    if (mod10 === 1 && mod100 !== 11) return 'товар';
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'товара';
    return 'товаров';
  }

  return (
    <div className="Controls">
      <button
        disabled={cartTotalCount === 0}
        className={cartTotalCount == 0 ? 'Disabled' : ''}
        onClick={onCartClick}
      >
        <img src={cartIcon} alt="Cart" />
        {cartTotalCount
          ? `${cartTotalCount} ${getProductWord(cartTotalCount)} / ${cartTotalPrice.toLocaleString('ru-RU')} ₽`
          : 'Пусто'}
      </button>
    </div>
  );
}

Controls.propTypes = {
  cartTotalCount: PropTypes.number,
  cartTotalPrice: PropTypes.number,
  onCartClick: PropTypes.func.isRequired,
};

export default React.memo(Controls);
