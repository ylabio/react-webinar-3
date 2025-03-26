import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ItemBasket(props) {
  const { onRemoveItemFromBasket = _ => {} } = props;

  const callbacks = {
    onRemoveItemFromBasket: () => {
      onRemoveItemFromBasket(props.item.code);
    },
  };

  return (
    <div className="ItemBasket" onClick={callbacks.onClick}>
      <div className="ItemBasket-title">
        <b>{props.item.title}</b>
      </div>
      <div className="ItemBasket-count">{props.item.count} шт</div>
      <div className="ItemBasket-coast">{props.item.price} ₽</div>
      <div className="ItemBasket-actions">
        <button onClick={callbacks.onRemoveItemFromBasket}>Удалить</button>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  onRemoveItemFromBasket: PropTypes.func,
};

export default React.memo(ItemBasket);
