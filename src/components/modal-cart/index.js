import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import List from "../list";
import { localeNumber } from "../../utils";

function ModalCart({ store, onClick = () => {}, closeModal }) {

  const cn = bem("ModalCart");
  const listCart = store.getState().listCart;

  return (
    <>
      <div className={cn()}>
        <List list={listCart}
              onClickItem={onClick} btnName={"Удалить"} cart={true} />
      </div>
      <div className={cn("footer")}>
        <p className={cn("bold_span")}>Итого:</p>
        <p className={cn("bold_span", "price")}>{`${localeNumber(store.getCartPrice())} ₽`}</p>
      </div>
    </>
  );
}

ModalCart.propTypes = {
  store: PropTypes.object,
  children: PropTypes.node
};

export default ModalCart;
