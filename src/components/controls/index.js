import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { plural } from "../../utils";
import { cn as bem } from "@bem-react/classname";
function Controls({ setActive, uniqueProductsCount, totalPrice }) {
  const cn = bem("Controls");

  return (
    <div className={cn()}>
      <div className={cn("text")}>
        В корзине:{" "}
        <span className={cn("text", { bold: true })}>
          {uniqueProductsCount
            ? `${uniqueProductsCount} ${plural(uniqueProductsCount, {
                one: "товар",
                few: "товара",
                many: "товаров",
              })} / ${totalPrice} ₽`
            : "пусто"}
        </span>
      </div>
      <button onClick={() => setActive(true)}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
  uniqueProductsCount: PropTypes.number,
  totalPrice: PropTypes.number,
};

Controls.defaultProps = {
  onOpenModal: () => {},
};

export default React.memo(Controls);
