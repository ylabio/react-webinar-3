import React from "react";
import PropTypes from "prop-types";
import Modal from "../modal/";
import Head from "../head/";
import List from "../list";
import "./style.css";

function Cart({ list, itemBtn, isShow, onClose }) {

  const sum = list.reduce((acc, product) => {
    return acc + (product.price * product.count);
  }, 0);

  return (
    <div className="Cart" style={{ display: isShow ? "block" : "none" }}>
      <Modal>
        <div className="Cart-content">
          <Head title="Корзина">
            <button className="Head-closeBtn" onClick={onClose}>
              Закрыть
            </button>
          </Head>
          <List list={list} itemsBtn={itemBtn} />
          <div className="Cart-sum">
            <span>{"Итого"}</span>
            <span>{sum}</span>
          </div>
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
