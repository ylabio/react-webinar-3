import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { formatNumber } from '../../utils';

function Item({item, onAddToCart}) {
    return (
    <div className= "Item">
      <div className="Item-title">
        <b>{item.title}</b>        
      </div>
      <div className="Item-price">
        <b>{formatNumber(item.price)} ₽ </b>        
      </div>
      <div className="Item-actions">
        <button onClick={() => onAddToCart(item.code)}>Добавить</button>
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
  onAddToCart: PropTypes.func.isRequired,
};

export default React.memo(Item);
