import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function CartItem(props) {
  const isCart = props.item.quantity > 0;

  const callbacks = {
    onDelete: e => {
      e.stopPropagation();
      props.onDelete(props.item.code);
    },
  };

  return (
    <div className={'CartItem'}>
      <div className="CartItem-title">
        <b>{props.item.title}</b>
      </div>
      <div className="CartItem-info">
        {isCart && `${props.item.quantity} шт.`}
        <span className="CartItem-price">{props.item.price} ₽</span>
      </div>
      <div className="CartItem-actions">
        <button className={'CartItem-button-delete'} onClick={callbacks.onDelete}>
          Удалить
        </button>
      </div>
    </div>
  );
}
CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
};

export default React.memo(CartItem);
