import React from "react";
import PropTypes from "prop-types";
import './style.css';
import {cn as bem} from "@bem-react/classname";

function Item(props) {
    const cn = bem('Item');

    return (
    <div className={cn()}>
      <div className={cn("content")}>
          <div className={cn("code")}>{props.item.code}</div>
          <div className={cn("title")}>{props.item.title}</div>
      </div>

      <div className={cn("actions")}>
        <p className={cn("price")}>{props.item.price} ₽</p>
        {props.buttonText === "Удалить" && <p className={cn("quantity")}>{props.item.quantity} шт</p>}
        <button className={cn("button")} onClick={() => props.action(props.item.code)}>{props.buttonText}</button>
      </div>
    </div>
    );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
    quantity: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
};


export default React.memo(Item);
