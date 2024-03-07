import React, { useState } from "react";
import "./style.css";

function CartItem({ item, cnt, onDelete }) {
  const { code, title, price } = item;
  return (
    <div className="Item_modal">
      <div className="Item-code_modal">{code}</div>
      <div className="Item-title_modal">{title}</div>
      <div className="price-actions_modal">
        {price.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1 ")} &#8381;
      </div>
      <div className="cnt-actions_modal">{cnt} &nbsp;шт</div>
      <div className="Item-actions_modal">
        <button className="btn_delete" onClick={() => onDelete(code)}>Удалить</button>
      </div>
    </div>
  );
}

function Modal({ active, setActive, items, cart, onDeleteItem,cartList}) {
  
  let total = 0;
  const cartEls = [];
  for (const codeStr in cart) {
    
    const code = +codeStr;
    const item = items.find((x) => x.code === code);

    if (!item) {
      continue;
    }
    const cnt = cart[codeStr];
    cartEls.push(
      <CartItem key={code} item={item} cnt={cnt} onDelete={onDeleteItem} />
    );
    total += cnt * item.price;
  }
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
        <div className="cart">{cartEls}</div>
        <div className="result">
          <p className="p_modal">Итого&nbsp;&nbsp;</p>{" "}
          <b>{total.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1 ")} ₽</b>
        </div>
      </div>
    </div>
  );
}

export default Modal;
