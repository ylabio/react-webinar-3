import React, { memo, useState } from "react";
import './style.css';

function CartItem({id,code, title, count, price, removeItem}){
    return(
            <tr className="CartItem">
                <td>{id + 1}</td>
                <td>{title}</td>
                <td>{price} ₽</td>
                <td>{count} шт.</td>
                <td><button onClick={() => removeItem(code)}>Удалить</button></td>
            </tr>
    )
}
export default memo(CartItem) 