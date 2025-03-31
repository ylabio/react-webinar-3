import React from 'react';
import PropTypes from 'prop-types';
import { numberFormat } from '../../utils';
import DeleteButton from '../delete-button';

function CartItem({ item, onDeleteFromCart }) {
  return (
    <div className="Item">
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      <div className="Item-container">
        <span className="item-span-left">{item.quantity} шт</span>
        <span>{`${numberFormat(item.price)}`} ₽</span>
        <DeleteButton onClick={() => onDeleteFromCart(item.code)} />
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  onDeleteFromCart: PropTypes.func.isRequired,
};

export default React.memo(CartItem);
