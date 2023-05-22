import React from "react";
import { useState, useEffect } from "react";
import { plural } from "../../utils";
import { getCountGoods, getSum, getFormatNumber } from "../../utils";
import "./style.css";

function ShoppingCartCalc({ sumShoppingCart, shoppingCartCount }) {
  const content = shoppingCartCount ? (
    <>
      В корзине: {shoppingCartCount}{" "}
      {plural(shoppingCartCount, {
        one: "товар",
        few: "товара",
        many: "товаров",
      })}{" "}
      /
      <span className="shoppingCartCalc-bold">
        {getFormatNumber(sumShoppingCart)} ₽
      </span>
    </>
  ) : (
    <span>Корзина пуста</span>
  );

  return <div className="shoppingCartCalc">{content}</div>;
}

export default ShoppingCartCalc;
