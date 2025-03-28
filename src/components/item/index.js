import React from 'react';
import PropTypes from 'prop-types';
import { formatNumber } from '../../utils';
import './style.css';

const buttonTypes = {
  list: 'Добавить',
  cart: 'Удалить',
};

function Item(props) {
  return (
    <div className="Item">
      <div className="Item-title">
        <b>{props.item.title}</b>
        <div className="Item-price">
          {props.listType === 'cart' && (
            <span className="Item-quantity">{props.item.quantity} шт</span>
          )}
          <span className="Item-price-value">{formatNumber({ number: props.item.price })}</span>
        </div>
      </div>
      <div className="Item-actions">
        <button data-button-type={props.listType} onClick={props.onClick}>
          {buttonTypes[props.listType]}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func,
  listType: PropTypes.oneOf(['list', 'cart']),
};

Item.defaultProps = {
  onClick: () => {},
};

export default React.memo(Item);
