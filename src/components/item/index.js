import React from "react";
import PropTypes from "prop-types";
import { splitNumber } from "../../utils";
import "./style.css";

function Item(props) {
  const callbacks = {
    onBuy: () => {
      props.onBuy(props.item.code);
    },
  };

  return (
    <div className="Item">
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-actions">
        <span style={{ marginRight: "15px" }}>
          {splitNumber(props.item.price)}
        </span>
        <button onClick={callbacks.onBuy}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }).isRequired,
  onBuy: PropTypes.func,
};

Item.defaultProps = {
  onBuy: () => {},
};

export default React.memo(Item);
