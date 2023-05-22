import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Cart({ setActive }) {
  return (
    <div>
      <div className="Cart-header">
        <div>Корзина</div>
        <button onClick={() => setActive()}>Закрыть</button>
      </div>
    </div>
  );
}

Cart.propTypes = {
  setActive: PropTypes.func,
};

Cart.defaultProps = {
  setActive: () => {},
};

export default React.memo(Cart);
