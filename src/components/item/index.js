import PropTypes from 'prop-types';
import React from 'react';
import { formatNumber } from '../../utils';
import './style.css';

function Item({ item, buttonAction = () => {}, buttonText = 'Добавить' }) {
  const callbacks = {
    onClick: e => {
      e.stopPropagation();
      buttonAction(item);
    },
  };

  const isCart = item.quantity > 0;
  const formattedPrice = formatNumber(item.price);

  return (
    <div className="Item">
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      <div className="Item-info">
        {isCart && `${item.quantity} шт.`}
        <span className="Item-price">{formattedPrice} ₽</span>
      </div>
      <div className="Item-actions">
        <button
          className={isCart ? 'Item-button-delete' : 'Item-button-add'}
          onClick={callbacks.onClick}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  buttonAction: PropTypes.func,
  buttonText: PropTypes.string,
};

export default React.memo(Item);
