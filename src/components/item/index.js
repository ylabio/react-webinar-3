import React from 'react';
import PropTypes from 'prop-types';
import ActionButton from '../actionButton/actionButton';
import { formatPrice } from '../../utils';
import './style.css';

function Item({ item, onChangeItem }) {
  const formattedPrice = formatPrice(item.price);

  return (
    <div className="Item">
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      <div className="Item-price">{formattedPrice} ₽</div>
      <div className="Item-actions">
        <ActionButton onClick={() => onChangeItem(item.code)} text="Добавить" color="add" />
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onChangeItem: PropTypes.func,
};

export default React.memo(Item);
