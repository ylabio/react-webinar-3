import React from "react";
import "./style.css";
import CartItems from "../cartItems";

function Modal({ active, setActive, store }) {
  return (
    <div className={active ? "modal active" : "modal"}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="Head_modal">
          <h1 className="h1_modal">Корзина</h1>
          <button className="btn" onClick={() => setActive(false)}>
            {" "}
            Закрыть{" "}
          </button>
        </div>
        <div className="cart">
          <CartItems store={store} />
        </div>
        <div className="result">
          <p className="p_modal">Итого&nbsp;&nbsp;</p>{" "}
          <b>{store.calcTotal().toString().replace(/(\d)(?=(\d{3})+$)/g, "$1 ")} ₽</b>
        </div>
      </div>
    </div>
  );
}

export default Modal;
