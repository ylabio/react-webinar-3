import React from "react";
import PropTypes from "prop-types";
import { formatCurrency, plural } from "../../utils";
import "./style.css";
import { cn as bem } from "@bem-react/classname";

/**
 *  Функция для вывода информации о корзине
 * @param {Object} props - объект пропсов
 * @param {String} props.title - Надпись передшествующая выводу информации
 * @param {Number} props.cartItemsCount - количества товаров в корзине
 * @param {Number} props.cartTotalPrice - сумма товаров в корзине
 * @returns разметка
 */
function CartInfo({ title, cartItemsCount, cartTotalPrice }) {
  const cn = bem("CartInfo");
  const isEmptyCart = cartItemsCount === 0;

  return (
    <div className={cn()}>
      <span
        className={cn("title") + (title !== "В Корзине:" ? cn("content") : "")}
      >
        {title}
      </span>
      <div className={cn("content")}>
        {isEmptyCart
          ? ("пусто")
          : (`${cartItemsCount} ${plural(cartItemsCount, {
              one: "товар",
              few: "товара",
              many: "товаров",
            })} /` )
        }
      </div>
      {!isEmptyCart && (
        <span className={cn("content")}>{`${formatCurrency(cartTotalPrice)}`}</span>
      )}
    </div>
  );
}

CartInfo.propTypes = {
  title: PropTypes.string,
  cartTotalPrice: PropTypes.number.isRequired,
  cartItemsCount: PropTypes.number.isRequired,
};

CartInfo.defaultProps = {
  title: "В Корзине:",
};

export default React.memo(CartInfo);
