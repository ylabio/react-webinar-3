import React from "react";
import PropTypes from "prop-types";
import { plural } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import Controls from "../controls";

function Label({ number, sum, onShow }) {
  const cn = bem("Label");
  return (
    <div className={cn()}>
      <p>
        В корзине:{" "}
        {number === 0 ? (
          <span className={cn("span")}>пyсто</span>
        ) : (
          <span className={cn("span")}>
            {number}{" "}
            {plural(number, {
              one: "товар",
              few: "товара",
              many: "товаров",
            })}{" "}
            / {sum.toLocaleString("ru-RU")} ₽
          </span>
        )}{" "}
      </p>
      <Controls actionFunc={onShow} title="Перейти" />
    </div>
  );
}

Label.propTypes = {
  number: PropTypes.number,
  sum: PropTypes.number,
};

export default React.memo(Label);
