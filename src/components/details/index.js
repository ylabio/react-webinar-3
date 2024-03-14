import { memo, useCallback } from "react";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import PropTypes from "prop-types";
import "./style.css";

function Details({ product, addToBasket, text }) {
  const cn = bem("Product");

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      () => addToBasket(product._id),
      [product, addToBasket]
    ),
  };

  return (
    <>
      {product._id && (
        <div className={cn()}>
          <div className={cn("description")}>{product.description}</div>
          <div className={cn("country")}>
            {text[0]} <span>{product.madeIn.title}</span>
          </div>
          <div className={cn("category")}>
            {text[1]} <span>{product.category.title}</span>
          </div>
          <div className={cn("release-date")}>
            {text[2]} <span>{product.edition}</span>
          </div>
          <div className={cn("price")}>
            {text[3]}
            <span> {`${numberFormat(product.price)} ₽`}</span>
          </div>
          <button className={cn("button")} onClick={callbacks.addToBasket}>
            {text[4]}
          </button>
        </div>
      )}
    </>
  );
}

Details.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string.isRequired,
    edition: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
    madeIn: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  addToBasket: PropTypes.func.isRequired,
  text: PropTypes.arrayOf(PropTypes.string),
};
Details.defaultProps = {
  text: [
    "Страна произодитель:",
    "Категория:",
    "Год выпуска:",
    "Цена:",
    "Добавить",
  ],
};

export default memo(Details);
