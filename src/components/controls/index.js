import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import basketIcon from '../../assets/icons/basket.svg';
import { plural } from '../../utils';

function Controls({ cartItems, onGetCartTotal = () => {}, setModalOpen = () => {} }) {
  const totalItem = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleModalIsItems = () => {
    if (cartItems.length > 0) setModalOpen(true);
  };

  return (
    <div className="Controls">
      <button onClick={handleModalIsItems}>
        <img src={basketIcon} alt="Корзина" />
        {cartItems.length === 0 ? (
          <span>Пусто</span>
        ) : (
          <span>
            {totalItem}{' '}
            {plural(totalItem, {
              one: 'товар',
              few: 'товара',
              many: 'товаров',
            })}{' '}
            / {onGetCartTotal()} ₽
          </span>
        )}
      </button>
    </div>
  );
}

Controls.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.number,
      quantity: PropTypes.number,
    }),
  ).isRequired,
  onGetCartTotal: PropTypes.func,
  setModalOpen: PropTypes.func,
};

export default React.memo(Controls);
