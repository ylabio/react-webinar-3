import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item({item = { code: 0, title: 'Нет данных', price: 0 },  onAddToCart = () => {}}) {

  const callbacks = {
    onAdd: () => {
      onAddToCart(item.code);
    },
  };

  return (
    <div
      className={'Item' + (item.selected ? ' Item_selected' : '')}
      onClick={callbacks.onClick}
    >
      <div className="Item-code">{item.code}</div>
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      <span>{item.price} ₽</span>
      <div className="Item-actions">
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
  }).isRequired,
  onAddToCart: PropTypes.func,
};

export default React.memo(Item);
