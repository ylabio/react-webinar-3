import React from "react";
import Head from "../head";
import List from "../list";
import "./style.css";
import Modal from "../modal";
import { formatPrice } from "../../utils";
import CartItem from "../cart-item";

const CartModal = ({ list, onDeleteItem, onClose, totalPrice }) => {
  return (
    <Modal onClose={onClose} title={"Корзина"}>
      <>
        <List
          className="CartModal-list"
          list={list}
          onAction={onDeleteItem}
          Item={CartItem}
        />
        <div className="CartModal-total">
          <strong>Итого</strong>
          <strong>{formatPrice(totalPrice)}</strong>
        </div>
      </>
    </Modal>
  );
};

export default React.memo(CartModal);
