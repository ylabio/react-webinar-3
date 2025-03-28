import React from 'react';
import PropTypes from 'prop-types';
import { formatPrices, plural } from '../../utils';
import './style.css';

function Controls({ sum, cartListLength, openModal = () => {} }) {
  const pluraled = plural(cartListLength, {
    one: 'товар',
    few: 'товара',
    many: 'товаров',
  });
  const formatedSum = formatPrices(sum);

  return (
    <div className="Controls">
      <button onClick={openModal}>
        <i className="fa-solid fa-cart-shopping"></i>{' '}
        {cartListLength ? `${cartListLength} ${pluraled} / ${formatedSum} ₽` : 'Пусто'}
      </button>
    </div>
  );
}

Controls.propTypes = {
  sum: PropTypes.number,
  cartListLength: PropTypes.number,
  openModal: PropTypes.func,
};

export default React.memo(Controls);
