import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { formattedPrice } from '../../utils';

function CartItem({ item = {}, callback = () => {} }) {
  const callbacks = {
    onClick: () => {
      callback(item.code);
    },
  };

  return (
    <div className={'Item'}>
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      <div className="Item-count">{item.count} шт</div>
      <div className="Item-price">{formattedPrice(item.price)}</div>
      <div className={'Item-actions Item-actions_remove'}>
        <button onClick={callbacks.onClick}>Удалить</button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  callback: PropTypes.func,
};

export default React.memo(CartItem);
