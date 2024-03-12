import React, { memo } from "react";
import { numberFormat } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const Product = ({ product, addToCart, translation }) => {
  const cn = bem("Product");

  return (
    <section className={cn()}>
      <div className={cn("info")}>
        <p className={cn("description")}>{product.description}</p>
        <p className={cn("country")}>
          {translation.country}:&nbsp;
          <span>{product?.madeIn.title}</span>
        </p>
        <p className={cn("category")}>
          {translation.category}:&nbsp;
          <span>{product?.category.title}</span>
        </p>
        <p className={cn("year")}>
          {translation.year}:&nbsp;
          <span>{product?.edition}</span>
        </p>
        <p className={cn("price")}>
          {translation.price}:&nbsp;
          <span>{numberFormat(product?.price)} ₽</span>
        </p>
      </div>
      <button onClick={() => addToCart(product._id)} className={cn("button")}>
        {translation.add}
      </button>
    </section>
  );
};

export default memo(Product);
