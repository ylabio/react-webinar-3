import React from "react";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";

import Button from "../button";
import Actions from "../actions";

import {formatPrice} from "../../utils";

import "./style.css";

function Item(props) {
  const cn = bem("Item");

  return (
    <div className={cn()}>
      <div className={cn("title")}>
        <b>{props.item.title}</b>

      </div>
      {props.isCartItem && <div className={cn("count")}>{props.item.count} шт</div>}
      <div className={props.isCartItem ? cn("price--cart") : cn("price")}>{formatPrice(props.item.price, "ru")}</div>
      <Actions className={cn("actions")}>
        <Button
          onClickButton={props.onClickItem}
          itemCode={props.item.code}
          isListButton={true}
          className={props.isCartItem ? cn("btn--cart") : cn("btn--list")}
        >
          {props.isCartItem ? "Удалить" : "Добавить"}
        </Button>
      </Actions>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.object,
  isCartItem: PropTypes.bool,
  onClickItem: PropTypes.func,
};

export default React.memo(Item);
