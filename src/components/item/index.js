import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item(props) {
  const { onAddItemToBasket = _ => {} } = props;

  const callbacks = {
    onAddItemToBasket: () => {
      onAddItemToBasket(props.item);
    },
  };

  return (
    <div className="Item" onClick={callbacks.onClick}>
      <div className="Item-title">
        <b>{props.item.title}</b>
      </div>
      <div className="Item-coast">{props.item.price} ₽</div>
      <div className="Item-actions">
        <button onClick={callbacks.onAddItemToBasket}>Добавить</button>
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
  onAddItemToBasket: PropTypes.func,
};

export default React.memo(Item);
