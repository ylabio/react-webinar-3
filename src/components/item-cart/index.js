import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import Button from "../button";

const ItemCart = ({ item, addToCart, onDelete, id }) => {
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
    <div className="ItemCart">
      <div className="ItemCart-code">{id}</div>
      <div className="ItemCart-title">
        <div className="ItemCart-title-title">{item.title}</div>
        <div className="ItemCart-title-price">
          <span>{item.price.toLocaleString("ru-RU")} ₽</span>{" "}
          <span>{item.count} шт</span>
        </div>
      </div>
      <div className="ItemCart-actions">
        <Button btnText={"Удалить"} onClick={callbacks.onDelete} />
      </div>
    </div>
  );
};

ItemCart.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,  
  id: PropTypes.node,
  onDelete: PropTypes.func,
  addToCart: PropTypes.func,
};

ItemCart.defaultProps = {
  addToCart: () => {
  },
  onDelete: () => {
  },
}

export default React.memo(ItemCart);
