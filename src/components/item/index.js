import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item({ item = {}, callback = () => {}, isModal = false }) {
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
      {isModal && <div className="Item-count">{item.count} шт</div>}
      <div className="Item-price">{item.price} ₽</div>
      <div className={`Item-actions ${isModal ? 'Item-actions_remove' : 'Item-actions_add'}`}>
        <button onClick={callbacks.onClick}>{isModal ? 'Удалить' : 'Добавить'}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  callback: PropTypes.func,
  isModal: PropTypes.bool,
};

export default React.memo(Item);
