import { memo, useCallback } from "react";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import "./style.css";

function Details({ product, addToBasket }) {
  const cn = bem("Product");

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(() => addToBasket(product._id), [product, addToBasket]),
  };

  return (
    <>
      {product._id && (
        <div className={cn()}>
          <div className={cn("description")}>{product.description}</div>
          <div className={cn("country")}>
            Страна произодитель: <span>{product.madeIn.title}</span>
          </div>
          <div className={cn("category")}>
            Категория: <span>{product.category.title}</span>
          </div>
          <div className={cn("release-date")}>
            Год выпуска: <span>{product.edition}</span>
          </div>
          <div className={cn("price")}>
            Цена: <span> {`${numberFormat(product.price)} ₽`}</span>
          </div>
          <button className={cn("button")} onClick={callbacks.addToBasket}>
            Добавить
          </button>
        </div>
      )}
    </>
  );
}

export default memo(Details);
