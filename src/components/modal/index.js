import React from "react";
import Head from "../head/index";
import List from "../list/index";
import PropTypes from "prop-types";
import "./style.css";

const Modal = ({ handleModal, cart, showModal, handleCart, title }) => {
  return (
    <div
      className="Modal"
      style={showModal ? { display: "flex" } : { display: "none" }}
    >
      <div className="Modal-container">
        <Head title="Корзина" handleModal={handleModal} children="Закрыть" />
        <List list={cart} handleCart={handleCart} title={title} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      count: PropTypes.number,
    })
  ).isRequired,
  handleCart: PropTypes.func,
  handleModal: PropTypes.func,
  title: PropTypes.node,
  showModal: PropTypes.bool,
};

Modal.defaultProps = {
  handleCart: () => {},
  handleModal: () => {},
};

export default Modal;
