import React from "react";
import Head from "../head";
import UniversalBtn from "../universalBtn";
import Item from "../item";
import "./style.css";

function Cart({ onSetModal, cartStore, onDeleteItemIntoCart }) {
  const cartTotalProce = cartStore.reduce((acc, product) => {
    return (acc += product.price * product.amountIntoCart);
  }, 0);

  return (
    <div className="Cart">
      <div className="Cart-Header">
        <Head
          title="Корзина"
          children={
            <div className="Cart-Header-Btn">
              <UniversalBtn
                btnText="Закрыть"
                onClick={() => onSetModal(false)}
              />
            </div>
          }
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
              <p>{cartTotalProce}</p>
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
