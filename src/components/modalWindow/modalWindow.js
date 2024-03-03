import React from "react";
import "./style.css";
import Cart from "../cart";

function ModalCart({
  isActiveModal,
  setIsActiveModale,
  cartStore,
  onDeleteItemIntoCart,
}) {
  return (
    <div className={isActiveModal ? "Modal-Window-Cart" : ""}>
      <div className={isActiveModal ? "MyModal-Active" : "MyModal"}>
        <Cart
          onSetModal={() => setIsActiveModale(false)}
          cartStore={cartStore}
          onDeleteItemIntoCart={onDeleteItemIntoCart}
        />
      </div>
    </div>
  );
}

export default ModalCart;
