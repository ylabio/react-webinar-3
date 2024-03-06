import React from "react";
import PropTypes from "prop-types";
import Modal from "../modal/";
import List from "../list";
import { monefy } from "../../utils";
import "./style.css";

function Cart({ store, itemBtn, isShow, onClose }) {
  const cart = store.getState().cart;
  const sum = store.sumCartPrices();

  return (
    <div className="Cart" style={{ display: isShow ? "block" : "none" }}>
      <Modal title="Корзина" onClose={onClose}>
        <div className="Cart-content">
          {cart.length ? (
            <>
              <List list={cart} itemsBtn={itemBtn} />
              <div className="Cart-sum">
                <span>{"Итого"}</span>
                <span>{monefy(sum)}</span>
              </div>
            </>
          ) : (
            <div className="Cart-empty">Корзина пуста</div>
          )}
        </div>
      </Modal>
    </div>
  );
}

Cart.propTypes = {
  store: PropTypes.shape({
    getState: PropTypes.func.isRequired,
    sumCartPrices: PropTypes.func.isRequired,
  }).isRequired,

  itemBtn: PropTypes.shape({
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }),

  isShow: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Cart;
