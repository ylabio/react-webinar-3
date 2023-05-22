import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import Cart from "../cart";

function Modal({ active, setActive }) {
  return (
    <div className={active ? "modal active" : "modal"}>
      <div className="modal__content">
        <Cart setActive={setActive} />
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
