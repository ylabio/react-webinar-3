import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Cart({ active, setActive }) {
  return <div></div>;
}

Cart.propTypes = {
  onAdd: PropTypes.func,
};

Cart.defaultProps = {
  onAdd: () => {},
};

export default React.memo(Cart);
