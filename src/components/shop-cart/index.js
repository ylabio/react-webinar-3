import React from "react";
import Head from "../head/";
import ItemCart from "../item-cart";
import "./style.css";

function ShopCart({ onClose, cartItems, totalPrice, deleteItemCart }) {
  return (
    <div className="modal">
      <div className="modal-wrapper">
        <div className="modal-content">
          <Head title="Корзина" />
          <button className="close-button" onClick={() => onClose()}>Закрыть</button>
          <div className="List">
            {cartItems.map((item) => (
              <div key={item.code} className="List-Cart">
                <ItemCart item={item} deleteItemCart={deleteItemCart} />
              </div>
            ))}
            {totalPrice() > 0 && <div className="totalPrice">Итого <span>{totalPrice()} ₽</span></div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ShopCart);
