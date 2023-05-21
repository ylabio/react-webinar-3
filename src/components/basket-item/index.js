import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { formatNumbers } from "../../utils";
import "./style.css";

function Item({ item, handler }) {
  const cn = bem("BasketItem");

  return (
    <div className={cn()}>
      <div className={cn("code")}>{item.code}</div>
      <div className={cn("title")}>{item.title}</div>
      <div className={cn("price")}>
        {formatNumbers(item.price, {
          style: "currency",
          currency: "RUB",
          minimumFractionDigits: 0,
        })}
      </div>
      <div className={cn("count")}>
        {item.count ? <p>{item.count} шт</p> : null}
      </div>
      <div className={cn("actions")}>
        <button onClick={() => handler(item.code)}>Удалить</button>
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
  handler: PropTypes.func,
};

Item.defaultProps = {
  handler: () => {},
};

export default React.memo(Item);
