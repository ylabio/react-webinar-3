import PropTypes from 'prop-types';
import React from 'react';
import List from '../list';
import './style.css';

function Cart({ cart, onDeleteItem = () => {}, totalPrice }) {
  const callbacks = {
    onDeleteItem: item => {
      onDeleteItem(item);
    },
  };

  return (
    <div className="Cart">
      <List list={cart} buttonAction={callbacks.onDeleteItem} buttonText={'Удалить'} />
      <div className="Cart-footer">
        Итого: <span>{totalPrice} ₽</span>
      </div>
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
    }).isRequired,
  ).isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  totalPrice: PropTypes.number,
};

export default React.memo(Cart);
