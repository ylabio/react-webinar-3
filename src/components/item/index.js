import React, { useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Item(props) {
  const cn = bem("Item");

  const callbacks = {
    onAddItemToCart: () => {
      props.onAddItemToCart(props.item);
    },
    onDeleteItemFromCard: () => {
      props.onDeleteItemFromCard(props.item.code);
    },
  };

  return (
    <div className={cn()}>
      <div className={cn("code")}>{props.item.code}</div>
      <div className={cn("title")}>{props.item.title} </div>
      <div className={cn("price")}>{props.item.price} ₽</div>
      {props.cartComponent && (
        <div className={cn("count")}>{props.item.count} шт</div>
      )}
      <div className={cn("btns")}>
        {props.cartComponent ? (
          <button
            className={cn("btn")}
            onClick={callbacks.onDeleteItemFromCard}
          >
            Удалить
          </button>
        ) : (
          <button className={cn("btn")} onClick={callbacks.onAddItemToCart}>
            Добавить
          </button>
        )}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  onAddItemToCart: PropTypes.func,
  onDeleteItemFromCard: PropTypes.func,
};

Item.defaultProps = {
  onAddItemToCart: () => {},
  onDeleteItemFromCard: () => {},
};

export default React.memo(Item);
