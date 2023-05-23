import React, { useState } from "react";
import './style.css';
import CartItem from "../cartItem";

function Cart({cart, setIsShow, isShow, onRemoveToCart}){

    return(
        <div className="Cart">
            <div className="popUp">
                <div className="cartHeader">
                    <span className="header">Корзина</span>
                    <button onClick={() => setIsShow(!isShow)}>Закрыть</button>
                </div>
                <div className="cartContent">
                    <table>
                        <tbody>
                            {
                                cart.length ?
                                cart.map((item, i) => (
                                    <CartItem key={item.code} code={item.code} id={i} price={item.price} title={item.title} count={item.count} removeItem={onRemoveToCart} />
                                ))
                                : <tr className="emptyCart"><td>Карзина пустая</td></tr>
                            }
                            <tr>
                                <td></td><td><b>Итого</b></td>
                                <td>{cart.reduce((acumlyator, curentItem) => acumlyator + curentItem.price,0)} ₽</td><td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default Cart