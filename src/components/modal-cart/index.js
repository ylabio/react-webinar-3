import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import List from "../list";
import { localeNum } from "../../utils";
import Modal from "../modal";

function ModalCart({ store, onClick, closeModal }) {

  const cn = bem("ModalCart");
  const storeList = store.getState().storeList;

  return (
    <Modal title={"Корзина"} closeModal={closeModal}>
      <div className={cn()}>
        <div className={cn("space")}></div>
        <List list={storeList}
              onClick={onClick} btnName={"Удалить"} cart={true} />
      </div>
      <div className={cn("header")}>
        <p className={cn("bold_span")}>Итого</p>
        <p className={cn("bold_span", "price")}>{`${localeNum(store.getCartPrice())} ₽`}</p>
      </div>
    </Modal>
  );
}

ModalCart.propTypes = {
  children: PropTypes.node
};

export default ModalCart;
