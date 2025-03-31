import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import {formatPrice, plural} from '../../utils';

function CartButton({ totalPrice, totalQuantity, onClick = () => {} }) {
  return (
    <button className="CartButton" onClick={onClick}>
      <div className="CartButton-icon"></div>
      {!!totalQuantity ? (
        <div>
          {totalQuantity}{' '}
          {plural(totalQuantity, {
            one: 'товар',
            few: 'товара',
            many: 'товаров',
          })}{' '}
          / {formatPrice(totalPrice)}
        </div>
      ) : (
        'Пусто'
      )}
    </button>
  );
}

CartButton.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.number,
      quantity: PropTypes.number,
    }),
  ).isRequired,
  onClick: PropTypes.func,
};

export default React.memo(CartButton);
