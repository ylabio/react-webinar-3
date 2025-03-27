import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from "@bem-react/classname";

function CartItem({ cartItem, onDeleteItem = code => {} }) {
  const cn = bem('CartItem');

  return (
    <div className={cn()}>
      <div className={cn("title")}>{cartItem.title}</div>
      <div className={cn("actions")}>
        <div className={cn("actions__text")}>
          <div>{cartItem.cartQuantity} шт</div>
          <div>{cartItem.price} ₽</div>
        </div>
        <button className={cn("button")} onClick={() => onDeleteItem(cartItem.code)}>
          Удалить
        </button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  cartItem: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    cartQuantity: PropTypes.number,
  }).isRequired,
  onAddItem: PropTypes.func,
};

export default React.memo(CartItem);
