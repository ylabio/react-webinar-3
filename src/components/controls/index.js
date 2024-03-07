import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import CartInfo from "../cart-info";
import Button from "../button";

function Controls({ handleModal, sum, cart }) {
  return (
    <div className="Controls">
      <CartInfo sum={sum} cart={cart} />
      <Button handleModal={handleModal} children="Перейти" />
    </div>
  );
}

Controls.propTypes = {
  handleModal: PropTypes.func,
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      count: PropTypes.number,
    })
  ).isRequired,
};

Controls.defaultProps = {
  handleModal: () => {},
};

export default React.memo(Controls);
