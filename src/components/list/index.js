import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import CartCount from "../cart-count";
import "./style.css";

function List({ list, onAddToCart, onDeleteFromCart }) {
  return (
    <div className="List">
      {list.map((item) => {
        return (
          <Item
            key={item.code}
            item={item}
            onAddToCart={onAddToCart}
            onDeleteFromCart={onDeleteFromCart}
          />
        );
      })}
      {onDeleteFromCart && <CartCount list={list} cartVariant/>}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  onAddToCart: PropTypes.func,
  onDeleteFromCart: PropTypes.func,
};

List.defaultProps = {
  onAddToCart: () => {},
};

export default React.memo(List);
