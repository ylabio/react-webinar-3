import React from 'react';
import PropTypes from 'prop-types';
import ActionButton from '../actionButton/actionButton';
import { formatPrice } from '../../utils';
import './style.css';

function CartItem({ item, onChangeItem }) {
  const formattedPrice = formatPrice(item.price);

  return (
    <div className="CartItem">
      <div className="CartItem-title">
        <b>{item.title}</b>
      </div>
      <div className="CartItem-quantity">{item.quantity} шт</div>
      <div className="CartItem-price">{formattedPrice} ₽</div>
      <div className="CartItem-actions">
        <ActionButton onClick={() => onChangeItem(item.code)} text="Удалить" color="del" />
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
  onChangeItem: PropTypes.func.isRequired,
};

export default React.memo(CartItem);
