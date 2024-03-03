import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import React from "react";
import { formatNumber } from "../../utils";
import "./style.css";

function Item({ item, onButtonClick, buttonText }) {
  const cn = bem("Item");

  return (
    <div className={cn()}>
      <div className={cn("code")}>{item.code}</div>
      <div className={cn("title")}>{item.title}</div>
      <div className={cn("price")}>{formatNumber(item.price)} ₽</div>
      {item.count && <div className={cn("count")}>{item?.count} шт</div>}
      <div className={cn("actions")}>
        <button
          onClick={() => {
            onButtonClick(item);
          }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onButtonClick: PropTypes.func,
  buttonText: PropTypes.string,
};

Item.defaultProps = {
  onButtonClick: () => {},
  buttonText: "",
};

export default React.memo(Item);
