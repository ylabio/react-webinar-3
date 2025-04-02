import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item(props, onBasket = () => {}) {
  // Счётчик выделений
  const [count, setCount] = useState(0);

  const callbacks = {
    onBasket: e => {
      e.stopPropagation();
      props.onBasket(props.item.code);
    },
  };

  return (
    <div
      className={'Item'}
    >
      <div className="Item-title">
        <b>{props.item.title}</b>
      </div>
      <div className="Item-price">{props.item.price} ₽</div>
      <div className="Item-actions">
        <button onClick={callbacks.onBasket}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }).isRequired,
  onBasket: PropTypes.func,
};

export default React.memo(Item);
