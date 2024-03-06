import React from "react";
import PropTypes from "prop-types";
import { plural } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Controls({ totalCount, totalPrice, cartComponent, onModalActive }) {
  const cn = bem("Controls");

  const pluralized = plural(totalCount, {
    one: "товар",
    few: "товара",
    many: "товаров",
  });

  if (cartComponent) {
    return <div className={cn("empty")}></div>;
  }

  return (
    <div className={cn()}>
      <span className={cn("cart")}>В корзине:</span>
      <span className={cn("count")}>
        {totalCount ? (
          <span>
            {totalCount} {pluralized} / {totalPrice} ₽
          </span>
        ) : (
          <span>пусто</span>
        )}
      </span>

      <button className={cn("button")} onClick={() => onModalActive(true)}>
        Перейти
      </button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
};

Controls.defaultProps = {
  onAdd: () => {},
};

export default React.memo(Controls);
