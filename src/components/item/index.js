import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item({ item = { code: 0, title: '', price: 0 }, onAddItem = () => {} }) {
  return (
    <div className={'Item'}>
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      <div className="Item-price">{`${item.price.toLocaleString('ru-RU')} ₽`}</div>
      <div className="Item-actions">
        <button onClick={() => onAddItem(item)}>Добавить</button>
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
  onAddItem: PropTypes.func,
};

export default React.memo(Item);
