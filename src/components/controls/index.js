import React from 'react';
import PropTypes from 'prop-types';
import { plural, formatPrice } from '../../utils';
import cart from '../../assets/cart.png';
import './style.css';

function Controls({ onOpenModal = () => {}, itemCount = 0, totalPrice = 0 }) {
  const displayText =
    itemCount > 0 ? (
      <span>
        {itemCount}{' '}
        {plural(itemCount, {
          one: 'товар',
          few: 'товара',
          many: 'товаров',
        })}{' '}
        / {formatPrice(totalPrice)} ₽
      </span>
    ) : (
      <span>Пусто</span>
    );

  return (
    <div className="Controls">
      <button onClick={onOpenModal}>
        <img src={cart} alt="cart" />
        {displayText}
      </button>
    </div>
  );
}

Controls.propTypes = {
  onOpenModal: PropTypes.func.isRequired,
  itemCount: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

export default React.memo(Controls);
