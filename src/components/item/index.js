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
      </div>
      <div className="Item-details" data-list-type={props.listType}>
        {props.listType === 'cart' && (
          <div className="Item-quantity">
            <span>{props.item.quantity} шт</span>
          </div>
        )}
        <div className="Item-price">
          <span>{formatNumber({ number: props.item.price })}</span>
        </div>
        <div className="Item-actions">
          <button onClick={() => props.onClick(props.item.code)}>
            {buttonTypes[props.listType]}
          </button>
        </div>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number,
    code: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
  listType: PropTypes.oneOf(['list', 'cart']),
};

Item.defaultProps = {
  onClick: () => {},
};

export default React.memo(Item);
