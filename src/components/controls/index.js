import React from "react";
import "./style.css";
import UniversalBtn from "../universalBtn";
import { plural } from "../../utils";

function Controls({ setIsActiveModale, cartStore }) {
  const amountIntoCart = plural(cartStore.length, {
    one: "товар",
    few: "товара",
    many: "товаров",
  });

  const totalPriceCart = cartStore.reduce((acc, product) => {
    acc += product.price;
    return acc;
  }, 0);

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
              <p>{totalPriceCart}</p>
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

Controls.defaultProps = {
  onSetModal: () => {},
};

export default React.memo(Controls);
