import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import CartItem from "../cart-item";

function CartList({carts, onDelete}) {

  const cn = bem('CartList')

  return (
    <div className={cn()}>
      {
        carts.length ?
        carts.map((item) => (
          <CartItem item={item} key={item.code} onDelete={onDelete}/>
        )) : <h3 className={cn('desc')}>Ваша корзина пуста.</h3>
      }
    </div>
  )
}

CartList.PropTypes = {
  carts: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onDelete: PropTypes.func,
}

CartList.defaultProps = {
  onDelete: () => {}
}
export default React.memo(CartList);