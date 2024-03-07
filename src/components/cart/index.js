import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
import Modal from "../modal";
import Head from "../head";
import List from "../list";
import Result from "../result";
import { formatPrice } from "../../utils";

function Cart(props) {
  const cn = bem("Cart");

  return (
    <div className={cn()}>
      <Modal active={props.modalActive} setActive={props.setActive}>
        <Head title={props.title} />
        <List
          list={props.list}
          type={props.type}
          totalPrice={props.totalPrice}
          action={props.action}
        />
        {(props.uniqueProductsCount && (
          <Result totalPrice={formatPrice(props.totalPrice)} />
        )) ||
          (props.type !== "list" && (
            <div className={cn({ empty: true })}>Ваша корзина пуста!</div>
          ))}
      </Modal>
    </div>
  );
}

Cart.propTypes = {
  setActive: PropTypes.func,
  action: PropTypes.func,
  modalActive: PropTypes.bool,
  title: PropTypes.string,
  list: PropTypes.array,
  type: PropTypes.string,
  uniqueProductsCount: PropTypes.number,
  totalPrice: PropTypes.number,
};

export default Cart;
