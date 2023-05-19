import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { formatNumbers } from "../../utils";
import "./style.css";

function Item({ item, onAddToBasket, isInModal, onDeleteItemFromBasket }) {
  const cn = bem("Item");

  const content = isInModal ? (
    <>
      <div className={cn("count")}>
        {item.count ? <p>{item.count} шт</p> : null}
      </div>
      <div className={cn("actions")}>
        <button onClick={() => onDeleteItemFromBasket(item.code)}>
          Удалить
        </button>
      </div>
    </>
  ) : (
    <div className={cn("actions")}>
      <button onClick={() => onAddToBasket(item)}>Добавить</button>
    </div>
  );

  return (
    <div className={cn()}>
      <div className={cn("code")}>{item.code}</div>
      <div className={cn("title")}>{item.title}</div>
      <div className={cn("price")}>
        {formatNumbers(item.price, { style: "currency", currency: "RUB" })}
      </div>
      {content}
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
  isInModal: PropTypes.bool,
  onAddToBasket: PropTypes.func,
  onDeleteItemFromBasket: PropTypes.func,
};

Item.defaultProps = {
  item: {},
  isInModal: false,
  onAddToBasket: () => {},
  onDeleteItemFromBasket: () => {},
};

export default React.memo(Item);
