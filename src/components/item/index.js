import React, { useState } from "react";
import PropTypes from "prop-types";
import { plural, formatPrice } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Item(props) {
  // Счётчик выделений
  // const [count, setCount] = useState(0);
  const cn = bem("Item");

  const callbacks = {
    onBucketAction: () => {
      props.onBucketAction(props.item);
    },
  };

  return (
    <div className={cn()}>
      <div className={cn("code")}>{props.item.code}</div>
      <div className={cn("title")}>{props.item.title}</div>
      <div className={cn("price")}>{formatPrice(props.item.price)} &#8381;</div>
      {props.theme === "bucket" ? (
        <div className={cn("amount")}>{props.item.amount} шт</div>
      ) : null}
      <div className={cn("actions")}>
        <button className="Btn" onClick={callbacks.onBucketAction}>
          {props.theme === "shop" ? "Добавить" : "Удалить"}
        </button>
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
  }).isRequired,
};

Item.defaultProps = {
  onBucketAction: () => {},
};

export default React.memo(Item);
