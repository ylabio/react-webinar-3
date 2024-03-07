import React from "react";
import "./style.css";
import UniversalBtn from "../universal-btn";
import { currentTotalPrice, plural } from "../../utils";

function Controls({ setIsActiveModale, cartStore }) {
  const amountIntoCart = plural(cartStore.length, {
    one: "товар",
    few: "товара",
    many: "товаров",
  });
  const price = currentTotalPrice(cartStore);

  return (
    <div className="Controls">
      <p>В корзине:</p>
      <div className="Contols-Info">
        {!cartStore.length ? (
          <p>пусто</p>
        ) : (
          <>
            <div className="Amount-into-cart">
              <p>{cartStore.length}</p>
              <p>{amountIntoCart}</p>
            </div>
            <span>/</span>
            <div className="Total-price">
              <p>{price}</p>
              <p>₽</p>
            </div>
          </>
        )}
      </div>
      <div className="Controls-action">
        <UniversalBtn
          btnText={"Перейти"}
          onClick={() => setIsActiveModale(true)}
        />
      </div>
    </div>
  );
}

export default React.memo(Controls);
