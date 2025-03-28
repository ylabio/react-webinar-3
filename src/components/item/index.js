import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item(props) {

  const callbacks = {
    onAdd: e => {
      e.stopPropagation();
      props.onAdd(props.item);
    },
  };

  return (
    <div
      className='Item'
      onClick={callbacks.onClick}
    >
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">
        <b>{props.item.title}</b>
      </div>
      <div>
        <span>{props.item.price.toLocaleString('ru-RU') + ' ₽'}</span>
      </div>
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
    count: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
};

export default React.memo(Item);
