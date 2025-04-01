import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { formatPriceWithCurrency } from '../../utils';

function Item({item, onAddToCart}) {

  const callbacks = {
    onClick: (e) => {
      e.stopPropagation();
      onAddToCart(item.code);
    },
  };

  return (
    <div className='Item'>
      <div className='Item-code'></div>
      <div className='Item-title'>
        <b>{item.title}</b>
      </div>
      <div>
        <a>{formatPriceWithCurrency(item.price)}</a>
      </div>
      <div className='Item-actions'>
        <button className='add-button' onClick={callbacks.onClick}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default React.memo(Item);
