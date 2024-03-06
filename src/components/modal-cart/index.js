import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import "./style.css";
import List from "../list";
import {localeNum} from "../../utils";

function ModalCart({store, onClick}) {

  const cn = bem("ModalCart");
  const storeList = store.getState().storeList;

  return (
    <div className={cn()}>
      <div className={cn("space")}></div>
      <List list={storeList}
            onClick={onClick} btnName={"Удалить"} cart={true} />
      <div className={cn("header")}>
        <p className={cn("bold_span")}>Итого</p>
        <p className={cn("bold_span", "price")}>{`${localeNum(store.getCartPrice())} ₽`}</p>
      </div>
    </div>
  );
}

ModalCart.propTypes = {
  children: PropTypes.node,
};

export default ModalCart;
