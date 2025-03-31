import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import {formatPrice, plural} from '../../utils';

function CartButton({ cart, totalCartPrice, onClick = () => {} }) {
  const quantity = cart.length;
  return (
    <button className="CartButton" onClick={onClick}>
      <div className="CartButton-icon"></div>
      {!!quantity ? (
        <div>
          {quantity}{' '}
          {plural(quantity, {
            one: 'товар',
            few: 'товара',
            many: 'товаров',
          })}{' '}
          / {formatPrice(totalCartPrice)};
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
