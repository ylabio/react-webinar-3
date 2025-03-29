import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { formatCost } from '../../utils';

function Item({ item = {}, callback, modal = false }) {
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
      {modal && <div className="Item-count">{item.count} шт</div>}
      <div className="Item-price">{formatCost(item.price)} ₽</div>
      <div className={`Item-actions ${modal ? 'Item-actions--remove' : 'Item-actions--add'}`}>
        <button onClick={callbacks.onClick}>{modal ? 'Удалить' : 'Добавить'}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  modal: PropTypes.bool,
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  callback: PropTypes.func,
};

export default React.memo(Item);
