import React from "react";
import PropTypes from "prop-types";
import {formatPrice} from "../../utils";
import Button from '../ui/button';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CartItem(props) {

  const cn = bem('CartItem');

  const callbacks = {
    onDeleteItemFromCart: () => {
      props.onDeleteItemFromCart(props.item.code);
    },
  }

  return (
    <div className={cn()} >
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{formatPrice(props.item.price)}</div>
      <div className={cn('amount')}>{props.item.amount} шт</div>
      <div className={cn('actions')}>
        <Button onClick={callbacks.onDeleteItemFromCart}>Удалить</Button> 
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired
  }).isRequired,
  onDeleteItemFromCart: PropTypes.func.isRequired
};

CartItem.defaultProps = {
  onDeleteItemFromCart: () => {}
}

export default React.memo(CartItem);
