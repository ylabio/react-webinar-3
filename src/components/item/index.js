import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';

function Item({ item = {}, isCart = false, onAdd = () => {}, onDelete = () => {} }) {
  // Счётчик выделений
  const [count, setCount] = useState(0);

  const callbacks = {
    onAdd: () => {
      onAdd(item);
    },
    onDel: () => {
      onDelete(item.code);
    },
  };

  return (
    <div className={'Item'}>
      <div className="Item__title">
        <b>{item.title}</b>
      </div>
      <div className="Item__info">
        <div className="Item__count">{item.count ? item.count + ' шт' : ''}</div>
        <div className="Item__price">{item.price} ₽</div>
        {isCart
            ? <button className="Item__btn_type_delete" onClick={callbacks.onDel}>Удалить</button>
            : <button className="Item__btn_type_add" onClick={callbacks.onAdd}>Добавить</button>
          }
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
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
};

export default React.memo(Item);
