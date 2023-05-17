import React, { useState } from "react";
import CartModal from "../cart-modal";
import "./style.css";

const Cart = ({ list, onDeleteItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  const totalPrice =
    list.length &&
    list.reduce((prev, next) => prev + next.price * next.count, 0);

  return (
    <>
      <div className="Cart">
        <span>
          В корзине:
          {list.length ? ` ${list.length} товара / ${totalPrice} ₽` : "пусто"}
        </span>
        <button onClick={() => setIsOpen(true)}>Перейти</button>
      </div>
      {isOpen && (
        <CartModal
          total={totalPrice}
          onClose={() => setIsOpen(false)}
          onDeleteItem={onDeleteItem}
          list={list}
        />
      )}
    </>
  );
};

export default Cart;
