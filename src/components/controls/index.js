import React from "react";
import PropTypes from "prop-types";
import { plural } from "../../utils";
import { formatPrice } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Controls({ onModalOpen, uniqueItems, totalPrice }) {
  const cn = bem("Controls");

  return (
    <div className={cn()}>
      <div className={cn("bucket")}>
        В корзине:&nbsp;&nbsp;&nbsp;
        {uniqueItems ? (
          <span className={cn("text", { weight: "700" })}>
            {`${uniqueItems} ${plural(uniqueItems, {
              one: "товар",
              few: "товара",
              many: "товаров",
            })} / ${formatPrice(totalPrice)} \u20BD`}
          </span>
        ) : (
          <span className={cn("text", { weight: "700" })}>пусто</span>
        )}
      </div>
      <div className={cn("actions")}>
        <button className="Btn" onClick={onModalOpen}>
          Перейти
        </button>
      </div>
    </div>
  );
}

Controls.propTypes = {
  onModalOpen: PropTypes.func,
  totalItems: PropTypes.number,
  totalPrice: PropTypes.number,
};

Controls.defaultProps = {
  onAdd: () => {},
  onModalOpen: () => {},
};

export default React.memo(Controls);
