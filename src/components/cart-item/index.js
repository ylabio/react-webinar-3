import React, {useState} from "react";
import PropTypes from "prop-types";
import './style.css';
import { getFormattedPrice } from "../../utils";

function CartItem({item, onCartRemove}){
  return (
    <div className='CartItem'>
      <span className='CartItem-code'>{item.code}</span>
      <span className='CartItem-title'>{item.title}</span>
      <span className='CartItem-price'>{getFormattedPrice(item.price)}</span>
      <span className='CartItem-amount'>{item.amount} шт</span>
      <button className='CartItem-remove' onClick={() => onCartRemove(item.code)}>
        Удалить
      </button>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
};

CartItem.defaultProps = {
  onCartRemove: () => {},
}

export default React.memo(CartItem);
