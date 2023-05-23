import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import Price from "../price";

function Item(props) {
  const callbacks = {
    onAdd: (code) => {
      props.onClick(code);
    },
  };

  return (
    <div className="Item">
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-actions">
        <div className="Item-price">
          <Price price={props.item.price} />
        </div>
        {props.isCartItem && (
          <div className="Item-count">{`${
            props.item.count !== undefined ? props.item.count : "1"
          } шт`}</div>
        )}
        <button onClick={() => callbacks.onAdd(props.item.code)}>
          {props.isCartItem ? "Удалить" : "Добавить"}
        </button>
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
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
  onRemove: () => {},
};

export default React.memo(Item);
