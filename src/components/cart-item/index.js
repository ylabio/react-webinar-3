import React from "react";
import PropTypes from "prop-types";
import Button from "../button";
import {formatNumber} from "../../utils";
import './style.css';

function CartItem(props) {
  return (
    <div className='Cart-item'>
      <div className='Cart-item_code'>{props.item.code}</div>
      <div className='Cart-item_title'>{props.item.title}</div>
      <span className='Cart-item_price'>{formatNumber(props.item.price)}&nbsp;₽</span>
      <span className='Cart-item_amount'>{`${props.item.amount} шт`}</span>
      <div className='Cart-item_actions'>
        <Button onDel={() => props.onDelete(props.item.code)}/>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    amountInCart: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func,
};

export default React.memo(CartItem);