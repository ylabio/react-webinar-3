import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item({ item, isCart, onAddToCart, onDelete }) {
  const callbacks = {
    onClick: () => {
      onAddToCart(item.code);
    },
    onDelete: () => {
      onDelete(item.code);
    },
  };

  return (
    <div className={'Item'}>
      {isCart ? (
        <>
          <h3 className="Item-title">{item.title}</h3>
          <p className="Item-count">{item.count} шт</p>
          <p className="Item-price">{item.price.toLocaleString('ru-RU')} ₽</p>
          <button type="button" className="Item-delete" onClick={() => onDelete(item.code)}>
            Удалить
          </button>
        </>
      ) : (
        <>
          <div className="Item-code">{item.code}</div>
          <div className="Item-title">
            <b>{item.title}</b>
          </div>
          <p>{item.price.toLocaleString('ru-RU')} ₽</p>
          <div className="Item-actions">
            <button onClick={callbacks.onClick}>Добавить</button>
          </div>
        </>
      )}
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  onAddToCart: PropTypes.func,
  onDelete: PropTypes.func,
};

export default React.memo(Item);
