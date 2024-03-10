import React, { memo } from "react";
import { numberFormat } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import { useLanguage } from "../../localization/LanguageContext";
import { dictionary } from "../../localization/dictionary";
import { useLanguage } from "../../localization/LanguageContext";
import { dictionary } from "../../localization/dictionary";
import "./style.css";

const Product = ({ product, addToCart }) => {
  const cn = bem("Product");

  const { currentLanguage } = useLanguage();
  const { add, country, category, year, price } = dictionary[currentLanguage];

  return (
    <section className={cn()}>
      <div className={cn("info")}>
        <p className={cn("description")}>{product.description}</p>
        <p className={cn("country")}>
          {country}:&nbsp;
          <span>{product?.madeIn.title}</span>
        </p>
        <p className={cn("category")}>
          {category}:&nbsp;
          <span>{product?.category.title}</span>
        </p>
        <p className={cn("year")}>
          {year}:&nbsp;
          <span>{product?.edition}</span>
        </p>
        <p className={cn("price")}>
          {price}:&nbsp;
          <span>{numberFormat(product?.price)} ₽</span>
        </p>
      </div>
      <button onClick={() => addToCart(product._id)} className={cn("button")}>
        {add}
      </button>
    </section>
  );
};

export default memo(Product);
