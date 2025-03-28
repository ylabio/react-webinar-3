import React from 'react';
import PropTypes from 'prop-types';
import { CURRENCY } from '../../constants';
import './style.css';

function Item({ onClick = () => {}, item }) {
  const callbacks = {
    onAdd: e => {
      e.stopPropagation();
      onClick(item.code);
    },
  };

  return (
    <div className="Item">
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      <div className="Item-price">
        {item.price.toLocaleString('ru-RU')} {CURRENCY}
      </div>
      <div className="Item-actions">
        <button className="Button_Add" onClick={callbacks.onAdd}>
          Добавить
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func,
};

export default React.memo(Item);
