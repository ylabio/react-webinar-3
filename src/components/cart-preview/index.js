import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import React from "react";
import { formatNumber, plural } from "../../utils";
import "./style.css";

function CartPreview({ onCartOpenClick, itemsCount, itemsSum }) {
  const cn = bem("CartPreview");

  return (
    <div className={cn()}>
      <p className={cn("text")}>
        В корзине:{" "}
        {!!itemsCount ? (
          <span className={cn("bold")}>
            {formatNumber(itemsCount)}{" "}
            {plural(itemsCount, {
              one: "товар",
              few: "товара",
              many: "товаров",
            })}{" "}
            / {formatNumber(itemsSum)} ₽
          </span>
        ) : (
          <span className={cn("bold")}>пусто</span>
        )}
      </p>

      <button onClick={onCartOpenClick}>Перейти</button>
    </div>
  );
}

CartPreview.propTypes = {
  onCartOpenClick: PropTypes.func.isRequired,
  itemsCount: PropTypes.number,
  itemsSum: PropTypes.number,
};

CartPreview.defaultProps = {
  itemsCount: 0,
  itemsSum: 0,
};

export default React.memo(CartPreview);
