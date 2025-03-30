import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function StoreItem({ item = {}, callback = () => {} }) {
  const callbacks = {
    onClick: () => {
      callback(item.code);
    },
  };

  return (
    <div className={'Item'}>
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      <div className="Item-price">{item.price} ₽</div>
      <div className={'Item-actions Item-actions_add'}>
        <button onClick={callbacks.onClick}>Добавить</button>
      </div>
    </div>
  );
}

StoreItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  callback: PropTypes.func,
};

export default React.memo(StoreItem);
