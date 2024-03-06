import React from "react";
import PropTypes from "prop-types";
import './style.css';
import Button from "../button";
import { formatPrice } from "../../utils";

function ItemInCart(props) {
  const callbacks = {
    onDeleteFromCart: () => {
      props.onDeleteFromCart(props.item.code);
    },
  }

  return (
    <div className={'ItemInCart'}>
      <div className='ItemInCart-code'>{props.item.code}</div>
      <div className='ItemInCart-title'>
        {props.item.title} 
      </div>
      <div className='ItemInCart-price'>
        {`${formatPrice(props.item.price)} ₽`}
      </div>
      <div className='ItemInCart-count'>
        {`${props.item.count} шт`}
      </div>
      <div className='ItemInCart-actions'>
        <Button onClick={callbacks.onDeleteFromCart}>Удалить</Button>
      </div>
    </div>
  );
}

ItemInCart.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onDeleteFromCart: PropTypes.func,
};

ItemInCart.defaultProps = {
  item: {},
  onDeleteFromCart: () => {},
};

export default React.memo(ItemInCart);
