import React, { useState } from "react";
import PropTypes from "prop-types";
import "./style.css";
import Button from "../button";
function Item({ item, addToCart, onDelete, active, id }) {
  const callbacks = {
    addToCart: (e) => {
      e.stopPropagation();
      addToCart(item);
    },

    onDelete: (e) => {
      e.stopPropagation();
      onDelete(item.code);
    },
  };

  return (
    <div className="Item">
      <div className="Item-code">{active ? id : item.code}</div>
      <div className="Item-title">
        <div className="Item-title-title">{item.title}</div>
        {active ? (
          <div className="Item-title-price">
            <span>{item.price.toLocaleString("ru-RU")} ₽</span>{" "}
            <span>{item.count} шт</span>
          </div>
        ) : (
          <div className="Item-title-price">
            {item.price.toLocaleString("ru-RU")} ₽
          </div>
        )}
      </div>
      <div className="Item-actions">
        <Button
          btnText={active ? "Удалить" : "Добавить"}
          onClick={active ? callbacks.onDelete : callbacks.addToCart}
        />
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
  }).isRequired,
  active: PropTypes.bool,
  id: PropTypes.node,
  onDelete: PropTypes.func,
  addToCart: PropTypes.func,
};

Item.defaultProps = {
  onDelete: () => {},
  addToCart: () => {},
};

export default React.memo(Item);
