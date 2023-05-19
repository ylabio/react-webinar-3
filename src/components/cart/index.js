import React from "react";
import "./style.css"
import ShoppingList from "../shoppingList";


function Cart(props) {
    return(
        <div className="shoppingCart">
            <div className="tableOfContents">
                <h1>Корзина</h1>
                <button className="btnClose" onClick={() => props.onCloseBasket()}>Закрыть</button>
            </div>

            {props.shoppingСart.shoppingList.map(item =>
                <ShoppingList onDel={props.onDel} data={item} key={item.code}/>
            )}

            <div className="total"><p>Итого: <span className="bold">{props.shoppingСart.price} ₽</span></p></div>
        </div>
    )
}

export default Cart