import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item(props = () => {}) {
  // Счётчик выделений

  const callbacks = {
    onAction: e => {
      e.stopPropagation();
      if (props.title === 'Удалить') {
        props.onAction(props.item.code);
      } else {
        props.onAction(props.item);
      }
    },
  };

  return (
    <div className="Item">
      <div className="Item-title">
        <b>{props.item.title}</b>
      </div>
      <div className="Item-wrap">
        {props.item?.amount ? <div className="Item-wrap-amount">{`${props.item.amount} шт`}</div> : null}
        <div className="Item-wrap-price">{`${props.item.price.toLocaleString('ru-RU')} ₽`}</div>
      </div>

      <button
        className={`Item-actions ${props.title === 'Удалить' ? 'delete' : 'add'}`}
        onClick={callbacks.onAction}
      >
        {props.title}
      </button>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onAction: PropTypes.func,
};

export default React.memo(Item);
