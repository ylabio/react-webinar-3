import PropTypes from "prop-types";
import React from "react";
import { formatNumber } from "../../utils";
import "./style.css";

function Item(props) {
  const callbacks = {
    onAdd: (e) => {
      e.stopPropagation();
      props.onAdd(props.item.code);
    },
  };

  return (
    <div className="Item" onClick={callbacks.onClick}>
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-price">{formatNumber(props.item.price)} ₽</div>
      <div className="Item-actions">
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func.isRequired,
};

Item.defaultProps = {};

export default React.memo(Item);
