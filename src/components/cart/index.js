import React from "react";
import PropTypes from "prop-types";
import Modal from "../modal/";
import List from "../list";
import { monefy, sumPrices } from "../../utils";
import "./style.css";

function Cart({ list, itemBtn, isShow, onClose }) {
  const sum = sumPrices(list);

  return (
    <div className="Cart" style={{ display: isShow ? "block" : "none" }}>
      <Modal onClose={onClose}>
        <div className="Cart-content">
          {list.length ? (
            <>
              <List list={list} itemsBtn={itemBtn} />
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
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    })
  ),

  itemBtn: PropTypes.shape({
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }),

  isShow: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Cart;
