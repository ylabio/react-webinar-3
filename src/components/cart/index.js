import { cn as bem } from "@bem-react/classname";
import React from "react";
import ReactPortal from "../portal-wrapper";

import "./style.css";
import Head from "../head";
import List from "../list";
import { pluralNumber } from "../../utils";

function Cart({ isOpen, closeCart, cart, totalPrice, removeItem }) {
  const cn = bem("Cart");

  if (!isOpen) return null;

  return (
    <ReactPortal>
      <div className={cn()}>
        <div className={cn("container")}>
          <Head title="Корзина" />
          <button className={cn("closeBtn")} onClick={closeCart}>
            Закрыть
          </button>
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
                <div className={cn("price")}>
                  <span>Итого</span> <span>{pluralNumber(totalPrice)}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </ReactPortal>
  );
}

export default React.memo(Cart);
