import React from "react";
import "./style.css";
import Head from "../head";
import List from "../list";

const Modal = (props) => {
  let price = 0;
  if (props.basket.length > 0) {
    price = props.basket.reduce(
      (sum, { price, count }) => sum + price * count,
      0
    );
  }
  return (
    <div className="Modal">
      <div className="Modal-container">
        <Head titleBasket={"Корзина"} setIsOpen={props.setIsOpen} />
        <List
          list={props.basket.sort((a, b) => a.code - b.code)}
          onDeleteBasket={props.onDeleteBasket}
        />
        <div className="Modal-box">
          <div className="Modal-sum">
            <span>Итого</span>
            <span className="Modal-total">{`${price} ₽`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Modal);
