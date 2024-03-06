import React from "react";
import PropTypes from "prop-types";
import Cart from "../cart";
import "./style.css";

function CartLayout({ cart, showCart, changeCartVisability, onDeleteItem, cost }) {
  const callbacks = {
    hideCart: () => {
      changeCartVisability();
    },
  };
  return (
    showCart && (
      <div className="CartLayout">
        <Cart cart={cart} onDeleteItem={onDeleteItem} cost={cost} hideCart={callbacks.hideCart}/>
      </div>
    )
  );
}

CartLayout.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  onDeleteItem: PropTypes.func,
  changeCartVisability: PropTypes.func,
};

CartLayout.defaultProps = {
  onDeleteItem: () => {},
  changeCartVisability: () => {},
};

export default React.memo(CartLayout);
