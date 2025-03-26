import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { plural } from '../../utils';

function CartButton({ cart, onClick = () => {} }) {
  const quantity = cart.length;
  const totalPrice = useMemo(
    () => cart.reduce((acc, val) => acc + val.quantity * val.price, 0),
    [cart],
  );
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
          / {totalPrice} &#8381;
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
