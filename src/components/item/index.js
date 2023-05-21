import React, {useState} from "react";
import PropTypes from "prop-types";
import {numberToPrice, plural} from "../../utils";
import './style.css';

function Item(props){
  const {onAddToCart, onDeleteFromCart} = props

  const callbacks = {
    onAddToCart: (e) => {
      e.stopPropagation()
      onAddToCart(props.item.code)
    },
    onDeleteFromCart: (e) => {
      e.stopPropagation()
      onDeleteFromCart(props.item.code)
    },
  }

  let button
  let count
  if (onDeleteFromCart) {
    if (!props.item.cartCount) return null
    button = <button onClick={callbacks.onDeleteFromCart}>Удалить</button>
    count = props.item.cartCount + ' шт'
  } else {
    button = <button onClick={callbacks.onAddToCart}>Добавить</button>
    count = null
  }

  return (
    <div className="List-item">
      <div className="Item">
        <div className="Item-code">{props.item.code}</div>
        <div className="Item-title">{props.item.title}</div>
        <div className="Item-price">{numberToPrice(props.item.price)}</div>
        {count && <div className="Item-count">{count}</div>}
        <div className="Item-actions">{button}</div>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number
  }).isRequired,
  onAddToCart: PropTypes.func,
  onDeleteFromCart: PropTypes.func
};

export default React.memo(Item);
