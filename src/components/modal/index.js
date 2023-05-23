import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import Cart from "../cart";

function Modal({ sum, active, cart, setActive, onDeleteItem }) {
  return (
    <div className={active ? "modal active" : "modal"}>
      <div className="modal__content">
        <Cart
          sum={sum}
          cart={cart}
          onDeleteItem={onDeleteItem}
          setActive={setActive}
        />
      </div>
    </div>
  );
}

Modal.propTypes = {
  active: PropTypes.bool,
  setActive: PropTypes.func,
};

Modal.defaultProps = {
  setActive: () => {},
};

export default React.memo(Modal);
