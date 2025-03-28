import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item({ item, onAdd = () => {} }) {
  const callbacks = {
    onClick: () => {
      onAdd(item.code);
    },
  };

  return (
    <div className={'Item'}>
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      <div className="Item-actions">
        <span>{item.price} ₽</span>
        <button onClick={callbacks.onClick}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

export default React.memo(Item);
