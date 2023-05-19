import React from "react";
import "./style.css";

function CartItem(props) {
  const callbacks = {
    onDelete: () => {
      props.onDelete(props.cartEl.code);
    },
  };

  return (
    <div className="CartItem">
      <div className="CartItem-code">{props.cartEl.code}</div>
      <div className="CartItem-title">{props.cartEl.title}</div>
      <div className="CartItem-price">{props.cartEl.price} ₽</div>
      <div className="CartItem-amount">{props.cartEl.count} шт</div>
      <div className="CartItem-actions">
        <button onClick={callbacks.onDelete}>Удалить</button>
      </div>
    </div>
  );
}

export default React.memo(CartItem);
