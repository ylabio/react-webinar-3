import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { formatPrice } from '../../utils';

function Item(props) {
  const callbacks = {
    onAddItemToBasket: () => {
      props.onAddItemToBasket(props.item);
    },
    onDeleteItemFromBasket: () => {
      props.onDeleteItemFromBasket(props.item);
    }
  };

  return (
    <div className="Item">
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-price">
        <span>{formatPrice(props.item.price)} &#8381;</span>
      </div>
      {props.isBasket && <div className="Item-count">{props.item.count} шт</div>}
      <div className="Item-actions">
        {props.isBasket ? (
          <button onClick={callbacks.onDeleteItemFromBasket}>Удалить</button>
        ) : (
          <button onClick={callbacks.onAddItemToBasket}>Добавить</button>
        )}
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
  isBasket: PropTypes.bool,
};

Item.defaultProps = {
  onAddItemToBasket: () => {},
};

export default React.memo(Item);
