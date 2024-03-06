import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function List({ list, onAddItemToCart, cartComponent, onDeleteItemFromCard }) {
  const cn = bem("List");

  return (
    <div className={cn()}>
      {list.map((item) => (
        <div key={item.code} className={cn("item")}>
          <Item
            item={item}
            onAddItemToCart={onAddItemToCart}
            cartComponent={cartComponent}
            onDeleteItemFromCard={onDeleteItemFromCard}
          />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  cartComponent: PropTypes.bool,
  onAddItemToCart: PropTypes.func,
  onDeleteItemFromCard: PropTypes.func,
};

List.defaultProps = {
  onAddItemToCart: () => {},
  onDeleteItemFromCard: () => {},
};

export default React.memo(List);
