import React from "react";
import PropTypes from "prop-types";
import {priceFormat} from "../../../../utils";
import './style.css';

function CartItem(props) {
  const callbacks = {
    onRemoveItemFromShoppingCart: () => {
      props.onRemoveItemFromShoppingCart(props.item);
    },
  }

  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-info'>
        <div className='Item-info-title'>{props.item.title}</div>
        <div className='Item-info-other'>
          <span className='Item-info-other__price'>{priceFormat(props.item.price)}</span>
          {props.item.amount &&
            <span className="Item-info-other__amount">{props.item.amount} шт</span>
          }
        </div>
      </div>
      <div className="Item-actions">
        <button onClick={callbacks.onRemoveItemFromShoppingCart}>
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
    price: PropTypes.number
  }).isRequired,
  onRemoveItemFromShoppingCart: PropTypes.func,
};

CartItem.defaultProps = {
  onRemoveItemFromShoppingCart: () => {
  },
}

export default React.memo(CartItem);
