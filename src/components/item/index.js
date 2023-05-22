import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { addSpaceToNumber } from "../../utils";

function Item(props) {
  const {
    onAddToCart,
    item: { code, title, price },
  } = props;

  return (
    <div className="Item">
      <div className="Item-code">{code}</div>
      <div className="Item-title">{title}</div>
      <div className="Item-price">{addSpaceToNumber(price)} ₽</div>
      <div className="Item-actions">
        <button onClick={() => onAddToCart(code)}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default React.memo(Item);
