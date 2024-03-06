import React from "react";
import PropTypes from "prop-types";
import { formatCurrency, plural } from "../../utils";
import "./style.css";
import { cn as bem } from "@bem-react/classname";

/**
 *  Функция для вывода информации о корзине
 * @param {Object} props - объект пропсов
 * @param {String} props.title - Надпись передшествующая выводу информации
 * @param {Function} props.calculateItems - функция подсчета количества товаров в корзине
 * @param {Function} props.calculateSum - функция подсчета суммы товаров в корзине
 * @returns разметка
 */
function CartInfo({ title, calculateItems, calculateSum }) {
  const cn = bem("CartInfo");

  return (
    <div className={cn()}>
      <span className={cn("title") + (title !== "В Корзине:" ? cn("content") : "")}>
        {title}
      </span>
      {calculateItems !== null &&
        <div className={cn("content")}>
          { calculateItems()
          ? `${calculateItems()} ${plural(calculateItems(), {one: 'товар', few: 'товара', many: 'товаров'})} /` : "пусто"}
        </div>
      }
        {calculateItems() !== 0 && <span className={cn("content")}>{`${formatCurrency(calculateSum())}`}</span>}
    </div>
  );
};

CartInfo.propTypes = {
  title: PropTypes.string,
  calculateSum: PropTypes.func.isRequired,
  calculateItems: PropTypes.func,
};

CartInfo.defaultProps = {
  title: "В Корзине:",
  calculateSum: () => {},
  calculateItems: null,
};

export default React.memo(CartInfo);
