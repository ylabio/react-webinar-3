import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item({ item = {}, isCart = false, onAdd = () => {}, onDelete = () => {}}) {

  const callbacks = {
    onAdd: () => {
      onAdd(item);
    },
    onDel: () => {
      onDelete(item.code);
    },
  };

  return (
    <div className="Item">
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      <div className="Item-right">
        <div className="Item-count">
          {item.count ? item.count + " шт" : ''}
        </div>
        <div className="Item-actions">
          <div className="Item-price">{item.price} ₽</div>
          {isCart
            ? <button className="Del-btn" onClick={callbacks.onDel}>Удалить</button>
            : <button className="Add-btn" onClick={callbacks.onAdd}>Добавить</button>
          }
        </div>
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
  isCart: PropTypes.bool,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
};

export default React.memo(Item);
