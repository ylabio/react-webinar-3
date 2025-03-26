import React from "react";
import PropTypes from "prop-types";

import './style.css';

function Button(props) {
  const callbacks = {
    onClick: () => {
      props.onClickItemButton(props.itemCode);
    },
  };
  return  <button onClick={callbacks.onClick} className={props.className}>{props.isCartItem ? "Удалить" : "Добавить"}</button>
}

export default Button;

Button.propTypes = {
  itemCode: PropTypes.number,
  isCartItem: PropTypes.bool,
  onClickItemButton: PropTypes.func,
};
