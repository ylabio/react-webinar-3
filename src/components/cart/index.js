import React from "react";
import Head from "../head";
import UniversalBtn from "../universal-btn";
import Item from "../item";
import "./style.css";
import { currentTotalPrice } from "../../utils";

function Cart({ cartStore, onDeleteItemIntoCart }) {
  const price = currentTotalPrice(cartStore)

  return (
    <div className="Cart">
      <div className="Cart-Header">
        <Head
          title="Корзина"
        />
      </div>
      {cartStore.length ? (
        <>
          <div className="Cart-Items">
            {cartStore.map((itemIntoCart) => (
              <div className="Cart-Item" key={itemIntoCart.code}>
                <Item
                  isIntoCart={true}
                  item={itemIntoCart}
                  btn={
                    <UniversalBtn
                      btnText={"Удалить"}
                      onClick={() => onDeleteItemIntoCart(itemIntoCart.code)}
                    />
                  }
                />
              </div>
            ))}
          </div>
          <div className="Cart-Total">
            <p>Итого</p>
            <div className="Price">
              <p>{price}</p>
              <p>₽</p>
            </div>
          </div>
        </>
      ) : (
        <p className="CartIsEmpty">Корзина Пуста</p>
      )}
    </div>
  );
}

export default Cart;
