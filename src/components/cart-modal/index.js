import React from "react";
import Head from "../head";
import List from "../list";
import "./style.css";

const CartModal = ({ list, onDeleteItem, onClose, total }) => {
  return (
    <div className="CartModal">
      <Head title={"Корзина"}>
        <button className="CartModal-close" onClick={onClose}>
          Закрыть
        </button>
      </Head>
      <List list={list} onAction={onDeleteItem} actionTitle={"Удалить"} />
      <div className="CartModal-total">
        <strong>Итого</strong>
        <strong>{total} ₽</strong>
      </div>
    </div>
  );
};

export default CartModal;
