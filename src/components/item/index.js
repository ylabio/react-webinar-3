import React from "react";
import PropTypes from "prop-types";
import './style.css';
import Button from "../button";

function Item(props) {
  const callbacks = {
    onAddToCart: () => {
      props.onAddToCart(props.item);
    },

    onDeleteFromCart: () => {
      props.onDeleteFromCart(props.item.code);
    },
  }

  return (
    <div className={'Item'}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title} 
      </div>
      <div className='Item-price'>
        {`${props.item.price} ₽`}
      </div>
      {props.item.count && <div className='Item-count'>
        {`${props.item.count} шт`}
      </div>}
      <div className='Item-actions'>
        {props.onAddToCart && <Button onClick={callbacks.onAddToCart}>Добавить</Button>}
        {props.onDeleteFromCart && <Button onClick={callbacks.onDeleteFromCart}>Удалить</Button>}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAddToCart: PropTypes.func,
  onDeleteFromCart: PropTypes.func,
};


export default React.memo(Item);
