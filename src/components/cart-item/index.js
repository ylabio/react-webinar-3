import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {formatPrice} from "../../utils";

function CartItem(props){
  const cn = bem('CartItem')

  const callbacks = {
    onDelete: () => props.onDelete(props.item.code)
  }

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
        <div className={cn('title')}>
          {props.item.title}
        </div>
        <div className={cn('actions')}>
          <span className={cn('price')}>{formatPrice(props.item.price)}</span>
          <span className={cn("quantity")}>{props.item.quantity} шт.</span>
          <button onClick={callbacks.onDelete}>Удалить</button>
        </div>
    </div>
  );
}

CartItem.propTypes = {
    item: PropTypes.shape({
        title: PropTypes.string,
        code: PropTypes.number,
        price: PropTypes.number,
        quantity: PropTypes.number
    }).isRequired,
    onDelete: PropTypes.func
};

export default React.memo(CartItem);
