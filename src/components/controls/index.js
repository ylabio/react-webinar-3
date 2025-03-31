import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import basketIcon from '../../assets/icons/basket.svg';
import { plural } from '../../utils';

function Controls({ cartItems, uniqueItemsCount, cartTotal, setModalOpen = () => {} }) {
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
            {uniqueItemsCount}{' '}
            {plural(uniqueItemsCount, {
              one: 'товар',
              few: 'товара',
              many: 'товаров',
            })}{' '}
            / {cartTotal} ₽
          </span>
        )}
      </button>
    </div>
  );
}

Controls.propTypes = {
  uniqueItemsCount: PropTypes.number,
  cartTotal:PropTypes.number,
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.number,
      quantity: PropTypes.number,
    }),
  ).isRequired,
  setModalOpen: PropTypes.func,
};

export default React.memo(Controls);
