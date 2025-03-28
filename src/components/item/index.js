import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item(props = () => {}) {
  const callbacks = {
    onAddItemToCart: e => {
      e.stopPropagation();
      props.onAddItemToCart(props.item.code);
    },
  };

  return (
    <div className={'Item'}>
      <div className="Item-title">
        <b>{props.item.title}</b>
      </div>
      <div className="Item-price">
        {new Intl.NumberFormat('ru-RU').format(props.item.price) + ' ' + ' ₽'}
      </div>
      <div className="Item-actions">
        <button onClick={callbacks.onAddItemToCart}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAddItemToCart: PropTypes.func,
};

export default React.memo(Item);
