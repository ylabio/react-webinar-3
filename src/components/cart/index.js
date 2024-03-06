import { cn as bem } from "@bem-react/classname";
import React from "react";

import "./style.css";
import Head from "../head";
import List from "../list";
import { pluralNumber } from "../../utils";

function Cart({ cart, totalPrice, removeItem }) {
  const cn = bem("Cart");

  return (
    <div className={cn()}>
      <Head title="Корзина" />
      <div className={cn("body")}>
        {!cart.length ? (
          <span className={cn("notification")}>Ваша корзина пуста</span>
        ) : (
          <>
            <List
              list={cart}
              actionsBtnText={"Удалить"}
              onActionClick={removeItem}
            />
            <div className={cn("price") + " Price"}>
              <div className="Price-total">
                <span>Итого</span>
                <span className="Price-number">{pluralNumber(totalPrice)}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default React.memo(Cart);
