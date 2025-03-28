import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import List from '../list';
import Item from '../item';


function Cart({ cart = [], cartSummary, onRemove = () => { } }) {
  const callbacks = {
    onRemove: useCallback((code) => {
      onRemove(code);
    }, [cart]),
  };

  return (
    <div>
      <h1>Корзина</h1>
      <List
        list={cart}
        onClick={callbacks.onRemove}
        buttonText='Удалить'
        buttonStyle='delete'
        isCart={true}
      />
      <Item item={{ price: cartSummary.totalPrice }} isTotalLine={true} />
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      count: PropTypes.number,
      price: PropTypes.number,
    }),
  ).isRequired,
  cartSummary: PropTypes.shape({
    totalPrice: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
  }).isRequired,
  onRemove: PropTypes.func,
};

export default React.memo(Cart);
