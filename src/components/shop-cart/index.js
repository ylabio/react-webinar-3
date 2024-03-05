import React from "react";
import Head from "../head/";
import ModelCart from "../model-cart/";
import List from "../list"
import "./style.css";

function ShopCart({ onClose, cartItems, totalPrice, deleteItemCart }) {
  return (
    <ModelCart>
          <Head title="Корзина" />
          <button className="close-button" onClick={() => onClose()}>Закрыть</button>
          <div className="List">
          <List list={cartItems} deleteItemCart={deleteItemCart} textButton="Удалить"/>
            {totalPrice() > 0 && <div className="totalPrice">Итого <span>{totalPrice().toLocaleString('ru-RU')} ₽</span></div>}
          </div>
    </ModelCart>
  );
}

export default React.memo(ShopCart);
