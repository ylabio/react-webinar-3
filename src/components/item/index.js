import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
function Item({ onClickButton, item, textButton }) {
  const callbacks = {
    onAction: (item) => {
      debugger;
      onClickButton(item);
    },
  };
  const cn = bem("Item");
  return (
    <div className={cn()}>
      <div className={cn("code")}>{item.code}</div>
      <div className={cn("title")}>{item.title}</div>
      <div className={cn("price")}>
        {item.price.toLocaleString("ru-RU")}&nbsp;<span>₽</span>
      </div>
      {item.count ? (
        <p className={cn("count")}>
          {item.count}&nbsp;<span>шт</span>
        </p>
      ) : null}
      <button onClick={() => callbacks.onAction(item)} className={cn("button")}>
        {textButton}
      </button>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
  }).isRequired,
  onClickButton: PropTypes.func,
};

Item.defaultProps = {
  onClickButton: () => {},
};

export default React.memo(Item);
