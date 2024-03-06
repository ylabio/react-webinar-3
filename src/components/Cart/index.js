import React from "react";
import "./style.css";
import Item from "../item";

function Cart({ cart, itogo, total, removeItem }) {
  return (
    <div className="inv Center cartMain">
      <div className="cartHead Head">
        <h1>Корзина</h1>
        <button className="cartHead_btn" onClick={() => blur()}>
          Закрыть
        </button>
      </div>
      <div>
        {cart.map((i) => (
          <Item item={i} del="Удалить" itogo={itogo} removeItem={removeItem} />
        ))}
      </div>
      <div className="itogo">
        <p>Итого:</p>
        <p>{` ${
          total ? new Intl.NumberFormat("ru").format(total) : 0
        } \u20BD`}</p>
      </div>
    </div>
  );
}

export const blur = () => {
  document.querySelector(".cartMain").classList.toggle("visible");
  document.querySelector(".PageLayout").classList.toggle("blur");
};
export default React.memo(Cart);
