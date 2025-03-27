import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import ActionButton from '../actionButton/actionButton';
import { formatPrice } from '../../utils';

function Item(props) {
  const formattedPrice = formatPrice(props.item.price);

  return (
    <div className="Item">
      <div className="Item-title">
        <b>{props.item.title}</b>
      </div>
      {props.isInCart && <div className="Item-quantity">{props.item.quantity} шт</div>}
      <div className="Item-price">{formattedPrice} ₽</div>
      <div className="Item-actions">
        <ActionButton
          onClick={() => props.onChangeItem(props.item.code)}
          text={props.isInCart ? 'Удалить' : 'Добавить'}
          color={props.isInCart ? 'del' : 'add'}
        />
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  onChangeItem: PropTypes.func.isRequired,
  isInCart: PropTypes.bool.isRequired,
};

export default React.memo(Item);
