import React, { memo } from "react";
import { numberFormat } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const Product = ({ product, addToCart }) => {
  const cn = bem("Product");

  console.log(product);

  return (
    <section className={cn()}>
      <div className={cn("info")}>
        <p className={cn("description")}>{product.description}</p>
        <p className={cn("country")}>
          Страна производитель:&nbsp;
          <span>{product?.madeIn.title}</span>
        </p>
        <p className={cn("category")}>
          Категория:&nbsp;
          <span>{product?.category.title}</span>
        </p>
        <p className={cn("year")}>
          Год выпуска:&nbsp;
          <span>{product?.edition}</span>
        </p>
        <p className={cn("price")}>
          Цена:&nbsp;
          <span>{numberFormat(product?.price)} ₽</span>
        </p>
      </div>
      <button onClick={() => addToCart(product._id)} className={cn("button")}>
        Добавить
      </button>
    </section>
  );
};

export default memo(Product);
