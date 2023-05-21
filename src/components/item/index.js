import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {plural} from '../../utils';
import './style.css';

function Item({item, onAddToCart}) {
  const callbacks = {
    onAddToCart: (e) => {
      e.stopPropagation();
      onAddToCart(item);
    },
  };

  return (
    <div className="Item">
      <div className="Item-code">{item.code}</div>
      <div className="Item-title">{item.title}</div>
      <div className="Item-price">
        {item.price.toLocaleString('ru')} &#x20bd;
      </div>
      <div className="Item-actions">
        <button onClick={callbacks.onAddToCart}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    price: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

Item.defaultProps = {
  onAddToCart: () => {},
};

export default React.memo(Item);
