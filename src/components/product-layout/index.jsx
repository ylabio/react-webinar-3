import { cn as bem } from "@bem-react/classname";
import React from "react";
import { translate } from "../../utils";
import "./style.css";

const ProductLayout = ({ select, addToBasket }) => {
  const cn = bem("ProductLayout");
  const { data, lang } = select;

  function onClickBtn() {
    addToBasket(data?._id);
  }
  return (
    <div className={cn()}>
      <p>{data?.description}</p>
      <p>
        {translate(lang, "country")}: <b>{data?.madeIn?.title}</b>
      </p>
      <p>
        {translate(lang, "category")}: <b>{data?.category?.title}</b>
      </p>
      <p>
        {translate(lang, "year")}: <b>{data?.edition}</b>
      </p>
      <h3>
        {translate(lang, "price")}: {data?.price} Р
      </h3>
      <button onClick={onClickBtn}>{translate(lang, "add")}</button>
    </div>
  );
};

export default ProductLayout;
