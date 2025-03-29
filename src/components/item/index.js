import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';

function Item(props, onSelect = () => {}, onBasket = () => {}) {
  // Счётчик выделений
  const [count, setCount] = useState(0);

  const callbacks = {
    onClick: () => {
      props.onSelect(props.item.code);
      if (!props.item.selected) {
        setCount(count + 1);
      }
    },
    onBasket: e => {
      e.stopPropagation();
      props.onBasket(props.item.code);
    },
  };

  return (
    <div
      className={'Item' + (props.item.selected ? ' Item_selected' : '')}
      onClick={callbacks.onClick}
    >
      <div className="Item-title">
        <b>{props.item.title}</b>
        {count
          ? ` | Выделяли ${count} ${plural(count, {
              one: 'раз',
              few: 'раза',
              many: 'раз',
            })}`
          : ''}
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
  onSelect: PropTypes.func,
  onBasket: PropTypes.func,
};

export default React.memo(Item);
