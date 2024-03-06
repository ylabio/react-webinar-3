import React from "react";
import PropTypes from "prop-types";
import './style.css';
import Button from "../button";
import { formatPrice } from "../../utils";

function Item(props) {
  const callbacks = {
    onAddToCart: () => {
      props.onAddToCart(props.item.code);
    },
  }

  return (
    <div className={'Item'}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title} 
      </div>
      <div className='Item-price'>
        {`${formatPrice(props.item.price)} ₽`}
      </div>
      <div className='Item-actions'>
        <Button onClick={callbacks.onAddToCart}>Добавить</Button>
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
};

Item.defaultProps = {
  item: {},
  onAddToCart: () => {},
};


export default React.memo(Item);
