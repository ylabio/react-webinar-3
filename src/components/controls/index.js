import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { plural } from "../../utils";

function Controls({ onClick, itemsCount, price }) {
  const cn = bem("Controls");

  return (
    <div className={cn()}>
      <p className={cn("cart-info")}>
        В корзине:
        <span className={cn("cart-info", "status")}>
          {!itemsCount
            ? "Пусто"
            : `${itemsCount} ${plural(itemsCount, {
                one: "товар",
                few: "товара",
                many: "товаров",
              })} / ${price} ₽`}
        </span>
      </p>
      <button onClick={onClick}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  onClick: PropTypes.func,
};

Controls.defaultProps = {
  onClick: () => {},
};

export default React.memo(Controls);
