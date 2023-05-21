import React from "react";
import List from "../list";
import "./style.css";
import Modal from "../modal-layout";
import {setPriceFormat} from "../../utils";
import CartItem from "../cart-item";

const CartView = ({list, onDeleteItem, onClose, totalPrice}) => {
  return (
    <Modal title={"Корзина"} onClose={onClose} buttonText="Закрыть">
      <p className="box"></p>
      <>
        <List list={list} onAction={onDeleteItem} Item={CartItem} />
        <div className="CartView-total">
          <strong>Итого</strong>
          <strong>{setPriceFormat(totalPrice)}</strong>
        </div>
      </>
    </Modal>
  );
};

export default React.memo(CartView);