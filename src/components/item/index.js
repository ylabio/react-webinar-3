import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { formatPrice } from '../../utils';

function Item({ item, onAddItem = () => {}, onDelete = () => {} }) {

  const callbacks = {
    onAddItem: e => {
      e.stopPropagation();
      onAddItem(item);
    },
    onDelete: e => {
      e.stopPropagation();
      onDelete(item.code);
    },
  };

  return (
    <div className='Item'>
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      { item.count ? 
        (
        <div className="Item-actions-cart">
          <div className="Item-info">
            <p>{item.count} шт</p>
            <p>{formatPrice(item.price)}</p>
          </div>
          <button onClick={callbacks.onDelete} className="Item-delete">Удалить</button>
        </div>
        ) : (
        <div className="Item-actions">
          <p className="Item-price">
            {formatPrice(item.price)}
          </p>
          <button onClick={callbacks.onAddItem} className="Item-Add">Добавить</button>
        </div>
        )
      }

    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  onAddItem: PropTypes.func,
  onDelete: PropTypes.func,
};

export default React.memo(Item);
