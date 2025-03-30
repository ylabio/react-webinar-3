import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item(props) {
  const callbacks = {
    onAdd: e => {
      e.stopPropagation();
      props.onAdd(props.item.code);
    },
  };

  return (
    <div className={'Item'}>
      <div className="Item-title">
        <b>{props.item.title}</b>
      </div>
      <div className="Item-info">
        <span className="Item-price">{props.item.price} ₽</span>
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
    price: PropTypes.number,
  }).isRequired,
};

export default React.memo(Item);
