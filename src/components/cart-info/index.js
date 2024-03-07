import React from "react";
import PropTypes from "prop-types";
import { formatCurrency, plural } from "../../utils";
import "./style.css";
import { cn as bem } from "@bem-react/classname";

/**
 *  Функция для вывода информации о корзине
 * @param {Object} props - объект пропсов
 * @param {String} props.title - Надпись передшествующая выводу информации
 * @param {Number} props.calculateItems - функция подсчета количества товаров в корзине
 * @param {Number} props.calculateSum - функция подсчета суммы товаров в корзине
 * @returns разметка
 */
function CartInfo({ title, calculateItems, calculateSum }) {
  const cn = bem("CartInfo");
  const isEmptyCart = calculateItems() === 0;

  return (
    <div className={cn()}>
      <span
        className={cn("title") + (title !== "В Корзине:" ? cn("content") : "")}
      >
        {title}
      </span>
      {/* {calculateItems() !== 0 && */}
      <div className={cn("content")}>
        {isEmptyCart
          ? ("пусто")
          : (`${calculateItems()} ${plural(calculateItems(), {
              one: "товар",
              few: "товара",
              many: "товаров",
            })} /` )
        }
      </div>
      {/* } */}
      {!isEmptyCart && (
        <span className={cn("content")}>{`${formatCurrency(
          calculateSum()
        )}`}</span>
      )}
    </div>
  );
}

CartInfo.propTypes = {
  title: PropTypes.string,
  calculateSum: PropTypes.func.isRequired,
  calculateItems: PropTypes.func.isRequired,
};

CartInfo.defaultProps = {
  title: "В Корзине:",
};

export default React.memo(CartInfo);
