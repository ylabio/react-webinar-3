import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import Button from "../button";

const ItemList = ({ item, addToCart, onDelete }) => {
  
  const callbacks = {
    addToCart: (e) => {
      e.stopPropagation();
      addToCart(item.code);
    },

    onDelete: (e) => {
      e.stopPropagation();
      onDelete(item.code);
    },
  };

  return (
    <div className="ItemList">
      <div className="ItemList-code">{item.code}</div>
      <div className="ItemList-title">
        <div className="ItemList-title-title">{item.title}</div>
        <div className="ItemList-title-price">
          <span>{item.price.toLocaleString("ru-RU")} ₽</span>{" "}
          <span>{item.count} шт</span>
        </div>
      </div>
      <div className="ItemList-actions">
        <Button btnText={"Добавить"} onClick={callbacks.addToCart} />
      </div>
    </div>
  );
};

ItemList.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func,
  addToCart: PropTypes.func,
};

ItemList.defaultProps = {
  onDelete: () => {},
  addToCart: () => {},
};

export default React.memo(ItemList);
