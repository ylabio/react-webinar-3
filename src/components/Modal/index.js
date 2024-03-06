import React from "react";
import './style.css';
import Cart from "../cart";
import Head from "../head";

function Modal({isActive, setIsActive, cartList, deleteItem}) {

    return (
      <div className={isActive ? "Modal-background" : ""}>
        <div className={isActive ? "Modal-container" : "Modal-disable"}>
          <div className="Modal-header">
            <Head title='Корзина'/>
            <button onClick={() => setIsActive(false)}>Закрыть</button>
          </div>          
          <Cart
            list={cartList}
            onSelect={deleteItem}
            // onDeleteItemIntoCart={onDeleteItemIntoCart}
          />
        </div>
      </div>
    )

}

export default React.memo(Modal);